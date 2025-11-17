## **Part 1: The Admin Configuration (Settings Page)**

Before the calculator can be used, these parameters must be defined by Sales Ops/Admin.

### **A. Global Parameters**

| Setting | Description | Example Value |
| :---- | :---- | :---- |
| **Currency Base** | The currency of the final quote. | USD ($) |
| **Enterprise Minimum** | The absolute minimum credits a customer must buy per year. | 5,000 Credits |
| **Safety Buffer** | Optional % added to usage estimates to prevent overage. | 10% (Toggleable) |

### **B. Consumption Multipliers (Usage $\\to$ Credits)**

*How much "usage" costs 1 Credit?*

| Product Category | Usage Metric (Driver) | Configurable Multiplier (Credits per Unit) |
| :---- | :---- | :---- |
| **Search AI** | Per Prompt | 5.0 |
|  | Per Report Generated | 50.0 |
|  | Per Additional LLM | 10,000 (Flat fee) |
| **Reviews** | Per Review Aggregated | 2.0 |
| **Chatbot** | Per Conversation Responded | 1.5 |
| **Marketing Auto** | Per Reachable Contact | 0.5 |
| **Mass Texting** | Per Text Sent | 1.0 |
| **Surveys** | Per Survey Received | 3.0 |
| **Ticketing** | Per Ticket Closed | 2.0 |
| **Insights** | Per Review Processed | 0.1 |
|  | Per Survey Processed | 0.1 |
|  | Per Call Processed | 5.0 |
| **Competitors** | Per Review Processed | 0.1 |
|  | Per Social Profile | 500 (Flat fee) |
| **Referrals** | Per Referral Shared | 10.0 |

### **C. Volume Discount Tiers (Credits $\\to$ Dollars)**

*The more credits bought, the cheaper the cost per credit.*

| Tier Name | Min Credits | Max Credits | Price Per Credit |
| :---- | :---- | :---- | :---- |
| **Starter** | 0 | 10,000 | $0.20 |
| **Growth** | 10,001 | 50,000 | $0.15 |
| **Scale** | 50,001 | 250,000 | $0.12 |
| **Enterprise** | 250,001 | $\\infty$ | $0.10 |

---

## **Part 2: The Calculator Logic (The Math)**

The system runs this logic in real-time every time a Sales Rep changes an input.

1\. Calculate Total Credits Needed ($C\_{total}$)

Sum of all (Input Usage \* Component Multiplier).

2\. Apply Minimum Floor

$$Final Credits \= \\max(C\_{total}, Enterprise Minimum)$$  
3\. Determine Price Tier

Look up Final Credits in the Volume Discount Table to find Price\_Per\_Credit.

4\. Calculate Final Price

$$Total Price \= Final Credits \\times Price\\\_Per\\\_Credit$$  
5\. Upsell Handling (If applicable)

If "Upsell" is active:

$$Net Pay \= (New Total Price) \- (Credits Already Owned \\times Old Price)$$  
(Note: This allows the customer to unlock cheaper tiers for their entire account by adding new products).

---

## **Part 3: The User Journey (Sales Rep Flow)**

### **Step 1: Deal Initialization**

**Screen:** *Customer Selection*

1. **Select Customer:** Rep searches for "Acme Corp" (pulls from CRM).  
2. **Select Deal Type:**  
   * Button A: **New Business** (Starts at 0 credits).  
   * Button B: **Upsell / Renewal** (Loads current credit balance if they are on new approach: e.g., 12,000).  
3. **Select Pricing Model:**  
   * Toggle: \[ **Legacy (Locations)** | **New (Credits)** \]  
   * *Action:* Selecting "New" opens the Usage Calculator.

### **Step 2: The Calculator Dashboard**

**Screen:** *Split Screen Layout*

**Left Panel: Product Inputs**

* List of all Birdeye Products (Accordion style).  
* Rep selects products (e.g., "Mass Texting" and "Reviews").  
* Inputs usage estimates based on conversation with client.  
  * *Input:* **Reviews:** "500" (System calc: 1,000 Credits)  
  * *Input:* **Mass Texts:** "20,000" (System calc: 20,000 Credits)

**Right Panel: The Real-Time Ticker**

* **Total Usage Credits:** 21,000  
* **Current Tier:** **Growth** ($0.15/credit)  
* **Est. Annual Cost:** $3,150

### **Step 3: The "Smart Nudge" (Upsell Logic)**

**Screen:** *Visual Toast Notification*

If the user enters usage that results in 48,000 Credits, the system recognizes they are close to the 50,000 "Scale" Tier threshold.

* **UI Notification:**  
  *"You are 2,000 credits away from the **Scale Tier**. If you add \~200 more monthly texts, the price per credit drops from $0.15 to $0.12, saving the client $600\!"*

This prompts the Rep to ask the client: *"Do you think you might actually send a few more texts? It would actually be cheaper overall."*

### **Step 4: Minimum Enforcement**

**Scenario:** The Rep enters very low usage (e.g., 500 credits total).

* **UI Feedback:** The "Total Credits" line turns yellow.  
  *"Note: Usage is below the Enterprise Minimum. Pricing has been defaulted to the floor of **5,000 Credits**."*  
* **Calculated Cost:** Based on 5,000 credits, not 500\.

### **Step 5: Final Review & Quote Generation**

**Screen:** *Summary Page*

The Rep clicks "Generate Quote". The system displays:

1. **Itemized Usage:** Breakdown of usage per product (for transparency).  
2. **Applied Discounts:** Clearly showing the Tier Level achieved.  
3. **Final Contract Value:**  
   * **Credits Purchased:** 50,000  
   * **Rate:** $0.12 (Scale Tier)  
   * **Total:** **$6,000 / year**  
4. **Call to Action:** \[Sync to CRM\] or \[Download PDF\].
