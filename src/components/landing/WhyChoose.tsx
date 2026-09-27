import { Rocket, Globe, Clock, Lock, ArrowRight, Layers } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const reasons = [
  {
    icon: Layers,
    title: 'Unified Experience',
    description: 'No more juggling multiple tabs and subscriptions. Every AI model, every conversation, one elegant interface.',
  },
  {
    icon: Rocket,
    title: 'Blazing Fast',
    description: 'Optimized streaming means responses appear instantly. No waiting, no buffering — just answers.',
  },
  {
    icon: Globe,
    title: 'Browse & Chat Together',
    description: 'The Chrome extension brings AI to every webpage. Highlight text, ask questions, and get context-aware answers.',
  },
  {
    icon: Clock,
    title: 'Never Lose Context',
    description: 'Conversations sync across devices. Start on desktop, continue on mobile, finish in your browser sidebar.',
  },
  {
    icon: Lock,
    title: 'Privacy by Default',
    description: 'End-to-end encryption, zero training on your data, and full control over your conversation history.',
  },
  {
    icon: ArrowRight,
    title: 'Always Evolving',
    description: 'We add new models and features weekly. Your AI workspace gets better without any effort on your part.',
  },
];

export function WhyChoose() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">Why EchoGPT</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              The smartest way to use AI
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Stop switching between tools. EchoGPT brings everything together in one powerful, beautiful workspace.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-500">
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{r.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats banner */}
        <Reveal delay={200}>
          <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 md:grid-cols-4">
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '6+', label: 'AI Models' },
              { value: '2M+', label: 'Messages Sent' },
              { value: '4.9/5', label: 'User Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
