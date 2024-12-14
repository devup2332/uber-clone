import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { name, email, amount } = body;
    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({
          error: "Missing required properties",
        }),
      );
    }

    let customer: Stripe.Customer | null = null;
    const existingCustomers = await stripe.customers.list({ email });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      const newCustomer = await stripe.customers.create({
        name,
        email,
      });

      customer = newCustomer;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2024-11-20.acacia" },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "USD",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response = {
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    };

    return Response.json(response);
  } catch (err) {
    console.log({ err });
    return Response.json(err);
  }
};
