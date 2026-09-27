import { Check } from 'lucide-react';
import { pricingPlans } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">Pricing</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Start free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={`relative h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'border-brand-500 bg-[var(--bg-secondary)] shadow-2xl shadow-brand-500/10 lg:scale-105'
                    : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-semibold text-[var(--text)]">{plan.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.description}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--text)]">${plan.price}</span>
                  <span className="text-sm text-[var(--text-muted)]">/{plan.period}</span>
                </div>

                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  className="mt-5 w-full"
                >
                  {plan.cta}
                </Button>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-brand-500' : 'text-green-500'}`} />
                      <span className="text-[var(--text-secondary)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            All plans include the Chrome extension. Prices in USD. 14-day money-back guarantee on paid plans.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
