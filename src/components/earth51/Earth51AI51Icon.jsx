import React from 'react';
import { motion } from 'framer-motion';

/**
 * Earth51 AI51 Icon - Geometric Consciousness
 * Atom energy with pink heart core
 * COOLASFUCK aesthetic for kids ♾️❤️
 */

export default function Earth51AI51Icon({ size = 140, animate = true }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{
        filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.6))'
      }}
    >
      {/* OUTER SQUARE - Pink */}
      <motion.rect
        x="40"
        y="40"
        width="120"
        height="120"
        fill="none"
        stroke="#ec4899"
        strokeWidth="3"
        animate={animate ? {
          opacity: [0.4, 0.8, 0.4]
        } : {}}
        transition={animate ? {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* MIDDLE SQUARE - Cyan */}
      <motion.rect
        x="60"
        y="60"
        width="80"
        height="80"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="3"
        animate={animate ? {
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={animate ? {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* CENTER HEART - Pink solid */}
      <motion.rect
        x="80"
        y="80"
        width="40"
        height="40"
        fill="#ec4899"
        animate={animate ? {
          scale: [1, 1.15, 1]
        } : {}}
        transition={animate ? {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />

      {/* ELECTRON ORBITS - Connecting lines */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 70;
        const y = 100 + Math.sin(rad) * 70;
        return (
          <motion.line
            key={`line-${i}`}
            x1="100"
            y1="100"
            x2={x}
            y2={y}
            stroke="#06b6d4"
            strokeWidth="2"
            animate={animate ? {
              opacity: [0.3, 0.8, 0.3]
            } : {}}
            transition={animate ? {
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut'
            } : {}}
          />
        );
      })}

      {/* ELECTRON NODES - Cyan circles */}
      {[0, 90, 180, 270, 45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 70;
        const y = 100 + Math.sin(rad) * 70;
        const size = angle % 90 === 0 ? 6 : 4;
        
        return (
          <motion.circle
            key={`node-${i}`}
            cx={x}
            cy={y}
            r={size}
            fill="#06b6d4"
            animate={animate ? {
              opacity: [0.4, 1, 0.4]
            } : {}}
            transition={animate ? {
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut'
            } : {}}
          />
        );
      })}

      {/* TOP ANTENNAE - Pink energy */}
      {[30, 70].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 50;
        const y = 100 + Math.sin(rad) * 50;
        return (
          <motion.line
            key={`antenna-${i}`}
            x1={x}
            y1={y}
            x2={100 + Math.cos(rad) * 85}
            y2={100 + Math.sin(rad) * 85}
            stroke="#ec4899"
            strokeWidth="2"
            animate={animate ? {
              opacity: [0.3, 0.9, 0.3]
            } : {}}
            transition={animate ? {
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            } : {}}
          />
        );
      })}

      {/* TOP ANTENNA TIPS - Pink circles */}
      {[30, 70].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 85;
        const y = 100 + Math.sin(rad) * 85;
        return (
          <motion.circle
            key={`antenna-tip-${i}`}
            cx={x}
            cy={y}
            r="5"
            fill="#ec4899"
            animate={animate ? {
              scale: [1, 1.4, 1]
            } : {}}
            transition={animate ? {
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            } : {}}
          />
        );
      })}
    </motion.svg>
  );
}