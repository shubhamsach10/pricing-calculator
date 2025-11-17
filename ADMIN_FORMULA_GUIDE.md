# 🔧 Admin Formula Configuration Guide

**For Admins Only** - Configure advanced calculations that sales reps never see!

---

## 🎯 Overview

### What Sales Reps See:
```
Component Name: Location
Input: [  10  ]  ← Simple input field
Badge: [Advanced]
Result: 490 credits (calculated automatically)
```

### What You Configure (Admin):
```
☑️ Use Advanced Calculation
Formula: (value * 49) * 5
Where: value = what sales rep enters
```

**Sales reps have NO IDEA there's a formula!** They just see a simple input.

---

## 📋 Quick Start

### Step 1: Go to Settings

1. Click **"Settings"** in top navigation
2. Click **"Products & Multipliers"** tab

### Step 2: Find Your Component

1. Scroll to the product (e.g., Search AI)
2. Find or add the component you want

### Step 3: Enable Advanced Calculation

1. Scroll down to **"Advanced Calculation"** section
2. Check **☑️ Use Advanced Calculation (Formula)**
3. Purple section appears!

### Step 4: Enter Your Formula

**Example for your use case:**
```
Formula: (value * 49) * 5

Explanation:
- value = what sales rep enters (number of locations)
- 49 = grid points (7x7)
- 5 = base cost per prompt
```

### Step 5: Save Changes

Click **"Save Changes"** at the top!

---

## 💡 How It Works

### Admin Configures:
```
Component: Location Scan
☑️ Use Advanced Calculation
Formula: (value * 49) * 5
```

### Sales Rep Uses:
```
Location Scan [Advanced]
Enter value: 10
→ Calculates: (10 * 49) * 5 = 2,450 credits
```

**Sales rep only sees:**
- Input field
- "Advanced" badge
- Final credit amount

**They DON'T see:**
- The formula
- Grid points (49)
- Base cost (5)
- Any calculation details

---

## 📐 Formula Syntax

### Use "value" for User Input

The variable `value` (or `V`) represents what the sales rep enters:

```
Formula: value * 100
If sales rep enters: 10
Result: 10 * 100 = 1,000 credits
```

### Mathematical Operations

| Operation | Symbol | Example |
|-----------|--------|---------|
| Add | `+` | `value + 100` |
| Subtract | `-` | `value - 50` |
| Multiply | `*` | `value * 10` |
| Divide | `/` | `value / 2` |
| Power | `^` | `value ^ 2` |
| Parentheses | `()` | `(value + 10) * 5` |

---

## 🎯 Common Formula Patterns

### 1. Your Exact Use Case (Location × Grid × Base)

**Scenario:** Cost = Locations × Grid Points × Base Cost

```
Formula: (value * 49) * 5

Where:
- value = number of locations (sales rep enters)
- 49 = grid points (7×7, fixed)
- 5 = base cost per scan (fixed)

Example:
Sales rep enters: 10 locations
Calculates: (10 * 49) * 5 = 2,450 credits
```

### 2. With Different Grid Sizes

**Scenario:** Different grid size per product

**Product A (3×3 Grid):**
```
Formula: (value * 9) * 5
```

**Product B (7×7 Grid):**
```
Formula: (value * 49) * 5
```

**Product C (10×10 Grid):**
```
Formula: (value * 100) * 5
```

### 3. Volume Discount

**Scenario:** Cheaper per unit at higher volumes

```
Formula: value < 10 ? value * 100 : value * 80

Wait, ternary not supported! Use instead:
Formula: value * (100 - (value * 0.5))

Explanation:
- Small volumes: ~100 credits each
- Large volumes: Gradually cheaper
```

### 4. Base + Premium

**Scenario:** Base cost + optional premium features

```
Formula: (value * 50) + 1000

Explanation:
- value * 50 = usage-based cost
- + 1000 = fixed premium feature cost
```

### 5. Tiered Pricing

**Scenario:** Different rates for different tiers

```
Formula: value * 10 + (value > 50 ? 500 : 0)

Simplified (no ternary):
Formula: (value * 10) + ((value / 50) * 500)

Explanation:
- First 50: 10 credits each
- Above 50: Bonus calculation
```

### 6. Exponential Growth

**Scenario:** Cost scales exponentially

```
Formula: 5 * (value ^ 2)

Example:
value = 10: 5 * (10 ^ 2) = 500
value = 20: 5 * (20 ^ 2) = 2,000
```

---

## 🔢 Real Formula Examples

### Example 1: Search AI Location Scan

**Your exact requirement:**
```
Component Name: Location Scan
Metric: Per Location
☑️ Use Advanced Calculation
Formula: (value * 49) * 5

What it does:
- Sales rep enters number of locations
- Formula multiplies by 49 (7×7 grid)
- Then multiplies by 5 (base cost)
- Result: Total credits for all scans
```

**Test:**
- Input: 1 location → (1 × 49) × 5 = 245 credits
- Input: 10 locations → (10 × 49) × 5 = 2,450 credits
- Input: 100 locations → (100 × 49) × 5 = 24,500 credits

### Example 2: Frequency-Based Pricing

```
Component Name: Monthly Scans
Formula: value * 30 * 5

What it does:
- Sales rep enters scans per day
- Formula converts to monthly (× 30)
- Applies base cost (× 5)
```

### Example 3: Storage with Tiers

```
Component Name: Storage GB
Formula: value * (value < 100 ? 10 : 8)

Simplified:
Formula: value * 10 - (value > 100 ? value * 2 : 0)

Actually, use:
Formula: value * 10

Then create two components:
- Small Storage (0-100 GB): multiplier 10
- Large Storage (100+ GB): multiplier 8
```

---

## 🎨 What Sales Reps See

### Simple Component (No Formula):
```
┌─────────────────────────────┐
│ Mass Texting                │
│ Per Text Sent               │
│ 1.0 credits                 │
│                             │
│ Input: [  1000  ]           │
│ → 1,000 credits             │
└─────────────────────────────┘
```

### Advanced Component (With Formula):
```
┌─────────────────────────────┐
│ Location Scan  [Advanced]   │
│ Per Location                │
│ Formula-based calculation   │
│                             │
│ Input: [  10  ]             │
│ → 2,450 credits             │
└─────────────────────────────┘
```

**They see:**
- ✅ "Advanced" badge
- ✅ "Formula-based calculation" text
- ✅ Simple input field
- ✅ Credit result

**They DON'T see:**
- ❌ The actual formula
- ❌ Internal calculations
- ❌ Constants or variables
- ❌ Any complexity

---

## ✅ Step-by-Step: Add Your Location Formula

### Your Requirement:
```
Total Cost = (Locations × Grid × Frequency) × (Base + Model)
```

### Solution: Create 2 Components

**Component 1: Basic Location Scan**
```
Name: Location Scan
Metric: Number of Locations
Multiplier: 1 (fallback)
☑️ Use Advanced Calculation
Formula: (value * 49) * 5

Explanation:
- value = locations from sales rep
- 49 = fixed grid (7×7)
- 5 = base cost
```

**Component 2: Premium Model Add-on** (if needed)
```
Name: Premium LLM Add-on
Metric: Per Location (with premium)
Multiplier: 1 (fallback)
☑️ Use Advanced Calculation
Formula: (value * 49) * 10

Explanation:
- Same as above but with premium (10 instead of 5)
```

**Or combine both:**
```
Name: Location Scan (Configurable)
Formula: (value * 49) * 5

Then duplicate for premium version
```

---

## 🔄 Testing Your Formula

### Test in Calculator:

1. **Save your formula** in Settings
2. **Go to Calculator** page
3. **Start a new deal**
4. **Select your product**
5. **Enter test values**:
   - Try: 1 (should give expected result)
   - Try: 10 (check calculation)
   - Try: 100 (verify scaling)

### Verify Calculations:

**Formula: (value * 49) * 5**

| Input | Calculation | Expected |
|-------|-------------|----------|
| 1 | (1 × 49) × 5 | 245 |
| 5 | (5 × 49) × 5 | 1,225 |
| 10 | (10 × 49) × 5 | 2,450 |
| 100 | (100 × 49) × 5 | 24,500 |

---

## ⚠️ Important Notes

### Formulas are Admin-Only

- ✅ Configured in Settings
- ✅ Hidden from sales reps
- ✅ Automatically calculated
- ✅ Sales reps only see result

### Formula Limitations

- ❌ No if/else statements (use multiple components)
- ❌ No ternary operators (? :)
- ❌ No complex logic
- ✅ Simple math operations only
- ✅ Parentheses for grouping
- ✅ Standard operators (+, -, *, /, ^)

### Best Practices

1. **Test formulas** before saving
2. **Use descriptive names** for components
3. **Document your formulas** (write what they do)
4. **Keep formulas simple** when possible
5. **Use multiple components** for complex logic

---

## 🎓 Advanced: Multiple Variables

**Currently:** Only `value` (single input)

**Future Enhancement:** Multiple inputs per component

```
Component: Advanced Scan
Inputs:
- Locations (L)
- Grid Size (G)  
- Frequency (F)
Formula: (L * G * F) * 5
```

**For now:** Use separate components or encode values in formula:

```
Component 1: Small Grid Scan
Formula: value * 9 * 5  (3×3 grid)

Component 2: Medium Grid Scan  
Formula: value * 49 * 5  (7×7 grid)

Component 3: Large Grid Scan
Formula: value * 100 * 5  (10×10 grid)
```

---

## 🎉 Summary

### Admin Powers:
- ✅ Configure complex formulas
- ✅ Hide complexity from sales reps
- ✅ Update formulas anytime
- ✅ Test calculations easily

### Sales Rep Experience:
- ✅ Simple input field
- ✅ "Advanced" badge (knows it's special)
- ✅ Instant credit calculation
- ✅ No confusion or complexity

### Your Use Case:
```
Formula: (value * 49) * 5

Sales rep enters: 10 locations
System calculates: (10 × 49) × 5 = 2,450 credits
Sales rep sees: "2,450 credits"
```

**Perfect! 🎯**

---

**Need help with a specific formula? Just ask!**

