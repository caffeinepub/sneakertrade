import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Star, TrendingUp, Shield, Package, Repeat2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ListingCard from '../components/ListingCard';
import { useGetUserProfile } from '../hooks/useQueries';

// Demo principal for profile display
const DEMO_PRINCIPAL = 'aaaaa-aa';

export default function Profile() {
  const navigate = useNavigate();

  // Use demo data since we don't have auth
  const demoProfile = {
    tradeCount: BigInt(47),
    averageRating: 4.7,
    collection: [],
  };

  const credibilityItems = [
    { label: 'Trade Completion Rate', value: 98, color: '#E11D48' },
    { label: 'Authenticity Score', value: 95, color: '#E11D48' },
    { label: 'Response Rate', value: 92, color: '#E11D48' },
    { label: 'Positive Ratings', value: 97, color: '#E11D48' },
  ];

  const stats = [
    { icon: Repeat2, label: 'Total Trades', value: '47' },
    { icon: Star, label: 'Avg Rating', value: '4.7' },
    { icon: Shield, label: 'Verified Trades', value: '45' },
    { icon: TrendingUp, label: 'Trade Value', value: '$12.4K' },
  ];

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA', minHeight: '100vh' }}>
      {/* Profile Header */}
      <div
        className="border-b py-10 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-3xl"
              style={{ backgroundColor: 'rgba(225,29,72,0.15)', border: '2px solid rgba(225,29,72,0.3)', color: '#E11D48' }}
            >
              SS
            </div>
            <div className="flex-1">
              <h1
                className="font-display font-black uppercase text-3xl md:text-4xl mb-1"
                style={{ color: '#FAFAFA' }}
              >
                Trader <span style={{ color: '#E11D48' }}>Profile</span>
              </h1>
              <p className="text-sm" style={{ color: '#A0A0A0' }}>
                Verified sneaker trader on ShoeSwapper
              </p>
              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{
                        color: i <= Math.round(demoProfile.averageRating) ? '#E11D48' : '#2A2A2A',
                        fill: i <= Math.round(demoProfile.averageRating) ? '#E11D48' : '#2A2A2A',
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold" style={{ color: '#FAFAFA' }}>
                  {demoProfile.averageRating.toFixed(1)}
                </span>
                <span className="text-sm" style={{ color: '#A0A0A0' }}>
                  ({demoProfile.tradeCount.toString()} trades)
                </span>
              </div>
            </div>
            <Button
              onClick={() => navigate({ to: '/create-listing' })}
              className="font-display font-bold uppercase tracking-wide"
              style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
            >
              List for Trade
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl p-5 text-center"
                style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              >
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#E11D48' }} />
                <div className="font-display font-black text-2xl mb-1" style={{ color: '#FAFAFA' }}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wide" style={{ color: '#A0A0A0' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credibility Section */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
            >
              <h2
                className="font-display font-bold uppercase text-lg mb-5"
                style={{ color: '#FAFAFA' }}
              >
                Trader <span style={{ color: '#E11D48' }}>Credibility</span>
              </h2>
              <div className="space-y-4">
                {credibilityItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span style={{ color: '#A0A0A0' }}>{item.label}</span>
                      <span className="font-bold" style={{ color: '#FAFAFA' }}>{item.value}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: '#2A2A2A' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 p-4 rounded-lg text-center"
                style={{ backgroundColor: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)' }}
              >
                <div className="font-display font-black text-3xl mb-1" style={{ color: '#E11D48' }}>
                  Elite
                </div>
                <div className="text-xs uppercase tracking-wide" style={{ color: '#A0A0A0' }}>
                  Trader Status
                </div>
              </div>
            </div>
          </div>

          {/* Collection */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="font-display font-bold uppercase text-lg"
                style={{ color: '#FAFAFA' }}
              >
                My <span style={{ color: '#E11D48' }}>Collection</span>
              </h2>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/marketplace' })}
                className="text-sm"
                style={{ borderColor: '#2A2A2A', color: '#A0A0A0', backgroundColor: 'transparent' }}
              >
                Browse Marketplace
              </Button>
            </div>

            {demoProfile.collection.length === 0 ? (
              <div
                className="rounded-xl p-12 text-center"
                style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              >
                <Package className="w-12 h-12 mx-auto mb-4" style={{ color: '#2A2A2A' }} />
                <h3 className="font-display font-bold uppercase text-lg mb-2" style={{ color: '#FAFAFA' }}>
                  No Listings Yet
                </h3>
                <p className="text-sm mb-6" style={{ color: '#A0A0A0' }}>
                  Start trading by listing your first pair of sneakers.
                </p>
                <Button
                  onClick={() => navigate({ to: '/create-listing' })}
                  className="font-display font-bold uppercase tracking-wide"
                  style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
                >
                  List for Trade
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {demoProfile.collection.map((listing: any) => (
                  <ListingCard
                    key={listing.id.toString()}
                    id={listing.id}
                    name={listing.name}
                    priceCents={listing.priceCents}
                    conditionScore={listing.conditionScore}
                    isAuthentic={listing.isAuthentic}
                    photo={listing.photo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
