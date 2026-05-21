<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import ProductCard from './ProductCard.svelte';

  // Definimos la estructura de datos que espera tu componente ProductCard
  type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    alt: string;
    inStock: boolean;
  };

  let products: Product[] = [];
  let loading = true;
  let activeCategory = 'TODOS';

  onMount(async () => {
    // Traemos los productos
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error("Error al cargar productos:", error);
    } else if (data) {
      // Usamos 'as any' para ignorar la advertencia de tipos rígidos de Supabase
      products = (data as any[]).map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category ? p.category.trim() : '', // Limpiamos espacios fantasmas
        price: p.price_total,
        image: p.image_url,
        alt: p.name,
        inStock: (p.stock_qty > 0)
      }));
    }
    loading = false;
  });
  
  // Lógica de filtrado ultra robusta
  $: filtered = products.filter(p => {
    const catFiltro = activeCategory.toLowerCase();
    const catProducto = p.category.toLowerCase();

    if (catFiltro === 'todos') return true;
    
    // Si el usuario toca "Fútbol", mostramos los que guardaste como "Botines"
    if (catFiltro === 'fútbol') {
      return catProducto === 'botines';
    }
    
    // Si toca "Running", mostramos las "Zapatillas"
    if (catFiltro === 'running') {
      return catProducto === 'zapatillas';
    }
    
    // Para Basketball, Trail o cualquier otra, compara directo por texto limpio
    return catProducto === catFiltro;
  });
</script>

<section id="catalogo" class="relative bg-obsidian py-24 lg:py-36">
  
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]" />
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
    
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest">// CATÁLOGO</span>
        <h2 class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">
          NUESTROS<br /><span class="text-volt">MODELOS</span>
        </h2>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap mb-10">
      <button 
        type="button"
        on:click={() => activeCategory = 'TODOS'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
          {activeCategory === 'TODOS' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        TODOS
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Running'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
          {activeCategory === 'Running' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Running
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Fútbol'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
          {activeCategory === 'Fútbol' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Fútbol
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Basketball'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
          {activeCategory === 'Basketball' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Basketball
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Trail'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
          {activeCategory === 'Trail' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Trail
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
      {#if loading}
        <p class="text-white/50 p-10 font-mono text-xs uppercase tracking-widest">Cargando catálogo desde Punto Cero...</p>
      {:else}
        {#each filtered as product}
          <ProductCard {product} />
        {/each}
      {/if}
    </div>
    
  </div>
</section>