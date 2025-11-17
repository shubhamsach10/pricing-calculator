# 🧮 Formula-Based Pricing Guide (Simplified)

## Overview

The pricing calculator now supports **multi-input components with optional formula-based calculations**. This is much simpler than before!

---

## 🎯 How It Works

### 1. **Multiple Input Fields**
Components can have multiple input fields (like L, G, F, B, M) instead of just one.

### 2. **Two Calculation Modes:**

#### **Normal Mode (Default):**
Sum all inputs using their individual multipliers:
```
Total Credits = (L × multiplier₁) + (G × multiplier₂) + (F × multiplier₃) + ...
```

#### **Formula Mode (Optional):**
Use a custom formula with all input variables:
```
Total Credits = (L * G * F) * (B + M)
```

---

## 📋 Example: Advanced Scan Component

### Admin Configuration:

**Component:** Advanced Scan

**Input Fields:**
- `L` - Locations (multiplier: 1.0)
- `G` - Grid Points (multiplier: 1.0)
- `F` - Frequency/Month (multiplier: 1.0)
- `B` - Base Cost (multiplier: 1.0)
- `M` - Model Premium (multiplier: 1.0)

**Formula Checkbox:** ✅ Checked

**Formula:** `(L * G * F) * (B + M)`

---

### Sales Rep View:

When the sales rep opens **Search AI > Advanced Scan**, they see:

```
Advanced Scan [Formula Badge]

┌─────────────────────────────┐
│ Locations (L):        [10]  │
│ Grid Points (G):      [49]  │
│ Frequency/Month (F):  [4]   │
│ Base Cost (B):        [5]   │
│ Model Premium (M):    [0]   │
└─────────────────────────────┘
```

---

### Calculation Result:

**Without Formula (Normal Mode):**
```
Credits = (10 × 1) + (49 × 1) + (4 × 1) + (5 × 1) + (0 × 1)
        = 10 + 49 + 4 + 5 + 0
        = 68 credits
```

**With Formula Mode:**
```
Credits = (L * G * F) * (B + M)
        = (10 * 49 * 4) * (5 + 0)
        = 1,960 * 5
        = 9,800 credits
```

---

## 🔧 Admin Setup Guide

### Step 1: Go to Settings > Products & Multipliers

### Step 2: Find or Create Your Component

### Step 3: Add Multiple Input Fields

Click **"Add Input Field"** and configure each one:

| Variable | Label            | Multiplier |
|----------|------------------|------------|
| L        | Locations        | 1.0        |
| G        | Grid Points      | 1.0        |
| F        | Frequency/Month  | 1.0        |
| B        | Base Cost        | 1.0        |
| M        | Model Premium    | 1.0        |

### Step 4: (Optional) Enable Formula Mode

1. Check **"⚡ Use Advanced Formula (instead of sum)"**
2. Enter your formula: `(L * G * F) * (B + M)`
3. Save!

---

## 💡 Key Benefits

### ✅ Simple for Sales Reps
- Just fill in the input fields
- They don't see or configure formulas
- Clear labels tell them what each field means

### ✅ Flexible for Admins
- Add as many input fields as needed
- Use simple sum mode or complex formulas
- Variables are defined by the input fields themselves

### ✅ No Hardcoding
- All variables come from input fields
- Change variable names anytime in settings
- Formula updates automatically when you change variables

---

## 🚀 Use Cases

### Use Case 1: Location-Based Pricing
```
Inputs: Locations (L), Regions (R)
Formula: L * R * 100
```

### Use Case 2: Volume × Time Calculation
```
Inputs: Users (U), Months (M), Tier (T)
Formula: U * M * T
```

### Use Case 3: Complex Grid Scan
```
Inputs: L (Locations), G (Grid), F (Frequency), B (Base), M (Premium)
Formula: (L * G * F) * (B + M)
```

### Use Case 4: Simple Sum (No Formula)
```
Inputs: SMS (S), Emails (E), Calls (C)
No formula needed!
Credits = (S × 0.1) + (E × 0.05) + (C × 2)
```

---

## ❓ FAQ

**Q: When should I use formula mode?**
A: Use formulas when inputs interact with each other (multiply, divide, etc.). Use normal mode for simple additive pricing.

**Q: Can I mix single-input and multi-input components?**
A: Yes! Simple components can still use a single input field with a multiplier.

**Q: What if I don't add any input fields?**
A: The component works like before - single input × multiplier.

**Q: Can I use constants in formulas?**
A: Yes! Just create input fields for constants (like B and M) and give them default values.

**Q: What math operations are supported?**
A: `+`, `-`, `*`, `/`, `()` for grouping, and standard math functions.

---

## 📝 Summary

| Mode | When to Use | Example |
|------|------------|---------|
| **Single Input** | Simple per-unit pricing | Prompts: 10 × 5 = 50 credits |
| **Multi-Input (Normal)** | Multiple additive charges | SMS + Email + Calls |
| **Multi-Input (Formula)** | Complex calculations | (L × G × F) × (B + M) |

---

**That's it!** 🎉

Configure your input fields in Settings, optionally add a formula, and sales reps can start using it immediately!

