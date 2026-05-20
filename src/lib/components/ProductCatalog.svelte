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
  const categories = ['TODOS', 'Running', 'Fútbol', 'Basketball', 'Trail'];

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
        category: p.category,
        price: p.price_total,
        image: p.image_url,
        alt: p.name,
        inStock: (p.stock_qty > 0)
      }));
    }
    loading = false;
  });
  // Lógica de filtrado
  $: filtered = activeCategory === 'TODOS'
    ? products
    : products.filter(p => p.category === activeCategory);
</script>

<section id="catalogo" class="relative bg-obsidian py-24 lg:py-36">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest">// CATÁLOGO</span>
        <h2 class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">
          NUESTROS<br /><span class="text-volt">MODELOS</span>
        </h2>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap mb-10">
      {#each categories as cat}
        <button on:click={() => activeCategory = cat}
                class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
                  {activeCategory === cat ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}">
          {cat}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
      {#if loading}
        <p class="text-white/50 p-10">Cargando catálogo desde Punto Cero...</p>
      {:else}
        {#each filtered as product (product.id)}
          <ProductCard {product} />
        {/each}
      {/if}
    </div>
  </div>
</section>