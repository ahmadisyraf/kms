import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
};

const prisma = new PrismaClient();

export default async function handler(req = NextResponse, res = NextRequest) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const buf = await buffer(req);
    const body = buf.toString();
    console.log("Received req.body:", req.body);
    console.log("Received signature:", sig);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.json({ message: err.message }, { status: 200 });
    }

    console.log("Constructed event:", event);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve customer details from the session
      const amountPaid = session.amount_total;
      const transactionId = session.id;
      const applicationId = session.customer_details.name;

      // Save billing information to your database
      const saveBilling = await prisma.billing.create({
        data: {
          amount: parseFloat(amountPaid / 100),
          status: "success",
          transactionId: transactionId,
          application: { connect: { id: applicationId } }, // Connect using applicationId
        },
      });

      if (!saveBilling) {
        throw new Error("Something went wrong!");
      }

      console.log("Prisma:", saveBilling);
    }

    return res.json(event, { status: 200 });
  }
}
