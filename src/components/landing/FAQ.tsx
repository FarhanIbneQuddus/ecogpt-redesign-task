import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Everything you need to know about EchoGPT. Can't find an answer? Reach out to our team.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className={`rounded-xl border transition-all ${
                  open === i ? 'border-brand-300 bg-[var(--bg-secondary)]' : 'border-[var(--border)] bg-[var(--bg-secondary)]'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-[var(--text)] sm:text-base">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                      open === i ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-60' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
