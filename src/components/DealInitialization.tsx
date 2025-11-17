import React, { useState } from 'react';
import { DealInfo, DealType, PricingModel } from '../types';
import { Building2, UserPlus, RefreshCw, MapPin, Coins } from 'lucide-react';

interface DealInitializationProps {
  onStart: (dealInfo: DealInfo) => void;
}

export function DealInitialization({ onStart }: DealInitializationProps) {
  const [customerName, setCustomerName] = useState('');
  const [dealType, setDealType] = useState<DealType>('new');
  const [pricingModel, setPricingModel] = useState<PricingModel>('credits');
  const [existingCredits, setExistingCredits] = useState<number>(0);
  const [existingPrice, setExistingPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      alert('Please enter a customer name');
      return;
    }

    const dealInfo: DealInfo = {
      customerName: customerName.trim(),
      dealType,
      pricingModel,
      existingCredits: dealType === 'upsell' ? existingCredits : undefined,
      existingPrice: dealType === 'upsell' ? existingPrice : undefined,
    };

    onStart(dealInfo);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-8 text-white">
        <h2 className="text-2xl font-bold">Initialize New Deal</h2>
        <p className="mt-2 text-primary-100">
          Enter customer details and select the appropriate pricing approach
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Customer Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g., Acme Corporation"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Deal Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Deal Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDealType('new')}
              className={`relative p-6 border-2 rounded-xl transition-all ${
                dealType === 'new'
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-3 rounded-full ${
                    dealType === 'new' ? 'bg-primary-100' : 'bg-slate-100'
                  }`}
                >
                  <UserPlus
                    className={`w-6 h-6 ${
                      dealType === 'new' ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">New Business</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Fresh customer starting at 0 credits
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDealType('upsell')}
              className={`relative p-6 border-2 rounded-xl transition-all ${
                dealType === 'upsell'
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-3 rounded-full ${
                    dealType === 'upsell' ? 'bg-primary-100' : 'bg-slate-100'
                  }`}
                >
                  <RefreshCw
                    className={`w-6 h-6 ${
                      dealType === 'upsell' ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Upsell / Renewal</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Existing customer with credit balance
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Existing Credits (shown only for upsell) */}
        {dealType === 'upsell' && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Credit Balance
                </label>
                <input
                  type="number"
                  value={existingCredits}
                  onChange={(e) => setExistingCredits(parseInt(e.target.value) || 0)}
                  placeholder="e.g., 12000"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Price Per Credit ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={existingPrice}
                  onChange={(e) => setExistingPrice(parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 0.15"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Pricing Model */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Pricing Model
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPricingModel('legacy')}
              className={`relative p-6 border-2 rounded-xl transition-all ${
                pricingModel === 'legacy'
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-3 rounded-full ${
                    pricingModel === 'legacy' ? 'bg-primary-100' : 'bg-slate-100'
                  }`}
                >
                  <MapPin
                    className={`w-6 h-6 ${
                      pricingModel === 'legacy' ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Legacy (Locations)</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Traditional location-based pricing
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPricingModel('credits')}
              className={`relative p-6 border-2 rounded-xl transition-all ${
                pricingModel === 'credits'
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-3 rounded-full ${
                    pricingModel === 'credits' ? 'bg-primary-100' : 'bg-slate-100'
                  }`}
                >
                  <Coins
                    className={`w-6 h-6 ${
                      pricingModel === 'credits' ? 'text-primary-600' : 'text-slate-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">New (Credits)</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Modern usage-based pricing
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl font-medium text-lg"
          >
            Continue to Calculator
          </button>
        </div>
      </form>
    </div>
  );
}

