import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, AlertTriangle, Wifi } from 'lucide-react';

const RetryableAction = ({ 
  error, 
  onRetry, 
  isLoading, 
  children, 
  retryCount = 0,
  maxRetries = 3 
}) => {
  if (!error) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4 animate-pulse" />
          
          <h3 className="text-xl font-bold text-white mb-2">
            Love Frequency Interrupted
          </h3>
          
          <p className="text-gray-300 mb-4">
            {error.message || 'Something went wrong. Let\'s try again.'}
          </p>

          {retryCount > 0 && (
            <p className="text-sm text-gray-400 mb-4">
              Attempt {retryCount} of {maxRetries}
            </p>
          )}

          <div className="flex gap-3 justify-center">
            <Button
              onClick={onRetry}
              disabled={isLoading || retryCount >= maxRetries}
              className="bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Wifi className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Reconnecting...' : 'Try Again'}
            </Button>
            
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-gray-500 text-gray-300 hover:bg-gray-800"
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RetryableAction;