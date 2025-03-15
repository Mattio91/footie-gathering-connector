import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from 'react-i18next';
import { useSignUp } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { useAuth } from './AuthProvider';

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  error: string | null;
  isLoading: boolean;
}

const RegisterForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  confirmPassword,
  setConfirmPassword,
  error, 
  isLoading 
}: RegisterFormProps) => {
  const { t } = useTranslation();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { handleAuthError, setError } = useAuth();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError(t('login.passwordsDoNotMatch'));
      return false;
    }
    
    if (password.length < 8) {
      setError(t('login.passwordTooShort'));
      return false;
    }
    
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    
    if (!validateForm()) {
      return;
    }
    
    setError(null);
    
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      
      if (result.status === 'complete') {
        toast.success(t('login.registrationSuccess'));
      } else {
        console.log('Additional verification needed', result);
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      handleAuthError(err, t('login.registrationFailed'));
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('login.firstName')}</Label>
          <Input 
            id="firstName" 
            required 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('login.lastName')}</Label>
          <Input 
            id="lastName" 
            required 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">{t('login.emailAddress')}</Label>
        <Input 
          id="register-email" 
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
        <Label htmlFor="register-password">{t('login.password')}</Label>
        <Input 
          id="register-password" 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        <p className="text-xs text-gray-500">{t('login.passwordRequirements')}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">{t('login.confirmPassword')}</Label>
        <Input 
          id="confirm-password" 
          type="password" 
          required 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !signUpLoaded}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('login.creatingAccount')}
          </>
        ) : (
          t('login.createAccount')
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
