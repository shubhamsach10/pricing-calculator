// Type definitions for the pricing calculator system

export interface GlobalSettings {
  currencyBase: string;
  currencySymbol: string;
  enterpriseMinimum: number;
  safetyBuffer: number;
  safetyBufferEnabled: boolean;
  pricePerCredit: number; // Fixed price per credit
}

export interface ProductComponent {
  name: string;
  metric: string;
  multiplier: number;
  isFlat?: boolean;
  varName?: string; // Variable name for formulas (e.g., "P", "L", "G")
}

export interface Product {
  id: string;
  name: string;
  category: string;
  components: ProductComponent[];
  // Product-level formula configuration
  useFormula?: boolean;
  formula?: string; // e.g., "(L * G * F) * (B + M)" using component varNames
}

export interface AppSettings {
  global: GlobalSettings;
  products: Product[];
}

export interface UsageInput {
  productId: string;
  componentName: string;
  value: number;
}

export interface ProductDiscount {
  productId: string;
  discountAmount: number; // Dollar amount discount
}

export interface CalculationResult {
  totalCredits: number;
  appliedMinimum: boolean;
  finalCredits: number;
  pricePerCredit: number;
  basePrice: number;
  totalDiscount: number;
  totalPrice: number;
  breakdown: Array<{
    productId: string;
    productName: string;
    componentName: string;
    usage: number;
    credits: number;
    basePrice: number;
    discount: number;
    finalPrice: number;
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

