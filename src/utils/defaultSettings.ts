import { AppSettings } from '../types';

export const defaultSettings: AppSettings = {
  global: {
    currencyBase: 'USD',
    currencySymbol: '$',
    enterpriseMinimum: 5000,
    safetyBuffer: 10,
    safetyBufferEnabled: false,
  },
  products: [
    {
      id: 'search-ai',
      name: 'Search AI',
      category: 'AI & Analytics',
      components: [
        { name: 'Prompts', metric: 'Per Prompt', multiplier: 5.0 },
        { name: 'Reports', metric: 'Per Report Generated', multiplier: 50.0 },
        { name: 'Additional LLMs', metric: 'Per Additional LLM', multiplier: 10000, isFlat: true },
      ],
    },
    {
      id: 'reviews',
      name: 'Reviews',
      category: 'Reputation Management',
      components: [
        { name: 'Reviews Aggregated', metric: 'Per Review Aggregated', multiplier: 2.0 },
      ],
    },
    {
      id: 'chatbot',
      name: 'Chatbot',
      category: 'Customer Engagement',
      components: [
        { name: 'Conversations', metric: 'Per Conversation Responded', multiplier: 1.5 },
      ],
    },
    {
      id: 'marketing-auto',
      name: 'Marketing Automation',
      category: 'Marketing',
      components: [
        { name: 'Reachable Contacts', metric: 'Per Reachable Contact', multiplier: 0.5 },
      ],
    },
    {
      id: 'mass-texting',
      name: 'Mass Texting',
      category: 'Communication',
      components: [
        { name: 'Texts Sent', metric: 'Per Text Sent', multiplier: 1.0 },
      ],
    },
    {
      id: 'surveys',
      name: 'Surveys',
      category: 'Feedback',
      components: [
        { name: 'Surveys Received', metric: 'Per Survey Received', multiplier: 3.0 },
      ],
    },
    {
      id: 'ticketing',
      name: 'Ticketing',
      category: 'Support',
      components: [
        { name: 'Tickets Closed', metric: 'Per Ticket Closed', multiplier: 2.0 },
      ],
    },
    {
      id: 'insights',
      name: 'Insights',
      category: 'Analytics',
      components: [
        { name: 'Reviews Processed', metric: 'Per Review Processed', multiplier: 0.1 },
        { name: 'Surveys Processed', metric: 'Per Survey Processed', multiplier: 0.1 },
        { name: 'Calls Processed', metric: 'Per Call Processed', multiplier: 5.0 },
      ],
    },
    {
      id: 'competitors',
      name: 'Competitors',
      category: 'Market Intelligence',
      components: [
        { name: 'Reviews Processed', metric: 'Per Review Processed', multiplier: 0.1 },
        { name: 'Social Profiles', metric: 'Per Social Profile', multiplier: 500, isFlat: true },
      ],
    },
    {
      id: 'referrals',
      name: 'Referrals',
      category: 'Growth',
      components: [
        { name: 'Referrals Shared', metric: 'Per Referral Shared', multiplier: 10.0 },
      ],
    },
    {
      id: 'social',
      name: 'Social',
      category: 'Social Media',
      components: [
        { name: 'Profiles/Handles', metric: 'Per Profile/Handle', multiplier: 50.0 },
      ],
    },
    {
      id: 'listings',
      name: 'Listings',
      category: 'Business Management',
      components: [
        { name: 'Locations', metric: 'Per Location', multiplier: 100.0 },
      ],
    },
  ],
  tiers: [
    {
      name: 'Starter',
      minCredits: 0,
      maxCredits: 10000,
      pricePerCredit: 0.20,
    },
    {
      name: 'Growth',
      minCredits: 10001,
      maxCredits: 50000,
      pricePerCredit: 0.15,
    },
    {
      name: 'Scale',
      minCredits: 50001,
      maxCredits: 250000,
      pricePerCredit: 0.12,
    },
    {
      name: 'Enterprise',
      minCredits: 250001,
      maxCredits: null,
      pricePerCredit: 0.10,
    },
  ],
};

