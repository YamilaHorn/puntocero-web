<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let loadingCheck: boolean = true;

  // Variables del formulario
  let name: string = '';
  let price: string = '';
  let category: string = 'Botines';
  let section: string = 'Fútbol'; 
  let description: string = '';
  let stock_qty: number = 0;
  let is_on_demand: boolean = false;
  
  // Estados para la imagen
  let image_url: string = '';
  let uploadingImage: boolean = false;
  let loading: boolean = false;

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || session.user.user_metadata?.role !== 'admin') {
      alert('Acceso denegado. No tenés permisos de administrador.');
      goto('/'); 
    } else {
      loadingCheck = false;
    }
  });

  // Función estrella: Sube el archivo a Supabase Storage
  async function uploadImage(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    uploadingImage = true;

    try {
      // Creamos un nombre de archivo único usando la fecha actual para evitar duplicados
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Subimos el archivo físico al bucket 'products-images' que creamos
      const { error: uploadError } = await supabase.storage
        .from('products-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtenemos la URL pública para guardarla en la tabla de productos
      const { data } = supabase.storage
        .from('products-images')
        .getPublicUrl(filePath);

      image_url = data.publicUrl;

    } catch (err: any) {
      alert('Error al subir la imagen: ' + err.message);
      console.error(err);
    } finally {
      uploadingImage = false;
    }
  }

  async function handleAddProduct(): Promise<void> {
    if (!image_url) {
      alert('Por favor, esperá a que la imagen se termine de subir o cargá una.');
      return;
    }

    loading = true;
    try {
      const { error } = await supabase
        .from('products')
        .insert([{ 
          name, 
          price_total: parseFloat(price) || 0, 
          category, 
          section, 
          description, 
          image_url, // Guarda la URL que generó el Storage automáticamente
          stock_qty: parseInt(stock_qty.toString()) || 0,
          is_on_demand
        }]);

      if (error) throw error;

      alert('Producto agregado con éxito');
      goto('/admin'); 

    } catch (err: any) {
      alert('Error de base de datos: ' + err.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loadingCheck}
  <div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">
    VERIFICANDO CREDENCIALES DE ADMINISTRADOR...
  </div>
{:else}
<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-3xl mx-auto">
    
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="font-heading text-titanium text-4xl uppercase">New <span class="text-volt">Product</span></h1>
        <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Carga de inventario — Punto Cero</p>
      </div>
      <a href="/admin" class="border border-white/10 text-white/40 text-[10px] tracking-widest font-bold px-4 py-3 uppercase hover:text-white hover:border-white/30 transition-all">
        ← Back to Panel
      </a>
    </div>

    <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8">
      <form on:submit|preventDefault={handleAddProduct} class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="md:col-span-2">
          <label for="name" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre del Producto</label>
          <input id="name" bind:value={name} required placeholder="EJ: MEDIAS DE FÚTBOL ADIDAS COPA" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 placeholder:text-white/5" />
        </div>

        <div>
          <label for="price" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input id="price" type="number" bind:value={price} required placeholder="0.00" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 placeholder:text-white/5" />
        </div>

        <div>
          <label for="stock" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Stock Disponible</label>
          <input id="stock" type="number" bind:value={stock_qty} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50" />
        </div>

        <div>
          <label for="category" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Tipo de Producto (Categoría)</label>
          <select id="category" bind:value={category} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50">
            <option value="Botines">Botines</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Indumentaria">Indumentaria</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>

        <div>
          <label for="section" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Sección del Catálogo (Deporte)</label>
          <select id="section" bind:value={section} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50">
            <option value="Fútbol">Fútbol</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
            <option value="Trail">Trail</option>
          </select>
        </div>

        <div class="md:col-span-2 flex items-center gap-4 py-2">
          <input id="on-demand" type="checkbox" bind:checked={is_on_demand} class="w-5 h-5 accent-volt cursor-pointer" />
          <label for="on-demand" class="text-[10px] font-bold text-titanium uppercase tracking-[0.2em] cursor-pointer">Producto bajo pedido (On Demand)</label>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Imagen del Producto</label>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div class="md:col-span-2 relative">
              <input 
                type="file" 
                id="file-upload" 
                accept="image/*" 
                on:change={uploadImage} 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div class="w-full bg-obsidian border border-dashed border-white/20 text-white/50 px-5 py-6 text-center text-xs uppercase tracking-wider hover:border-volt/50 hover:text-white transition-all">
                {uploadingImage ? 'Subiendo archivo físico...' : '⚡ Seleccionar o Arrastrar Foto'}
              </div>
            </div>

            <div class="h-20 bg-carbon border border-white/10 flex items-center justify-center overflow-hidden relative">
              {#if image_url}
                <img src={image_url} alt="Preview" class="w-full h-full object-cover" />
              {:else}
                <span class="text-[9px] font-mono text-white/20 uppercase tracking-widest">Sin Foto</span>
              {/if}
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <label for="description" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción</label>
          <textarea id="description" bind:value={description} rows="3" placeholder="Detalles del producto, materiales, talles..." class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 placeholder:text-white/5"></textarea>
        </div>

        <div class="md:col-span-2 flex gap-4 pt-4">
          <button type="submit" disabled={loading || uploadingImage} class="flex-1 bg-volt text-obsidian font-black py-5 text-xs tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 disabled:opacity-30">
            {loading ? 'Publicando...' : uploadingImage ? 'Esperando Imagen...' : 'Publicar Producto'}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
{/if}