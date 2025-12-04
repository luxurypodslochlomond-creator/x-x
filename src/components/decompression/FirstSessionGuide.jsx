import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Volume2, Eye, Vibrate, CheckCircle, ArrowRight, X } from 'lucide-react';

export default function FirstSessionGuide({ onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Brain,
      title: 'Welcome, Beautiful Soul',
      description: 'This is your first frequency healing session. We\'ll guide you through in 5 simple steps.',
      detail: 'No medical knowledge needed. Just follow your body. If something doesn\'t feel right, stop. Trust yourself.',
      color: 'from-cyan-500 to-purple-500'
    },
    {
      icon: Heart,
      title: 'Pick Your Need',
      description: 'Choose what you need right now. Can\'t sleep? Anxious? In pain? Depressed?',
      detail: 'Start with "Breath Sync" (instant calm) or "Deep Sleep" if it\'s nighttime. You can\'t pick wrong.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Volume2,
      title: 'Wear Headphones/Earbuds',
      description: 'For binaural beats to work, you need stereo sound. Left ear ≠ Right ear.',
      detail: 'No headphones? Choose "Pain Gate" or "Anxiety Relief" - those work with phone speakers.',
      color: 'from-green-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Dim the Lights (Optional)',
      description: 'The screen will pulse healing colors. Dark room = stronger effect.',
      detail: 'Feel free to adjust "Visual Intensity" slider. Some people need 100%. Some need 0%. You decide.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Vibrate,
      title: 'Feel the Frequency',
      description: 'Press play. Close your eyes. Breathe. Let it work.',
      detail: 'Your phone may vibrate at the healing Hz (you can turn this off). Sessions auto-stop. Safe for overnight.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
      onClick={onSkip}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-cyan-400 rounded-xl p-6 max-w-2xl w-full relative shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onSkip}
          className="absolute top-3 right-3 text-white/70 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          
          {/* Progress Bar */}
          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 rounded-full transition-all ${
                  idx <= currentStep 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${currentStepData.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-3xl font-black text-white">
                  {currentStepData.title}
                </h2>
                <p className="text-xl text-gray-300">
                  {currentStepData.description}
                </p>
                <p className="text-sm text-cyan-400 max-w-lg mx-auto">
                  {currentStepData.detail}
                </p>
              </div>

              {/* Step Indicator */}
              <div className="text-center">
                <span className="text-sm font-mono text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep === 0 ? (
              <Button
                onClick={onSkip}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-400 hover:text-white"
              >
                Skip Guide
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="flex-1 border-cyan-500/30 text-cyan-400 hover:border-cyan-500"
              >
                Back
              </Button>
            )}

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={onComplete}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Start Healing
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold"
              >
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>

          {/* Quick Skip at Bottom */}
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button
              onClick={onSkip}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              Skip to protocols
            </button>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}