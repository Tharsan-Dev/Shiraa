import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookMiddleware = (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    req.stripeEvent = event;
    next();
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
