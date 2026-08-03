import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    console.log("Webhook recibido:");
    console.log(JSON.stringify(body, null, 2));

    const paymentId = body?.data?.id;

    if (!paymentId) {
      return json({ ok: true });
    }

    console.log("Payment ID:", paymentId);

    return json({ ok: true });
  } catch (error) {
    console.error(error);

    return json(
      {
        error: "Error en webhook",
      },
      {
        status: 500,
      },
    );
  }
};