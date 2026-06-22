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
      `);

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

    {#if !loading}
      <div class="w-full mb-10 relative overflow-hidden bg-gradient-to-r from-obsidian via-sky-950/20 to-obsidian border-y border-sky-500/20 py-8 md:py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 group">
        
        <!-- Imagen de la Selección integrada al diseño oscuro -->
        <div class="absolute right-0 top-0 h-full w-full md:w-1/2 pointer-events-none opacity-25 md:opacity-45 z-0">
          <img 
            src="/mundial.webp" 
            alt="Selección Argentina" 
            class="w-full h-full object-cover object-top mix-blend-luminosity filter contrast-125 brightness-75 select-none"
          />
          <!-- Degradado para fundir tu foto con el fondo #0B0B0B (obsidian) -->
          <div class="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian md:from-obsidian md:to-transparent" />
        </div>

        <!-- Textos informativos de la promoción -->
        <div class="relative z-10 flex flex-col text-center md:text-left max-w-xl">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span class="text-sky-400 font-mono text-[10px] uppercase tracking-widest"></span>
            <span class="text-white/40 text-[10px] font-mono select-none">⭐⭐⭐</span>
          </div>
          
          <h2 class="font-heading text-titanium text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide leading-none mb-4">
            ¡MODO MUNDIAL <span class="text-sky-400 text-nowrap">ACTIVADO</span>!
          </h2>
          
          <p class="text-white/60 font-mono text-xs uppercase tracking-wider leading-relaxed max-w-md">
            Alentamos a la selección con un <span class="text-sky-400 font-bold">-10% OFF</span> automático en todo nuestros productos.
          </p>
        </div>

        <!-- Bloque destacado del -10% (Estilo Camiseta + Sol de Mayo) -->
        <div class="relative z-10 flex flex-col items-center justify-center bg-black/60 border border-sky-500/30 backdrop-blur-sm px-8 py-6 min-w-[200px] shadow-xl md:rotate-2 group-hover:rotate-0 transition-transform duration-300">
          <span class="text-white/70 font-mono text-[10px] uppercase tracking-widest mb-1">DESCUENTO</span>
          <div class="font-heading text-sky-400 text-5xl sm:text-6xl font-black leading-none tracking-tighter">
            -10%
          </div>
          <span class="text-amber-400 font-heading text-lg font-bold tracking-widest mt-1">OFF</span>
        </div>

      </div>
    {/if}

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