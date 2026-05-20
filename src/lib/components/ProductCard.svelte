<script lang="ts">
  const WPP_BASE = 'https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20disponibilidad%20de%20';

  export let product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    alt: string;
    inStock: boolean;
  };

  $: wppMessage = WPP_BASE + encodeURIComponent(product.name);
  $: formattedPrice = product.price.toLocaleString('es-AR');

  // Lógica inteligente para badges automáticos si no vienen de la DB
  $: badge = product.inStock ? 'DISPONIBLE' : 'AGOTADO';
  $: badgeColor = product.inStock ? 'bg-volt text-obsidian' : 'bg-white/10 text-white/40';
</script>

<article class="group bg-carbon border border-white/5 flex flex-col overflow-hidden">
  <div class="relative aspect-square bg-obsidian overflow-hidden">
    <img src={product.image} alt={product.alt}
         class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700" />

    <div class="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold tracking-widest {badgeColor}">
      {badge}
    </div>
  </div>

  <div class="p-5 flex flex-col flex-1">
    <div class="flex items-center gap-2 mb-2">
      <span class="font-mono text-[9px] text-volt tracking-widest uppercase">{product.category}</span>
    </div>

    <h3 class="font-heading text-titanium text-lg mb-1">{product.name}</h3>
    <p class="font-heading text-volt text-2xl mb-4">${formattedPrice}</p>

    <div class="mt-auto space-y-2">
      {#if product.inStock}
        <button class="w-full flex items-center justify-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest py-3 hover:bg-volt/90 transition-colors">
          COMPRAR AHORA
        </button>
        <a href={wppMessage} target="_blank" rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 border border-white/10 text-white/40 font-semibold text-xs tracking-wide py-3 hover:border-[#25D366]/50 hover:text-[#25D366] transition-colors">
          CONSULTAR POR WPP
        </a>
      {:else}
        <a href={wppMessage} target="_blank" rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-xs tracking-widest py-3 hover:bg-[#25D366]/20 transition-colors">
          CONSULTAR DISPONIBILIDAD
        </a>
      {/if}
    </div>
  </div>
</article>