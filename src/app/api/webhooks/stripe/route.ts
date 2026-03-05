import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as any;
      const bookingId = paymentIntent.metadata?.bookingId;

      if (bookingId && paymentIntent.metadata?.type === 'rental_charge') {
        await supabase
          .from('payments')
          .update({ status: 'succeeded' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        await supabase
          .from('bookings')
          .update({ payment_status: 'paid', booking_status: 'confirmed' })
          .eq('id', bookingId);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as any;
      const bookingId = paymentIntent.metadata?.bookingId;

      if (bookingId) {
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        await supabase
          .from('bookings')
          .update({ payment_status: 'failed', booking_status: 'cancelled' })
          .eq('id', bookingId);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as any;
      const paymentIntentId = charge.payment_intent;

      await supabase
        .from('payments')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', paymentIntentId);

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
