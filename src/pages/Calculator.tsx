import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { DealInfo, UsageInput, CalculationResult } from '../types';
import { DealInitialization } from '../components/DealInitialization';
import { ProductSelector } from '../components/ProductSelector';
import { CalculationDisplay } from '../components/CalculationDisplay';
import { SmartNudge } from '../components/SmartNudge';
import { QuoteSummary } from '../components/QuoteSummary';
import { calculatePricing } from '../utils/calculations';

export function Calculator() {
  const { settings } = useSettings();
  const [step, setStep] = useState<'init' | 'calculate' | 'quote'>('init');
  const [dealInfo, setDealInfo] = useState<DealInfo | null>(null);
  const [usageInputs, setUsageInputs] = useState<UsageInput[]>([]);
  const [calculation, setCalculation] = useState<CalculationResult | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeInfo] = useState<any>(null);

  useEffect(() => {
    if (usageInputs.length > 0 && dealInfo?.pricingModel === 'credits') {
      const result = calculatePricing(usageInputs, settings, dealInfo?.existingCredits);
      setCalculation(result);
      // Smart nudges based on discounts can be added here in the future
      setShowNudge(false);
    }
  }, [usageInputs, settings, dealInfo]);

  const handleDealStart = (info: DealInfo) => {
    setDealInfo(info);
    if (info.pricingModel === 'credits') {
      setStep('calculate');
    } else {
      // Handle legacy pricing - for now just show message
      alert('Legacy pricing model is not yet implemented in this demo');
    }
  };

  const handleUsageChange = (inputs: UsageInput[]) => {
    setUsageInputs(inputs);
  };

  const handleGenerateQuote = () => {
    setStep('quote');
  };

  const handleBackToCalculator = () => {
    setStep('calculate');
  };

  const handleStartNew = () => {
    setStep('init');
    setDealInfo(null);
    setUsageInputs([]);
    setCalculation(null);
    setShowNudge(false);
  };

  if (step === 'init') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Pricing Calculator</h1>
          <p className="mt-2 text-slate-600">
            Start by selecting a customer and deal type to begin calculating pricing
          </p>
        </div>
        <DealInitialization onStart={handleDealStart} />
      </div>
    );
  }

  if (step === 'quote' && dealInfo && calculation) {
    return (
      <QuoteSummary
        dealInfo={dealInfo}
        calculation={calculation}
        settings={settings}
        onBack={handleBackToCalculator}
        onStartNew={handleStartNew}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {dealInfo?.customerName}
          </h1>
          <p className="mt-1 text-slate-600">
            {dealInfo?.dealType === 'new' ? 'New Business' : 'Upsell / Renewal'} • Credits-Based Pricing
          </p>
        </div>
        <button
          onClick={handleStartNew}
          className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Start New Deal
        </button>
      </div>

      {showNudge && nudgeInfo && (
        <SmartNudge nudgeInfo={nudgeInfo} onDismiss={() => setShowNudge(false)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductSelector
            products={settings.products}
            onUsageChange={handleUsageChange}
            usageInputs={usageInputs}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <CalculationDisplay
              calculation={calculation}
              dealInfo={dealInfo}
              settings={settings}
              onGenerateQuote={handleGenerateQuote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

