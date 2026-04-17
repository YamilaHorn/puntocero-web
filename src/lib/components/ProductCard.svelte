<script lang="ts">
  const WPP_BASE = 'https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20disponibilidad%20de%20';

  export let product: {
    id:         number;
    name:       string;
    category:   string;
    price:      number;
    image:      string;
    alt:        string;
    inStock:    boolean;
    sizes:      string[];
    badge:      string;
    badgeColor: string;
  };

  $: wppMessage = WPP_BASE + encodeURIComponent(product.name);
  $: formattedPrice = product.price.toLocaleString('es-AR');
</script>

<article class="group bg-carbon border border-white/5 flex flex-col overflow-hidden">

  <!-- Image -->
  <div class="relative aspect-square bg-obsidian overflow-hidden">
    <img src={product.image} alt={product.alt}
         class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700" />

    <!-- Badge -->
    <div class="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold tracking-widest {product.badgeColor}">
      {product.badge}
    </div>

    <!-- Stock indicator -->
    <div class="absolute bottom-3 right-3 flex items-center gap-1.5">
      {#if product.inStock}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-volt" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span class="font-mono text-[9px] text-volt tracking-widest">EN STOCK</span>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white/40" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span class="font-mono text-[9px] text-white/40 tracking-widest">SIN STOCK</span>
      {/if}
    </div>
  </div>

  <!-- Info -->
  <div class="p-5 flex flex-col flex-1">
    <div class="flex items-center gap-2 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-volt" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
      <span class="font-mono text-[9px] text-volt tracking-widest uppercase">{product.category}</span>
    </div>

    <h3 class="font-heading text-titanium text-lg mb-1">{product.name}</h3>
    <p class="font-heading text-volt text-2xl mb-4">${formattedPrice}</p>

    <!-- Sizes -->
    {#if product.inStock && product.sizes.length > 0}
      <div class="mb-4">
        <p class="text-[9px] font-mono text-white/40 tracking-widest mb-2">TALLES DISPONIBLES</p>
        <div class="flex flex-wrap gap-1.5">
          {#each product.sizes as size}
            <span class="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 text-xs
                         hover:border-volt hover:text-volt cursor-pointer transition-colors">
              {size}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Actions -->
    <div class="mt-auto space-y-2">
      {#if product.inStock}
        <button class="w-full flex items-center justify-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest py-3 hover:bg-volt/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-carbon">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          COMPRAR AHORA
        </button>
        <a href={wppMessage} target="_blank" rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 border border-white/10 text-white/40 font-semibold text-xs tracking-wide py-3 hover:border-[#25D366]/50 hover:text-[#25D366] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          CONSULTAR POR WPP
        </a>
      {:else}
        <a href={wppMessage} target="_blank" rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-xs tracking-widest py-3 hover:bg-[#25D366]/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          CONSULTAR DISPONIBILIDAD
        </a>
      {/if}
    </div>
  </div>
</article>