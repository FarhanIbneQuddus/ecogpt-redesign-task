import { useEffect } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { useThemeStore } from '@/stores/themeStore';
import { LandingPage } from '@/components/landing/LandingPage';
import { ChatApp } from '@/components/chat/ChatApp';
import { ExtensionView } from '@/components/extension/ExtensionView';

function App() {
  const { route, navigate } = useRouter();
  const theme = useThemeStore((s) => s.theme);

  // Apply theme on mount and changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      {route === 'landing' && <LandingPage navigate={navigate} />}
      {route === 'app' && <ChatApp navigate={navigate} />}
      {route === 'extension' && <ExtensionView navigate={navigate} />}
    </>
  );
}

export default App;
