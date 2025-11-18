import { AppSettings, UsageInput, CalculationResult } from '../types';
import { evaluateFormula } from './formulaEvaluator';

export function calculatePricing(
  usageInputs: UsageInput[],
  settings: AppSettings,
  _existingCredits: number = 0
): CalculationResult {
  const pricePerCredit = settings.global.pricePerCredit;
  
  // Group inputs by product to handle product-level formulas and discounts
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
    basePrice: number;
    discount: number;
    finalPrice: number;
  }> = [];

  // Process each product
  Object.entries(inputsByProduct).forEach(([productId, productInputs]) => {
    const product = settings.products.find(p => p.id === productId);
    if (!product) return;

    let productCredits = 0;

    // Calculate credits for this product
    if (product.useFormula && product.formula) {
      // Formula mode: Build variables object from ALL components
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
        productCredits = evaluateFormula(product.formula, variables);
      } catch (error) {
        console.error('Formula calculation error:', error);
        // Fallback: sum all components
        productInputs.forEach(input => {
          const component = product.components.find(c => c.name === input.componentName);
          if (component) {
            productCredits += input.value * component.multiplier;
          }
        });
      }
    } else {
      // Normal mode: Sum all components
      productInputs.forEach(input => {
        const component = product.components.find(c => c.name === input.componentName);
        if (component) {
          productCredits += input.value * component.multiplier;
        }
      });
    }

    // Get discount for this product (from the first input, as discount is per product)
    const productDiscount = productInputs[0]?.discount || 0;

    // Calculate pricing for this product
    const basePrice = productCredits * pricePerCredit;
    const finalPrice = Math.max(0, basePrice - productDiscount);

    breakdown.push({
      productName: product.name,
      componentName: product.useFormula ? 'Formula-based calculation' : 'Standard calculation',
      usage: productInputs.reduce((sum, input) => sum + input.value, 0),
      credits: productCredits,
      basePrice: parseFloat(basePrice.toFixed(2)),
      discount: productDiscount,
      finalPrice: parseFloat(finalPrice.toFixed(2)),
    });
  });

  const totalCredits = breakdown.reduce((sum, item) => sum + item.credits, 0);
  const totalDiscount = breakdown.reduce((sum, item) => sum + item.discount, 0);

  // Apply safety buffer if enabled
  const bufferedCredits = settings.global.safetyBufferEnabled
    ? totalCredits * (1 + settings.global.safetyBuffer / 100)
    : totalCredits;

  // Apply minimum floor
  const appliedMinimum = bufferedCredits < settings.global.enterpriseMinimum;
  const finalCredits = Math.max(bufferedCredits, settings.global.enterpriseMinimum);

  // Calculate prices
  const basePrice = finalCredits * pricePerCredit;
  const totalPrice = Math.max(0, basePrice - totalDiscount);

  return {
    totalCredits: Math.round(totalCredits),
    appliedMinimum,
    finalCredits: Math.round(finalCredits),
    pricePerCredit,
    basePrice: parseFloat(basePrice.toFixed(2)),
    totalDiscount,
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    breakdown,
  };
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

