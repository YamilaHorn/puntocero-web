<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let name = '';
  let price = '';
  let category = 'Botines';
  let description = '';
  let image_url = '';
  let loading = false;

  async function handleAddProduct() {
    loading = true;
    
    const { error } = await supabase
      .from('products')
      .insert([{ 
        name, 
        price: parseFloat(price), 
        category, 
        description, 
        image_url 
      }]);

    if (error) {
      alert('Error al subir el producto');
      console.error(error);
    } else {
      goto('/admin'); // Volver al panel principal
    }
    loading = false;
  }
</script>

<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-3xl mx-auto">
    
    <div class="flex items-center gap-4 mb-10">
      <div class="w-12 h-12 bg-volt flex items-center justify-center rounded-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-obsidian" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </div>
      <div>
        <h1 class="font-heading text-titanium text-3xl md:text-4xl uppercase leading-none">Nuevo <span class="text-volt">Producto</span></h1>
        <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Carga de inventario — Punto Cero</p>
      </div>
    </div>

    <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      <form on:submit|preventDefault={handleAddProduct} class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre del Botín / Zapatilla</label>
          <input 
            bind:value={name}
            placeholder="EJ: NIKE MERCURIAL AIR ZOOM"
            required
            class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/5"
          />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input 
            type="number"
            bind:value={price}
            placeholder="0.00"
            required
            class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors"
          />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Categoría</label>
          <select 
            bind:value={category}
            class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors appearance-none"
          >
            <option value="Botines">Botines</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Indumentaria">Indumentaria</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">URL de la Imagen</label>
          <input 
            bind:value={image_url}
            placeholder="https://tu-imagen.com/foto.jpg"
            required
            class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/5"
          />
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción técnica</label>
          <textarea 
            bind:value={description}
            rows="4"
            placeholder="DETALLES DE TRACCIÓN, MATERIAL, ETC..."
            class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/5 resize-none"
          ></textarea>
        </div>

        <div class="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            class="flex-1 bg-volt text-obsidian font-black text-xs tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 uppercase disabled:opacity-50"
          >
            {loading ? 'Subiendo...' : 'Publicar Producto'}
          </button>
          
          <button 
            type="button"
            on:click={() => goto('/admin')}
            class="flex-1 border border-white/10 text-titanium/50 font-bold text-xs tracking-[0.3em] py-5 hover:bg-white/5 transition-all duration-300 uppercase"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</section>