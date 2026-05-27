import { s as supabase } from "../../../../chunks/supabase.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  const { data: currentProduct } = await supabase.from("products").select(`
      id,
      name,
      price_total,
      category,
      description,
      is_on_demand,
      product_variants (
        id,
        product_id,
        color,
        size,
        stock_qty,
        images
      )
    `).eq("id", params.id).single();
  if (!currentProduct) {
    throw error(404, "El modelo no existe en Punto Cero");
  }
  const { data: sisterProducts } = await supabase.from("products").select(`
      id,
      product_variants (
        id,
        product_id,
        color,
        size,
        stock_qty,
        images
      )
    `).eq("name", currentProduct.name);
  let allVariants = [];
  if (sisterProducts) {
    sisterProducts.forEach((p) => {
      if (p.product_variants) {
        const mapped = p.product_variants.map((v) => ({
          ...v,
          product_id: v.product_id || p.id
        }));
        allVariants = [...allVariants, ...mapped];
      }
    });
  } else {
    allVariants = (currentProduct.product_variants || []).map((v) => ({
      ...v,
      product_id: v.product_id || currentProduct.id
    }));
  }
  const finalProduct = {
    ...currentProduct,
    product_variants: allVariants
  };
  return { product: finalProduct };
};
export {
  load
};
