import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { MP_ACCESS_TOKEN } from "$env/static/private";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

const client = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});

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

    const payment = new Payment(client);

    const paymentInfo = await payment.get({
      id: paymentId,
    });

    console.log("Estado pago:", paymentInfo.status);
    console.log("Order ID:", paymentInfo.external_reference);


    if (paymentInfo.status === "approved") {

      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          status: "approved",
          payment_id: String(paymentInfo.id),
        })
        .eq(
          "id",
          Number(paymentInfo.external_reference)
        );


      if (error) {
        console.error("Error actualizando orden:", error);
      } else {
        console.log("Orden actualizada correctamente");
      }
    }


    return json({ ok: true });

  } catch (error) {

    console.error("ERROR WEBHOOK:", error);

    return json(
      {
        error: "Error webhook",
      },
      {
        status: 500,
      },
    );
  }
};