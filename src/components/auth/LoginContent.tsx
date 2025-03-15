
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthProvider';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SocialLoginButtons from './SocialLoginButtons';

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
          </TabsContent>

          <TabsContent value="register">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginContent;
