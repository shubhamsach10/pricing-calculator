# 🔄 New Pricing Model - Simplified Discounts

## ✅ What's Been Done (Part 1)

### Core Changes:
- ✅ Added `pricePerCredit` to GlobalSettings
- ✅ Added `discount` field to UsageInput (per product)
- ✅ Updated CalculationResult to include basePrice, totalDiscount, per-item discount
- ✅ Rewrote calculation logic to use fixed price per credit
- ✅ Removed tier determination logic
- ✅ Set default pricePerCredit to $0.20

---

## 🚧 What's Next (Part 2)

### Settings Page:
1. **Global Parameters tab:**
   - Add "Price Per Credit" input field
   - Show current value: $0.20

2. **Remove "Volume Discount Tiers" tab:**
   - No longer needed
   - Only 2 tabs: Global Parameters, Products & Multipliers

### Calculator Page:
1. **Product-level discount input:**
   - For each selected product
   - Add "Discount ($)" input field
   - Sales rep enters discount amount (e.g., $50)

### Display Components:
1. **Show new pricing breakdown:**
   - Base Price = Credits × $0.20
   - Discount = $50 (entered by sales rep)
   - Final Price = Base Price - Discount

---

## 📊 Example Flow

### Admin (Settings):
```
Price Per Credit: $0.20
```

### Sales Rep (Calculator):
```
Product: Search AI
├─ Prompts: 10
├─ Locations: 10  
└─ Credits: 2,000

Base Price: 2,000 × $0.20 = $400
Discount: $50 (sales rep enters)
Final Price: $400 - $50 = $350
```

---

## 🎯 Benefits

✅ **Simpler:** No complex tier logic  
✅ **Flexible:** Sales rep controls discounts  
✅ **Transparent:** Clear pricing calculation  
✅ **Per-product:** Different discounts per product

---

## 🔧 Technical Details

### Before:
```typescript
tier = determineTier(credits, tiers)
price = credits × tier.pricePerCredit
```

### After:
```typescript
basePrice = credits × settings.global.pricePerCredit
finalPrice = basePrice - discount
```

---

**Status:** Part 1 committed ✅  
**Next:** Part 2 - UI updates (in progress)

