<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import ProductCard from './ProductCard.svelte';

  // Ajustamos el tipo de dato para que acepte la estructura con variantes
  type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    images: string[]; // <--- Ahora es un array de fotos para el efecto hover
    alt: string;
    inStock: boolean;
    isOnDemand: boolean;
    sizes: string[];
  };

  let products: Product[] = [];
  let loading = true;
  let activeCategory = 'TODOS';

  onMount(async () => {
    // Traemos los productos junto con sus variantes anidadas
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        category,
        price_total,
        is_on_demand,
        product_variants (
          id,
          size,
          stock_qty,
          images
        )
      `);

    if (error) {
      console.error("Error al cargar productos:", error);
    } else if (data) {
      products = (data as any[]).map((p: any) => {
        const variants = p.product_variants || [];
        
        // Sumamos el stock real de todas sus variantes
        const totalStock = variants.reduce((acc: number, v: any) => acc + (v.stock_qty || 0), 0);
        
        // Extraemos TODAS las imágenes de sus variantes en una sola lista plana
        let allImages: string[] = [];
        variants.forEach((v: any) => {
          if (v.images && Array.isArray(v.images)) {
            allImages = [...allImages, ...v.images];
          }
        });

        // Eliminamos duplicados de links por si usaste las mismas fotos en varios talles
        const uniqueImages = allImages.filter((value, index, self) => self.indexOf(value) === index);

        // Sacamos la lista limpia de talles disponibles sin repetir
        const uniqueSizes = variants
          .map((v: any) => v.size)
          .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index);

        return {
          id: p.id,
          name: p.name,
          category: p.category ? p.category.trim() : '',
          price: p.price_total,
          images: uniqueImages, // Guardamos el array limpio para el hover
          alt: p.name,
          inStock: p.is_on_demand || totalStock > 0,
          isOnDemand: p.is_on_demand,
          sizes: uniqueSizes
        };
      });
    }
    loading = false;
  });
  
  // Tu lógica de filtrado ultra robusta se mantiene intacta
  $: filtered = products.filter(p => {
    const catFiltro = activeCategory.toLowerCase();
    const catProducto = p.category.toLowerCase();

    if (catFiltro === 'todos') return true;
    
    if (catFiltro === 'fútbol') {
      return catProducto === 'botines';
    }
    
    if (catFiltro === 'running') {
      return catProducto === 'zapatillas';
    }
    
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