# ✨ Simple Formula Guide (New Approach)

## 🎯 How It Works Now

### Step 1: Add Components (Normal Fields)

Each component is just a normal input field with:
- **Name** (e.g., "Locations", "Grid Points")
- **Variable** (optional, e.g., "L", "G") - Used for formulas
- **Metric** (e.g., "Per Location")
- **Multiplier** (e.g., 1.0, 5.0)

### Step 2: Choose Calculation Mode (Product Level)

At the **product level**, choose how to calculate credits:

#### ☐ Simple Mode (Default)
Sum all components normally:
```
Total = (Locations × 1.0) + (Grid Points × 1.0) + (Frequency × 1.0)
```

#### ☑️ Advanced Formula Mode
Use a custom formula with all component variables:
```
Total = (L × G × F) × (B + M)
```

---

## 📋 Example: Search AI Product

### Admin Configuration (Settings):

**Product:** Search AI

**Components:**
| Name | Variable | Metric | Multiplier |
|------|----------|--------|------------|
| Locations | L | Per Location | 1.0 |
| Grid Points | G | Per Grid Point | 1.0 |
| Frequency | F | Scans per Month | 1.0 |
| Base Cost | B | Per Prompt | 5.0 |
| Model Premium | M | Additional LLM Cost | 10.0 |

**Calculation Mode:** ☑️ Advanced Formula

**Formula:** `(L * G * F) * (B + M)`

---

### Sales Rep View (Calculator):

When sales rep selects **Search AI**, they see:

```
⚡ Advanced Formula Mode Active
Fill in all variables below. Credits calculated using formula.

┌──────────────────────────────────────┐
│ Locations [L]         Input: [10]    │
│ Grid Points [G]       Input: [49]    │
│ Frequency [F]         Input: [4]     │
│ Base Cost [B]         Input: [5]     │
│ Model Premium [M]     Input: [0]     │
└──────────────────────────────────────┘
```

**Calculation:**
```
Credits = (L * G * F) * (B + M)
        = (10 * 49 * 4) * (5 + 0)
        = 1,960 * 5
        = 9,800 credits
```

---

## 🔧 Admin Setup Steps

### 1. Go to Settings → Products & Multipliers

### 2. Find or Create Your Product

### 3. Add Components

Click **"+ Add Component"** for each input you need:

```
Component 1:
- Name: Locations
- Variable: L
- Metric: Per Location
- Multiplier: 1.0

Component 2:
- Name: Grid Points  
- Variable: G
- Metric: Per Grid Point
- Multiplier: 1.0

... (add more components)
```

### 4. (Optional) Enable Advanced Formula

Scroll to bottom of product configuration:

1. Check **"⚡ Use Advanced Formula for this Product"**
2. See available variables: `L, G, F, B, M`
3. Enter your formula: `(L * G * F) * (B + M)`
4. Click **"Save Changes"**

---

## 💡 Key Differences from Before

### Before (Complex):
```
❌ Add Input Field buttons within components
❌ Each component had multiple input fields
❌ Formula per component
❌ Confusing UI
```

### Now (Simple):
```
✅ Each component = ONE field + variable name
✅ Normal components with optional variables
✅ Formula at PRODUCT level
✅ Clean, intuitive UI
```

---

## 🚀 Use Cases

### Use Case 1: Simple Sum (No Formula)

**Product:** Reviews  
**Components:**
- Reviews Aggregated (multiplier: 2.0)

**Mode:** ☐ Simple  
**Calculation:** `Reviews × 2.0 = Total Credits`

---

### Use Case 2: Advanced Formula

**Product:** Search AI  
**Components:**
- Locations (L, multiplier: 1.0)
- Grid Points (G, multiplier: 1.0)
- Frequency (F, multiplier: 1.0)
- Base Cost (B, multiplier: 5.0)
- Model Premium (M, multiplier: 10.0)

**Mode:** ☑️ Advanced Formula: `(L * G * F) * (B + M)`

**Input:** L=10, G=49, F=4, B=5, M=0  
**Result:** `(10 * 49 * 4) * (5 + 0) = 9,800 credits`

---

## ❓ FAQ

**Q: When should I add variable names to components?**  
A: Only if you want to use advanced formula mode. For simple sum mode, variables are optional.

**Q: Can I mix products with and without formulas?**  
A: Yes! Some products can use simple mode, others can use advanced formulas.

**Q: What if I don't enable formula mode?**  
A: The product works normally - summing all component values × multipliers.

**Q: Can I use the same variable name in different products?**  
A: Yes! Variables are scoped to each product independently.

**Q: What math operations work in formulas?**  
A: `+`, `-`, `*`, `/`, `()` for grouping

---

## 📊 Comparison Table

| Feature | Simple Mode | Advanced Formula Mode |
|---------|-------------|----------------------|
| **Configuration** | Normal components | Components + variables |
| **Calculation** | Sum (value × multiplier) | Custom formula |
| **Sales Rep View** | Normal inputs | Inputs with variable badges |
| **Use Case** | Standard pricing | Complex calculations |
| **Example** | `10 × 2 = 20` | `(L * G * F) * (B + M)` |

---

## ✅ Summary

1. **Add components** (each is just ONE field)
2. **Assign variables** (optional, like L, G, F)
3. **Choose mode**:
   - Simple: Sum all components
   - Advanced: Write formula with variables
4. **Sales reps see** clean inputs with variable badges

**That's it!** Much simpler than before! 🎉

---

**Test it now:** Go to Calculator → Search AI → Fill in the 5 fields → See formula in action!

