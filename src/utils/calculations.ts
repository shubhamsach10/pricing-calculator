import { AppSettings, UsageInput, CalculationResult, ProductDiscount } from '../types';
import { evaluateFormula } from './formulaEvaluator';

// Helper formatting functions
export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString('en-US');
}

export function calculateUpsellPrice(newTotalPrice: number, existingCredits: number, existingPrice: number): number {
  // For upsell, subtract the existing credit value from the new total
  // This gives the net pay amount (incremental cost)
  return Math.max(0, newTotalPrice - existingPrice);
}

export function calculatePricing(
  usageInputs: UsageInput[],
  settings: AppSettings,
  discounts: ProductDiscount[] = [],
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
    productId: string;
    productName: string;
    componentName: string;
    usage: number;
    credits: number;
    basePrice: number;
    discount: number;
    finalPrice: number;
  }> = [];

  // Process each product
  Object.entries(inputsByProduct).forEach(([productId, productInputs]) => {
    const product = settings.products.find(p => p.id === productId);
    if (!product) return;

    let productCredits = 0;

    // Check if product uses formula mode
    if (product.useFormula && product.formula) {
      // Build variables object from ALL components (not just filled ones)
      const variables: Record<string, number> = {};
      
      // Initialize all component variables to 0
      product.components.forEach(component => {
        if (component.varName) {
          variables[component.varName] = 0;
        }
      });
      
      // Override with actual input values
      productInputs.forEach(input => {
        const component = product.components.find(c => c.name === input.componentName);
        if (component?.varName) {
          variables[component.varName] = input.value;
        }
      });

      try {
        // Calculate total credits using formula
        productCredits = evaluateFormula(product.formula, variables);
      } catch (error) {
        console.error('Formula calculation error:', error);
        // Fallback to normal calculation
        productInputs.forEach(input => {
          const component = product.components.find(c => c.name === input.componentName);
          if (component) {
            productCredits += input.value * component.multiplier;
          }
        });
      }
    } else {
      // Normal mode: Calculate each component separately
      productInputs.forEach(input => {
        const component = product.components.find(c => c.name === input.componentName);
        if (component) {
          productCredits += input.value * component.multiplier;
        }
      });
    }

    // Calculate base price for this product
    const basePrice = productCredits * settings.global.pricePerCredit;
    
    // Get discount for this product
    const productDiscount = discounts.find(d => d.productId === productId);
    const discountAmount = productDiscount?.discountAmount || 0;
    
    // Calculate final price
    const finalPrice = Math.max(0, basePrice - discountAmount);

    // Add to breakdown
    breakdown.push({
      productId: product.id,
      productName: product.name,
      componentName: product.useFormula ? 'Formula-based calculation' : productInputs.map(i => i.componentName).join(', '),
      usage: productInputs.reduce((sum, i) => sum + i.value, 0),
      credits: productCredits,
      basePrice,
      discount: discountAmount,
      finalPrice,
    });
  });

  const totalCredits = breakdown.reduce((sum, item) => sum + item.credits, 0);

  // Apply safety buffer if enabled
  const bufferedCredits = settings.global.safetyBufferEnabled
    ? totalCredits * (1 + settings.global.safetyBuffer / 100)
    : totalCredits;

  // Apply minimum floor
  const appliedMinimum = bufferedCredits < settings.global.enterpriseMinimum;
  const finalCredits = Math.max(bufferedCredits, settings.global.enterpriseMinimum);

  // Calculate pricing
  const pricePerCredit = settings.global.pricePerCredit;
  const basePrice = finalCredits * pricePerCredit;
  const totalDiscount = breakdown.reduce((sum, item) => sum + item.discount, 0);
  const totalPrice = Math.max(0, basePrice - totalDiscount);

  return {
    totalCredits,
    appliedMinimum,
    finalCredits,
    pricePerCredit,
    basePrice,
    totalDiscount,
    totalPrice,
    breakdown,
  };
}
