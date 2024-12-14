import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (request: Request) => {
  const { amount } = await request.json();
  if (!amount) {
    return Response.json(
      {
        error: "Missing required properties",
      },
      { status: 400 },
    );
  }
  try {
    const customer = await stripe.customers.create();
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-11-20.acacia" },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "PEN",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const response = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };
    return Response.json(response);
  } catch (error) {
    console.log({ error });
    return Response.json({ error }, { status: 500 });
  }
};
