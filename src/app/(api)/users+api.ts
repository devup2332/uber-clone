import { neon } from "@neondatabase/serverless";

export const POST = async (request: Request) => {
  try {
    console.log({ url: process.env.DATABASE_URL });
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();
    console.log({ name, email, clerkId });

    if (!email || !name || !clerkId) {
      return new Response(
        JSON.stringify({
          error: "Missing required properties",
        }),
        {
          status: 400,
        },
      );
    }

    const query = `
      INSERT INTO users (
        name,
        email,
        clerk_id
      )
      VALUES (
        $1,
        $2,
        $3 
      );
      `;

    const response = await sql(query, [name, email, clerkId]);

    return new Response(
      JSON.stringify({
        data: response,
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log({ err });
    return new Response(
      JSON.stringify({
        err,
      }),
      {
        status: 500,
      },
    );
  }
};
