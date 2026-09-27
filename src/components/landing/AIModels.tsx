import { Sparkles, Brain, Gem, Flame, Wind, Search } from 'lucide-react';
import { aiModels } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  brain: Brain,
  gem: Gem,
  flame: Flame,
  wind: Wind,
  search: Search,
};

export function AIModels() {
  return (
    <section id="models" className="py-20 sm:py-28 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">AI Models</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              All your favorite models, unified
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Access the world's leading AI models from a single interface. Switch or compare anytime.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiModels.map((model, i) => {
            const Icon = iconMap[model.logo] ?? Sparkles;
            return (
              <Reveal key={model.id} delay={i * 80}>
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ borderColor: `${model.color}30` }}
                >
                  <div
                    className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-5 blur-2xl transition-opacity group-hover:opacity-20"
                    style={{ background: model.color }}
                  />
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: model.bgColor, color: model.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text)]">{model.name}</h3>
                      <p className="text-xs text-[var(--text-muted)]">{model.provider}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">{model.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: model.bgColor, color: model.color }}
                    >
                      {model.contextWindow}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {model.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-[var(--bg-tertiary)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
