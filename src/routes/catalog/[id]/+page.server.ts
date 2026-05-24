import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // 1. Buscamos el producto específico al que el usuario le hizo clic
  const { data: currentProduct } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price_total,
      category,
      is_on_demand,
      product_variants (
        id,
        product_id,
        color,
        size,
        stock_qty,
        images
      )
    `)
    .eq('id', params.id)
    .single();

  if (!currentProduct) {
    throw error(404, 'El modelo no existe en Punto Cero');
  }

  // 2. Buscamos TODOS los productos hermanos (mismo modelo, otros colores)
  const { data: sisterProducts } = await supabase
    .from('products')
    .select(`
      id,
      product_variants (
        id,
        product_id,
        color,
        size,
        stock_qty,
        images
      )
    `)
    .eq('name', currentProduct.name);

  // 3. Juntamos todas las variantes garantizando que viajen con su product_id correcto
  let allVariants: any[] = [];
  
  if (sisterProducts) {
    sisterProducts.forEach((p: any) => {
      if (p.product_variants) {
        const mapped = p.product_variants.map((v: any) => ({
          ...v,
          product_id: v.product_id || p.id
        }));
        allVariants = [...allVariants, ...mapped];
      }
    });
  } else {
    allVariants = (currentProduct.product_variants || []).map((v: any) => ({
      ...v,
      product_id: v.product_id || currentProduct.id
    }));
  }

  // 4. Armamos el objeto final enriquecido para la vista de Svelte
  const finalProduct = {
    ...currentProduct,
    product_variants: allVariants
  };

  return { product: finalProduct };
};