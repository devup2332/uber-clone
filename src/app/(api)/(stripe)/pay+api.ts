import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { payment_nethod_id, payment_intent_id, customer_id } = body;
    if (!payment_nethod_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({
          error: "Missing required properties",
        }),
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_nethod_id,
      {
        customer: customer_id,
      },
    );
    console.log({ paymentMethod });

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });
    console.log({ result });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment confirmed",
        result,
      }),
    );
  } catch (error) {
    console.log({ error });

    return new Response(
      JSON.stringify({
        error: error,
        status: 500,
      }),
    );
  }
};