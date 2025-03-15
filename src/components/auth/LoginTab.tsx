
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';
import LoginForm from './LoginForm';
import SocialLoginButtons from './SocialLoginButtons';

interface LoginTabProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginTab = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading
}: LoginTabProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('login.signIn')}</CardTitle>
        <CardDescription>
          {t('login.signInSubtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          isLoading={isLoading}
        />

        <SocialLoginButtons isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default LoginTab;
