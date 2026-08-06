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
    console.log(
      "Order ID:",
      paymentInfo.external_reference
    );


    const orderId = Number(paymentInfo.external_reference);


    if (!orderId) {
      console.error("No existe external_reference");
      return json({ ok: true });
    }



    // Buscar orden
    const { data: order, error: orderFetchError } =
      await supabaseAdmin
        .from("orders")
        .select(
          "id, variant_id, quantity, is_reservation, status"
        )
        .eq("id", orderId)
        .single();



    if (orderFetchError || !order) {

      console.error(
        "No se encontró la orden:",
        orderFetchError
      );

      return json({ ok: true });

    }



    // Guardar siempre el estado del pago
    const { error: updateError } =
      await supabaseAdmin
        .from("orders")
        .update({
          status: paymentInfo.status,
          payment_id: String(paymentInfo.id),
          merchant_order_id: String(
            paymentInfo.order?.id ?? ""
          ),
        })
        .eq("id", orderId);



    if (updateError) {

      console.error(
        "Error actualizando orden:",
        updateError
      );

    }



    // Si no fue aprobado, termina acá
    if (paymentInfo.status !== "approved") {

      console.log(
        "Pago no aprobado:",
        paymentInfo.status
      );

      return json({ ok: true });

    }



    // Evitar descontar stock dos veces
    if (order.status === "approved") {

      console.log(
        "Orden ya procesada. No se modifica stock."
      );

      return json({ ok: true });

    }



    // Si es reserva no baja stock
    if (order.is_reservation) {

      console.log(
        "Reserva confirmada. No se descuenta stock."
      );


      return json({ ok: true });

    }



    // Buscar variante para actualizar stock
    const { data: variant, error: variantError } =
      await supabaseAdmin
        .from("product_variants")
        .select("stock_qty")
        .eq("id", order.variant_id)
        .single();



    if (variantError || !variant) {

      console.error(
        "Error buscando variante:",
        variantError
      );


      return json({ ok: true });

    }



    const nuevoStock =
      variant.stock_qty - order.quantity;



    const { error: stockError } =
      await supabaseAdmin
        .from("product_variants")
        .update({
          stock_qty: nuevoStock < 0 ? 0 : nuevoStock,
        })
        .eq(
          "id",
          order.variant_id
        );



    if (stockError) {

      console.error(
        "Error actualizando stock:",
        stockError
      );

    } else {

      console.log(
        "Stock actualizado:",
        nuevoStock
      );

    }



    return json({ ok: true });



  } catch (error) {

    console.error(
      "ERROR WEBHOOK:",
      error
    );


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