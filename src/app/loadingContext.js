import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);
  
  const startLoading = useCallback(() => {
    setLoadingCount(prev => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount(prev => Math.max(prev - 1, 0));
  }, []);

  const value = {
    isLoading: loadingCount > 0,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    console.error("Missing LoadingProvider in component tree");
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
