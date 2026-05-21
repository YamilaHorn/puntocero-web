<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  export let data: any;

  let loadingCheck: boolean = true;
  let loading: boolean = false;
  let fetchingProduct: boolean = true;
  let uploadingImage: boolean = false;

  // Variables del formulario
  let name: string = '';
  let price: string = '';
  let category: string = '';
  let section: string = ''; 
  let description: string = '';
  let image_url: string = '';
  let stock_qty: number = 0;
  let is_on_demand: boolean = false;

  $: productId = data?.params?.id || data?.id;

  onMount(async () => {
    const idFromUrl = productId || window.location.pathname.split('/').pop();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || session.user.user_metadata?.role !== 'admin') {
      goto('/');
      return;
    }
    loadingCheck = false;

    const { data: prodData, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', idFromUrl)
      .single();

    if (error || !prodData) {
      alert('No se encontró el producto');
      goto('/admin');
    } else {
      name = prodData.name;
      price = prodData.price_total.toString();
      category = prodData.category;
      section = prodData.section || 'TODOS';
      description = prodData.description;
      image_url = prodData.image_url;
      stock_qty = prodData.stock_qty;
      is_on_demand = prodData.is_on_demand;
    }
    fetchingProduct = false;
  });

  // Función para subir nueva imagen en edición
  async function handleImageUpdate(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    uploadingImage = true;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products-images')
        .getPublicUrl(filePath);

      image_url = data.publicUrl;

    } catch (err: any) {
      alert('Error al cambiar la imagen: ' + err.message);
    } finally {
      uploadingImage = false;
    }
  }

  async function handleUpdateProduct(): Promise<void> {
    loading = true;
    const idFromUrl = productId || window.location.pathname.split('/').pop();
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          name, 
          price_total: parseFloat(price), 
          category, 
          section, 
          description, 
          image_url,
          stock_qty: parseInt(stock_qty.toString()),
          is_on_demand
        })
        .eq('id', idFromUrl);

      if (error) throw error;

      alert('Producto actualizado correctamente');
      goto('/admin');
    } catch (err: any) {
      alert('Error al actualizar: ' + err.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loadingCheck || fetchingProduct}
  <div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">
    CARGANDO DATOS DEL PRODUCTO...
  </div>
{:else}
<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-3xl mx-auto">
    
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="font-heading text-titanium text-4xl uppercase">Edit <span class="text-volt">Product</span></h1>
        <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">ID: {productId} — Punto Cero</p>
      </div>
      <a href="/admin" class="border border-white/10 text-white/40 text-[10px] tracking-widest font-bold px-4 py-3 uppercase hover:text-white hover:border-white/30 transition-all">
        ← Cancel
      </a>
    </div>

    <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8">
      <form on:submit|preventDefault={handleUpdateProduct} class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre del Producto</label>
          <input bind:value={name} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input type="number" bind:value={price} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Stock Disponible</label>
          <input type="number" bind:value={stock_qty} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none" />
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
          </select>
        </div>

        <div class="md:col-span-2 flex items-center gap-4 py-2">
          <input type="checkbox" id="demand" bind:checked={is_on_demand} class="w-5 h-5 accent-volt" />
          <label for="demand" class="text-[10px] font-bold text-titanium uppercase tracking-[0.2em]">Producto bajo pedido (On Demand)</label>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Imagen del Producto (Cambiar o actualizar)</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-2 relative">
              <input type="file" accept="image/*" on:change={handleImageUpdate} class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div class="w-full bg-obsidian border border-dashed border-white/20 text-white/50 px-5 py-6 text-center text-xs uppercase tracking-wider hover:border-volt/50 hover:text-white transition-all">
                {uploadingImage ? 'Subiendo nueva foto...' : '🔄 Elegir otra foto del dispositivo'}
              </div>
            </div>
            <div class="h-20 bg-carbon border border-white/10 flex items-center justify-center overflow-hidden">
              {#if image_url}
                <img src={image_url} alt="Current Product" class="w-full h-full object-cover" />
              {/if}
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción</label>
          <textarea bind:value={description} rows="3" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:border-volt/50 outline-none"></textarea>
        </div>

        <div class="md:col-span-2 flex gap-4 pt-4">
          <button type="submit" disabled={loading || uploadingImage} class="flex-1 bg-volt text-obsidian font-black py-5 text-xs tracking-[0.2em] uppercase hover:bg-white transition-all disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
{/if}