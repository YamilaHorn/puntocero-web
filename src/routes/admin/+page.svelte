<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  // Variables del formulario
  let name = '';
  let price = '';
  let category = 'Botines';
  let description = '';
  let image_url = '';
  let stock_qty = 0;
  let is_on_demand = false;
  let loading = false;

  async function handleAddProduct() {
    // 1. Activamos el estado de carga
    loading = true;
    
    try {
      // 2. Intentamos la inserción en Supabase
      const { error } = await supabase
        .from('products')
        .insert([{ 
          name, 
          price_total: parseFloat(price), 
          category, 
          description, 
          image_url,
          stock_qty: parseInt(stock_qty.toString()),
          is_on_demand
        }]);

      // 3. Si Supabase devuelve un error controlado
      if (error) {
        console.error("Error de Supabase:", error);
        alert('Error de base de datos: ' + error.message);
      } else {
        // Si todo sale bien
        alert('Producto agregado con éxito');
        goto('/admin');
      }

    } catch (err) {
      // 4. Si la conexión se cae o hay un error crítico de JavaScript
      console.error("Error crítico de red o código:", err);
      alert('Error de conexión o de código. Revisá la consola (F12).');
    } finally {
      // 5. PASE LO QUE PASE, desactivamos el cargando para que no se quede congelado
      loading = false;
    }
  }
</script>

<section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
  <div class="max-w-3xl mx-auto">
    
    <div class="mb-10">
      <h1 class="font-heading text-titanium text-4xl uppercase">Nuevo <span class="text-volt">Producto</span></h1>
      <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Carga de inventario — Punto Cero</p>
    </div>

    <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8">
      <form on:submit|preventDefault={handleAddProduct} class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Nombre</label>
          <input bind:value={name} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Precio (ARS)</label>
          <input type="number" bind:value={price} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm" />
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Categoría</label>
          <select bind:value={category} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm">
            <option value="Botines">Botines</option>
            <option value="Zapatillas">Zapatillas</option>
            <option value="Indumentaria">Indumentaria</option>
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Stock Disponible</label>
          <input type="number" bind:value={stock_qty} class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm" />
        </div>

        <div class="flex items-center gap-4 pt-6">
          <input type="checkbox" bind:checked={is_on_demand} class="w-5 h-5 accent-volt" />
          <label class="text-[10px] font-bold text-titanium uppercase tracking-[0.2em]">Producto bajo pedido (On Demand)</label>
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">URL Imagen</label>
          <input bind:value={image_url} required class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm" />
        </div>

        <div class="md:col-span-2">
          <label class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-3">Descripción</label>
          <textarea bind:value={description} rows="3" class="w-full bg-obsidian border border-white/10 text-titanium px-5 py-4 text-sm"></textarea>
        </div>

        <div class="md:col-span-2 flex gap-4 pt-4">
          <button type="submit" disabled={loading} class="flex-1 bg-volt text-obsidian font-black py-5 uppercase hover:bg-white transition-all">
            {loading ? 'Subiendo...' : 'Publicar Producto'}
          </button>
        </div>
      </form>
    </div>
  </div>
</section>