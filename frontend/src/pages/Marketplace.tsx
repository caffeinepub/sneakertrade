import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ListingCard from '../components/ListingCard';
import { useGetListings } from '../hooks/useQueries';

export default function Marketplace() {
  const navigate = useNavigate();
  const [conditionRange, setConditionRange] = useState<[number, number]>([0, 100]);
  const [authenticOnly, setAuthenticOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // useGetListings expects a single ListingFilters object
  const { data: listings, isLoading, error } = useGetListings({
    minCondition: conditionRange[0],
    maxCondition: conditionRange[1],
    filterAuthenticOnly: authenticOnly,
  });

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        className="border-b py-8 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className="font-display font-black uppercase text-3xl md:text-4xl"
                style={{ color: '#FAFAFA' }}
              >
                Trade <span style={{ color: '#E11D48' }}>Marketplace</span>
              </h1>
              <p className="text-sm mt-1" style={{ color: '#A0A0A0' }}>
                {listings
                  ? `${listings.length} pairs available for trade`
                  : 'Browse sneakers available for swapping'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm"
                style={{ borderColor: '#2A2A2A', color: '#FAFAFA', backgroundColor: 'transparent' }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              <Button
                onClick={() => navigate({ to: '/create-listing' })}
                className="font-display font-bold uppercase tracking-wide text-sm"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                List for Trade
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div
              className="rounded-xl p-6 sticky top-24"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-4 h-4" style={{ color: '#E11D48' }} />
                <h2
                  className="font-display font-bold uppercase tracking-wide"
                  style={{ color: '#FAFAFA' }}
                >
                  Filters
                </h2>
              </div>

              {/* Condition Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block" style={{ color: '#A0A0A0' }}>
                  Condition Score
                </Label>
                <div className="flex justify-between text-xs mb-3" style={{ color: '#A0A0A0' }}>
                  <span>{conditionRange[0]}</span>
                  <span>{conditionRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={conditionRange}
                  onValueChange={(val) => setConditionRange(val as [number, number])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs mt-2" style={{ color: '#555' }}>
                  <span>Worn</span>
                  <span>Deadstock</span>
                </div>
              </div>

              {/* Authentic Only */}
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="authentic-filter"
                  className="text-sm"
                  style={{ color: '#A0A0A0' }}
                >
                  Verified Authentic Only
                </Label>
                <Switch
                  id="authentic-filter"
                  checked={authenticOnly}
                  onCheckedChange={setAuthenticOnly}
                />
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                  >
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div
                className="rounded-xl p-8 text-center"
                style={{
                  backgroundColor: 'rgba(225,29,72,0.1)',
                  border: '1px solid rgba(225,29,72,0.2)',
                }}
              >
                <p style={{ color: '#FB7185' }}>Failed to load listings. Please try again.</p>
              </div>
            )}

            {!isLoading && !error && listings && listings.length === 0 && (
              <div
                className="rounded-xl p-16 text-center"
                style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              >
                <Search className="w-12 h-12 mx-auto mb-4" style={{ color: '#2A2A2A' }} />
                <h3
                  className="font-display font-bold uppercase text-xl mb-2"
                  style={{ color: '#FAFAFA' }}
                >
                  No Trades Found
                </h3>
                <p className="text-sm mb-6" style={{ color: '#A0A0A0' }}>
                  No listings match your current filters. Try adjusting the condition range or be
                  the first to list!
                </p>
                <Button
                  onClick={() => navigate({ to: '/create-listing' })}
                  className="font-display font-bold uppercase tracking-wide"
                  style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
                >
                  List Your First Pair
                </Button>
              </div>
            )}

            {!isLoading && !error && listings && listings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
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
