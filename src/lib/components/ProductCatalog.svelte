<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import ProductCard from './ProductCard.svelte';

  type Product = {
    id: number;
    name: string;
    category: string;
    section: string;
    price: number;
    original_price?: number | null; // 👈 1. AGREGADO AL TIPO
    images: string[];
    alt: string;
    inStock: boolean;
    isOnDemand: boolean;
    sizes: string[];
    quality_type: string;
    product_variants: any[]; 
    stud_type?: string;      
    lace_type?: string;      
  };

  let products: Product[] = [];
  let loading = true;
  let activeCategory = 'TODOS'; 

  onMount(async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        category,
        section, 
        price_total,
        original_price, 
        is_on_demand,
        quality_type,
        stud_type,    
        lace_type,    
        product_variants (
          id,
          size,
          stock_qty,
          images
        )
      `); // 👈 2. AGREGADO 'original_price' A LA CONSULTA DE SUPABASE

    if (error) {
      console.error("Error al cargar productos:", error);
    } else if (data) {
      products = (data as any[]).map((p: any) => {
        const variants = p.product_variants || [];
        const totalStock = variants.reduce((acc: number, v: any) => acc + (v.stock_qty || 0), 0);
        
        let allImages: string[] = [];
        variants.forEach((v: any) => {
          if (v.images && Array.isArray(v.images)) {
            allImages = [...allImages, ...v.images];
          }
        });

        const uniqueImages = allImages.filter((value, index, self) => self.indexOf(value) === index);
        const uniqueSizes = variants
          .map((v: any) => v.size)
          .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index);

        return {
          id: p.id,
          name: p.name,
          category: p.category ? p.category.trim() : '',
          section: p.section ? p.section.trim() : 'Urbano', 
          price: p.price_total,
          original_price: p.original_price, // 👈 3. MAPEO CORRECTO
          images: uniqueImages, 
          alt: p.name,
          inStock: p.is_on_demand || totalStock > 0,
          isOnDemand: p.is_on_demand,
          sizes: uniqueSizes,
          quality_type: p.quality_type ? p.quality_type.trim() : 'G5',
          product_variants: variants, 
          stud_type: p.stud_type || '',
          lace_type: p.lace_type || ''
        };
      });
    }
    loading = false;
  });
  
  $: filtered = products.filter(p => {
    const filtro = activeCategory.toLowerCase();
    const secProducto = p.section.toLowerCase();

    if (filtro === 'todos') return true;
    
    if (filtro === 'fútbol') return secProducto === 'fútbol';
    if (filtro === 'running') return secProducto === 'running';
    if (filtro === 'rugby') return secProducto === 'rugby';
    if (filtro === 'basketball') return secProducto === 'basketball';
    if (filtro === 'trail') return secProducto === 'trail';
    if (filtro === 'urbano') return secProducto === 'urbano';
    if (filtro === 'accesorios') return secProducto === 'accesorios';
    
    return secProducto === filtro;
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

    <!-- Filtros de categoría -->
    <div class="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-2 scrollbar-none">
      <button 
        type="button"
        on:click={() => activeCategory = 'TODOS'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'TODOS' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        TODOS
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Urbano'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Urbano' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Urbano
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Running'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Running' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Running
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Fútbol'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Fútbol' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Fútbol
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Rugby'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Rugby' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Rugby
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Basketball'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Basketball' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Basketball
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Trail'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Trail' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Trail
      </button>

      <button 
        type="button"
        on:click={() => activeCategory = 'Accesorios'}
        class="px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap
          {activeCategory === 'Accesorios' ? 'bg-volt text-obsidian' : 'border border-white/10 text-white/40 hover:border-volt/40'}"
      >
        Accesorios
      </button>
    </div>

    <!-- Grilla de Productos Original de 4 columnas limpia -->
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