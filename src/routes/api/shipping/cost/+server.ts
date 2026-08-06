import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { province } = await request.json();

    if (!province) {
      return json(
        {
          error: "Falta la provincia",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar tarifa específica para la provincia
    let { data, error } = await supabaseAdmin
      .from("shipping_rates")
      .select("price")
      .eq("province", province)
      .single();

    // Si no existe, usar "Resto del país"
    if (error || !data) {
      const fallback = await supabaseAdmin
        .from("shipping_rates")
        .select("price")
        .eq("province", "Resto del país")
        .single();

      data = fallback.data;
      error = fallback.error;
    }

    if (error || !data) {
      return json(
        {
          error: "No encontramos costo de envío",
        },
        {
          status: 404,
        }
      );
    }

    return json({
      shippingCost: Number(data.price),
    });

  } catch (error) {
    console.error(error);

    return json(
      {
        error: "Error calculando envío",
      },
      {
        status: 500,
      }
    );
  }
};