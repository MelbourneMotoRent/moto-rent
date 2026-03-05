import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const BOND_AMOUNT = 50000;

export const toCents = (amount: number) => Math.round(amount * 100);
