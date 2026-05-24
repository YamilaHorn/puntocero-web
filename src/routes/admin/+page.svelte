<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  type AdminProduct = {
    id: number;
    name: string;
    category: string;
    section: string;
    price_total: number;
    image_url: string;
    stock_qty: number;
    is_on_demand: boolean;
  };

  let loadingCheck: boolean = true;
  let products: AdminProduct[] = [];
  let deleteLoadingId: number | null = null;

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || session.user.user_metadata?.role !== 'admin') {
      alert('Acceso denegado.');
      goto('/');
    } else {
      loadingCheck = false;
      await fetchProducts();
    }
  });

  async function fetchProducts(): Promise<void> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      products = data as AdminProduct[];
    }
  }

  async function handleDelete(id: number, name: string): Promise<void> {
    if (!confirm(`¿Seguro que querés eliminar "${name.toUpperCase()}" de la tienda? Se borrarán también todos sus talles y colores asociados.`)) return;
    
    deleteLoadingId = id;

    try {
      // 1. Borramos primero las variantes hijas para evitar que la base de datos tire el error 500
      const { error: variantDeleteError } = await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', id);

      if (variantDeleteError) throw variantDeleteError;

      // 2. Ahora que no hay dependencias, borramos el producto base de forma segura
      const { error: productDeleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (productDeleteError) throw productDeleteError;

      // 3. Limpiamos el estado local para reflejar el cambio visual al toque
      products = products.filter(p => p.id !== id);

    } catch (err: any) {
      alert('Error en el servidor al eliminar: ' + err.message);
    } finally {
      deleteLoadingId = null;
    }
  }
</script>

{#if loadingCheck}
  <div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">
    VERIFICANDO CREDENCIALES DE ADMINISTRADOR...
  </div>
{:else}
  <section class="min-h-screen bg-obsidian pt-32 pb-20 px-6">
    <div class="max-w-6xl mx-auto">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 class="font-heading text-titanium text-4xl uppercase">Panel <span class="text-volt">Admin</span></h1>
          <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Control General de Stock — Punto Cero</p>
        </div>
        <a href="/admin/add" class="bg-volt text-obsidian text-xs tracking-[0.2em] font-black px-6 py-4 uppercase hover:bg-white transition-all">
          + Add New Product
        </a>
      </div>

      <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-white/10 text-[10px] tracking-widest text-volt uppercase font-mono">
              <th class="p-5">View</th>
              <th class="p-5">Product Details</th>
              <th class="p-5">Category</th>
              <th class="p-5">Section</th>
              <th class="p-5">Price</th>
              <th class="p-5 text-center">Stock</th>
              <th class="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-sm text-titanium">
            {#if products.length === 0}
              <tr>
                <td colspan="7" class="p-10 text-center text-titanium/30 font-mono text-xs uppercase tracking-widest">
                  No hay productos cargados en el inventario.
                </td>
              </tr>
            {/if}
            
            {#each products as item}
              <tr class="hover:bg-white/[0.02] transition-colors">
                <td class="p-5 w-24">
                  <div class="w-16 h-16 bg-obsidian border border-white/10 flex items-center justify-center overflow-hidden">
                    {#if item.image_url}
                      <img src={item.image_url} alt="" class="w-full h-full object-contain p-1" />
                    {:else}
                      <span class="text-[9px] text-white/10">S/F</span>
                    {/if}
                  </div>
                </td>
                
                <td class="p-5">
                  <p class="font-bold text-base uppercase tracking-wide">{item.name}</p>
                  {#if item.is_on_demand}
                    <span class="inline-block bg-volt/10 text-volt border border-volt/20 text-[9px] font-mono font-bold px-2 py-0.5 mt-1 uppercase tracking-wider">Under Demand</span>
                  {/if}
                </td>
                
                <td class="p-5 text-xs text-titanium/60 uppercase tracking-widest font-mono">
                  {item.category}
                </td>

                <td class="p-5 text-xs text-volt uppercase tracking-widest font-mono">
                  {item.section || 'TODOS'}
                </td>
                
                <td class="p-5 font-mono text-volt font-bold">
                  ${item.price_total.toLocaleString('es-AR')}
                </td>
                
                <td class="p-5 text-center font-mono font-bold">
                  <span class={item.stock_qty === 0 && !item.is_on_demand ? 'text-red-500' : 'text-titanium'}>
                    {item.is_on_demand ? '∞' : `${item.stock_qty} u`}
                  </span>
                </td>
                
                <td class="p-5 text-right">
                  <div class="inline-flex gap-3">
                    <a 
                      href="/admin/edit/{item.id}"
                      class="text-[10px] tracking-widest font-bold text-volt hover:text-white border border-volt/20 hover:border-volt/50 bg-volt/5 px-3 py-2 uppercase transition-all"
                    >
                      Edit
                    </a>

                    <button 
                      on:click={() => handleDelete(item.id, item.name)}
                      disabled={deleteLoadingId === item.id}
                      class="text-[10px] tracking-widest font-bold text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/50 bg-red-500/5 px-3 py-2 uppercase transition-all disabled:opacity-40"
                    >
                      {deleteLoadingId === item.id ? 'Eliminando...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    </div>
  </section>
{/if}