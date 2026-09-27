import { useState } from 'react';
import { MessageSquare, GitCompare, Chrome, Library } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Route } from '@/hooks/useRouter';

interface PreviewProps {
  navigate: (r: Route) => void;
}

type Tab = 'chat' | 'compare' | 'extension' | 'prompts';

const tabs: { id: Tab; label: string; icon: typeof MessageSquare }[] = [
  { id: 'chat', label: 'Multi-Model Chat', icon: MessageSquare },
  { id: 'compare', label: 'Side-by-Side', icon: GitCompare },
  { id: 'extension', label: 'Browser Sidebar', icon: Chrome },
  { id: 'prompts', label: 'Prompt Library', icon: Library },
];

export function Preview({ navigate }: PreviewProps) {
  const [active, setActive] = useState<Tab>('chat');

  return (
    <section id="preview" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">Product Preview</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              See EchoGPT in action
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Explore the interface across every platform — web app, comparison mode, browser extension, and prompt library.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active === tab.id
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                    : 'border border-[var(--border)] text-[var(--text-secondary)] hover:border-brand-300 hover:text-[var(--text)]'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-2 shadow-2xl shadow-brand-500/10">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-[var(--text-muted)]">echogpt.live/{active}</span>
              </div>
              <div className="rounded-xl bg-[var(--bg)] overflow-hidden">
                {active === 'chat' && <ChatMockup />}
                {active === 'compare' && <CompareMockup />}
                {active === 'extension' && <ExtensionMockup />}
                {active === 'prompts' && <PromptsMockup />}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('app')}
              className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
            >
              Try it yourself →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChatMockup() {
  return (
    <div className="flex h-[420px]">
      {/* Sidebar */}
      <div className="hidden w-48 border-r border-[var(--border)] p-3 sm:block">
        <div className="rounded-lg bg-brand-600 px-3 py-2 text-xs font-medium text-white">+ New Chat</div>
        <div className="mt-3 space-y-1">
          {['Quantum computing basics', 'Marketing copy ideas', 'Code review request', 'Research summary'].map((t, i) => (
            <div key={t} className={`rounded-lg px-3 py-2 text-xs ${i === 0 ? 'bg-[var(--bg-tertiary)] text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>{t}</div>
          ))}
        </div>
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-brand-600 px-4 py-2.5 text-sm text-white">What are the benefits of renewable energy?</div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-[#10a37f] flex items-center justify-center text-xs font-bold text-white">G</div>
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[var(--bg-tertiary)] px-4 py-2.5 text-sm text-[var(--text-secondary)]">Renewable energy offers several key benefits: 1) Sustainability — sources like solar and wind are inexhaustible. 2) Lower emissions — dramatic reduction in greenhouse gases. 3) Economic growth — creates jobs in manufacturing and installation...</div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] p-3">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5">
            <span className="text-xs text-[var(--text-muted)] flex-1">Type your message...</span>
            <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareMockup() {
  return (
    <div className="p-4 h-[420px]">
      <div className="text-center mb-4">
        <div className="inline-block rounded-full bg-[var(--bg-tertiary)] px-4 py-1.5 text-xs text-[var(--text-secondary)]">Explain machine learning in 2 sentences</div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 h-[330px]">
        {[
          { logo: 'G', color: '#10a37f', name: 'GPT-4o', text: 'Machine learning is a subset of AI where computers learn patterns from data to make predictions, without being explicitly programmed for each task.' },
          { logo: 'C', color: '#d97757', name: 'Claude 3.5', text: 'Machine learning enables computers to improve at tasks through experience — finding patterns in data and using them to make decisions on new, unseen inputs.' },
          { logo: 'G', color: '#4285f4', name: 'Gemini 1.5', text: 'ML is a method of teaching computers to recognize patterns in data. Instead of following rigid rules, the system adapts and improves its accuracy over time.' },
        ].map((m) => (
          <div key={m.name} className="rounded-xl border border-[var(--border)] p-3 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: m.color }}>{m.logo}</div>
              <span className="text-xs font-medium">{m.name}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtensionMockup() {
  return (
    <div className="flex h-[420px]">
      {/* Fake browser content */}
      <div className="flex-1 p-6 hidden md:block">
        <div className="h-6 w-3/4 rounded bg-[var(--bg-tertiary)] mb-3" />
        <div className="h-4 w-full rounded bg-[var(--bg-tertiary)] mb-2" />
        <div className="h-4 w-5/6 rounded bg-[var(--bg-tertiary)] mb-2" />
        <div className="h-4 w-2/3 rounded bg-[var(--bg-tertiary)] mb-4" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 rounded-lg bg-[var(--bg-tertiary)]" />
          <div className="h-24 rounded-lg bg-[var(--bg-tertiary)]" />
        </div>
      </div>
      {/* Extension sidebar */}
      <div className="w-72 border-l border-[var(--border)] flex flex-col">
        <div className="flex items-center gap-2 p-3 border-b border-[var(--border)]">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400" />
          <span className="text-sm font-semibold">EchoGPT</span>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          <div className="rounded-lg bg-brand-600 px-3 py-2 text-xs text-white">Summarize this page</div>
          <div className="rounded-lg bg-[var(--bg-tertiary)] px-3 py-2 text-xs text-[var(--text-secondary)]">This article discusses the impact of AI on modern healthcare, highlighting three key areas: diagnostics, treatment planning, and patient monitoring...</div>
        </div>
        <div className="border-t border-[var(--border)] p-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-2 py-2 text-xs text-[var(--text-muted)]">Ask about this page...</div>
        </div>
      </div>
    </div>
  );
}

function PromptsMockup() {
  const categories = ['Writing', 'Coding', 'Research', 'Marketing', 'Business', 'Creative'];
  const prompts = [
    { title: 'Blog Post Outline', cat: 'Writing', desc: 'Generate a structured outline for any blog post topic.' },
    { title: 'Code Review Assistant', cat: 'Coding', desc: 'Get a thorough code review with best practices.' },
    { title: 'Research Summarizer', cat: 'Research', desc: 'Summarize long papers into key findings.' },
    { title: 'Ad Copy Generator', cat: 'Marketing', desc: 'Create compelling ad copy for any product.' },
  ];
  return (
    <div className="p-4 h-[420px]">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((c, i) => (
          <span key={c} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${i === 0 ? 'bg-brand-600 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}>{c}</span>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map((p) => (
          <div key={p.title} className="rounded-xl border border-[var(--border)] p-4 hover:border-brand-300 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[var(--text)]">{p.title}</h4>
              <span className="rounded-md bg-[var(--bg-tertiary)] px-2 py-0.5 text-xs text-[var(--text-muted)]">{p.cat}</span>
            </div>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
