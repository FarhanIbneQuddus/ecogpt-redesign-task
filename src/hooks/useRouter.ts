import { useState, useEffect, useCallback } from 'react';

export type Route = 'landing' | 'app' | 'extension';

const parseHash = (): Route => {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (hash === 'app') return 'app';
  if (hash === 'extension') return 'extension';
  return 'landing';
};

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = useCallback((r: Route) => {
    window.location.hash = `/${r}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate };
}
