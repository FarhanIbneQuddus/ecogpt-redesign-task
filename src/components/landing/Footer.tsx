import { Logo } from '@/components/ui/Logo';
import { Chrome, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { Route } from '@/hooks/useRouter';

interface FooterProps {
  navigate: (r: Route) => void;
}

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Logo onClick={() => navigate('landing')} />
            <p className="mt-4 max-w-xs text-sm text-[var(--text-secondary)]">
              Chat with multiple AI models in one unified interface. Compare responses, save conversations, and access AI from any browser tab.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:border-brand-400 hover:text-brand-500 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><button onClick={() => navigate('app')} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Web App</button></li>
              <li><button onClick={() => navigate('extension')} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Chrome Extension</button></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Pricing</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Features</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">FAQ</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Documentation</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Prompt Library</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">About</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Privacy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Terms</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-[var(--text-secondary)] hover:text-brand-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--text-muted)]">
            © 2026 EchoGPT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Chrome className="h-4 w-4" />
            <span>Built for the multi-AI era</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
