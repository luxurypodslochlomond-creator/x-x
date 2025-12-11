import React, { useState } from 'react';
import { Target, X } from 'lucide-react';

/**
 * FOCUS MODE - HIDE EVERYTHING EXCEPT NOW
 * Hyperfocus protection
 */

export default function ScottFocusMode({ children }) {
    const [focusMode, setFocusMode] = useState(false);
    const [focusTask, setFocusTask] = useState(null);

    if (!focusMode) {
        return (
            <>
                {children}
                <button
                    onClick={() => setFocusMode(true)}
                    className="fixed bottom-6 left-6 z-40 p-3 bg-purple-600 hover:bg-purple-700 rounded-full shadow-2xl"
                >
                    <Target className="w-5 h-5 text-white" />
                </button>
            </>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black p-6 flex flex-col items-center justify-center">
            <button
                onClick={() => setFocusMode(false)}
                className="absolute top-6 right-6 p-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
                <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="max-w-md w-full text-center">
                <Target className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-4xl font-black text-purple-400 font-mono mb-6">FOCUS MODE</h2>
                
                <div className="bg-black border-4 border-purple-500 p-6 mb-4">
                    <p className="text-white text-xl font-mono mb-2">
                        What are you doing RIGHT NOW?
                    </p>
                    <p className="text-purple-300 text-sm font-mono">
                        (Type your task, then press LOCK IN to hide everything else)
                    </p>
                </div>

                <input
                    type="text"
                    value={focusTask || ''}
                    onChange={(e) => setFocusTask(e.target.value)}
                    placeholder="e.g. Replying to venue emails..."
                    className="w-full bg-black border-2 border-purple-500 text-white font-mono text-center p-4 text-xl mb-6"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && focusTask) {
                            // Lock in on Enter
                        }
                    }}
                />

                {focusTask ? (
                    <button
                        onClick={() => setFocusMode(false)}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-black font-black font-mono text-xl py-4 rounded-lg mb-4"
                    >
                        LOCK IN
                    </button>
                ) : (
                    <div className="text-gray-600 font-mono text-sm mb-4">
                        Type what you're working on...
                    </div>
                )}

                {focusTask && (
                    <div className="text-green-400 font-mono text-xs">
                        Press LOCK IN to go back and focus only on: {focusTask}
                    </div>
                )}
            </div>
        </div>
    );
}