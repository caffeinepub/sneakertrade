import { useState, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Upload, Loader2, CheckCircle, ArrowRight, ArrowLeft, Repeat2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateListing } from '../hooks/useQueries';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { ExternalBlob } from '../backend';
import { formatPrice, calculateCommission } from '../utils/pricing';

type Step = 'upload' | 'analyzing' | 'review' | 'publishing' | 'done';

export default function CreateListing() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBytes, setImageBytes] = useState<Uint8Array<ArrayBuffer> | null>(null);
  const [name, setName] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [conditionScore, setConditionScore] = useState<number | null>(null);
  const [isAuthentic, setIsAuthentic] = useState<boolean | null>(null);

  // useAIAnalysis exposes `analyzeShoe`, not `analyze`
  const { analyzeShoe } = useAIAnalysis();
  const createListing = useCreateListing();

  const handleFileSelect = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer) as Uint8Array<ArrayBuffer>;
    setImageBytes(bytes);
    setStep('analyzing');

    const result = await analyzeShoe(bytes);
    setConditionScore(result.conditionScore);
    setIsAuthentic(result.isAuthentic);
    setStep('review');
  };

  const handlePublish = async () => {
    if (!imageBytes || !name || !priceInput || conditionScore === null || isAuthentic === null) return;

    setStep('publishing');
    try {
      const blob = ExternalBlob.fromBytes(imageBytes);
      // priceCents and conditionScore must be plain numbers per useQueries mutation type
      await createListing.mutateAsync({
        name,
        priceCents: Math.round(parseFloat(priceInput) * 100),
        photo: blob,
        conditionScore: conditionScore,
        isAuthentic,
      });
      setStep('done');
    } catch (err) {
      console.error('Failed to create listing:', err);
      setStep('review');
    }
  };

  const price = parseFloat(priceInput) * 100 || 0;
  const commission = calculateCommission(price);
  const total = price + commission;

  const stepLabels = ['Upload', 'AI Analysis', 'Review', 'Publish'];
  const stepIndex = { upload: 0, analyzing: 1, review: 2, publishing: 3, done: 4 }[step];

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA', minHeight: '100vh' }}>
      {/* Header */}
      <div
        className="border-b py-8 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-2xl mx-auto">
          <h1
            className="font-display font-black uppercase text-3xl md:text-4xl mb-2"
            style={{ color: '#FAFAFA' }}
          >
            List for <span style={{ color: '#E11D48' }}>Trade</span>
          </h1>
          <p className="text-sm" style={{ color: '#A0A0A0' }}>
            Upload your sneakers and let AI verify condition and authenticity before trading.
          </p>

          {/* Step Indicator */}
          {step !== 'done' && (
            <div className="flex items-center gap-2 mt-6">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor:
                          i < stepIndex
                            ? '#E11D48'
                            : i === stepIndex
                            ? 'rgba(225,29,72,0.2)'
                            : '#2A2A2A',
                        color: i <= stepIndex ? '#FAFAFA' : '#555',
                        border: i === stepIndex ? '1px solid #E11D48' : 'none',
                      }}
                    >
                      {i < stepIndex ? '✓' : i + 1}
                    </div>
                    <span
                      className="text-xs font-medium hidden sm:block"
                      style={{ color: i === stepIndex ? '#FAFAFA' : '#555' }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <div
                      className="w-8 h-px"
                      style={{ backgroundColor: i < stepIndex ? '#E11D48' : '#2A2A2A' }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Upload Step */}
        {step === 'upload' && (
          <div>
            <div
              className="rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors"
              style={{ borderColor: '#2A2A2A', backgroundColor: '#1A1A1A' }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) handleFileSelect(file);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E11D48';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A2A2A';
              }}
            >
              <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#E11D48' }} />
              <h3 className="font-display font-bold uppercase text-xl mb-2" style={{ color: '#FAFAFA' }}>
                Upload Shoe Photo
              </h3>
              <p className="text-sm mb-4" style={{ color: '#A0A0A0' }}>
                Drag & drop or click to select. Our AI will analyze condition and authenticity.
              </p>
              <Button
                className="font-display font-bold uppercase tracking-wide"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                Choose Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
            </div>
          </div>
        )}

        {/* Analyzing Step */}
        {step === 'analyzing' && (
          <div className="text-center py-16">
            {imagePreview && (
              <div
                className="w-40 h-40 mx-auto mb-8 rounded-xl overflow-hidden"
                style={{ border: '2px solid rgba(225,29,72,0.3)' }}
              >
                <img src={imagePreview} alt="Uploading" className="w-full h-full object-cover" />
              </div>
            )}
            <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin" style={{ color: '#E11D48' }} />
            <h3 className="font-display font-bold uppercase text-2xl mb-2" style={{ color: '#FAFAFA' }}>
              AI Analyzing...
            </h3>
            <p className="text-sm" style={{ color: '#A0A0A0' }}>
              Checking condition score and verifying authenticity. This takes a moment.
            </p>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="space-y-6">
            {/* Image Preview */}
            {imagePreview && (
              <div
                className="rounded-xl overflow-hidden aspect-video"
                style={{ backgroundColor: '#1A1A1A' }}
              >
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}

            {/* AI Results */}
            <div
              className="rounded-xl p-5 flex items-center gap-6"
              style={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(225,29,72,0.2)' }}
            >
              <div className="text-center">
                <div className="font-display font-black text-4xl" style={{ color: '#E11D48' }}>
                  {conditionScore}
                </div>
                <div className="text-xs uppercase tracking-wide" style={{ color: '#A0A0A0' }}>
                  Condition
                </div>
              </div>
              <div className="w-px h-12" style={{ backgroundColor: '#2A2A2A' }} />
              <div className="flex items-center gap-2">
                {isAuthentic ? (
                  <>
                    <CheckCircle className="w-5 h-5" style={{ color: '#E11D48' }} />
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#FAFAFA' }}>
                        Authentic
                      </div>
                      <div className="text-xs" style={{ color: '#A0A0A0' }}>
                        AI Verified
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" style={{ color: '#FB7185' }} />
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#FB7185' }}>
                        Unverified
                      </div>
                      <div className="text-xs" style={{ color: '#A0A0A0' }}>
                        Could not confirm
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium mb-1.5 block"
                  style={{ color: '#A0A0A0' }}
                >
                  Shoe Name / Model
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nike Air Jordan 1 Retro High OG"
                  className="text-sm"
                  style={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', color: '#FAFAFA' }}
                />
              </div>
              <div>
                <Label
                  htmlFor="price"
                  className="text-sm font-medium mb-1.5 block"
                  style={{ color: '#A0A0A0' }}
                >
                  Trade Value (USD)
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="e.g. 250.00"
                  className="text-sm"
                  style={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', color: '#FAFAFA' }}
                />
              </div>
            </div>

            {/* Price Breakdown */}
            {price > 0 && (
              <div
                className="rounded-xl p-4 space-y-2"
                style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
              >
                <div className="flex justify-between text-sm" style={{ color: '#A0A0A0' }}>
                  <span>Trade Value</span>
                  <span>{formatPrice(price)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: '#A0A0A0' }}>
                  <span>Platform Fee (10%)</span>
                  <span>{formatPrice(commission)}</span>
                </div>
                <div
                  className="flex justify-between font-bold pt-2 border-t"
                  style={{ color: '#FAFAFA', borderColor: '#2A2A2A' }}
                >
                  <span>Total</span>
                  <span style={{ color: '#E11D48' }}>{formatPrice(total)}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setStep('upload');
                  setImagePreview(null);
                  setImageBytes(null);
                  setConditionScore(null);
                  setIsAuthentic(null);
                }}
                className="flex items-center gap-2"
                style={{ borderColor: '#2A2A2A', color: '#FAFAFA', backgroundColor: 'transparent' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Re-upload
              </Button>
              <Button
                onClick={handlePublish}
                disabled={!name || !priceInput || parseFloat(priceInput) <= 0}
                className="flex-1 font-display font-bold uppercase tracking-wide flex items-center justify-center gap-2"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                Publish Trade Listing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Publishing Step */}
        {step === 'publishing' && (
          <div className="text-center py-16">
            <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin" style={{ color: '#E11D48' }} />
            <h3 className="font-display font-bold uppercase text-2xl mb-2" style={{ color: '#FAFAFA' }}>
              Publishing...
            </h3>
            <p className="text-sm" style={{ color: '#A0A0A0' }}>
              Uploading your listing to the blockchain. Please wait.
            </p>
          </div>
        )}

        {/* Done Step */}
        {step === 'done' && (
          <div className="text-center py-16">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: 'rgba(225,29,72,0.15)',
                border: '2px solid rgba(225,29,72,0.3)',
              }}
            >
              <Repeat2 className="w-10 h-10" style={{ color: '#E11D48' }} />
            </div>
            <h3
              className="font-display font-black uppercase text-3xl mb-3"
              style={{ color: '#FAFAFA' }}
            >
              Listing Live!
            </h3>
            <p className="text-sm mb-8" style={{ color: '#A0A0A0' }}>
              Your sneaker is now listed for trade. Traders can find it in the marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate({ to: '/marketplace' })}
                className="font-display font-bold uppercase tracking-wide"
                style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
              >
                Browse Marketplace
              </Button>
              <Button
                onClick={() => {
                  setStep('upload');
                  setImagePreview(null);
                  setImageBytes(null);
                  setName('');
                  setPriceInput('');
                  setConditionScore(null);
                  setIsAuthentic(null);
                }}
                variant="outline"
                className="font-display font-bold uppercase tracking-wide"
                style={{ borderColor: '#2A2A2A', color: '#FAFAFA', backgroundColor: 'transparent' }}
              >
                List Another Pair
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
