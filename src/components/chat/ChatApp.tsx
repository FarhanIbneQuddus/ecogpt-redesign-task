import { useState, useRef, useEffect, useCallback } from 'react';
import { Menu, ArrowLeft, Share, Sparkles } from 'lucide-react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { aiModels } from '@/data/content';
import { Conversation, ChatMessage, newConversation, generateResponse } from '@/data/chatData';
import { Route } from '@/hooks/useRouter';

interface ChatAppProps {
  navigate: (r: Route) => void;
}

export function ChatApp({ navigate }: ChatAppProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState(aiModels[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, scrollToBottom]);

  // Create initial conversation
  useEffect(() => {
    if (conversations.length === 0) {
      const conv = newConversation(selectedModelId);
      setConversations([conv]);
      setActiveId(conv.id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNewChat = () => {
    const conv = newConversation(selectedModelId);
    setConversations([conv, ...conversations]);
    setActiveId(conv.id);
    setSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    const conv = conversations.find((c) => c.id === id);
    if (conv) setSelectedModelId(conv.modelId);
    setSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    const remaining = conversations.filter((c) => c.id !== id);
    setConversations(remaining);
    if (activeId === id) {
      setActiveId(remaining[0]?.id ?? null);
      if (remaining.length === 0) {
        const conv = newConversation(selectedModelId);
        setConversations([conv]);
        setActiveId(conv.id);
      }
    }
  };

  const handleSend = (text: string) => {
    if (!activeConversation) return;

    const model = aiModels.find((m) => m.id === selectedModelId) ?? aiModels[0];

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      modelId: model.id,
      modelName: model.name,
      modelColor: model.color,
      modelLogo: model.logo,
      timestamp: Date.now(),
      streaming: true,
    };

    // Update conversation with both messages
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              title: c.messages.length === 0 ? text.slice(0, 40) : c.title,
              messages: [...c.messages, userMsg, assistantMsg],
              modelId: selectedModelId,
              updatedAt: Date.now(),
            }
          : c
      )
    );

    setIsStreaming(true);

    // Simulate streaming response
    const fullResponse = generateResponse(text, selectedModelId);
    const words = fullResponse.split(' ');
    let wordIndex = 0;

    const streamInterval = setInterval(() => {
      wordIndex++;
      const partial = words.slice(0, wordIndex).join(' ');

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantId ? { ...m, content: partial } : m
                ),
              }
            : c
        )
      );

      if (wordIndex >= words.length) {
        clearInterval(streamInterval);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversation.id
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === assistantId ? { ...m, content: fullResponse, streaming: false } : m
                  ),
                  updatedAt: Date.now(),
                }
              : c
          )
        );
        setIsStreaming(false);
      }
    }, 40);

    streamingTimeoutRef.current = streamInterval as unknown as ReturnType<typeof setTimeout>;
  };

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) clearInterval(streamingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelectConversation}
        onNew={handleNewChat}
        onDelete={handleDeleteConversation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)]"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('landing')}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <Logo size={28} onClick={() => navigate('landing')} />
          </div>

          <div className="flex items-center gap-2">
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelect={setSelectedModelId}
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" aria-label="Share">
              <Share className="h-4 w-4" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {activeConversation && activeConversation.messages.length > 0 ? (
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
              {activeConversation.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-lg shadow-brand-500/30 animate-float">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-[var(--text)]">Start a conversation</h2>
              <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                Send a message to begin chatting with {aiModels.find((m) => m.id === selectedModelId)?.name}.
                You can switch models anytime without losing context.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl w-full">
                {[
                  { title: 'Brainstorm ideas', desc: 'Generate creative concepts for any project' },
                  { title: 'Explain a concept', desc: 'Break down complex topics into simple terms' },
                  { title: 'Write code', desc: 'Get help with programming in any language' },
                  { title: 'Draft an email', desc: 'Compose professional messages in seconds' },
                ].map((card) => (
                  <button
                    key={card.title}
                    onClick={() => {
                      const event = new CustomEvent('prefill-chat', { detail: card.title + ': ' });
                      window.dispatchEvent(event);
                    }}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-left transition-all hover:border-brand-300 hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text)]">{card.title}</h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{card.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          disabled={isStreaming}
          selectedModelId={selectedModelId}
        />
      </div>
    </div>
  );
}
