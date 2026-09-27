import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Menu, ArrowLeft, Plus, Search, MessageSquare, Send, Settings, Sparkles,
  Brain, Gem, Flame, Wind, History, Trash2, ChevronDown, Check,
  Highlighter, FileText, Code, PenLine, Languages, AlignLeft,
  X, Wand2, Star
} from 'lucide-react';
import { aiModels } from '@/data/content';
import { Conversation, ChatMessage, newConversation, generateResponse } from '@/data/chatData';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Logo } from '@/components/ui/Logo';
import { Route } from '@/hooks/useRouter';

interface ExtensionViewProps {
  navigate: (r: Route) => void;
}

type Tab = 'chat' | 'history' | 'prompts' | 'settings';
type QuickAction = 'summarize' | 'explain' | 'translate' | 'rewrite';

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles, brain: Brain, gem: Gem, flame: Flame, wind: Wind, search: Search,
};

const quickActions: { id: QuickAction; label: string; icon: typeof FileText; prompt: string }[] = [
  { id: 'summarize', label: 'Summarize Page', icon: AlignLeft, prompt: 'Summarize this page in 3 key points' },
  { id: 'explain', label: 'Explain Text', icon: FileText, prompt: 'Explain the highlighted text in simple terms' },
  { id: 'translate', label: 'Translate', icon: Languages, prompt: 'Translate the highlighted text to English' },
  { id: 'rewrite', label: 'Rewrite', icon: PenLine, prompt: 'Rewrite the highlighted text to be more professional' },
];

const promptCategories = [
  { name: 'Writing', icon: PenLine, prompts: ['Write a blog post outline', 'Create a social media caption', 'Draft a newsletter'] },
  { name: 'Coding', icon: Code, prompts: ['Review this code', 'Debug this function', 'Explain this code snippet'] },
  { name: 'Research', icon: FileText, prompts: ['Summarize this article', 'Find key statistics', 'Compare these sources'] },
  { name: 'Quick Actions', icon: Wand2, prompts: ['Summarize page', 'Explain highlighted text', 'Translate selection'] },
];

export function ExtensionView({ navigate }: ExtensionViewProps) {
  const [tab, setTab] = useState<Tab>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState(aiModels[0].id);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeConv = conversations.find((c) => c.id === activeId) ?? null;
  const selectedModel = aiModels.find((m) => m.id === selectedModelId) ?? aiModels[0];
  const SelectedIcon = iconMap[selectedModel.logo] ?? Sparkles;

  useEffect(() => {
    const conv = newConversation(selectedModelId);
    setConversations([conv]);
    setActiveId(conv.id);
    // Simulate highlighted text on a page
    setHighlightedText('Renewable energy capacity grew by 50% in 2024, with solar leading the expansion.');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [activeConv?.messages, scrollToBottom]);

  const handleSend = (text: string) => {
    if (!activeConv || !text.trim()) return;
    const model = selectedModel;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(), role: 'user', content: text, timestamp: Date.now(),
    };
    const assistantId = crypto.randomUUID();
    const assistantMsg: ChatMessage = {
      id: assistantId, role: 'assistant', content: '', modelId: model.id,
      modelName: model.name, modelColor: model.color, modelLogo: model.logo,
      timestamp: Date.now(), streaming: true,
    };

    setConversations((prev) => prev.map((c) =>
      c.id === activeConv.id
        ? { ...c, title: c.messages.length === 0 ? text.slice(0, 30) : c.title,
            messages: [...c.messages, userMsg, assistantMsg], modelId: selectedModelId, updatedAt: Date.now() }
        : c
    ));

    setIsStreaming(true);
    const fullResponse = generateResponse(text, selectedModelId);
    const words = fullResponse.split(' ');
    let wi = 0;

    const interval = setInterval(() => {
      wi++;
      const partial = words.slice(0, wi).join(' ');
      setConversations((prev) => prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, messages: c.messages.map((m) => m.id === assistantId ? { ...m, content: partial } : m) }
          : c
      ));
      if (wi >= words.length) {
        clearInterval(interval);
        setConversations((prev) => prev.map((c) =>
          c.id === activeConv.id
            ? { ...c, messages: c.messages.map((m) => m.id === assistantId ? { ...m, content: fullResponse, streaming: false } : m), updatedAt: Date.now() }
            : c
        ));
        setIsStreaming(false);
      }
    }, 35);
    streamingIntervalRef.current = interval;
  };

  useEffect(() => () => { if (streamingIntervalRef.current) clearInterval(streamingIntervalRef.current); }, []);

  const handleNewChat = () => {
    const conv = newConversation(selectedModelId);
    setConversations([conv, ...conversations]);
    setActiveId(conv.id);
    setSidebarOpen(false);
  };

  const handleQuickAction = (action: QuickAction) => {
    const found = quickActions.find((a) => a.id === action);
    if (found) handleSend(found.prompt);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col items-center py-8 px-4">
      {/* Back link */}
      <button
        onClick={() => navigate('landing')}
        className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to landing page
      </button>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">Chrome Extension Redesign</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">An interactive concept of the EchoGPT browser sidebar</p>
      </div>

      {/* Browser frame mockup */}
      <div className="w-full max-w-5xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl overflow-hidden">
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex-1 flex items-center gap-2 rounded-lg bg-[var(--bg-tertiary)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            <span className="h-3 w-3 rounded-full border border-[var(--text-muted)]" />
            <span>example.com/articles/renewable-energy</span>
          </div>
          {/* Extension icon */}
          <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 px-2 py-1 text-xs font-bold text-white shadow-md">
            <Sparkles className="h-3 w-3" />
            EchoGPT
          </div>
        </div>

        {/* Browser content + sidebar */}
        <div className="flex h-[560px]">
          {/* Fake webpage */}
          <div className="hidden md:block flex-1 p-6 overflow-hidden">
            <div className="h-5 w-2/3 rounded bg-[var(--bg-tertiary)] mb-3" />
            <div className="h-3 w-full rounded bg-[var(--bg-tertiary)] mb-2" />
            <div className="h-3 w-5/6 rounded bg-[var(--bg-tertiary)] mb-2" />
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              The global renewable energy sector experienced unprecedented growth in 2024.
              <span className="rounded bg-brand-600/20 px-1 text-[var(--text)]">Renewable energy capacity grew by 50% in 2024, with solar leading the expansion.</span>
              This surge was driven by falling costs, policy support, and growing demand for clean energy solutions...
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-20 rounded-lg bg-[var(--bg-tertiary)]" />
              <div className="h-20 rounded-lg bg-[var(--bg-tertiary)]" />
            </div>
          </div>

          {/* Extension sidebar */}
          <div className="flex w-full max-w-[400px] flex-col border-l border-[var(--border)] bg-[var(--bg)] md:w-[380px]">
            {/* Sidebar header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                  aria-label="Toggle conversations"
                >
                  <Menu className="h-4 w-4 text-[var(--text-secondary)]" />
                </button>
                <Logo size={24} showText={false} />
                <span className="text-sm font-semibold text-[var(--text)]">EchoGPT</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTab('settings')}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${tab === 'settings' ? 'bg-brand-600/10 text-brand-500' : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <ThemeToggle />
              </div>
            </div>

            {/* Conversation history drawer */}
            {sidebarOpen && (
              <div className="absolute z-50 mt-14 ml-2 w-72 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl">
                <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
                  <span className="text-sm font-semibold">History</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleNewChat}
                    className="flex w-full items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white mb-2"
                  >
                    <Plus className="h-4 w-4" /> New Chat
                  </button>
                  <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-1">
                    {conversations.map((c) => (
                      <div
                        key={c.id}
                        className={`group flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors ${c.id === activeId ? 'bg-[var(--bg-tertiary)]' : 'hover:bg-[var(--bg-tertiary)]/50'}`}
                        onClick={() => { setActiveId(c.id); setSidebarOpen(false); }}
                      >
                        <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
                        <span className="flex-1 truncate text-xs text-[var(--text)]">{c.title}</span>
                        <span className="text-xs text-[var(--text-muted)]">{c.messages.length}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab content */}
            {tab === 'chat' && (
              <>
                {/* Model selector + quick actions */}
                <div className="border-b border-[var(--border)] p-2.5">
                  {/* Model selector */}
                  <div className="relative">
                    <button
                      onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                      className="flex w-full items-center gap-2 rounded-lg border border-[var(--border)] px-2.5 py-1.5 transition-all hover:border-brand-400"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: selectedModel.bgColor, color: selectedModel.color }}>
                        <SelectedIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="flex-1 text-left text-xs font-medium text-[var(--text)]">{selectedModel.name}</span>
                      <ChevronDown className={`h-3.5 w-3.5 text-[var(--text-muted)] transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {modelDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-2xl max-h-64 overflow-y-auto scrollbar-thin">
                        {aiModels.map((m) => {
                          const Icon = iconMap[m.logo] ?? Sparkles;
                          return (
                            <button
                              key={m.id}
                              onClick={() => { setSelectedModelId(m.id); setModelDropdownOpen(false); }}
                              className={`flex w-full items-center gap-2 rounded-lg p-2 transition-colors hover:bg-[var(--bg-tertiary)] ${m.id === selectedModelId ? 'bg-[var(--bg-tertiary)]' : ''}`}
                            >
                              <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: m.bgColor, color: m.color }}>
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                              <span className="flex-1 text-left text-xs font-medium text-[var(--text)]">{m.name}</span>
                              {m.id === selectedModelId && <Check className="h-3.5 w-3.5 text-brand-500" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="mt-2 flex gap-1.5 overflow-x-auto scrollbar-thin">
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isStreaming}
                        className="flex shrink-0 items-center gap-1 rounded-lg bg-[var(--bg-tertiary)] px-2 py-1 text-xs text-[var(--text-secondary)] transition-all hover:bg-brand-600/10 hover:text-brand-500 disabled:opacity-50"
                      >
                        <action.icon className="h-3 w-3" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlighted text indicator */}
                {highlightedText && activeConv?.messages.length === 0 && (
                  <div className="mx-2.5 mt-2.5 rounded-lg border border-brand-200 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-950/30 p-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400">
                      <Highlighter className="h-3 w-3" />
                      Highlighted from page
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--text-secondary)] italic">"{highlightedText}"</p>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-2.5 py-3">
                  {activeConv && activeConv.messages.length > 0 ? (
                    <div className="space-y-3">
                      {activeConv.messages.map((msg) => (
                        <ExtensionMessage key={msg.id} message={msg} />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center px-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-lg animate-float">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-[var(--text)]">Ask about this page</h3>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        Chat with {selectedModel.name} about anything on this webpage.
                      </p>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-[var(--border)] p-2.5">
                  <div className="flex items-end gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-1.5 focus-within:border-brand-400 transition-all">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (input.trim() && !isStreaming) { handleSend(input); setInput(''); }
                        }
                      }}
                      placeholder="Ask about this page..."
                      rows={1}
                      disabled={isStreaming}
                      className="flex-1 resize-none bg-transparent text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none scrollbar-thin py-1.5 px-1 max-h-24"
                    />
                    <button
                      onClick={() => { if (input.trim() && !isStreaming) { handleSend(input); setInput(''); } }}
                      disabled={!input.trim() || isStreaming}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white transition-all hover:bg-brand-700 active:scale-90 disabled:opacity-30"
                      aria-label="Send"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {tab === 'history' && (
              <ExtensionHistory
                conversations={conversations}
                activeId={activeId}
                onSelect={(id) => { setActiveId(id); setTab('chat'); }}
                onNew={handleNewChat}
                onDelete={(id) => {
                  const remaining = conversations.filter((c) => c.id !== id);
                  setConversations(remaining);
                  if (activeId === id) setActiveId(remaining[0]?.id ?? null);
                }}
              />
            )}

            {tab === 'prompts' && <ExtensionPrompts onUse={(p) => { handleSend(p); setTab('chat'); }} />}
            {tab === 'settings' && <ExtensionSettings onBack={() => setTab('chat')} />}
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="flex items-center justify-around border-t border-[var(--border)] bg-[var(--bg-secondary)] px-2 py-1.5">
          {[
            { id: 'chat' as Tab, icon: MessageSquare, label: 'Chat' },
            { id: 'history' as Tab, icon: History, label: 'History' },
            { id: 'prompts' as Tab, icon: Star, label: 'Prompts' },
            { id: 'settings' as Tab, icon: Settings, label: 'Settings' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                tab === id ? 'text-brand-500' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature callouts */}
      <div className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: Highlighter, title: 'Context-Aware', desc: 'AI sees what you highlight and the page you\'re on' },
          { icon: Wand2, title: 'Quick Actions', desc: 'One-tip summarize, explain, translate, or rewrite' },
          { icon: MessageSquare, title: 'Persistent Chats', desc: 'Conversations saved and synced across tabs' },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600/10 text-brand-500">
              <f.icon className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[var(--text)]">{f.title}</h3>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtensionMessage({ message }: { message: ChatMessage }) {
  const Icon = message.modelLogo ? iconMap[message.modelLogo] ?? Sparkles : Sparkles;
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
        style={isUser ? { background: 'linear-gradient(135deg, #2f86f6, #06b6d4)' } : { backgroundColor: message.modelColor }}
      >
        {isUser ? 'U' : <Icon className="h-3 w-3" />}
      </div>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isUser && message.modelName && (
          <span className="mb-0.5 text-[10px] font-medium text-[var(--text-muted)]">{message.modelName}</span>
        )}
        <div
          className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
            isUser ? 'rounded-tr-sm bg-brand-600 text-white' : 'rounded-tl-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.streaming && <span className="ml-1 inline-block h-2.5 w-1 animate-blink bg-current align-middle" />}
        </div>
      </div>
    </div>
  );
}

function ExtensionHistory({ conversations, activeId, onSelect, onNew, onDelete }: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const filtered = conversations.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-2.5 border-b border-[var(--border)]">
        <button
          onClick={onNew}
          className="flex w-full items-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" /> New Chat
        </button>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] py-1.5 pl-8 pr-3 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-brand-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="py-8 text-center">
            <History className="mx-auto h-6 w-6 text-[var(--text-muted)] opacity-50" />
            <p className="mt-2 text-xs text-[var(--text-muted)]">No conversations yet</p>
          </div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer transition-colors ${c.id === activeId ? 'bg-[var(--bg-tertiary)]' : 'hover:bg-[var(--bg-tertiary)]/50'}`}
              onClick={() => onSelect(c.id)}
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
              <div className="flex-1 overflow-hidden">
                <div className="truncate text-xs font-medium text-[var(--text)]">{c.title}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{c.messages.length} messages</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5 text-[var(--text-muted)] hover:text-red-500" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ExtensionPrompts({ onUse }: { onUse: (prompt: string) => void }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = promptCategories[activeCategory];

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-[var(--border)] p-2.5">
        <h3 className="text-sm font-semibold text-[var(--text)]">Prompt Library</h3>
      </div>
      <div className="flex gap-1 p-2 border-b border-[var(--border)] overflow-x-auto scrollbar-thin">
        {promptCategories.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActiveCategory(i)}
            className={`shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${i === activeCategory ? 'bg-brand-600 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}
          >
            <c.icon className="h-3 w-3" />
            {c.name}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2.5 space-y-2">
        {cat.prompts.map((p) => (
          <button
            key={p}
            onClick={() => onUse(p)}
            className="w-full rounded-lg border border-[var(--border)] p-3 text-left transition-all hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--text)]">{p}</span>
              <Plus className="h-3.5 w-3.5 text-brand-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExtensionSettings({ onBack }: { onBack: () => void }) {
  const [autoOpen, setAutoOpen] = useState(false);
  const [streaming, setStreaming] = useState(true);
  const [sendOnEnter, setSendOnEnter] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  return (
    <div className="flex flex-1 flex-col overflow-y-auto scrollbar-thin">
      <div className="flex items-center gap-2 border-b border-[var(--border)] p-2.5">
        <button onClick={onBack} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
          <ArrowLeft className="h-4 w-4 text-[var(--text-secondary)]" />
        </button>
        <h3 className="text-sm font-semibold text-[var(--text)]">Settings</h3>
      </div>

      <div className="p-3 space-y-4">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">General</h4>
          <div className="space-y-1">
            <SettingToggle label="Auto-open sidebar" desc="Open on page load" value={autoOpen} onChange={setAutoOpen} />
            <SettingToggle label="Streaming responses" desc="Show text as it generates" value={streaming} onChange={setStreaming} />
            <SettingToggle label="Send on Enter" desc="Press Enter to send" value={sendOnEnter} onChange={setSendOnEnter} />
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Appearance</h4>
          <div className="rounded-lg border border-[var(--border)] p-3">
            <label className="text-xs font-medium text-[var(--text)]">Font size</label>
            <div className="mt-2 flex gap-1.5">
              {['small', 'medium', 'large'].map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${fontSize === s ? 'bg-brand-600 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Default Model</h4>
          <div className="space-y-1">
            {aiModels.slice(0, 4).map((m) => {
              const Icon = iconMap[m.logo] ?? Sparkles;
              return (
                <div key={m.id} className="flex items-center gap-2 rounded-lg border border-[var(--border)] p-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: m.bgColor, color: m.color }}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 text-xs font-medium text-[var(--text)]">{m.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">About</h4>
          <div className="rounded-lg border border-[var(--border)] p-3 text-xs text-[var(--text-secondary)] space-y-1">
            <div className="flex justify-between"><span>Version</span><span>2.0.0</span></div>
            <div className="flex justify-between"><span>Extension ID</span><span>negim...kcfhj</span></div>
            <div className="flex justify-between"><span>Account</span><span>Free plan</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label, desc, value, onChange }: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-2.5">
      <div>
        <div className="text-xs font-medium text-[var(--text)]">{label}</div>
        <div className="text-[10px] text-[var(--text-muted)]">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-5 w-9 rounded-full transition-colors ${value ? 'bg-brand-600' : 'bg-[var(--bg-tertiary)]'}`}
        aria-label={label}
      >
        <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
