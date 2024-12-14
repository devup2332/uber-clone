import { neon } from "@neondatabase/serverless";

export const GET = async () => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT * FROM drivers
    `;
    return new Response(
      JSON.stringify({
        data: response,
      }),
    );
  } catch (err) {
    console.log({ err });
    return new Response(
      JSON.stringify({
        error: err,
      }),
      {
        status: 500,
      },
    );
  }
};
