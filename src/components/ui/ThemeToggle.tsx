import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] transition-all hover:scale-110 hover:border-brand-400 active:scale-95 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-brand-600" />
      )}
    </button>
  );
}
