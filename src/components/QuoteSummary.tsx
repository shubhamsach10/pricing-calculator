import { DealInfo, CalculationResult, AppSettings } from '../types';
import { formatCurrency, formatCredits } from '../utils/calculations';
import { ArrowLeft, Download, Send, CheckCircle, Building2 } from 'lucide-react';

interface QuoteSummaryProps {
  dealInfo: DealInfo;
  calculation: CalculationResult;
  settings: AppSettings;
  onBack: () => void;
  onStartNew: () => void;
}

export function QuoteSummary({
  dealInfo,
  calculation,
  settings,
  onBack,
  onStartNew,
}: QuoteSummaryProps) {
  const isUpsell = dealInfo.dealType === 'upsell' && dealInfo.existingPrice;
  const upsellAmount = isUpsell && dealInfo.existingPrice
    ? calculation.totalPrice - dealInfo.existingPrice
    : 0;

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  const handleSyncToCRM = () => {
    alert('CRM sync functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Calculator
        </button>
        <button
          onClick={onStartNew}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Start New Deal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-10 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Building2 className="w-8 h-8" />
                <h1 className="text-3xl font-bold">{dealInfo.customerName}</h1>
              </div>
              <p className="text-primary-100 text-lg">
                {dealInfo.dealType === 'new' ? 'New Business' : 'Upsell / Renewal'} Quote
              </p>
            </div>
            <div className="text-right">
              <div className="text-primary-100 text-sm">Generated</div>
              <div className="text-white font-medium">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Itemized Usage */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-primary-600" />
              Usage Breakdown
            </h2>
            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                      Component
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-slate-700">
                      Usage
                    </th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-slate-700">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {calculation.breakdown.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-100 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {item.productName}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {item.componentName}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900 text-right">
                        {formatCredits(item.usage)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-primary-600 text-right">
                        {formatCredits(item.credits)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-sm font-bold text-slate-900">
                      Total Usage Credits
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-primary-700 text-right">
                      {formatCredits(calculation.totalCredits)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Pricing Details */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pricing Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">Total Usage Credits</span>
                <span className="font-medium text-slate-900">
                  {formatCredits(calculation.totalCredits)}
                </span>
              </div>

              {settings.global.safetyBufferEnabled && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">
                    Safety Buffer ({settings.global.safetyBuffer}%)
                  </span>
                  <span className="font-medium text-slate-900">
                    +{formatCredits(calculation.finalCredits - calculation.totalCredits)}
                  </span>
                </div>
              )}

              {calculation.appliedMinimum && (
                <div className="flex justify-between items-center py-2 bg-amber-50 px-4 rounded-lg border border-amber-200">
                  <span className="text-amber-800 font-medium">Enterprise Minimum Applied</span>
                  <span className="font-bold text-amber-900">
                    {formatCredits(settings.global.enterpriseMinimum)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-3 border-t-2 border-slate-300">
                <span className="font-semibold text-slate-900">Final Credits</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatCredits(calculation.finalCredits)}
                </span>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary-900 font-medium">Price Per Credit</span>
                  <span className="text-2xl font-bold text-primary-900">
                    {formatCurrency(calculation.pricePerCredit, settings.global.currencySymbol)}
                  </span>
                </div>
                <div className="text-sm text-primary-700">
                  Fixed rate for all credits
                </div>
              </div>
            </div>
          </div>

          {/* Final Contract Value */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-300">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Final Contract Value</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Credits Purchased</span>
                <span className="text-2xl font-bold text-slate-900">
                  {formatCredits(calculation.finalCredits)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Rate</span>
                <span className="text-xl font-semibold text-primary-600">
                  {formatCurrency(calculation.pricePerCredit, settings.global.currencySymbol)}{' '}
                  <span className="text-sm text-slate-600">/ credit</span>
                </span>
              </div>
              <div className="border-t-2 border-slate-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">Total Annual Cost</span>
                  <span className="text-4xl font-bold text-slate-900">
                    {formatCurrency(calculation.totalPrice, settings.global.currencySymbol)}
                  </span>
                </div>
              </div>

              {isUpsell && (
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-green-700 mb-1">Net Pay (Upsell Amount)</div>
                      <div className="text-xs text-green-600">
                        After deducting existing {formatCredits(dealInfo.existingCredits || 0)} credits
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-green-800">
                      {formatCurrency(upsellAmount, settings.global.currencySymbol)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center px-6 py-4 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            <button
              onClick={handleSyncToCRM}
              className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <Send className="w-5 h-5 mr-2" />
              Sync to CRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

