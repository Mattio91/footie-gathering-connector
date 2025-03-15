import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Loader2, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useSignIn } from '@clerk/clerk-react';
import { useAuth } from './AuthProvider';
import { toast } from 'sonner';

interface SocialLoginButtonsProps {
  isLoading: boolean;
}

const SocialLoginButtons = ({ isLoading }: SocialLoginButtonsProps) => {
  const { t } = useTranslation();
  const { handleAuthError, isClerkAvailable } = useAuth();
  const [socialLoading, setSocialLoading] = React.useState<'google' | 'facebook' | null>(null);
  
  let signIn;
  let isSignInLoaded = false;
  
  try {
    const signInHook = isClerkAvailable ? useSignIn() : null;
    signIn = signInHook;
    isSignInLoaded = isClerkAvailable ? signInHook?.isLoaded || false : false;
  } catch (e) {
    console.warn('Clerk sign-in is not available');
    signIn = null;
    isSignInLoaded = false;
  }

  const handleSocialLogin = async (provider: 'oauth_google' | 'oauth_facebook') => {
    if (!isClerkAvailable || !signIn || !isSignInLoaded) {
      toast.error('Authentication service is not available');
      return;
    }
    
    const providerKey = provider === 'oauth_google' ? 'google' : 'facebook';
    setSocialLoading(providerKey as 'google' | 'facebook');
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/login',
        redirectUrlComplete: '/',
      });
    } catch (err) {
      console.error(`Login with ${provider} failed:`, err);
      handleAuthError(err, t(`login.${providerKey}LoginFailed`));
      setSocialLoading(null);
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
          disabled={isLoading || !isSignInLoaded || socialLoading !== null} 
          onClick={() => handleSocialLogin('oauth_google')}
        >
          {socialLoading === 'google' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          disabled={isLoading || !isSignInLoaded || socialLoading !== null} 
          onClick={() => handleSocialLogin('oauth_facebook')}
        >
          {socialLoading === 'facebook' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Facebook className="mr-2 h-4 w-4" />
          )}
          Facebook
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
