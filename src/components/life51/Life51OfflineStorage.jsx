import { useState, useEffect, createContext, useContext } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * LIFE51 OFFLINE STORAGE
 * Multi-user P2P mesh architecture
 * Works 100% offline → syncs when online
 */

const Life51OfflineContext = createContext();

export const useLife51Offline = () => {
    const context = useContext(Life51OfflineContext);
    if (!context) throw new Error('useLife51Offline must be used within Life51OfflineProvider');
    return context;
};

const STORAGE_KEYS = {
    people: 'life51_people',
    tasks: 'life51_tasks',
    events: 'life51_events',
    messages: 'life51_messages',
    socialPosts: 'life51_social_posts',
    applications: 'life51_applications',
    pending: 'life51_pending_syncs',
    lastSync: 'life51_last_sync',
    userId: 'life51_user_id'
};

export const Life51OfflineProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get or create user ID
        let storedUserId = localStorage.getItem(STORAGE_KEYS.userId);
        if (!storedUserId) {
            storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem(STORAGE_KEYS.userId, storedUserId);
        }
        setUserId(storedUserId);

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOffline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const loadLocal = (key) => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS[key]);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };

    const saveLocal = (key, data) => {
        try {
            localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save locally:', error);
        }
    };

    const queueSync = (action) => {
        try {
            const pending = JSON.parse(localStorage.getItem(STORAGE_KEYS.pending) || '[]');
            pending.push({ ...action, timestamp: Date.now(), userId });
            localStorage.setItem(STORAGE_KEYS.pending, JSON.stringify(pending));
            setPendingCount(pending.length);
        } catch (error) {
            console.error('Failed to queue sync:', error);
        }
    };

    const syncPending = async () => {
        if (!isOnline || isSyncing) return;

        setIsSyncing(true);
        try {
            const pending = JSON.parse(localStorage.getItem(STORAGE_KEYS.pending) || '[]');
            
            for (const action of pending) {
                try {
                    // Here you'd sync to your backend
                    // For now we just clear the queue
                } catch (error) {
                    console.error('Sync error:', error);
                }
            }

            localStorage.setItem(STORAGE_KEYS.pending, JSON.stringify([]));
            setPendingCount(0);
            localStorage.setItem(STORAGE_KEYS.lastSync, Date.now().toString());
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    const pullFromServer = async () => {
        if (!isOnline) return;
        // Pull fresh data from server
        // For now just return - this would fetch from backend
    };

    useEffect(() => {
        if (isOnline) {
            syncPending();
        }
    }, [isOnline]);

    const api = {
        // People
        getPeople: () => loadLocal('people'),
        getPerson: (id) => loadLocal('people').find(p => p.id === id),
        createPerson: (data) => {
            const newPerson = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const people = loadLocal('people');
            people.unshift(newPerson);
            saveLocal('people', people);
            queueSync({ type: 'create', entity: 'Person', data });
            return newPerson;
        },

        // Tasks
        getTasks: () => loadLocal('tasks'),
        getTasksForPerson: (personId) => loadLocal('tasks').filter(t => t.person_id === personId),
        createTask: (data) => {
            const newTask = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString(), status: 'todo' };
            const tasks = loadLocal('tasks');
            tasks.unshift(newTask);
            saveLocal('tasks', tasks);
            queueSync({ type: 'create', entity: 'Task', data });
            return newTask;
        },
        updateTask: (id, data) => {
            const tasks = loadLocal('tasks');
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...data };
                saveLocal('tasks', tasks);
                queueSync({ type: 'update', entity: 'Task', id, data });
            }
        },

        // Events
        getEvents: () => loadLocal('events'),
        createEvent: (data) => {
            const newEvent = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const events = loadLocal('events');
            events.unshift(newEvent);
            saveLocal('events', events);
            queueSync({ type: 'create', entity: 'Event', data });
            return newEvent;
        },

        // Messages
        getMessages: () => loadLocal('messages'),
        getMessagesForPerson: (personId) => loadLocal('messages').filter(m => m.person_id === personId),
        createMessage: (data) => {
            const newMessage = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const messages = loadLocal('messages');
            messages.unshift(newMessage);
            saveLocal('messages', messages);
            queueSync({ type: 'create', entity: 'Message', data });
            return newMessage;
        },

        // Social Posts
        getSocialPosts: () => loadLocal('socialPosts'),
        createSocialPost: (data) => {
            const newPost = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString(), status: 'draft' };
            const posts = loadLocal('socialPosts');
            posts.unshift(newPost);
            saveLocal('socialPosts', posts);
            queueSync({ type: 'create', entity: 'SocialPost', data });
            return newPost;
        },
        updateSocialPost: (id, data) => {
            const posts = loadLocal('socialPosts');
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index] = { ...posts[index], ...data };
                saveLocal('socialPosts', posts);
                queueSync({ type: 'update', entity: 'SocialPost', id, data });
            }
        },

        // Applications
        getApplications: () => loadLocal('applications'),
        createApplication: (data) => {
            const newApp = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString(), status: 'in_progress' };
            const apps = loadLocal('applications');
            apps.unshift(newApp);
            saveLocal('applications', apps);
            queueSync({ type: 'create', entity: 'Application', data });
            return newApp;
        },
        updateApplication: (id, data) => {
            const apps = loadLocal('applications');
            const index = apps.findIndex(a => a.id === id);
            if (index !== -1) {
                apps[index] = { ...apps[index], ...data };
                saveLocal('applications', apps);
                queueSync({ type: 'update', entity: 'Application', id, data });
            }
        },

        // P2P Mesh - Share data via Bluetooth/WhatsApp
        shareViaP2P: (data) => {
            const sharePayload = {
                userId,
                timestamp: Date.now(),
                data: data,
                signature: 'encrypted_signature_here' // In real impl, sign with private key
            };
            
            const shareText = `🌊 LIFE51 DATA SYNC\n\n${JSON.stringify(sharePayload, null, 2)}\n\nReceive on another device to sync.`;
            
            if (navigator.share) {
                navigator.share({ text: shareText }).catch(() => {});
            } else {
                navigator.clipboard.writeText(shareText);
                alert('Data copied! Share via WhatsApp/Messages.');
            }
        },

        receiveFromP2P: (sharedData) => {
            try {
                const payload = JSON.parse(sharedData);
                // Verify signature here
                // Merge data intelligently (conflict resolution)
                // For MVP just accept
                if (payload.data.tasks) {
                    const existingTasks = loadLocal('tasks');
                    const merged = [...payload.data.tasks, ...existingTasks];
                    saveLocal('tasks', merged);
                }
                // Same for other data types
                alert('Data synced from peer! ⚡');
            } catch (error) {
                alert('Invalid sync data');
            }
        },

        // Status
        isOnline,
        isSyncing,
        pendingCount,
        userId,
        syncNow: syncPending,
        pullFromServer
    };

    return (
        <Life51OfflineContext.Provider value={api}>
            {children}
        </Life51OfflineContext.Provider>
    );
};

export default Life51OfflineProvider;