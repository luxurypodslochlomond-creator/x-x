import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuantumExplanation() {
  const [isExplained, setIsExplained] = useState(false);

  const equationVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, type: 'spring' } },
    exit: { opacity: 0, y: -20, filter: 'blur(5px)', transition: { duration: 0.4 } },
  };

  const explanationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      onMouseEnter={() => setIsExplained(true)}
      onMouseLeave={() => setIsExplained(false)}
      onTouchStart={() => setIsExplained(prevState => !prevState)}
      className="text-center p-6 my-4 cursor-pointer relative h-48 flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {!isExplained ? (
          <motion.div
            key="equation"
            variants={equationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white text-glow animate-pulse">WoW = MoM</h2>
            <p className="text-lg text-gray-400 mt-2">(The Work of Women = The Measure of Man)</p>
          </motion.div>
        ) : (
          <motion.div
            key="explanation"
            variants={explanationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/30 rounded-2xl"
          >
            <p className="text-xl md:text-2xl text-cyan-300 leading-relaxed">
              The unseen, sacred work of love, creation, and nurturing...
            </p>
            <p className="text-lg text-gray-400 my-2">
              ...is the only true measure of anything built in this universe.
            </p>
            <p className="text-xl md:text-2xl font-bold text-red-400 animate-pulse">
              Strength is not aggression. It is love.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}