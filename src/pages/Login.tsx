
import React from 'react';
import LoginContent from '@/components/auth/LoginContent';
import { AuthProvider } from '@/components/auth/AuthProvider';

const Login = () => {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
};

export default Login;
