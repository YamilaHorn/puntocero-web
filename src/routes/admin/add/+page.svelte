<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let loadingCheck: boolean = true;
  let loading: boolean = false;
  let uploadingImages: boolean = false;

  // Datos generales del producto
  let name: string = '';
  let price: string = '';
  let category: string = 'Botines';
  let section: string = 'Fútbol'; 
  let description: string = '';
  let is_on_demand: boolean = false;

  // 🎨 Unificamos el Color para todo este producto base
  let product_color: string = '';
  // 📷 Contenedor único de fotos para este color específico
  let color_images: string[] = [];

  // 📐 Estructura fija de talles AR con sus respectivas equivalencias US oficiales para calzado deportivo
  interface SizeRow {
    ar: string;
    us: string;
    stock: number;
    enabled: boolean;
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

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || session.user.user_metadata?.role !== 'admin') {
      alert('Acceso denegado.');
      goto('/'); 
    } else {
      loadingCheck = false;
    }
  });

  // Subir el set de imágenes global para el color actual
  async function handleGlobalImages(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    uploadingImages = true;
    const files = Array.from(input.files);
    let uploadedUrls: string[] = [...color_images];

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('products-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('products-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(data.publicUrl);
      } catch (err: any) {
        alert(`Error al subir una de las imágenes: ${err.message}`);
      }
    }

    color_images = uploadedUrls;
    uploadingImages = false;
  }

  async function handleAddProductWithVariants(): Promise<void> {
    // Validar que se haya seleccionado stock en al menos un talle
    const activeVariants = sizeMatrix.filter(v => v.enabled || is_on_demand);
    if (activeVariants.length === 0) {
      alert('Por favor, tildá al menos un talle que tengas en stock.');
      return;
    }

    if (!is_on_demand && color_images.length === 0) {
      alert('Por favor, subí al menos una foto para este modelo de botín.');
      return;
    }

    loading = true;
    try {
      // 1. Insertamos el producto base en Supabase
      const fallbackImage = color_images[0] || '';
      const totalStockCalculated = is_on_demand 
        ? 0 
        : sizeMatrix.reduce((acc, v) => acc + (v.enabled ? (parseInt(v.stock.toString()) || 0) : 0), 0);
      
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert([{ 
          name: name.toUpperCase().trim(), 
          price_total: parseFloat(price) || 0, 
          category, 
          section, 
          description, 
          image_url: fallbackImage,
          stock_qty: totalStockCalculated,
          is_on_demand
        }])
        .select()
        .single();

      if (productError) throw productError;

      // 2. Mapeamos e insertamos la grilla física de variantes asociadas
      // Se guarda con el formato estandarizado "AR X (US Y)" para que la vista lo lea impecable
      const variantsToInsert = (is_on_demand ? sizeMatrix : activeVariants).map(v => ({
        product_id: productData.id,
        color: product_color.toUpperCase().trim(),
        size: `${v.ar} AR (${v.us} US)`,
        stock_qty: is_on_demand ? 0 : (parseInt(v.stock.toString()) || 0),
        images: color_images
      }));

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert);

      if (variantsError) throw variantsError;

      alert('¡Producto y matriz de talles guardados con éxito total! 🚀');
      goto('/admin'); 

    } catch (err: any) {
      alert('Error al guardar datos: ' + err.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loadingCheck}
  <div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">
    CONFIGURANDO NUEVA MATRIZ ADIDAS STYLE...
  </div>
{:else}
<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-5xl mx-auto">
    
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="font-heading text-titanium text-4xl uppercase">New <span class="text-volt">Product Matrix</span></h1>
        <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Carga unificada por Color y Curva de Talles</p>
      </div>
      <a href="/admin" class="border border-white/10 text-white/40 text-[10px] tracking-widest font-bold px-4 py-3 uppercase hover:text-white hover:border-white/30 transition-all">
        ← Volver
      </a>
    </div>

    <form on:submit|preventDefault={handleAddProductWithVariants} class="space-y-8">
      
      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <h2 class="md:col-span-2 text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">1. Información General del Modelo</h2>
        
        <div class="md:col-span-2">
          <label for="name" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre del Modelo</label>
          <input id="name" bind:value={name} required placeholder="EJ: ADIDAS PREDATOR ELITE" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 uppercase" />
        </div>

        <div>
          <label for="price" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input id="price" type="number" bind:value={price} required placeholder="0.00" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50" />
        </div>

        <div>
          <label for="color" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Color de esta Tanda</label>
          <input id="color" bind:value={product_color} required placeholder="EJ: YELLOW/WHITE" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 uppercase" />
        </div>

        <div>
          <label for="category" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Categoría</label>
          <select id="category" bind:value={category} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50">
            <option value="Botines">Botines</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Indumentaria">Indumentaria</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label for="section" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Sección (Deporte)</label>
          <select id="section" bind:value={section} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50">
            <option value="Fútbol">Fútbol</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Trail">Trail</option>
            <option value="Rugby">Rugby</option>
          </select>
        </div>

        <div class="flex items-center gap-4 py-2 md:col-span-2">
          <input id="on-demand" type="checkbox" bind:checked={is_on_demand} class="w-5 h-5 accent-volt cursor-pointer" />
          <label for="on-demand" class="text-[10px] font-bold text-titanium uppercase tracking-[0.2em] cursor-pointer">Producto On Demand (Bajo Pedido — Ignora stock físico)</label>
        </div>

        <div class="md:col-span-2">
          <label for="description" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción</label>
          <textarea id="description" bind:value={description} rows="2" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50"></textarea>
        </div>
      </div>

      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 space-y-4">
        <h2 class="text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">2. Fotos del Color Seleccionado</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div class="md:col-span-2 relative">
            <input type="file" multiple accept="image/*" on:change={handleGlobalImages} class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div class="bg-obsidian border border-dashed border-white/10 text-[10px] text-white/40 p-6 text-center tracking-wider hover:border-volt/30 uppercase rounded-none">
              {uploadingImages ? 'Subiendo archivos multimedia...' : '📷 Arrastrar Fotos de este Color'}
            </div>
          </div>
          <div class="md:col-span-2 flex gap-2 overflow-x-auto py-1">
            {#each color_images as imgUrl}
              <div class="w-16 h-16 bg-obsidian border border-white/10 flex-shrink-0 relative">
                <img src={imgUrl} alt="Vista" class="w-full h-full object-contain p-1" />
              </div>
            {/each}
            {#if color_images.length === 0}
              <span class="text-[9px] font-mono text-white/20 uppercase tracking-widest my-auto">Sin fotos seleccionadas aún</span>
            {/if}
          </div>
        </div>
      </div>

      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 space-y-6">
        <h2 class="text-xs font-mono tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">3. Curva de Talles Disponibles (AR / US)</h2>
        
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
                <label class="block text-[8px] text-white/30 uppercase tracking-wider mb-1">Stock disponible</label>
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
        {loading ? 'Sincronizando Base de Datos...' : uploadingImages ? 'Subiendo archivos multimedia...' : 'Guardar Producto y Variantes'}
      </button>
    </form>
  </div>
</section>
{/if}