
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import MiniFootballField from './MiniFootballField';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('header.home'), href: '/' },
    { name: t('header.events'), href: '/events' },
    { name: t('header.groups'), href: '/groups' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary transition-transform hover:scale-105 flex items-center"
        >
          <span className="relative font-oswald tracking-wider">
            Gather<span className="text-xs font-light ml-1 text-foreground">to play</span>
          </span>
        </Link>

        {/* Mini Football Field (Desktop only) */}
        <div className="hidden md:block mx-auto">
          <MiniFootballField />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative group',
                location.pathname === link.href ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transform origin-left transition-transform duration-300',
                location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              )}></span>
            </Link>
          ))}
        </nav>

        {/* CTA Buttons and Language Switcher */}
        <div className="hidden md:flex items-center space-x-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" className="rounded-full">
            <User className="h-4 w-4 mr-2" />
            {t('common.signIn')}
          </Button>
          <Button className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            {t('common.createEvent')}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '62px' }}
      >
        <div className="flex flex-col p-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-lg font-medium py-2 border-b border-border',
                location.pathname === link.href ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-4 pt-4">
            <Button variant="ghost" size="lg" className="justify-start">
              <User className="h-5 w-5 mr-2" />
              {t('common.signIn')}
            </Button>
            <Link to="/create-event">
              <Button size="lg" className="w-full">
                <Plus className="h-5 w-5 mr-2" />
                {t('common.createEvent')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
