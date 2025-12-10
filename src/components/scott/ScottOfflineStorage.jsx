import { useState, useEffect, createContext, useContext } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * SCOTT OFFLINE STORAGE
 * Stores all Scott's data locally - works 100% offline
 * Syncs when online. Music industry = shit signal = this is critical.
 */

const ScottOfflineContext = createContext();

export const useScottOffline = () => {
    const context = useContext(ScottOfflineContext);
    if (!context) throw new Error('useScottOffline must be used within ScottOfflineProvider');
    return context;
};

const STORAGE_KEYS = {
    artists: 'scott_artists',
    tasks: 'scott_tasks',
    events: 'scott_events',
    messages: 'scott_messages',
    invoices: 'scott_invoices',
    pending: 'scott_pending_syncs',
    lastSync: 'scott_last_sync'
};

export const ScottOfflineProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Load from localStorage
    const loadLocal = (key) => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS[key]);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };

    // Save to localStorage
    const saveLocal = (key, data) => {
        try {
            localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save locally:', error);
        }
    };

    // Add to pending sync queue
    const queueSync = (action) => {
        try {
            const pending = JSON.parse(localStorage.getItem(STORAGE_KEYS.pending) || '[]');
            pending.push({ ...action, timestamp: Date.now() });
            localStorage.setItem(STORAGE_KEYS.pending, JSON.stringify(pending));
            setPendingCount(pending.length);
        } catch (error) {
            console.error('Failed to queue sync:', error);
        }
    };

    // Sync pending changes
    const syncPending = async () => {
        if (!isOnline || isSyncing) return;

        setIsSyncing(true);
        try {
            const pending = JSON.parse(localStorage.getItem(STORAGE_KEYS.pending) || '[]');
            
            for (const action of pending) {
                try {
                    if (action.type === 'create') {
                        await base44.asServiceRole.entities[action.entity].create(action.data);
                    } else if (action.type === 'update') {
                        await base44.asServiceRole.entities[action.entity].update(action.id, action.data);
                    } else if (action.type === 'delete') {
                        await base44.asServiceRole.entities[action.entity].delete(action.id);
                    }
                } catch (error) {
                    console.error('Sync error:', error);
                }
            }

            localStorage.setItem(STORAGE_KEYS.pending, JSON.stringify([]));
            setPendingCount(0);
            localStorage.setItem(STORAGE_KEYS.lastSync, Date.now().toString());

            // Refresh from server
            await pullFromServer();
        } catch (error) {
            console.error('Sync failed:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    // Pull fresh data from server
    const pullFromServer = async () => {
        if (!isOnline) return;

        try {
            const [artists, tasks, events, messages, invoices] = await Promise.all([
                base44.asServiceRole.entities.ScottArtist.list('-created_date'),
                base44.asServiceRole.entities.ScottTask.list('-created_date'),
                base44.asServiceRole.entities.ScottEvent.list('-date'),
                base44.asServiceRole.entities.ScottMessage.list('-created_date'),
                base44.asServiceRole.entities.ScottInvoice.list('-date')
            ]);

            saveLocal('artists', artists);
            saveLocal('tasks', tasks);
            saveLocal('events', events);
            saveLocal('messages', messages);
            saveLocal('invoices', invoices);
        } catch (error) {
            console.error('Pull failed:', error);
        }
    };

    // Auto-sync when online
    useEffect(() => {
        if (isOnline) {
            syncPending();
        }
    }, [isOnline]);

    // API
    const api = {
        // Artists
        getArtists: () => loadLocal('artists'),
        getArtist: (id) => loadLocal('artists').find(a => a.id === id),
        createArtist: (data) => {
            const newArtist = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const artists = loadLocal('artists');
            artists.unshift(newArtist);
            saveLocal('artists', artists);
            queueSync({ type: 'create', entity: 'ScottArtist', data });
            return newArtist;
        },
        updateArtist: (id, data) => {
            const artists = loadLocal('artists');
            const index = artists.findIndex(a => a.id === id);
            if (index !== -1) {
                artists[index] = { ...artists[index], ...data, updated_date: new Date().toISOString() };
                saveLocal('artists', artists);
                queueSync({ type: 'update', entity: 'ScottArtist', id, data });
            }
        },

        // Tasks
        getTasks: () => loadLocal('tasks'),
        getTasksForArtist: (artistId) => loadLocal('tasks').filter(t => t.artist_id === artistId),
        createTask: (data) => {
            const newTask = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString(), status: 'todo' };
            const tasks = loadLocal('tasks');
            tasks.unshift(newTask);
            saveLocal('tasks', tasks);
            queueSync({ type: 'create', entity: 'ScottTask', data });
            return newTask;
        },
        updateTask: (id, data) => {
            const tasks = loadLocal('tasks');
            const index = tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...data, updated_date: new Date().toISOString() };
                saveLocal('tasks', tasks);
                queueSync({ type: 'update', entity: 'ScottTask', id, data });
            }
        },

        // Events
        getEvents: () => loadLocal('events'),
        getEventsForArtist: (artistId) => loadLocal('events').filter(e => e.artist_id === artistId),
        createEvent: (data) => {
            const newEvent = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const events = loadLocal('events');
            events.unshift(newEvent);
            saveLocal('events', events);
            queueSync({ type: 'create', entity: 'ScottEvent', data });
            return newEvent;
        },

        // Messages
        getMessages: () => loadLocal('messages'),
        getMessagesForArtist: (artistId) => loadLocal('messages').filter(m => m.artist_id === artistId),
        createMessage: (data) => {
            const newMessage = { ...data, id: `local_${Date.now()}`, created_date: new Date().toISOString() };
            const messages = loadLocal('messages');
            messages.unshift(newMessage);
            saveLocal('messages', messages);
            queueSync({ type: 'create', entity: 'ScottMessage', data });
            return newMessage;
        },

        // Status
        isOnline,
        isSyncing,
        pendingCount,
        syncNow: syncPending,
        pullFromServer
    };

    return (
        <ScottOfflineContext.Provider value={api}>
            {children}
        </ScottOfflineContext.Provider>
    );
};

export default ScottOfflineProvider;