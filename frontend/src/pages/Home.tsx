import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Repeat2, Shield, Zap, Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Repeat2,
    title: 'Swap & Trade',
    description: 'Exchange your sneakers directly with other collectors. No cash needed — just trade what you have for what you want.',
  },
  {
    icon: Shield,
    title: 'AI Authentication',
    description: 'Every listing is analyzed by our AI to verify authenticity and condition score before trading.',
  },
  {
    icon: Zap,
    title: 'Instant Negotiation',
    description: 'Message traders directly, negotiate terms, and close deals fast through our built-in chat.',
  },
  {
    icon: TrendingUp,
    title: 'Fair Valuations',
    description: 'AI-powered condition scoring ensures every trade is fair and transparent for both parties.',
  },
];

const steps = [
  { step: '01', title: 'List Your Kicks', desc: 'Upload photos and let our AI assess condition and authenticity.' },
  { step: '02', title: 'Find a Match', desc: 'Browse the marketplace and find shoes you want to swap for.' },
  { step: '03', title: 'Negotiate', desc: 'Message the trader, agree on terms, and finalize the swap.' },
  { step: '04', title: 'Complete the Trade', desc: 'Ship your shoes, receive theirs, and rate the experience.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/trading-hero.dim_1200x600.png"
            alt="Shoe trading"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.4) 100%)',
            }}
          />
          {/* Red accent overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 60%, rgba(225,29,72,0.08) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: 'rgba(225,29,72,0.15)', color: '#E11D48', border: '1px solid rgba(225,29,72,0.3)' }}
            >
              <Repeat2 className="w-3.5 h-3.5" />
              The #1 Sneaker Trading Platform
            </div>

            <h1
              className="font-display font-black uppercase leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.01em' }}
            >
              <span style={{ color: '#FAFAFA' }}>SWAP.</span>
              <br />
              <span style={{ color: '#E11D48' }}>TRADE.</span>
              <br />
              <span style={{ color: '#FAFAFA' }}>WIN.</span>
            </h1>

            <p className="text-lg mb-8 max-w-lg" style={{ color: '#A0A0A0', lineHeight: '1.7' }}>
              The ultimate marketplace for sneaker traders. List your kicks, find your match, and swap with confidence — every trade verified by AI.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => navigate({ to: '/marketplace' })}
                className="font-display font-bold uppercase tracking-wide px-8 py-3 text-base"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                Start Trading
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => navigate({ to: '/create-listing' })}
                variant="outline"
                className="font-display font-bold uppercase tracking-wide px-8 py-3 text-base"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FAFAFA', backgroundColor: 'transparent' }}
              >
                List for Trade
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { value: '10K+', label: 'Active Traders' },
                { value: '50K+', label: 'Trades Completed' },
                { value: '98%', label: 'Satisfaction Rate' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-black text-2xl" style={{ color: '#E11D48' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: '#A0A0A0' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commission Banner */}
      <div
        className="py-3 text-center text-sm font-medium"
        style={{ backgroundColor: 'rgba(225,29,72,0.1)', borderTop: '1px solid rgba(225,29,72,0.2)', borderBottom: '1px solid rgba(225,29,72,0.2)', color: '#FB7185' }}
      >
        ✦ Only 10% platform fee on completed trades — the fairest rate in sneaker swapping ✦
      </div>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-display font-black uppercase text-4xl md:text-5xl mb-4"
              style={{ color: '#FAFAFA' }}
            >
              Why Trade on <span style={{ color: '#E11D48' }}>ShoeSwapper</span>?
            </h2>
            <p style={{ color: '#A0A0A0' }}>Everything you need for safe, fair, and fast sneaker trading.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl card-hover"
                  style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(225,29,72,0.15)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#E11D48' }} />
                  </div>
                  <h3 className="font-display font-bold uppercase text-lg mb-2" style={{ color: '#FAFAFA' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A0A0A0' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#141414' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-display font-black uppercase text-4xl md:text-5xl mb-4"
              style={{ color: '#FAFAFA' }}
            >
              How It <span style={{ color: '#E11D48' }}>Works</span>
            </h2>
            <p style={{ color: '#A0A0A0' }}>Four simple steps to your next great trade.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px z-0"
                    style={{ backgroundColor: 'rgba(225,29,72,0.2)' }}
                  />
                )}
                <div className="relative z-10">
                  <div
                    className="font-display font-black text-5xl mb-3"
                    style={{ color: 'rgba(225,29,72,0.2)' }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="font-display font-bold uppercase text-lg mb-2"
                    style={{ color: '#FAFAFA' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A0A0A0' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(225,29,72,0.2)' }}
          >
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ backgroundColor: 'rgba(225,29,72,0.15)', color: '#E11D48' }}
              >
                <Zap className="w-3 h-3" />
                AI-Powered
              </div>
              <h2
                className="font-display font-black uppercase text-3xl md:text-4xl mb-4"
                style={{ color: '#FAFAFA' }}
              >
                Trade with <span style={{ color: '#E11D48' }}>Confidence</span>
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: '#A0A0A0' }}>
                Our AI analyzes every listing photo to score condition (0–100) and verify authenticity before any trade goes live. No more guessing — just data-driven swaps.
              </p>
              <ul className="space-y-2">
                {[
                  'Condition score from 0–100',
                  'Authenticity verification',
                  'Instant analysis on upload',
                  'Transparent for both traders',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#A0A0A0' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#E11D48' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(225,29,72,0.1)', border: '2px solid rgba(225,29,72,0.3)' }}
              >
                <div className="text-center">
                  <div className="font-display font-black text-4xl" style={{ color: '#E11D48' }}>92</div>
                  <div className="text-xs uppercase tracking-wide" style={{ color: '#A0A0A0' }}>Score</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4" style={{ color: '#E11D48', fill: '#E11D48' }} />
                ))}
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                style={{ backgroundColor: 'rgba(225,29,72,0.15)', color: '#E11D48' }}
              >
                ✓ Authentic
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: '#141414' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-display font-black uppercase text-4xl md:text-5xl mb-4"
            style={{ color: '#FAFAFA' }}
          >
            Ready to <span style={{ color: '#E11D48' }}>Swap</span>?
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#A0A0A0' }}>
            Join thousands of sneaker traders on ShoeSwapper. List your first pair today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate({ to: '/create-listing' })}
              className="font-display font-bold uppercase tracking-wide px-10 py-3 text-base"
              style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
            >
              List for Trade
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate({ to: '/marketplace' })}
              variant="outline"
              className="font-display font-bold uppercase tracking-wide px-10 py-3 text-base"
              style={{ borderColor: '#2A2A2A', color: '#FAFAFA', backgroundColor: 'transparent' }}
            >
              Browse Trades
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
