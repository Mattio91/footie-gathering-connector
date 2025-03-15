
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';
import RegisterForm from './RegisterForm';
import SocialLoginButtons from './SocialLoginButtons';

interface RegisterTabProps {
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

const RegisterTab = ({
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
}: RegisterTabProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('login.createAccount')}</CardTitle>
        <CardDescription>
          {t('login.createAccountSubtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          error={error}
          isLoading={isLoading}
        />

        <SocialLoginButtons isLoading={isLoading} />
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-600">
        {t('login.byCreatingAccount')} 
        <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-800"> 
          {t('footer.terms')}
        </Link> {t('login.and')} 
        <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-800">
          {t('footer.privacyPolicy')}
        </Link>.
      </CardFooter>
    </Card>
  );
};

export default RegisterTab;
