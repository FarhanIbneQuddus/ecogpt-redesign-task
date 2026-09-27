import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('echogpt-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem('echogpt-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
    }
  },
  setTheme: (t) => {
    set({ theme: t });
    if (typeof window !== 'undefined') {
      localStorage.setItem('echogpt-theme', t);
      document.documentElement.classList.toggle('dark', t === 'dark');
    }
  },
}));
