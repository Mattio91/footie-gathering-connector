
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from 'react-i18next';
import { useSignIn } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { useAuth } from './AuthProvider';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  isLoading 
}: LoginFormProps) => {
  const { t } = useTranslation();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { handleAuthError } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInLoaded) return;
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === 'complete') {
        toast.success(t('login.signInSuccess'));
      } else {
        console.log('Additional verification needed', result);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      handleAuthError(err, t('login.signInFailed'));
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">{t('login.emailAddress')}</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="email@example.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">{t('login.password')}</Label>
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
            {t('login.forgotPassword')}
          </Link>
        </div>
        <Input 
          id="password" 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !signInLoaded}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('login.signingIn')}
          </>
        ) : (
          t('login.signIn')
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
