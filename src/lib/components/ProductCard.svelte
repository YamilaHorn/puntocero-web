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
    quality_type: string;
    product_variants: any[];
    stud_type?: string;
    lace_type?: string;
  };

  // Control del índice de imagen activa para el hover
  let activeImageIndex = 0;

  // Lógica de Stock
  $: tieneStock = product.isOnDemand || product.product_variants.some(v => v.stock_qty > 0);

  // Armamos el texto de los talles de forma dinámica
  $: sizesText = product.isOnDemand 
    ? 'POR PEDIDO' 
    : 'AR: ' + [...new Set(product.product_variants.filter(v => v.stock_qty > 0).map(v => v.size.split(' ')[0]))].join(', ');

  // Mensaje de WhatsApp normalizado con el precio directo
  $: wppMessage = product.isOnDemand
    ? `https://wa.me/${PHONE}?text=${encodeURIComponent(`¡Hola! Quiero encargar el modelo ${product.name}. ¿Te puedo señar con $${(product.price * 0.5).toLocaleString('es-AR')}?`)}`
    : `https://wa.me/${PHONE}?text=${encodeURIComponent(`¡Hola! Quiero comprar el modelo ${product.name} (Precio: $${product.price.toLocaleString('es-AR')}). ¿Tienen stock?`)}`;

  // Badges superiores
  $: badge = product.isOnDemand ? 'BAJO PEDIDO' : (tieneStock ? 'DISPONIBLE' : 'AGOTADO');
  $: badgeClass = product.isOnDemand ? 'bg-red-600 text-white' : (tieneStock ? 'bg-volt text-obsidian' : 'bg-white/10 text-white/40');
  $: qualityClass = product.quality_type === 'Original' ? 'bg-red-600 text-white' : 'bg-black text-volt border border-volt/20';
</script>

<article class="bg-carbon border border-white/5 flex flex-col overflow-hidden group relative">

  <a href="/catalog/{product.id}" class="relative aspect-square bg-obsidian overflow-hidden block"
     on:mouseenter={() => { if (product.images.length > 1) activeImageIndex = 1; }}
     on:mouseleave={() => activeImageIndex = 0}>
     
    <img src={product.images[activeImageIndex] || product.images[0]} alt={product.alt} 
         class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
    
    <div class="absolute top-3 left-3 flex gap-1.5">
      <span class="px-2 py-1 text-[8px] font-bold uppercase {badgeClass}">{badge}</span>
      <span class="px-2 py-1 text-[8px] font-bold uppercase {qualityClass}">{product.quality_type}</span>
    </div>
  </a>

  <div class="p-5 flex flex-col flex-1">
    <div class="flex justify-between items-start mb-2">
      <span class="text-volt font-mono text-[9px] uppercase tracking-widest">{product.category}</span>
      <span class="text-white/40 font-mono text-[8px] uppercase tracking-wider">{sizesText}</span>
    </div>

    <h3 class="text-titanium font-heading text-lg leading-tight mb-2 uppercase">{product.name}</h3>

    {#if product.stud_type || product.lace_type}
      <div class="flex flex-wrap gap-1 mb-4">
        {#if product.stud_type}
          <span class="bg-obsidian border border-white/10 text-white/60 text-[8px] font-mono px-2 py-1 uppercase">
            ⚡ {product.stud_type.replace('Tapones ', '')}
          </span>
        {/if}
        {#if product.lace_type}
          <span class="bg-obsidian border border-white/10 text-white/60 text-[8px] font-mono px-2 py-1 uppercase">
            👟 {product.lace_type}
          </span>
        {/if}
      </div>
    {/if}

    <!-- SECCIÓN DE PRECIO ESTÁNDAR -->
    <div class="mb-5">
      <p class="text-volt font-heading text-3xl font-black tracking-tight leading-none">
        ${product.price.toLocaleString('es-AR')}
      </p>
    </div>

    <div class="mt-auto space-y-2">
      {#if product.isOnDemand}
        <a href={wppMessage} target="_blank" rel="noopener noreferrer" 
           class="w-full bg-volt text-obsidian font-bold text-[10px] tracking-widest py-3 block text-center hover:bg-white transition-colors">
          ENCARGALOS CON EL 50%
        </a>
        
        <div class="w-full h-[38px] flex items-center justify-center border border-transparent">
          <span class="text-[10px] font-mono text-center text-white/50 uppercase tracking-wider block">
            Coordinás talle y entrega por WhatsApp
          </span>
        </div>

      {:else if tieneStock}
        <a href="/catalog/{product.id}" class="w-full bg-volt text-obsidian font-bold text-[10px] py-3 block text-center hover:bg-white transition-colors">
          COMPRAR AHORA
        </a>
        <a href={wppMessage} target="_blank" class="w-full border border-white/10 text-white/40 text-[10px] py-3 block text-center hover:text-volt transition-colors">
          CONSULTAR POR WPP
        </a>
      {:else}
        <a href={wppMessage} target="_blank" class="w-full bg-white/5 border border-white/10 text-white/30 font-bold text-[10px] py-3 block text-center cursor-not-allowed">
          AGOTADO
        </a>
      {/if}
    </div>
  </div>
</article>