<script lang="ts">
const PHONE = '5493435349105';

  export let product: {
    id: number;
    name: string;
    category: string;
    price: number;
    images: string[]; 
    alt: string;
    inStock: boolean;
    isOnDemand: boolean;
    sizes: any[];
    quality_type: string;
    product_variants?: any[];
  };

  // Indice para controlar el efecto de hover de la foto
  let activeImageIndex = 0;

  // Filtro de seguridad por si quedaron URLs rotas o borradas de Supabase
  $: cleanImages = (product.images || []).filter((img: string) => img && img.trim() !== "" && !img.includes('undefined'));

  function handleMouseEnter() {
    if (cleanImages && cleanImages.length > 1) {
      activeImageIndex = 1;
    }
  }

  function handleMouseLeave() {
    onMouseLeave();
  }

  function onMouseLeave() {
    activeImageIndex = 0;
  }

  // LÓGICA DE CORRECCIÓN: Validamos si realmente hay stock en la matriz nueva
  $: variants = product.product_variants || [];
  
  // Si es on demand, siempre está disponible. Si no, se fija si alguna variante tiene cantidad mayor a 0
  $: tieneStockReal = product.isOnDemand || (variants.length > 0 ? variants.some(v => v.stock_qty > 0) : product.inStock);

  // Limpiamos los textos de los talles para que en la tarjeta no quede un texto gigante
  $: cleanSizes = variants.length > 0 
    ? [...new Set(variants.filter(v => product.isOnDemand || v.stock_qty > 0).map(v => v.size.split(' ')[0]))]
    : (product.sizes || []);

$: wppMessage = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  `Hola! Quiero consultar por el modelo ${product.name}`
)}`;  $: console.log(wppMessage);
  $: formattedPrice = product.price.toLocaleString('es-AR');

  // Sistema dinámico de badges corregido con el stock real de la matriz
  $: badge = product.isOnDemand ? 'ON DEMAND' : (tieneStockReal ? 'DISPONIBLE' : 'AGOTADO');
  $: badgeColor = product.isOnDemand ? 'bg-blue-500 text-white' : (tieneStockReal ? 'bg-volt text-obsidian' : 'bg-white/10 text-white/40');

  // 🚨 MODIFICADO: Nuevos colores dinámicos según tu diseño agresivo
  $: qualityColor = product.quality_type === 'Original' ? 'bg-red-600 text-white' : 'bg-black text-volt border border-volt/20';
</script>

<article class="group bg-carbon border border-white/5 flex flex-col overflow-hidden">
  
  <a 
    href="/catalog/{product.id}"
    class="relative aspect-square bg-obsidian overflow-hidden cursor-pointer block"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    {#if cleanImages && cleanImages.length > 0}
      <img 
        src={cleanImages[activeImageIndex] || cleanImages[0]} 
        alt={product.alt}
        class="w-full h-full object-contain p-6 transition-all duration-500 ease-in-out transform hover:scale-105" 
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center text-[10px] font-mono text-white/20 uppercase tracking-widest">Sin imagen</div>
    {/if}

    <div class="absolute top-3 left-3 flex gap-1.5 z-10">
      <div class="px-2.5 py-1 text-[9px] font-bold tracking-widest {badgeColor}">
        {badge}
      </div>
      
      <div class="px-2.5 py-1 text-[9px] font-black tracking-widest {qualityColor}">
        {product.quality_type || 'G5'}
      </div>
    </div>
  </a>

  <div class="p-5 flex flex-col flex-1">
    <div class="flex items-center justify-between gap-2 mb-2">
      <span class="font-mono text-[9px] text-volt tracking-widest uppercase">{product.category}</span>
      {#if cleanSizes.length > 0}
        <span class="font-mono text-[8px] text-white/40 tracking-wider">AR: {cleanSizes.join(', ')}</span>
      {/if}
    </div>

    <h3 class="font-heading text-titanium text-lg mb-1 line-clamp-1">{product.name}</h3>
    <p class="font-heading text-volt text-2xl mb-4">${formattedPrice}</p>

    <div class="mt-auto space-y-2">
      {#if tieneStockReal}
        <a 
          href="/catalog/{product.id}" 
          class="w-full flex items-center justify-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest py-3 hover:bg-volt/90 transition-colors text-center"
        >
          COMPRAR AHORA
        </a>
        <a href={wppMessage} rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 border border-white/10 text-white/40 font-semibold text-xs tracking-wide py-3 hover:border-[#25D366]/50 hover:text-[#25D366] transition-colors">
          CONSULTAR POR WPP
        </a>
      {:else}
        <a href={wppMessage} rel="noopener noreferrer"
           class="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-xs tracking-widest py-3 hover:bg-[#25D366]/20 transition-colors">
          CONSULTAR DISPONIBILIDAD
        </a>
      {/if}
    </div>
  </div>
</article>