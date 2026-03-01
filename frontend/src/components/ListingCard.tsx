import { ExternalBlob } from '../backend';
import { Shield, ShieldAlert, Star } from 'lucide-react';
import { formatPrice, calculateCommission } from '../utils/pricing';

interface ListingCardProps {
  id: bigint;
  name: string;
  priceCents: bigint;
  conditionScore: bigint;
  isAuthentic: boolean;
  photo: ExternalBlob;
  onClick?: () => void;
}

function getConditionLabel(score: number): string {
  if (score >= 90) return 'Deadstock';
  if (score >= 75) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Worn';
}

function getConditionColor(score: number): { bg: string; text: string } {
  if (score >= 90) return { bg: 'rgba(225,29,72,0.15)', text: '#FB7185' };
  if (score >= 75) return { bg: 'rgba(225,29,72,0.1)', text: '#E11D48' };
  if (score >= 60) return { bg: 'rgba(160,160,160,0.15)', text: '#A0A0A0' };
  if (score >= 40) return { bg: 'rgba(100,100,100,0.15)', text: '#888' };
  return { bg: 'rgba(80,80,80,0.15)', text: '#666' };
}

export default function ListingCard({
  name,
  priceCents,
  conditionScore,
  isAuthentic,
  photo,
  onClick,
}: ListingCardProps) {
  const score = Number(conditionScore);
  const price = Number(priceCents);
  const commission = calculateCommission(price);
  const total = price + commission;
  const conditionColors = getConditionColor(score);
  const imageUrl = photo.getDirectURL();

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer card-hover group"
      style={{
        backgroundColor: '#1A1A1A',
        border: '1px solid #2A2A2A',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(225,29,72,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A';
      }}
    >
      {/* Counterfeit Warning */}
      {!isAuthentic && (
        <div
          className="px-3 py-1.5 flex items-center gap-2 text-xs font-medium"
          style={{ backgroundColor: 'rgba(225,29,72,0.15)', color: '#FB7185' }}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Authenticity Not Verified
        </div>
      )}

      {/* Photo */}
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#141414' }}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Condition Badge */}
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold font-display uppercase tracking-wide"
          style={{ backgroundColor: conditionColors.bg, color: conditionColors.text, backdropFilter: 'blur(4px)' }}
        >
          {score} — {getConditionLabel(score)}
        </div>
        {/* Auth Badge */}
        {isAuthentic && (
          <div
            className="absolute top-2 right-2 p-1 rounded"
            style={{ backgroundColor: 'rgba(225,29,72,0.2)', color: '#E11D48' }}
          >
            <Shield className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          className="font-display font-bold text-base uppercase tracking-wide truncate mb-2"
          style={{ color: '#FAFAFA' }}
        >
          {name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className="w-3 h-3"
              style={{
                color: i <= Math.round(score / 20) ? '#E11D48' : '#2A2A2A',
                fill: i <= Math.round(score / 20) ? '#E11D48' : '#2A2A2A',
              }}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: '#A0A0A0' }}>
            Condition
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex justify-between text-xs" style={{ color: '#A0A0A0' }}>
            <span>Trade Value</span>
            <span>{formatPrice(price)}</span>
          </div>
          <div className="flex justify-between text-xs" style={{ color: '#A0A0A0' }}>
            <span>Platform Fee (10%)</span>
            <span>{formatPrice(commission)}</span>
          </div>
          <div
            className="flex justify-between text-sm font-bold pt-1 border-t"
            style={{ color: '#FAFAFA', borderColor: '#2A2A2A' }}
          >
            <span>Total</span>
            <span style={{ color: '#E11D48' }}>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
