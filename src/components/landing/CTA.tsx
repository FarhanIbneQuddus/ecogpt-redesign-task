import { ArrowRight, Chrome, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Route } from '@/hooks/useRouter';

interface CTAProps {
  navigate: (r: Route) => void;
}

export function CTA({ navigate }: CTAProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-cyan-600 px-6 py-16 text-center shadow-2xl shadow-brand-500/20 sm:px-12 sm:py-20">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-float" />
              <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to transform your AI workflow?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
              Join 50,000+ users who chat, compare, and create with multiple AI models every day. Get started free — no credit card required.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="white"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate('app')}
              >
                <MessageSquare className="h-5 w-5" />
                Launch Web App
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => navigate('extension')}
              >
                <Chrome className="h-5 w-5" />
                Get the Extension
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
