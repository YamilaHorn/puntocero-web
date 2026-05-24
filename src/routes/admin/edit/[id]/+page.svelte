<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  export let data: any;

  let loadingCheck: boolean = true;
  let loading: boolean = false;
  let fetchingProduct: boolean = true;
  let uploadingImages: boolean = false;

  // Variables principales del producto
  let name: string = '';
  let price: string = '';
  let category: string = '';
  let section: string = ''; 
  let description: string = '';
  let is_on_demand: boolean = false;

  // 🎨 Manejo del color único y fotos de esta tanda
  let product_color: string = '';
  let color_images: string[] = [];

  // 📐 Estructura fija de la matriz de talles del 38 al 43
  interface SizeRow {
    ar: string;
    us: string;
    stock: number;
    enabled: boolean;
    variantId?: number; // Guardamos el ID de la variante vieja por si existe
  }

  let sizeMatrix: SizeRow[] = [
    { ar: '31', us: '13Y', stock: 0, enabled: false },
    { ar: '32', us: '1Y',  stock: 0, enabled: false },
    { ar: '33', us: '2Y',  stock: 0, enabled: false },
    { ar: '34', us: '3Y',  stock: 0, enabled: false },
    { ar: '35', us: '4Y',  stock: 0, enabled: false },
    { ar: '36', us: '5Y',  stock: 0, enabled: false },
    { ar: '37', us: '6Y',  stock: 0, enabled: false },
    { ar: '38', us: '6.5', stock: 0, enabled: false },
    { ar: '39', us: '7.5', stock: 0, enabled: false },
    { ar: '40', us: '8',   stock: 0, enabled: false },
    { ar: '41', us: '8.5', stock: 0, enabled: false },
    { ar: '42', us: '9.5', stock: 0, enabled: false },
    { ar: '43', us: '10',  stock: 0, enabled: false }
  ];

  $: productId = data?.params?.id || data?.id;

  onMount(async () => {
    const idFromUrl = productId || window.location.pathname.split('/').pop();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || session.user.user_metadata?.role !== 'admin') {
      goto('/');
      return;
    }
    loadingCheck = false;

    // 1. Buscamos el producto base junto con todas sus variantes de talles/colores actuales
    const { data: prodData, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants (
          id,
          color,
          size,
          stock_qty,
          images
        )
      `)
      .eq('id', idFromUrl)
      .single();

    if (error || !prodData) {
      alert('No se encontró el producto en el inventario');
      goto('/admin');
    } else {
      name = prodData.name;
      price = prodData.price_total.toString();
      category = prodData.category;
      section = prodData.section || 'TODOS';
      description = prodData.description;
      is_on_demand = prodData.is_on_demand;

      // Cargamos el color y las imágenes desde la primera variante que encontremos
      const firstVariant = prodData.product_variants?.[0];
      if (firstVariant) {
        product_color = firstVariant.color || '';
        color_images = firstVariant.images || [];
      }

      // Sincronizamos las variantes existentes dentro de la matriz fija 38-43
      if (prodData.product_variants) {
        prodData.product_variants.forEach((v: any) => {
          // Extraemos el talle AR puro (ej: de "41 AR (8.5 US)" saca el "41")
          const cleanAr = v.size.split(' ')[0];
          const matchIndex = sizeMatrix.findIndex(item => item.ar === cleanAr);
          
          if (matchIndex !== -1) {
            sizeMatrix[matchIndex].stock = v.stock_qty;
            sizeMatrix[matchIndex].enabled = v.stock_qty > 0 || is_on_demand;
            sizeMatrix[matchIndex].variantId = v.id;
          }
        });
      }
    }
    fetchingProduct = false;
  });

  // Subir lote de nuevas imágenes rompiendo la caché
  async function handleImagesUpdate(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    uploadingImages = true;
    const files = Array.from(input.files);
    let uploadedUrls: string[] = [...color_images];

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const fileName = `${uniqueId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('products-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('products-images')
          .getPublicUrl(fileName);

        // Agregamos el buster temporal para que impacte visualmente al instante en la web
        uploadedUrls.push(`${data.publicUrl}?t=${Date.now()}`);
      } catch (err: any) {
        alert('Error al subir la imagen: ' + err.message);
      }
    }

    color_images = uploadedUrls;
    uploadingImages = false;
  }

  // Eliminar una foto de la galería actual en el formulario
  function removeImage(indexToRemove: number) {
    color_images = color_images.filter((_, idx) => idx !== indexToRemove);
  }

  async function handleUpdateProduct(): Promise<void> {
    const activeVariants = sizeMatrix.filter(v => v.enabled || is_on_demand);
    if (activeVariants.length === 0) {
      alert('Por favor, tildá al menos un talle con stock disponible.');
      return;
    }

    if (!is_on_demand && color_images.length === 0) {
      alert('El producto debe contener al menos una imagen.');
      return;
    }

    loading = true;
    const idFromUrl = productId || window.location.pathname.split('/').pop();
    
    try {
      // Calcular stock general sumando la matriz activa
      const totalStockCalculated = is_on_demand 
        ? 0 
        : sizeMatrix.reduce((acc, v) => acc + (v.enabled ? (parseInt(v.stock.toString()) || 0) : 0), 0);

      // 1. Actualizamos la tabla de productos principal
      const { error: productError } = await supabase
        .from('products')
        .update({ 
          name: name.toUpperCase().trim(), 
          price_total: parseFloat(price), 
          category, 
          section, 
          description, 
          image_url: color_images[0] || '',
          stock_qty: totalStockCalculated,
          is_on_demand
        })
        .eq('id', idFromUrl);

      if (productError) throw productError;

      // 2. Limpieza y Re-escritura segura de la curva de variantes
      // Primero removemos los talles viejos para evitar duplicación de claves en esta tanda
      await supabase.from('product_variants').delete().eq('product_id', idFromUrl);

      // Armamos el bloque limpio con las especificaciones nuevas
      const variantsToInsert = (is_on_demand ? sizeMatrix : activeVariants).map(v => ({
        product_id: idFromUrl,
        color: product_color.toUpperCase().trim(),
        size: `${v.ar} AR (${v.us} US)`,
        stock_qty: is_on_demand ? 0 : (parseInt(v.stock.toString()) || 0),
        images: color_images
      }));

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert);

      if (variantsError) throw variantsError;

      alert('¡Producto y matriz de variantes editados correctamente!');
      goto('/admin');
    } catch (err: any) {
      alert('Error al actualizar los cambios: ' + err.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loadingCheck || fetchingProduct}
  <div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">
    SINCRONIZANDO CURVAS DE DISEÑO...
  </div>
{:else}
<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-5xl mx-auto">
    
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="font-heading text-titanium text-4xl uppercase">Edit <span class="text-volt">Matrix Edition</span></h1>
        <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Re-estructurar producto base — Punto Cero</p>
      </div>
      <a href="/admin" class="border border-white/10 text-white/40 text-[10px] tracking-widest font-bold px-4 py-3 uppercase hover:text-white hover:border-white/30 transition-all">
        ← Cancelar
      </a>
    </div>

    <form on:submit|preventDefault={handleUpdateProduct} class="space-y-8">
      
      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <h2 class="md:col-span-2 text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">1. Detalles Básicos</h2>
        
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre del Modelo</label>
          <input bind:value={name} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none uppercase" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input type="number" bind:value={price} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Color de esta Variante</label>
          <input bind:value={product_color} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none uppercase" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Categoría</label>
          <select bind:value={category} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm outline-none">
            <option value="Botines">Botines</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Indumentaria">Indumentaria</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Sección (Deporte)</label>
          <select bind:value={section} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm outline-none">
            <option value="Fútbol">Fútbol</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Trail">Trail</option>
            <option value="Rugby">Rugby</option>
          </select>
        </div>

        <div class="md:col-span-2 flex items-center gap-4 py-2">
          <input type="checkbox" id="demand" bind:checked={is_on_demand} class="w-5 h-5 accent-volt cursor-pointer" />
          <label for="demand" class="text-[10px] font-bold text-titanium uppercase tracking-[0.2em] cursor-pointer">Producto bajo pedido (On Demand — Ignora stock físico)</label>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción</label>
          <textarea bind:value={description} rows="2" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none"></textarea>
        </div>
      </div>

      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 space-y-4">
        <h2 class="text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">2. Galería Multimedia del Color</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div class="md:col-span-2 relative">
            <input type="file" multiple accept="image/*" on:change={handleImagesUpdate} class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div class="w-full bg-obsidian border border-dashed border-white/20 text-white/40 p-6 text-center text-[10px] uppercase tracking-wider hover:border-volt/30">
              {uploadingImages ? 'Subiendo archivos multimedia...' : '📷 Cargar / Agregar Fotos'}
            </div>
          </div>
          <div class="md:col-span-2 flex gap-2 overflow-x-auto py-1">
            {#each color_images as imgUrl, idx}
              <div class="w-16 h-16 bg-obsidian border border-white/10 flex-shrink-0 relative group">
                <img src={imgUrl} alt="Vista" class="w-full h-full object-contain p-1" />
                <button type="button" on:click={() => removeImage(idx)} class="absolute inset-0 bg-red-600/90 text-white font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  Borrar
                </button>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 space-y-6">
        <h2 class="text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">3. Configurar Curva de Talles Actuales</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {#each sizeMatrix as row}
            <div class="p-4 border transition-all flex flex-col justify-between h-28
              {row.enabled ? 'bg-obsidian border-volt/40' : 'bg-obsidian/40 border-white/5 opacity-50'}">
              
              <div class="flex justify-between items-center">
                <span class="font-mono text-xs font-bold text-titanium">
                  {row.ar} AR <span class="text-white/40 text-[10px]">({row.us} US)</span>
                </span>
                <input 
                  type="checkbox" 
                  bind:checked={row.enabled} 
                  disabled={is_on_demand}
                  class="w-4 h-4 accent-volt cursor-pointer" 
                />
              </div>

              <div class="mt-2">
                <label class="block text-[8px] text-white/30 uppercase tracking-wider mb-1">Stock de este talle</label>
                <input 
                  type="number" 
                  min="0" 
                  bind:value={row.stock} 
                  disabled={!row.enabled || is_on_demand} 
                  class="w-full bg-carbon border border-white/10 text-titanium text-xs px-2 py-1.5 focus:outline-none focus:border-volt/30 disabled:opacity-25" 
                />
              </div>
            </div>
          {/each}
        </div>
      </div>

      <button type="submit" disabled={loading || uploadingImages} class="w-full bg-volt text-obsidian font-black py-5 text-xs tracking-[0.2em] uppercase hover:bg-white transition-all disabled:opacity-30">
        {loading ? 'Sincronizando Cambios...' : 'Guardar Cambios Actualizados'}
      </button>
    </form>
  </div>
</section>
{/if}