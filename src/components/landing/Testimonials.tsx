import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

const avatarColors = ['from-brand-500 to-cyan-400', 'from-amber-500 to-orange-400', 'from-purple-500 to-pink-400', 'from-green-500 to-emerald-400', 'from-blue-500 to-indigo-400', 'from-rose-500 to-red-400'];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">Testimonials</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              Loved by thousands of users
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              From developers to designers to founders — see what people are saying about EchoGPT.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div className="mb-6 break-inside-avoid rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:shadow-lg hover:border-brand-200">
                <Quote className="h-6 w-6 text-brand-500/30" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{t.content}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} text-sm font-semibold text-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text)]">{t.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
