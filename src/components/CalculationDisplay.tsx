import React from 'react';
import { CalculationResult, DealInfo, AppSettings } from '../types';
import { formatCurrency, formatCredits, calculateUpsellPrice } from '../utils/calculations';
import { TrendingUp, AlertCircle, CheckCircle, FileText } from 'lucide-react';

interface CalculationDisplayProps {
  calculation: CalculationResult | null;
  dealInfo: DealInfo | null;
  settings: AppSettings;
  onGenerateQuote: () => void;
}

export function CalculationDisplay({
  calculation,
  dealInfo,
  settings,
  onGenerateQuote,
}: CalculationDisplayProps) {
  if (!calculation) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pricing Summary</h3>
        <div className="text-center py-12 text-slate-400">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Select products and enter usage to see pricing</p>
        </div>
      </div>
    );
  }

  const isUpsell = dealInfo?.dealType === 'upsell' && dealInfo.existingPrice;
  const upsellAmount = isUpsell && dealInfo.existingCredits && dealInfo.existingPrice
    ? calculateUpsellPrice(calculation.totalPrice, dealInfo.existingCredits, dealInfo.existingPrice)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Pricing Summary</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Minimum Warning */}
        {calculation.appliedMinimum && (
          <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-900">
                Enterprise Minimum Applied
              </div>
              <div className="text-xs text-amber-700 mt-1">
                Usage is below the minimum. Pricing based on{' '}
                {formatCredits(settings.global.enterpriseMinimum)} credits.
              </div>
            </div>
          </div>
        )}

        {/* Credits Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-600">Total Usage Credits</span>
            <span className="text-lg font-semibold text-slate-900">
              {formatCredits(calculation.totalCredits)}
            </span>
          </div>

          {settings.global.safetyBufferEnabled && (
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-sm font-medium text-slate-600">
                Safety Buffer ({settings.global.safetyBuffer}%)
              </span>
              <span className="text-sm font-medium text-slate-900">
                +{formatCredits(calculation.finalCredits - calculation.totalCredits)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pb-3 border-b-2 border-slate-300">
            <span className="text-sm font-semibold text-slate-700">Final Credits</span>
            <span className="text-xl font-bold text-primary-600">
              {formatCredits(calculation.finalCredits)}
            </span>
          </div>
        </div>

        {/* Tier Information */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-900">Current Tier</span>
            <CheckCircle className="w-5 h-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {calculation.tier.name}
          </div>
          <div className="text-sm text-primary-700">
            {formatCurrency(calculation.pricePerCredit, settings.global.currencySymbol)} per credit
          </div>
          <div className="text-xs text-primary-600 mt-2">
            {formatCredits(calculation.tier.minCredits)} -{' '}
            {calculation.tier.maxCredits
              ? formatCredits(calculation.tier.maxCredits)
              : '∞'}{' '}
            credits
          </div>
        </div>

        {/* Price Display */}
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-sm text-slate-600 mb-1">Estimated Annual Cost</div>
            <div className="text-3xl font-bold text-slate-900">
              {formatCurrency(calculation.totalPrice, settings.global.currencySymbol)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {formatCredits(calculation.finalCredits)} credits × {formatCurrency(calculation.pricePerCredit, settings.global.currencySymbol)}
            </div>
          </div>

          {isUpsell && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm font-medium text-green-900 mb-1">Net Pay (Upsell)</div>
              <div className="text-2xl font-bold text-green-700">
                {formatCurrency(upsellAmount, settings.global.currencySymbol)}
              </div>
              <div className="text-xs text-green-600 mt-1">
                After deducting existing credit value
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onGenerateQuote}
          disabled={calculation.totalCredits === 0}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FileText className="w-5 h-5 mr-2" />
          Generate Quote
        </button>
      </div>
    </div>
  );
}

