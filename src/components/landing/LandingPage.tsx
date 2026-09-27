import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { AIModels } from '@/components/landing/AIModels';
import { Preview } from '@/components/landing/Preview';
import { WhyChoose } from '@/components/landing/WhyChoose';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { Route } from '@/hooks/useRouter';

interface LandingPageProps {
  navigate: (r: Route) => void;
}

export function LandingPage({ navigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar navigate={navigate} />
      <main id="main-content">
        <Hero navigate={navigate} />
        <Features />
        <AIModels />
        <Preview navigate={navigate} />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
