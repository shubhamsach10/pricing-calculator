import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Save, RotateCcw, Plus, Trash2, DollarSign, TrendingUp, Layers } from 'lucide-react';
import { AppSettings, PricingTier, Product, ProductComponent } from '../types';

export function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<AppSettings>(JSON.parse(JSON.stringify(settings)));
  const [activeTab, setActiveTab] = useState<'global' | 'products' | 'tiers'>('global');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateSettings(localSettings);
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
      setLocalSettings(JSON.parse(JSON.stringify(settings)));
      setSaveMessage('Settings reset to defaults!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateGlobal = (field: string, value: any) => {
    setLocalSettings({
      ...localSettings,
      global: { ...localSettings.global, [field]: value },
    });
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: 'New Product',
      category: 'General',
      components: [],
    };
    setLocalSettings({
      ...localSettings,
      products: [...localSettings.products, newProduct],
    });
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const updatedProducts = [...localSettings.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setLocalSettings({ ...localSettings, products: updatedProducts });
  };

  const deleteProduct = (index: number) => {
    const updatedProducts = localSettings.products.filter((_, i) => i !== index);
    setLocalSettings({ ...localSettings, products: updatedProducts });
  };

  const addComponent = (productIndex: number) => {
    const updatedProducts = [...localSettings.products];
    const newComponent: ProductComponent = {
      name: 'New Component',
      metric: 'Per Unit',
      multiplier: 1.0,
      isFlat: false,
    };
    updatedProducts[productIndex].components.push(newComponent);
    setLocalSettings({ ...localSettings, products: updatedProducts });
  };

  const updateComponent = (productIndex: number, componentIndex: number, field: string, value: any) => {
    const updatedProducts = [...localSettings.products];
    updatedProducts[productIndex].components[componentIndex] = {
      ...updatedProducts[productIndex].components[componentIndex],
      [field]: value,
    };
    setLocalSettings({ ...localSettings, products: updatedProducts });
  };

  const deleteComponent = (productIndex: number, componentIndex: number) => {
    const updatedProducts = [...localSettings.products];
    updatedProducts[productIndex].components = updatedProducts[productIndex].components.filter(
      (_, i) => i !== componentIndex
    );
    setLocalSettings({ ...localSettings, products: updatedProducts });
  };

  const addTier = () => {
    const newTier: PricingTier = {
      name: 'New Tier',
      minCredits: 0,
      maxCredits: 10000,
      pricePerCredit: 0.10,
    };
    setLocalSettings({
      ...localSettings,
      tiers: [...localSettings.tiers, newTier],
    });
  };

  const updateTier = (index: number, field: string, value: any) => {
    const updatedTiers = [...localSettings.tiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setLocalSettings({ ...localSettings, tiers: updatedTiers });
  };

  const deleteTier = (index: number) => {
    const updatedTiers = localSettings.tiers.filter((_, i) => i !== index);
    setLocalSettings({ ...localSettings, tiers: updatedTiers });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pricing Settings</h1>
          <p className="mt-1 text-slate-600">Configure global parameters, products, and pricing tiers</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {saveMessage}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('global')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'global'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Global Parameters
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Products & Multipliers
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tiers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Volume Discount Tiers
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'global' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Currency Base
                  </label>
                  <input
                    type="text"
                    value={localSettings.global.currencyBase}
                    onChange={(e) => updateGlobal('currencyBase', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={localSettings.global.currencySymbol}
                    onChange={(e) => updateGlobal('currencySymbol', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Enterprise Minimum (Credits)
                  </label>
                  <input
                    type="number"
                    value={localSettings.global.enterpriseMinimum}
                    onChange={(e) => updateGlobal('enterpriseMinimum', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Safety Buffer (%)
                  </label>
                  <input
                    type="number"
                    value={localSettings.global.safetyBuffer}
                    onChange={(e) => updateGlobal('safetyBuffer', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="safetyBufferEnabled"
                  checked={localSettings.global.safetyBufferEnabled}
                  onChange={(e) => updateGlobal('safetyBufferEnabled', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="safetyBufferEnabled" className="ml-2 text-sm text-slate-700">
                  Enable Safety Buffer
                </label>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">Product Configuration</h3>
                <button
                  onClick={addProduct}
                  className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </button>
              </div>

              {localSettings.products.map((product, productIndex) => (
                <div key={product.id} className="border border-slate-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(productIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={product.category}
                          onChange={(e) => updateProduct(productIndex, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product ID
                        </label>
                        <input
                          type="text"
                          value={product.id}
                          onChange={(e) => updateProduct(productIndex, 'id', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-slate-50"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProduct(productIndex)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="ml-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-slate-700">Components</h4>
                      <button
                        onClick={() => addComponent(productIndex)}
                        className="flex items-center px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs hover:bg-slate-200 transition-colors"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Component
                      </button>
                    </div>

                    {product.components.map((component, componentIndex) => (
                      <div
                        key={componentIndex}
                        className="p-3 bg-slate-50 rounded-lg space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={component.name}
                              onChange={(e) =>
                                updateComponent(productIndex, componentIndex, 'name', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Metric
                            </label>
                            <input
                              type="text"
                              value={component.metric}
                              onChange={(e) =>
                                updateComponent(productIndex, componentIndex, 'metric', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Multiplier (Credits)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={component.multiplier}
                              onChange={(e) =>
                                updateComponent(productIndex, componentIndex, 'multiplier', parseFloat(e.target.value))
                              }
                              className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div className="flex items-end space-x-2">
                            <div className="flex items-center flex-1">
                              <input
                                type="checkbox"
                                id={`flat-${productIndex}-${componentIndex}`}
                                checked={component.isFlat || false}
                                onChange={(e) =>
                                  updateComponent(productIndex, componentIndex, 'isFlat', e.target.checked)
                                }
                                className="w-3 h-3 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`flat-${productIndex}-${componentIndex}`}
                                className="ml-1 text-xs text-slate-600"
                              >
                                Flat Fee
                              </label>
                            </div>
                            <button
                              onClick={() => deleteComponent(productIndex, componentIndex)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Advanced Calculation Section */}
                        <div className="border-t border-slate-200 pt-3">
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`formula-${productIndex}-${componentIndex}`}
                              checked={component.useFormula || false}
                              onChange={(e) =>
                                updateComponent(productIndex, componentIndex, 'useFormula', e.target.checked)
                              }
                              className="w-3 h-3 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                            />
                            <label
                              htmlFor={`formula-${productIndex}-${componentIndex}`}
                              className="ml-2 text-xs font-medium text-slate-700"
                            >
                              ⚡ Use Advanced Calculation (Formula)
                            </label>
                          </div>

                          {component.useFormula && (
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 space-y-2">
                              <div>
                                <label className="block text-xs font-medium text-purple-900 mb-1">
                                  Formula (e.g., (L * G * F) * (B + M))
                                </label>
                                <input
                                  type="text"
                                  value={component.formula || ''}
                                  onChange={(e) =>
                                    updateComponent(productIndex, componentIndex, 'formula', e.target.value)
                                  }
                                  placeholder="Enter formula using variables"
                                  className="w-full px-2 py-1.5 border border-purple-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                                />
                                <div className="text-xs text-purple-700 mt-1">
                                  💡 Tip: Use variables (L, G, F) for user inputs and constants (B, M) for fixed values
                                </div>
                              </div>
                              
                              <div className="text-xs text-purple-800 bg-purple-100 p-2 rounded">
                                <strong>Note:</strong> Formulas are configured in Settings but hidden from sales reps. 
                                They only see a simple input field and "Advanced" badge.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900">Volume Discount Tiers</h3>
                <button
                  onClick={addTier}
                  className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Tier
                </button>
              </div>

              <div className="space-y-4">
                {localSettings.tiers.map((tier, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Tier Name
                        </label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updateTier(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Min Credits
                        </label>
                        <input
                          type="number"
                          value={tier.minCredits}
                          onChange={(e) => updateTier(index, 'minCredits', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Max Credits
                        </label>
                        <input
                          type="number"
                          value={tier.maxCredits || ''}
                          onChange={(e) =>
                            updateTier(index, 'maxCredits', e.target.value ? parseInt(e.target.value) : null)
                          }
                          placeholder="∞"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Price Per Credit ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={tier.pricePerCredit}
                          onChange={(e) => updateTier(index, 'pricePerCredit', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => deleteTier(index)}
                          className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

