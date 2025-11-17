import React, { useState } from 'react';
import { Product, UsageInput } from '../types';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

interface ProductSelectorProps {
  products: Product[];
  onUsageChange: (inputs: UsageInput[]) => void;
  usageInputs: UsageInput[];
}

export function ProductSelector({ products, onUsageChange, usageInputs }: ProductSelectorProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const handleProductToggle = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
      // Remove all inputs for this product
      const newInputs = usageInputs.filter(input => input.productId !== productId);
      onUsageChange(newInputs);
      // Also remove from expanded
      const newExpanded = new Set(expandedProducts);
      newExpanded.delete(productId);
      setExpandedProducts(newExpanded);
    } else {
      newSelected.add(productId);
      // Auto-expand when selected
      const newExpanded = new Set(expandedProducts);
      newExpanded.add(productId);
      setExpandedProducts(newExpanded);
    }
    setSelectedProducts(newSelected);
  };

  const handleExpandToggle = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const handleUsageInput = (productId: string, componentName: string, value: number) => {
    const newInputs = [...usageInputs];
    const existingIndex = newInputs.findIndex(
      input => input.productId === productId && input.componentName === componentName
    );

    if (existingIndex >= 0) {
      if (value === 0) {
        newInputs.splice(existingIndex, 1);
      } else {
        newInputs[existingIndex].value = value;
      }
    } else if (value > 0) {
      newInputs.push({ productId, componentName, value });
    }

    onUsageChange(newInputs);
  };

  const getUsageValue = (productId: string, componentName: string): number => {
    const input = usageInputs.find(
      input => input.productId === productId && input.componentName === componentName
    );
    return input?.value || 0;
  };

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Product Selection</h2>
        <p className="text-slate-300 text-sm mt-1">
          Select products and enter estimated usage
        </p>
      </div>

      <div className="p-6 space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
              {category}
            </div>
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className={`border-2 rounded-lg transition-all ${
                  selectedProducts.has(product.id)
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => handleProductToggle(product.id)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => {}}
                      className="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500">
                        {product.components.length} component{product.components.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  {selectedProducts.has(product.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandToggle(product.id);
                      }}
                      className="p-1 hover:bg-primary-100 rounded transition-colors"
                    >
                      {expandedProducts.has(product.id) ? (
                        <ChevronUp className="w-5 h-5 text-primary-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary-600" />
                      )}
                    </button>
                  )}
                </div>

                {selectedProducts.has(product.id) && expandedProducts.has(product.id) && (
                  <div className="px-4 pb-4 space-y-3 border-t border-primary-200">
                    <div className="pt-3 space-y-3">
                      {product.components.map((component) => (
                        <div
                          key={component.name}
                          className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-slate-200"
                        >
                          <div>
                            <div className="text-sm font-medium text-slate-900">
                              {component.name}
                            </div>
                            <div className="text-xs text-slate-500">{component.metric}</div>
                            <div className="text-xs text-primary-600 font-medium mt-1">
                              {component.multiplier.toLocaleString()} credits
                              {component.isFlat && ' (flat fee)'}
                            </div>
                          </div>
                          <div>
                            <input
                              type="number"
                              min="0"
                              value={getUsageValue(product.id, component.name) || ''}
                              onChange={(e) =>
                                handleUsageInput(
                                  product.id,
                                  component.name,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              placeholder="0"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No products configured. Please add products in the Settings page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

