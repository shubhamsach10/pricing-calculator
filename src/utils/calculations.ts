import { AppSettings, UsageInput, CalculationResult, PricingTier } from '../types';
import { evaluateFormula } from './formulaEvaluator';

export function calculatePricing(
  usageInputs: UsageInput[],
  settings: AppSettings,
  _existingCredits: number = 0
): CalculationResult {
  // Group inputs by product to handle product-level formulas
  const inputsByProduct = usageInputs.reduce((acc, input) => {
    if (!acc[input.productId]) {
      acc[input.productId] = [];
    }
    acc[input.productId].push(input);
    return acc;
  }, {} as Record<string, UsageInput[]>);

  const breakdown: Array<{
    productName: string;
    componentName: string;
    usage: number;
    credits: number;
  }> = [];

  // Process each product
  Object.entries(inputsByProduct).forEach(([productId, productInputs]) => {
    const product = settings.products.find(p => p.id === productId);
    if (!product) return;

    // Check if product uses formula mode
    if (product.useFormula && product.formula) {
      // Build variables object from all components
      const variables: Record<string, number> = {};
      
      productInputs.forEach(input => {
        const component = product.components.find(c => c.name === input.componentName);
        if (component?.varName) {
          variables[component.varName] = input.value;
        }
      });

      try {
        // Calculate total credits using formula
        const totalCredits = evaluateFormula(product.formula, variables);
        
        // Add single breakdown entry for the product
        breakdown.push({
          productName: product.name,
          componentName: 'Formula-based calculation',
          usage: Object.values(variables).reduce((sum, val) => sum + val, 0),
          credits: totalCredits,
        });
      } catch (error) {
        console.error('Formula calculation error:', error);
        // Fallback to normal calculation
        productInputs.forEach(input => {
          const component = product.components.find(c => c.name === input.componentName);
          if (component) {
            breakdown.push({
              productName: product.name,
              componentName: component.name,
              usage: input.value,
              credits: input.value * component.multiplier,
            });
          }
        });
      }
    } else {
      // Normal mode: Calculate each component separately
      productInputs.forEach(input => {
        const component = product.components.find(c => c.name === input.componentName);
        if (component) {
          breakdown.push({
            productName: product.name,
            componentName: component.name,
            usage: input.value,
            credits: input.value * component.multiplier,
          });
        }
      });
    }
  });

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

