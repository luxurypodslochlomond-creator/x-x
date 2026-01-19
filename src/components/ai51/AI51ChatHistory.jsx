import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AI51ChatHistory({ localMemory, isOpen, onClose, onLoadChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !localMemory) return;
    
    const loadChats = async () => {
      setLoading(true);
      try {
        const conversations = await localMemory.getAllConversations();
        setChats(conversations.reverse()); // newest first
      } catch (error) {
        console.error('Failed to load chats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChats();
  }, [isOpen, localMemory]);

  const handleLoadChat = (chat) => {
    onLoadChat(chat);
    onClose();
  };

  const handleDelete = async (chatId, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat?')) return;
    
    try {
      await localMemory.deleteConversation(chatId);
      setChats(chats.filter(c => c.id !== chatId));
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex"
      >
        <motion.div
          className="w-80 bg-black border-r border-cyan-500/20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-cyan-500/20 p-4 flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 hover:bg-cyan-500/10 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <h2 className="text-cyan-400 font-mono font-bold">MEMORIES</h2>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading ? (
              <p className="text-gray-600 text-sm font-mono p-4">Loading...</p>
            ) : chats.length === 0 ? (
              <p className="text-gray-600 text-sm font-mono p-4">No memories yet</p>
            ) : (
              chats.map((chat) => {
                const preview = chat.messages?.[0]?.content?.substring(0, 40) || 'Empty chat';
                const date = new Date(chat.timestamp || Date.now()).toLocaleDateString('en-GB', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <motion.button
                    key={chat.id}
                    onClick={() => handleLoadChat(chat)}
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 bg-black border border-cyan-500/20 hover:border-cyan-500/50 rounded-lg transition-all group"
                  >
                    <p className="text-cyan-300 text-xs font-mono truncate">{preview}...</p>
                    <p className="text-gray-600 text-xs mt-1">{date}</p>
                    <button
                      onClick={(e) => handleDelete(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 absolute right-2 p-1 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.button>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Close on outside click */}
        <button
          onClick={onClose}
          className="flex-1"
          style={{ pointerEvents: 'auto' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}