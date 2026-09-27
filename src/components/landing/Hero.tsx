import { ArrowRight, Chrome, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Route } from '@/hooks/useRouter';

interface HeroProps {
  navigate: (r: Route) => void;
}

export function Hero({ navigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
              <Sparkles className="h-4 w-4" />
              Now supporting 6+ AI models
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl lg:text-7xl">
              One chat for
              <br />
              <span className="gradient-text animate-gradient">every AI model</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
              EchoGPT brings GPT-4o, Claude, Gemini, and more into a single unified interface.
              Compare responses side-by-side, chat from any browser tab, and never switch tabs again.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('app')}>
                <MessageSquare className="h-5 w-5" />
                Launch Web App
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => navigate('extension')}>
                <Chrome className="h-5 w-5" />
                Get Extension
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                Free forever plan
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                No credit card needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-500" />
                50K+ active users
              </span>
            </div>
          </Reveal>
        </div>

        {/* Hero preview mockup */}
        <Reveal delay={500}>
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-2 shadow-2xl shadow-brand-500/10">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="grid grid-cols-1 gap-2 rounded-xl bg-[var(--bg)] p-4 md:grid-cols-2">
                {/* Mock chat panels */}
                <div className="rounded-lg border border-[var(--border)] p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#10a37f] flex items-center justify-center text-xs font-bold text-white">G</div>
                    <span className="text-sm font-medium">GPT-4o</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-[var(--bg-tertiary)] p-2.5 text-xs text-[var(--text-secondary)]">
                      Explain quantum computing in simple terms.
                    </div>
                    <div className="rounded-lg bg-brand-600/10 p-2.5 text-xs text-[var(--text-secondary)]">
                      Imagine a coin spinning in the air—it's both heads and tails until it lands. Quantum computers use "qubits" that work the same way...
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-[var(--border)] p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#d97757] flex items-center justify-center text-xs font-bold text-white">C</div>
                    <span className="text-sm font-medium">Claude 3.5</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-[var(--bg-tertiary)] p-2.5 text-xs text-[var(--text-secondary)]">
                      Explain quantum computing in simple terms.
                    </div>
                    <div className="rounded-lg bg-[#d97757]/10 p-2.5 text-xs text-[var(--text-secondary)]">
                      Think of a light switch. Regular computers use switches that are either ON or OFF. Quantum computers use special switches that can be...
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-brand-500/20 to-cyan-400/20 blur-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
