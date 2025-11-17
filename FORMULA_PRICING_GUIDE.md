# 📐 Formula-Based Pricing Guide

Your pricing calculator now supports **complex formula-based pricing** in addition to simple multiplication!

---

## 🎯 What's New?

### Before (Simple Pricing):
```
Credits = Usage × Multiplier
Example: 100 texts × 1.0 = 100 credits
```

### Now (Formula-Based Pricing):
```
Credits = Custom Formula with Multiple Variables
Example: (L × G × F) × (B + M)
Where: L=Locations, G=Grid Points, F=Frequency, B=Base Cost, M=Model Premium
```

---

## ✨ Features

✅ **Multiple Input Variables** - Define as many inputs as needed  
✅ **Mathematical Operations** - Support for +, -, ×, ÷, (), ^  
✅ **Constants** - Set fixed values that don't change  
✅ **Real-time Calculation** - Instant credit calculation  
✅ **Visual Formula Display** - See the formula in the UI  
✅ **Fallback Safety** - Uses simple multiplier if formula fails  

---

## 📊 Example Use Case

### Your Search AI Scenario:

**Formula:**
```
Total Credits = (L × G × F) × (B + M)
```

**Variables (User Inputs):**
- `L` = Locations (1, 5, 10...)
- `G` = Grid Points (9 for 3×3, 49 for 7×7, 100 for 10×10...)
- `F` = Frequency (scans per month: 1, 4, 30...)

**Constants (Fixed Values):**
- `B` = 5 (Base cost per prompt)
- `M` = 0 (Model premium, or 10 if using additional LLM)

**Example Calculation:**
```
Input:
L = 10 locations
G = 49 grid points (7×7)
F = 4 scans per month

Formula: (10 × 49 × 4) × (5 + 0)
Result: 1,960 × 5 = 9,800 credits
```

---

## 🛠️ How to Configure in Settings

### Step 1: Go to Settings Page

1. Open your pricing calculator
2. Click **"Settings"** in the top navigation
3. Click the **"Products & Multipliers"** tab

### Step 2: Add a Formula-Based Component

When editing a product, you can now configure formula components:

**Example Configuration for Search AI:**

```
Product Name: Search AI
Category: AI & Analytics

Component:
├─ Name: Advanced Scan (Formula)
├─ Metric: Formula-based calculation
├─ Multiplier: 1 (fallback only)
├─ ☑️ Use Formula: YES
├─ Formula: (L * G * F) * (B + M)
├─ Variables:
│  ├─ L: Locations (default: 1)
│  ├─ G: Grid Points (default: 9)
│  └─ F: Frequency (default: 1)
└─ Constants:
   ├─ B: 5
   └─ M: 0
```

---

## 📝 Formula Syntax

### Supported Operations:

| Operation | Symbol | Example |
|-----------|--------|---------|
| Addition | `+` | `B + M` |
| Subtraction | `-` | `X - Y` |
| Multiplication | `*` | `L * G` |
| Division | `/` | `X / Y` |
| Power | `^` | `L ^ 2` |
| Parentheses | `()` | `(L + G) * F` |

### Variable Names:

✅ **Allowed:**
- Single letters: `L`, `G`, `F`, `B`, `M`
- Words: `Locations`, `GridPoints`, `Base`
- Mixed: `L1`, `Grid2`

❌ **Not Allowed:**
- Spaces in variable names
- Special characters: `$`, `@`, `#`
- Reserved words: `return`, `function`

---

## 💡 Common Formula Patterns

### 1. Volume-Based Pricing
```
Formula: L * G * F * B
Use when: Total cost = volume × unit price
Example: Locations × Grid × Frequency × Base Cost
```

### 2. Tiered with Premium
```
Formula: (L * G * F) * (B + M)
Use when: Base price + optional premium
Example: Volume × (Base + Model Premium)
```

### 3. Progressive Scaling
```
Formula: L * (B + (G * 0.5))
Use when: Base cost + incremental cost per feature
Example: Locations × (Base + Grid Premium)
```

### 4. Exponential Pricing
```
Formula: B * (L ^ 2)
Use when: Cost scales exponentially
Example: Base × (Locations squared)
```

### 5. Discount Formula
```
Formula: (L * G * B) * (1 - D)
Use when: Applying percentage discounts
Example: Total Cost × (1 - Discount Rate)
```

---

## 🎨 What It Looks Like in the UI

### In Settings (Configuration):
```
┌─────────────────────────────────────┐
│ Component: Advanced Scan            │
│ [Formula Mode Enabled] ✓            │
│                                     │
│ Formula: (L * G * F) * (B + M)     │
│                                     │
│ Variables:                          │
│ • L - Locations (default: 1)        │
│ • G - Grid Points (default: 9)      │
│ • F - Frequency (default: 1)        │
│                                     │
│ Constants: B=5, M=0                 │
└─────────────────────────────────────┘
```

### In Calculator (Sales Rep View):
```
┌─────────────────────────────────────┐
│ Search AI                           │
│ └─ Advanced Scan (Formula) [Formula]│
│    Formula: (L * G * F) * (B + M)   │
│                                     │
│    Locations (L):      [  10  ]     │
│    Grid Points (G):    [  49  ]     │
│    Frequency (F):      [  4   ]     │
│                                     │
│    Constants: B=5, M=0              │
│    💡 Result: 9,800 credits         │
└─────────────────────────────────────┘
```

---

## 🔧 Step-by-Step: Add Your First Formula

### Example: Add "Advanced Scan" to Search AI

1. **Go to Settings** → Products & Multipliers

2. **Find Search AI** product

3. **Click "Add Component"**

4. **Fill in the details:**
   ```
   Name: Advanced Scan
   Metric: Formula-based calculation
   Multiplier: 1
   ☑️ Use Formula
   ```

5. **Enter the formula:**
   ```
   (L * G * F) * (B + M)
   ```

6. **Add variables** (user inputs):
   - Variable Name: `L`
   - Label: `Locations`
   - Default: `1`
   
   - Variable Name: `G`
   - Label: `Grid Points (9 for 3x3, 49 for 7x7)`
   - Default: `9`
   
   - Variable Name: `F`
   - Label: `Frequency (scans per month)`
   - Default: `1`

7. **Add constants** (fixed values):
   ```
   B: 5
   M: 0
   ```

8. **Click "Save Changes"**

9. **Test in Calculator!**

---

## 🧪 Testing Your Formula

### Verify It Works:

1. **Go to Calculator page**
2. **Start new deal**
3. **Select Search AI**
4. **Find "Advanced Scan (Formula)" component**
5. **Enter test values:**
   - L = 1 location
   - G = 9 grid points
   - F = 1 scan per month
6. **Check result:**
   - Expected: (1 × 9 × 1) × (5 + 0) = 45 credits ✅

### Test Edge Cases:

**High Volume:**
```
L = 100, G = 100, F = 30
Result: (100 × 100 × 30) × (5 + 0) = 1,500,000 credits
```

**With Premium:**
```
L = 10, G = 49, F = 4, M = 10 (change constant)
Result: (10 × 49 × 4) × (5 + 10) = 29,400 credits
```

---

## ⚠️ Important Notes

### Formula Validation:
- Formulas are validated on save
- Invalid formulas will show an error
- Test with sample values before saving

### Performance:
- Formulas calculate in real-time
- No performance impact for simple formulas
- Complex formulas (100+ operations) may be slower

### Error Handling:
- If formula fails, falls back to simple `usage × multiplier`
- Errors are logged to console for debugging
- Sales reps see fallback calculation

### Best Practices:
- ✅ Use descriptive variable names
- ✅ Test formulas with various inputs
- ✅ Document what each variable means
- ✅ Keep formulas as simple as possible
- ❌ Don't use overly complex nested operations
- ❌ Don't divide by variables that could be 0

---

## 🎓 Advanced Examples

### Example 1: Tiered Grid Pricing

**Scenario:** Price increases with grid size

```
Formula: L * F * (G < 25 ? B : B * 1.5)
Ternary not supported yet, use:
Formula: L * F * B * (1 + (G / 100))
```

**Explanation:**
- Base cost scales with grid size
- Larger grids cost proportionally more

### Example 2: Volume Discounts

**Scenario:** Discount for high volume

```
Formula: (L * G * F * B) * (L > 50 ? 0.8 : 1)
Use instead:
Formula: (L * G * F * B) - (L * D)
Where D is a discount constant
```

### Example 3: Multi-Component Pricing

**Scenario:** Base scan + optional features

```
Formula: (L * G * F * B) + (A * 100) + (R * 50)
Where:
A = Additional features enabled (0 or 1)
R = Reports requested (count)
```

---

## 📚 Real-World Use Cases

### 1. Location-Based Services
```
Formula: L * B * (1 + (R / 10))
Variables: L (Locations), R (Radius miles)
Constants: B (Base cost)
```

### 2. Storage + Bandwidth
```
Formula: (S * P1) + (T * P2)
Variables: S (Storage GB), T (Transfer GB)
Constants: P1 (Price per GB storage), P2 (Price per GB transfer)
```

### 3. User Seats + Features
```
Formula: (U * S) + (F * A)
Variables: U (Users), F (Features enabled)
Constants: S (Seat price), A (Add-on price)
```

### 4. API Calls with Tiers
```
Formula: C * (C < 1000 ? P1 : C < 10000 ? P2 : P3)
Simplified: C * P (where P changes based on tier)
Variables: C (Call count)
Constants: P (Price per call)
```

---

## 🆘 Troubleshooting

### Issue: Formula doesn't calculate

**Solution:**
- Check all variable names match in formula
- Verify constants are defined
- Test with simple formula first: `L * B`

### Issue: Result is always 0

**Solution:**
- Check if any input is 0
- Verify formula doesn't divide by 0
- Check constants are not 0

### Issue: Formula shows error in UI

**Solution:**
- Open browser console (F12)
- Look for error message
- Common: typo in variable name
- Fix formula in Settings

### Issue: Can't save formula

**Solution:**
- Formula validation failed
- Check syntax (no special characters)
- Test formula with sample values
- Ensure all variables are defined

---

## 🎉 Summary

You now have **two pricing modes**:

1. **Simple Mode** (Default)
   - Usage × Multiplier = Credits
   - Perfect for straightforward pricing
   - Example: 100 texts × 1 credit = 100 credits

2. **Formula Mode** (New!)
   - Custom formulas with multiple variables
   - Perfect for complex calculations
   - Example: (10 × 49 × 4) × (5 + 0) = 9,800 credits

**Use Simple Mode for:** Most products, straightforward usage-based pricing

**Use Formula Mode for:** Complex scenarios with multiple factors, Search AI advanced features, calculated pricing models

---

## 🚀 Next Steps

1. **Explore the example** in Search AI → "Advanced Scan (Formula)"
2. **Test it** in the calculator
3. **Modify constants** (B and M) to see changes
4. **Create your own formula** for other products
5. **Train your sales team** on when to use formula components

Need help? All formulas are validated and have fallback safety! 🛡️

