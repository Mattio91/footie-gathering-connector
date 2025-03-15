
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from 'react-i18next';
import { useSignUp } from '@clerk/clerk-react';
import { toast } from 'sonner';

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
  setError: (error: string | null) => void;
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
  setError,
  isLoading 
}: RegisterFormProps) => {
  const { t } = useTranslation();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
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
      throw err;
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('login.lastName')}</Label>
          <Input 
            id="lastName" 
            required 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">{t('login.confirmPassword')}</Label>
        <Input 
          id="confirm-password" 
          type="password" 
          required 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !signUpLoaded}>
        {isLoading ? t('login.creatingAccount') : t('login.createAccount')}
      </Button>
    </form>
  );
};

export default RegisterForm;
