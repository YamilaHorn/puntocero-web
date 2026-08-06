import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";


export const GET: RequestHandler = async ({ params }) => {

  const id = params.id;


  if (!id) {
    return json(
      { error: "Falta id del pedido" },
      { status: 400 }
    );
  }


  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(`
      id,
      status,
      amount,
      quantity,
      product_name,
      color,
      size,
      buyer_name,
      shipping_cost,
      shipping_province,
      shipping_city,
      shipping_postal_code,
      delivery_method
    `)
    .eq("id", id)
    .single();



  if(error || !data){

    return json(
      {
        error:"Pedido no encontrado"
      },
      {
        status:404
      }
    );

  }


  return json(data);

};