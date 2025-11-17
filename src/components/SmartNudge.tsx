import { X, TrendingUp, Sparkles } from 'lucide-react';
import { formatCredits, formatCurrency } from '../utils/calculations';

interface SmartNudgeProps {
  nudgeInfo: {
    tier: any;
    creditsNeeded: number;
    currentTier: any;
    potentialSavings: number;
  };
  onDismiss: () => void;
}

export function SmartNudge({ nudgeInfo, onDismiss }: SmartNudgeProps) {
  const { tier, creditsNeeded, currentTier, potentialSavings } = nudgeInfo;

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full opacity-20 -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-200 rounded-full opacity-20 -ml-12 -mb-12"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-lg">Smart Upsell Opportunity!</h4>
              <p className="text-sm text-emerald-700">You're close to a better tier</p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
          <p className="text-slate-700">
            You are just <span className="font-bold text-emerald-700">{formatCredits(creditsNeeded)} credits</span> away from the{' '}
            <span className="font-bold text-emerald-700">{tier.name} Tier</span>!
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-600 mb-1">Current Tier</div>
              <div className="font-semibold text-slate-900">{currentTier.name}</div>
              <div className="text-sm text-slate-700">{formatCurrency(currentTier.pricePerCredit, '$')}/credit</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <div className="text-xs text-emerald-700 mb-1">Next Tier</div>
              <div className="font-semibold text-emerald-900">{tier.name}</div>
              <div className="text-sm text-emerald-800 font-medium">{formatCurrency(tier.pricePerCredit, '$')}/credit</div>
            </div>
          </div>

          {potentialSavings > 0 && (
            <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-3">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-sm text-emerald-800">Potential savings: </span>
                <span className="font-bold text-emerald-900 text-lg">
                  {formatCurrency(potentialSavings, '$')}
                </span>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-600 italic">
            💡 Tip: Ask the client if they might have slightly higher usage. It could actually save them money!
          </p>
        </div>
      </div>
    </div>
  );
}

