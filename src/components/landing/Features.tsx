import { Layers, GitCompare, Chrome, MessageSquare, Sparkles, Shield } from 'lucide-react';
import { features } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

const iconMap: Record<string, typeof Layers> = {
  layers: Layers,
  'git-compare': GitCompare,
  chrome: Chrome,
  'message-square': MessageSquare,
  sparkles: Sparkles,
  shield: Shield,
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">Features</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              Everything you need in one AI workspace
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Powerful features designed to make your AI interactions faster, smarter, and more productive.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <Reveal key={feature.title} delay={i * 80}>
                <div className="group relative h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/10 text-brand-500 transition-all group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[var(--text)]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
