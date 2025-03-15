
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';

const LoginContent = () => {
  const { t } = useTranslation();
  const { isLoading, error } = useAuth();
  const [activeTab, setActiveTab] = React.useState('login');
  
  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {t('login.welcome')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('login.welcomeSubtitle')}
          </p>
        </div>

        <Tabs 
          defaultValue="login" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('login.signIn')}</TabsTrigger>
            <TabsTrigger value="register">{t('login.register')}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginTab
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="register">
            <RegisterTab
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginContent;
