# Birdeye Pricing Calculator

A modern, beautiful React-based pricing calculator for Birdeye's usage-based credit system.

## Features

### 🎯 Core Functionality
- **Dual Pricing Models**: Support for both Legacy (locations) and New (credits-based) pricing
- **Deal Types**: Handle both New Business and Upsell/Renewal scenarios
- **Real-time Calculations**: Instant pricing updates as usage is entered
- **Smart Nudges**: Intelligent notifications when customers are close to better pricing tiers
- **Volume Discounts**: Automatic tier detection based on credit volume

### ⚙️ Admin Configuration
- **Global Parameters**: Configure currency, enterprise minimums, and safety buffers
- **Product Management**: Define products with multiple usage components and credit multipliers
- **Pricing Tiers**: Set up volume-based discount tiers with flexible ranges

### 📊 Sales Features
- **Product Selection**: Easy-to-use accordion interface for selecting products and entering usage
- **Calculation Display**: Real-time pricing summary with tier information
- **Quote Generation**: Professional quote summary with itemized breakdown
- **Minimum Enforcement**: Automatic application of enterprise minimums with visual warnings

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### For Sales Representatives

1. **Initialize a Deal**
   - Enter customer name
   - Select deal type (New Business or Upsell)
   - Choose pricing model (Legacy or Credits)
   - For upsells, enter existing credit balance and price

2. **Configure Products**
   - Select products from the categorized list
   - Enter usage estimates for each component
   - Watch real-time pricing updates in the summary panel

3. **Review Smart Nudges**
   - Pay attention to tier threshold notifications
   - Consider suggesting slightly higher usage for better pricing

4. **Generate Quote**
   - Click "Generate Quote" to see detailed breakdown
   - Download PDF or sync to CRM (placeholder functionality)

### For Admins

1. **Access Settings**
   - Navigate to Settings page via top navigation
   - Configure global parameters (currency, minimums, buffers)

2. **Manage Products**
   - Add/edit/delete products and their components
   - Set credit multipliers for each usage metric
   - Mark flat fees vs. usage-based pricing

3. **Configure Tiers**
   - Define volume discount tiers
   - Set min/max credit ranges
   - Specify price per credit for each tier

4. **Save Changes**
   - Click "Save Changes" to persist configuration
   - Use "Reset to Defaults" if needed

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Local Storage** - Settings persistence

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx
│   ├── DealInitialization.tsx
│   ├── ProductSelector.tsx
│   ├── CalculationDisplay.tsx
│   ├── SmartNudge.tsx
│   └── QuoteSummary.tsx
├── context/            # React Context providers
│   └── SettingsContext.tsx
├── pages/              # Main page components
│   ├── Calculator.tsx
│   └── Settings.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── calculations.ts
│   └── defaultSettings.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Configuration

All settings are stored in browser localStorage and can be reset to defaults at any time.

### Default Products

- Search AI
- Reviews
- Chatbot
- Marketing Automation
- Mass Texting
- Surveys
- Ticketing
- Insights
- Competitors
- Referrals
- Social
- Listings

### Default Pricing Tiers

- **Starter**: 0-10,000 credits @ $0.20/credit
- **Growth**: 10,001-50,000 credits @ $0.15/credit
- **Scale**: 50,001-250,000 credits @ $0.12/credit
- **Enterprise**: 250,001+ credits @ $0.10/credit

## Future Enhancements

- [ ] CRM integration (Salesforce, HubSpot)
- [ ] PDF quote generation with branding
- [ ] Historical quote tracking
- [ ] Multi-currency support
- [ ] Advanced reporting and analytics
- [ ] Email quote delivery
- [ ] Legacy pricing model implementation
- [ ] User authentication and role management

## License

Proprietary - Birdeye © 2025

