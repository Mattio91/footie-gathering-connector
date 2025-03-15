
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useSignIn } from '@clerk/clerk-react';

interface SocialLoginButtonsProps {
  isLoading: boolean;
}

const SocialLoginButtons = ({ isLoading }: SocialLoginButtonsProps) => {
  const { t } = useTranslation();
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const handleSocialLogin = (provider: 'oauth_google' | 'oauth_facebook') => {
    if (!signInLoaded) return;
    
    try {
      signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/login',
        redirectUrlComplete: '/',
      });
    } catch (err) {
      console.error(`Login with ${provider} failed:`, err);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            {t('login.orContinueWith')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          disabled={isLoading || !signInLoaded} 
          onClick={() => handleSocialLogin('oauth_google')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          disabled={isLoading || !signInLoaded} 
          onClick={() => handleSocialLogin('oauth_facebook')}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
