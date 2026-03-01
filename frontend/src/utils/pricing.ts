export function calculateCommission(priceCents: number): number {
  return Math.round(priceCents * 0.1);
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

export function formatPriceBigInt(cents: bigint): string {
  return formatPrice(Number(cents));
}

export function calculateCommissionBigInt(priceCents: bigint): number {
  return calculateCommission(Number(priceCents));
}
