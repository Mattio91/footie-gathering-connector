
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleAuthError: (err: any, defaultMessage: string) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleAuthError = (err: any, defaultMessage: string) => {
    console.error('Auth error:', err);
    
    let errorMessage = defaultMessage;
    
    // Handle different error formats
    if (err.errors && err.errors.length > 0) {
      errorMessage = err.errors[0].message || defaultMessage;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    // Format specific error messages to be more user-friendly
    if (errorMessage.includes('identifier')) {
      errorMessage = 'Invalid email address format';
    } else if (errorMessage.includes('password')) {
      errorMessage = 'Password must be at least 8 characters';
    }
    
    setError(errorMessage);
    toast.error(errorMessage);
  };

  const value = {
    isLoading,
    setIsLoading,
    error,
    setError,
    handleAuthError,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
