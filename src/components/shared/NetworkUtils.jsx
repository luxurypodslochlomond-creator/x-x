// Network utility functions for retrying failed requests

export const isNetworkError = (error) => {
    if (!error) return false;
    
    const networkErrorMessages = [
        'network',
        'fetch',
        'timeout',
        'ECONNREFUSED',
        'Failed to fetch',
        'NetworkError',
        'Connection failed'
    ];
    
    const errorMessage = (error.message || '').toLowerCase() || error.toString().toLowerCase();
    return networkErrorMessages.some(msg => errorMessage.includes(msg.toLowerCase()));
};

export const createRetryWrapper = (fn, maxRetries = 3, delayMs = 1000) => {
    return async (...args) => {
        let lastError;
        
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                return await fn(...args);
            } catch (error) {
                lastError = error;
                
                if (!isNetworkError(error) || attempt === maxRetries - 1) {
                    throw error;
                }
                
                // Exponential backoff
                const delay = delayMs * Math.pow(2, attempt);
                console.log(`Network error detected. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw lastError;
    };
};