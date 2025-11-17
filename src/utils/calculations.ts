import { AppSettings, UsageInput, CalculationResult, PricingTier } from '../types';

export function calculatePricing(
  usageInputs: UsageInput[],
  settings: AppSettings,
  existingCredits: number = 0
): CalculationResult {
  // Step 1: Calculate total credits needed
  const breakdown = usageInputs.map(input => {
    const product = settings.products.find(p => p.id === input.productId);
    const component = product?.components.find(c => c.name === input.componentName);
    
    if (!product || !component) {
      return {
        productName: '',
        componentName: '',
        usage: 0,
        credits: 0,
      };
    }

    const credits = input.value * component.multiplier;
    
    return {
      productName: product.name,
      componentName: component.name,
      usage: input.value,
      credits,
    };
  }).filter(item => item.productName !== '');

  const totalCredits = breakdown.reduce((sum, item) => sum + item.credits, 0);

  // Step 2: Apply safety buffer if enabled
  const bufferedCredits = settings.global.safetyBufferEnabled
    ? totalCredits * (1 + settings.global.safetyBuffer / 100)
    : totalCredits;

  // Step 3: Apply minimum floor
  const appliedMinimum = bufferedCredits < settings.global.enterpriseMinimum;
  const finalCredits = Math.max(bufferedCredits, settings.global.enterpriseMinimum);

  // Step 4: Determine price tier
  const tier = determineTier(finalCredits, settings.tiers);

  // Step 5: Calculate final price
  const totalPrice = finalCredits * tier.pricePerCredit;

  return {
    totalCredits: Math.round(totalCredits),
    appliedMinimum,
    finalCredits: Math.round(finalCredits),
    tier,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    pricePerCredit: tier.pricePerCredit,
    breakdown,
  };
}

export function determineTier(credits: number, tiers: PricingTier[]): PricingTier {
  const sortedTiers = [...tiers].sort((a, b) => a.minCredits - b.minCredits);
  
  for (const tier of sortedTiers) {
    if (credits >= tier.minCredits && (tier.maxCredits === null || credits <= tier.maxCredits)) {
      return tier;
    }
  }
  
  // Fallback to the last tier (should be Enterprise with no max)
  return sortedTiers[sortedTiers.length - 1];
}

export function calculateUpsellPrice(
  newTotalPrice: number,
  existingCredits: number,
  oldPricePerCredit: number
): number {
  const creditsAlreadyPaid = existingCredits * oldPricePerCredit;
  return newTotalPrice - creditsAlreadyPaid;
}

export function findNextTierThreshold(
  currentCredits: number,
  tiers: PricingTier[]
): { tier: PricingTier; creditsNeeded: number } | null {
  const currentTier = determineTier(currentCredits, tiers);
  const sortedTiers = [...tiers].sort((a, b) => a.minCredits - b.minCredits);
  const currentTierIndex = sortedTiers.findIndex(t => t.name === currentTier.name);
  
  if (currentTierIndex < sortedTiers.length - 1) {
    const nextTier = sortedTiers[currentTierIndex + 1];
    const creditsNeeded = nextTier.minCredits - currentCredits;
    
    return {
      tier: nextTier,
      creditsNeeded,
    };
  }
  
  return null;
}

export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString('en-US');
}

