# Quick Start Guide - Birdeye Pricing Calculator

## 🚀 Application is Running!

Your development server should now be running at: **http://localhost:5173**

## 📱 Application Overview

### Main Features

1. **Calculator Page** (Home)
   - Initialize new deals
   - Select products and enter usage
   - View real-time pricing calculations
   - Get smart tier upgrade suggestions
   - Generate professional quotes

2. **Settings Page**
   - Configure global parameters
   - Manage products and credit multipliers
   - Define pricing tiers
   - All changes persist in browser localStorage

## 🎯 Quick Walkthrough

### Step 1: Initialize a Deal

1. Open the app at http://localhost:5173
2. Enter a customer name (e.g., "Acme Corporation")
3. Select deal type:
   - **New Business**: Starts at 0 credits
   - **Upsell**: Enter existing credit balance and pricing
4. Choose pricing model:
   - **Legacy**: Location-based (placeholder)
   - **Credits**: Usage-based (fully functional)
5. Click "Continue to Calculator"

### Step 2: Select Products & Enter Usage

1. Browse products organized by category:
   - AI & Analytics
   - Reputation Management
   - Customer Engagement
   - Marketing
   - And more...

2. Click on a product to select it (expands automatically)
3. Enter usage estimates for each component:
   - Example: Reviews → 500 reviews aggregated
   - Example: Mass Texting → 20,000 texts sent

4. Watch the **Pricing Summary** panel update in real-time!

### Step 3: Review Calculations

The right panel shows:
- ✅ Total usage credits
- ✅ Current pricing tier
- ✅ Estimated annual cost
- ⚠️  Enterprise minimum warnings
- 💡 Smart nudges for better pricing

### Step 4: Generate Quote

1. Click "Generate Quote" button
2. Review the professional summary with:
   - Itemized usage breakdown
   - Applied discounts and tier information
   - Final contract value
3. Download PDF or Sync to CRM (placeholders for now)

## ⚙️ Configure Settings

### Navigate to Settings

Click "Settings" in the top navigation bar

### Global Parameters Tab

- **Currency Base**: USD (default)
- **Currency Symbol**: $ (default)
- **Enterprise Minimum**: 5,000 credits (adjustable)
- **Safety Buffer**: 10% optional buffer for usage estimates

### Products & Multipliers Tab

- Add/edit/delete products
- Define components for each product
- Set credit multipliers (how many credits per unit)
- Mark flat fees vs. usage-based

### Volume Discount Tiers Tab

- Configure tier names (Starter, Growth, Scale, Enterprise)
- Set min/max credit ranges
- Define price per credit for each tier
- Lower price per credit for higher volumes

**Important**: Click "Save Changes" to persist your configuration!

## 💡 Smart Features

### Tier Threshold Nudges

When a customer is close to the next pricing tier (within 10%), the system shows a beautiful notification:
- "You're X credits away from the Scale Tier!"
- Shows potential savings
- Helps sales reps upsell smartly

### Automatic Minimums

If usage is below enterprise minimum (5,000 credits default):
- Yellow warning appears
- Pricing automatically uses minimum
- Clear explanation shown to sales rep

### Real-time Calculations

Everything updates instantly as you type:
- No need to click "Calculate"
- See tier changes in real-time
- Immediate feedback on pricing impact

## 🎨 UI Highlights

- **Modern Gradient Design**: Beautiful blue primary colors
- **Responsive Layout**: Works on desktop and tablets
- **Smooth Animations**: Professional transitions and hover effects
- **Clear Visual Hierarchy**: Important information stands out
- **Intuitive Navigation**: Easy to learn and use

## 📊 Example Scenario

Try this to test the system:

1. Customer: "Test Company"
2. Deal Type: New Business
3. Pricing Model: Credits
4. Select Products:
   - **Reviews**: 500 reviews → 1,000 credits
   - **Mass Texting**: 20,000 texts → 20,000 credits
   - **Chatbot**: 5,000 conversations → 7,500 credits
5. **Total**: 28,500 credits
6. **Tier**: Growth ($0.15/credit)
7. **Price**: $4,275/year

Now add more to trigger the smart nudge:
- Add **Search AI**: 4,000 prompts → 20,000 credits
- **New Total**: 48,500 credits
- Watch for the smart nudge suggesting you add just 1,500 more credits to reach the Scale tier!

## 🔧 Technical Details

### Built With
- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (utility-first styling)
- React Router (navigation)
- Lucide React (beautiful icons)
- Local Storage (settings persistence)

### File Structure
```
src/
├── components/      # UI components
├── context/         # React Context
├── pages/           # Main pages
├── types/           # TypeScript types
└── utils/           # Helper functions
```

### Key Files
- `src/App.tsx` - Main app with routing
- `src/pages/Calculator.tsx` - Main calculator logic
- `src/pages/Settings.tsx` - Admin configuration
- `src/utils/calculations.ts` - Pricing algorithms
- `src/utils/defaultSettings.ts` - Default configuration

## 🚀 Next Steps

1. **Customize Branding**: Update colors in `tailwind.config.js`
2. **Add Products**: Go to Settings → Products tab
3. **Adjust Tiers**: Configure pricing tiers to match your model
4. **Test Scenarios**: Try different customer types and usage patterns
5. **Integrate CRM**: Add API calls in QuoteSummary component
6. **PDF Generation**: Implement in QuoteSummary component

## 📝 Need Help?

- All settings are saved in browser localStorage
- Use "Reset to Defaults" if something goes wrong
- Check the browser console for any errors
- Refer to README.md for detailed documentation

## 🎉 Enjoy!

Your modern, beautiful pricing calculator is ready to use. Start configuring your settings and create your first quote!

