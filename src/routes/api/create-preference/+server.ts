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
  variantId: number;
  color: string;
  size: string;
  quantity: number;

  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;

  shippingCost: number;
  shippingProvince: string;
  shippingCity: string;
  shippingPostalCode: string;

  deliveryMethod: string;
  shippingAddress: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const {
      productId,
      variantId,
      color,
      size,
      quantity,

      buyerName,
      buyerEmail,
      buyerPhone,

      shippingCost,
      shippingProvince,
      shippingCity,
      shippingPostalCode,

      deliveryMethod,
      shippingAddress,
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

    console.log("DATOS CREATE PREFERENCE:", {
  productId,
  variantId,
  color,
  size,
});

    // Buscar variante
    const { data: variant, error: variantError } = await supabaseAdmin
      .from("product_variants")
      .select("id, stock_qty")
      .eq("id", Number(variantId))
      .single();

    if (variantError || !variant) {
      return json({ error: "Variante no encontrada." }, { status: 404 });
    }

    // ¿Es una reserva?
    const esReserva = variant.stock_qty === 0;

    // Precio del producto
    const productPrice = esReserva
      ? Number(product.price_total) / 2
      : Number(product.price_total);

    // Si es reserva no se cobra envío
    const finalShippingCost = esReserva ? 0 : Number(shippingCost);

    // Total del pedido
    const totalAmount = productPrice + finalShippingCost;

    // Crear pedido
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        product_id: product.id,
        variant_id: variant.id,
        product_name: product.name,

        amount: totalAmount,
        quantity,

        color,
        size,

        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_phone: buyerPhone,

        shipping_cost: shippingCost,
        shipping_province: shippingProvince,
        shipping_city: shippingCity,
        shipping_postal_code: shippingPostalCode,

        delivery_method: deliveryMethod,
        shipping_address: shippingAddress,

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

    const items = [
      {
        id: String(product.id),
        title: product.name,
        quantity,
        unit_price: productPrice,
        currency_id: "ARS",
      },
    ];

    if (finalShippingCost > 0) {
      items.push({
        id: "shipping",
        title: "Costo de envío",
        quantity: 1,
        unit_price: finalShippingCost,
        currency_id: "ARS",
      });
    }

    const response = await preference.create({
      body: {
        external_reference: String(order.id),

        notification_url:
          "https://punt0cero.netlify.app/api/mercadopago/webhook",

        items,

        metadata: {
          productId,
          color,
          size,
          esReserva,
        },

        back_urls: {
          success: `https://punt0cero.netlify.app/pago/exito?order_id=${order.id}`,

          failure: `https://punt0cero.netlify.app/pago/error?order_id=${order.id}`,

          pending: `https://punt0cero.netlify.app/pago/pendiente?order_id=${order.id}`,
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
