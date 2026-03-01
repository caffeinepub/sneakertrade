import { useState } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Repeat2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Negotiation', path: '/negotiation' },
  { label: 'Profile', path: '/profile' },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: '#0A0A0A', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: '#E11D48' }}
              >
                <Repeat2 className="w-5 h-5 text-white" />
              </div>
              <span
                className="font-display text-xl font-bold tracking-wide uppercase"
                style={{ color: '#FAFAFA' }}
              >
                Shoe<span style={{ color: '#E11D48' }}>Swapper</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate({ to: link.path })}
                  className="px-4 py-2 rounded text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.path) ? '#E11D48' : '#A0A0A0',
                    backgroundColor: isActive(link.path) ? 'rgba(225,29,72,0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.color = '#FAFAFA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.color = '#A0A0A0';
                    }
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={() => navigate({ to: '/create-listing' })}
                className="font-display font-bold uppercase tracking-wide text-sm"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                List for Trade
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded"
              style={{ color: '#FAFAFA' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-4 flex flex-col gap-2"
            style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate({ to: link.path });
                  setMobileOpen(false);
                }}
                className="text-left px-4 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.path) ? '#E11D48' : '#A0A0A0',
                  backgroundColor: isActive(link.path) ? 'rgba(225,29,72,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => {
                navigate({ to: '/create-listing' });
                setMobileOpen(false);
              }}
              className="mt-2 font-display font-bold uppercase tracking-wide text-sm w-full"
              style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
            >
              List for Trade
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-10"
        style={{ backgroundColor: '#0A0A0A', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: '#E11D48' }}
              >
                <Repeat2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold uppercase tracking-wide" style={{ color: '#FAFAFA' }}>
                Shoe<span style={{ color: '#E11D48' }}>Swapper</span>
              </span>
            </div>
            <div className="text-center text-sm" style={{ color: '#A0A0A0' }}>
              <p>A 10% platform fee applies to all completed trades.</p>
            </div>
            <div className="text-sm flex items-center gap-1" style={{ color: '#A0A0A0' }}>
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 fill-current" style={{ color: '#E11D48' }} />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                style={{ color: '#E11D48' }}
              >
                caffeine.ai
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs" style={{ color: '#555' }}>
            © {new Date().getFullYear()} ShoeSwapper. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
