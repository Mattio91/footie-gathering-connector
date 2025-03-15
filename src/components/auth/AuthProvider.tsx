
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleAuthError: (err: any, defaultMessage: string) => void;
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

  const handleAuthError = (err: any, defaultMessage: string) => {
    console.error('Auth error:', err);
    const errorMessage = err.errors?.[0]?.message || defaultMessage;
    setError(errorMessage);
    toast.error(errorMessage);
  };

  const value = {
    isLoading,
    setIsLoading,
    error,
    setError,
    handleAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
