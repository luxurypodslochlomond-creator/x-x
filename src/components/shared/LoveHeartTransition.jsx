import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveHeartTransition() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            fontSize: 48,
            fontWeight: 900,
            textShadow: '0 0 30px rgba(236, 72, 153, 0.6)',
            filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))'
          }}
        >
          ♾️❤️
        </motion.div>
      )}
    </AnimatePresence>
  );
}