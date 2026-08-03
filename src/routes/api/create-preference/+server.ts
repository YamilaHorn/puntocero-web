import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { MP_ACCESS_TOKEN } from "$env/static/private";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

const client = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});

interface CreatePreferenceBody {
  productId: number;
  color: string;
  size: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const {
      productId,
      color,
      size,
      quantity,
      buyerName,
      buyerEmail,
      buyerPhone,
    } = (await request.json()) as CreatePreferenceBody;

    // Buscar producto
    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, name, price_total")
      .eq("id", Number(productId))
      .single();

    if (productError || !product) {
      return json({ error: "Producto no encontrado." }, { status: 404 });
    }

    // Buscar la variante seleccionada
    const { data: variant, error: variantError } = await supabaseAdmin
      .from("product_variants")
      .select("id, stock_qty")
      .eq("product_id", Number(productId))
      .eq("color", color)
      .eq("size", size)
      .single();

    if (variantError || !variant) {
      return json({ error: "Variante no encontrada." }, { status: 404 });
    }

    // ¿Es una reserva?
    const esReserva = variant.stock_qty === 0;

    // Precio a cobrar
    const price = esReserva
      ? Number(product.price_total) / 2
      : Number(product.price_total);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        product_id: product.id,
        variant_id: variant.id,
        product_name: product.name,

        amount: price,
        quantity,

        color,
        size,

        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_phone: buyerPhone,

        is_reservation: esReserva,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);

      return json(
        {
          error: "No se pudo crear el pedido",
        },
        {
          status: 500,
        },
      );
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        external_reference: String(order.id),

         notification_url:
          "https://punt0cero.netlify.app/api/mercadopago/webhook",
         
        items: [
          {
            id: String(product.id),
            title: product.name,
            quantity,
            unit_price: price,
            currency_id: "ARS",
          },
        ],
        metadata: {
          productId,
          color,
          size,
          esReserva,
        },
        back_urls: {
          success: "https://punt0cero.netlify.app/pago/exito",
          failure: "https://punt0cero.netlify.app/pago/error",
          pending: "https://punt0cero.netlify.app/pago/pendiente",
        },

        auto_return: "approved",
      },
    });

    return json({
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("ERROR CREATE PREFERENCE:", error);

    return json(
      {
        error: "Error al crear la preferencia",
      },
      {
        status: 500,
      },
    );
  }
};
