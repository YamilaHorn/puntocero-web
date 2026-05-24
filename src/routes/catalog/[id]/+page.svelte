<script lang="ts">
  import { goto } from '$app/navigation';

  // Recibe la data inyectada desde +page.server.ts
  export let data: any;
  
  // Forzamos reactividad segura con tipado dinámico
  $: product = (data?.product || {}) as any;
  $: variants = (product?.product_variants || []) as any[];

  // 1. Agrupar variantes por color para armar los botones selectores de miniaturas
  $: colorsMap = variants.reduce((acc: any, variant: any) => {
    const colorName = variant.color || 'Único';
    if (!acc[colorName]) {
      acc[colorName] = {
        name: colorName,
        thumbnail: variant.images?.[0] || '',
        productId: variant.product_id || product.id, // ID del producto base al que pertenece
        sizes: []
      };
    }
    acc[colorName].sizes.push({
      size: variant.size,
      stock: variant.stock_qty,
      id: variant.id
    });
    return acc;
  }, {});

  $: uniqueColors = Object.values(colorsMap) as any[];

  // 2. Estados de selección del usuario
  let selectedColor: string = '';
  let selectedSize: string = '';

  // Inicializa automáticamente con el primer color disponible cuando cargan los datos
  $: if (uniqueColors && uniqueColors.length > 0 && !selectedColor) {
    selectedColor = uniqueColors[0].name;
  }

  // 3. Filtrados reactivos basados en el color activo que toca el usuario
  $: activeImages = (variants.find((v: any) => v.color === selectedColor)?.images || []) as string[];
  $: activeSizes = (colorsMap[selectedColor]?.sizes || []) as any[];

  // Control de la galería de imágenes (vuelve a la primera foto si cambia de color)
  let activeImageIndex = 0;
  $: if (selectedColor) activeImageIndex = 0;

  // Enlace y mensaje dinámico para concretar la consulta por WhatsApp
  let wppMessage = '';
  $: {
    const nombre = product?.name || '';
    const color = selectedColor || '';
    const talleText = selectedSize ? ` y talle ${selectedSize}` : '';
    wppMessage = `https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20por%20el%20modelo%20${encodeURIComponent(nombre)}%20en%20color%20${encodeURIComponent(color)}${encodeURIComponent(talleText)}`;
  }
</script>

<div class="min-h-screen bg-obsidian text-titanium pt-28 pb-12 px-6">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
    
    <div class="space-y-4">
      <div class="aspect-square bg-carbon border border-white/5 overflow-hidden relative flex items-center justify-center p-8">
        {#if activeImages.length > 0}
          <img src={activeImages[activeImageIndex]} alt={product.name} class="max-h-full object-contain transition-all duration-300" />
        {:else}
          <span class="font-mono text-xs text-white/20 uppercase tracking-widest">Sin imágenes disponibles</span>
        {/if}
      </div>
      
      <div class="flex gap-2 overflow-x-auto">
        {#each activeImages as img, idx}
          <button 
            type="button"
            on:click={() => activeImageIndex = idx}
            class="w-20 h-20 bg-carbon border p-2 flex-shrink-0 transition-all
              {activeImageIndex === idx ? 'border-volt' : 'border-white/10 hover:border-white/30'}"
          >
            <img src={img} alt="Vista alternativa" class="w-full h-full object-contain" />
          </button>
        {/each}
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest uppercase">// {product.category || 'BOTINES'}</span>
        <h1 class="font-heading text-4xl uppercase text-titanium tracking-tight mt-2 mb-1">{product.name || ''}</h1>
        <p class="font-heading text-volt text-3xl mb-8">${parseFloat(product.price_total || 0).toLocaleString('es-AR')}</p>

        <div class="mb-6">
          <span class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3">
            Colores Disponibles: <span class="text-titanium font-bold">{selectedColor}</span>
          </span>
          <div class="flex gap-3 flex-wrap">
            {#each uniqueColors as colorItem}
              <button 
                type="button"
                on:click={() => { 
                  selectedColor = colorItem.name; 
                  selectedSize = ''; 
                  
                  // Si el color clickeado pertenece a otra fila física de la BD, cambia la URL sin recargar
                  if (colorItem.productId && colorItem.productId !== product.id) {
                    goto(`/catalog/${colorItem.productId}`, { replaceState: true, noScroll: true });
                  }
                }}
                class="w-14 h-14 bg-carbon p-1 border transition-all relative group overflow-hidden
                  {selectedColor === colorItem.name ? 'border-volt' : 'border-white/10 hover:border-white/40'}"
              >
                {#if colorItem.thumbnail}
                  <img src={colorItem.thumbnail} alt={colorItem.name} class="w-full h-full object-contain" />
                {:else}
                  <div class="w-full h-full flex items-center justify-center text-[8px] text-white/30 uppercase bg-obsidian">Base</div>
                {/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="mb-8">
          <span class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3">Seleccionar Talle (AR / US)</span>
          <div class="grid grid-cols-4 gap-2">
            {#each activeSizes as sizeItem}
              {@const hasStock = product.is_on_demand || sizeItem.stock > 0}
              <button 
                type="button"
                disabled={!hasStock}
                on:click={() => { if(hasStock) selectedSize = sizeItem.size; }}
                class="py-3 font-mono text-xs font-bold tracking-widest relative border transition-all
                  {!hasStock ? 'bg-zinc-900 border-white/5 text-white/20 line-through cursor-not-allowed' : 
                   selectedSize === sizeItem.size ? 'bg-volt text-obsidian border-volt' : 'bg-carbon text-titanium border-white/10 hover:border-volt/50'}"
              >
                {sizeItem.size}
                {#if hasStock && !product.is_on_demand && sizeItem.stock <= 2}
                  <span class="absolute top-1 right-1 text-[7px] text-orange-400 font-sans font-normal">-{sizeItem.stock}</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <a 
          href={wppMessage}
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full bg-volt text-obsidian font-black text-center block py-4 text-xs tracking-widest uppercase hover:bg-white transition-all duration-300"
        >
          {selectedSize ? `SOLICITAR TALLE ${selectedSize} POR WHATSAPP` : 'SELECCIONÁ UN TALLE'}
        </a>
      </div>

    </div>
  </div>
</div>