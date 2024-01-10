const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { NextRequest, NextResponse } from "next/server";

async function CreateStripeSession(req = NextRequest, res = NextResponse) {
  const { quantity, price, applicationId, email } = req.body;

  try {
    const customer = await stripe.customers.create({
      name: applicationId,
      email: email
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [{ price: price, quantity: quantity }],
      payment_method_types: ["fpx", "card"],
      mode: "payment",
      // allow_promotion_codes: true,
      success_url: `${req.headers.origin}/billing/user/success?success=true`,
      cancel_url: `${req.headers.origin}/billing/user/success?success=false`,
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
}

export default CreateStripeSession;
