import { useState, useEffect } from 'react';
import { Menu, X, Chrome, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Route } from '@/hooks/useRouter';

interface NavbarProps {
  navigate: (r: Route) => void;
}

const navLinks = [
  { label: 'Features', target: 'features' },
  { label: 'AI Models', target: 'models' },
  { label: 'Preview', target: 'preview' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'FAQ', target: 'faq' },
];

export function Navbar({ navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-[var(--border)] shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo onClick={() => navigate('landing')} />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)] hover:bg-[var(--bg-tertiary)]"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('app')}>
            <MessageSquare className="h-4 w-4" />
            Open App
          </Button>
          <Button variant="primary" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('extension')}>
            <Chrome className="h-4 w-4" />
            Extension
          </Button>
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-[var(--border)] animate-fade-in">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text)]"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate('app'); setMobileOpen(false); }}>
                Open App
              </Button>
              <Button variant="primary" size="sm" className="flex-1" onClick={() => { navigate('extension'); setMobileOpen(false); }}>
                Extension
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
