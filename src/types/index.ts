// Type definitions for the pricing calculator system

export interface GlobalSettings {
  currencyBase: string;
  currencySymbol: string;
  enterpriseMinimum: number;
  safetyBuffer: number;
  safetyBufferEnabled: boolean;
}

export interface ComponentInput {
  varName: string; // e.g., "L", "G", "F", "B", "M"
  label: string; // e.g., "Locations", "Grid Points"
  multiplier: number; // Individual multiplier if not using formula
  defaultValue?: number;
}

export interface ProductComponent {
  name: string;
  metric: string;
  multiplier: number; // Fallback multiplier
  isFlat?: boolean;
  // Multi-input configuration
  inputs?: ComponentInput[]; // Multiple input fields with variable names
  // Formula-based pricing (optional)
  useFormula?: boolean;
  formula?: string; // e.g., "(L * G * F) * (B + M)"
}

export interface Product {
  id: string;
  name: string;
  category: string;
  components: ProductComponent[];
}

export interface PricingTier {
  name: string;
  minCredits: number;
  maxCredits: number | null; // null means infinity
  pricePerCredit: number;
}

export interface AppSettings {
  global: GlobalSettings;
  products: Product[];
  tiers: PricingTier[];
}

export interface UsageInput {
  productId: string;
  componentName: string;
  value: number; // For simple single-input components
  // For multi-input components
  inputs?: Record<string, number>; // e.g., { L: 10, G: 49, F: 4, B: 5, M: 0 }
}

export interface CalculationResult {
  totalCredits: number;
  appliedMinimum: boolean;
  finalCredits: number;
  tier: PricingTier;
  totalPrice: number;
  pricePerCredit: number;
  breakdown: Array<{
    productName: string;
    componentName: string;
    usage: number;
    credits: number;
  }>;
}

export type DealType = 'new' | 'upsell';
export type PricingModel = 'legacy' | 'credits';

export interface DealInfo {
  customerName: string;
  dealType: DealType;
  pricingModel: PricingModel;
  existingCredits?: number;
  existingPrice?: number;
}

export interface Quote {
  dealInfo: DealInfo;
  calculation: CalculationResult;
  generatedAt: Date;
}

