<script lang="ts">
  import { goto } from "$app/navigation";

  // Recibe la data inyectada desde +page.ts / +page.server.ts
  export let data: any;

  // Forzamos reactividad segura con tipado dinámico
  $: product = (data?.product || {}) as any;
  $: variants = (product?.product_variants || []) as any[];

  // 1. Agrupar variantes por color para armar los botones selectores de miniaturas
  $: colorsMap = variants.reduce((acc: any, variant: any) => {
    const colorName = variant.color || "Único";
    if (!acc[colorName]) {
      acc[colorName] = {
        name: colorName,
        thumbnail: variant.images?.[0] || "",
        productId: variant.product_id || product.id,
        sizes: [],
      };
    }
    acc[colorName].sizes.push({
      size: variant.size,
      stock: variant.stock_qty,
      id: variant.id,
    });
    return acc;
  }, {});

  $: uniqueColors = Object.values(colorsMap) as any[];

  // 2. Estados de selección del usuario
  let selectedColor: string = "";
  let selectedSize: string = "";
  let buyerName = "";
  let buyerEmail = "";
  let buyerPhone = "";

  // Inicializa automáticamente con el primer color disponible cuando cargan los datos
  $: if (uniqueColors && uniqueColors.length > 0 && !selectedColor) {
    selectedColor = uniqueColors[0].name;
  }

  // 3. Filtrados reactivos basados en el color activo que toca el usuario
  $: activeImages = (variants.find((v: any) => v.color === selectedColor)
    ?.images || []) as string[];
  $: activeSizes = (colorsMap[selectedColor]?.sizes || []) as any[];

  // Control de la galería de imágenes (vuelve a la primera foto si cambia de color)
  let activeImageIndex = 0;
  $: if (selectedColor) activeImageIndex = 0;

  // Enlace y mensaje dinámico para concretar la consulta por WhatsApp enriquecido
  let wppMessage = "";
  $: {
    const nombre = product?.name || "";
    const color = selectedColor || "";
    const talleText = selectedSize ? ` y talle ${selectedSize}` : "";

    let specsText = "";
    if (product.category === "Botines") {
      const tapones = product.stud_type ? ` (${product.stud_type})` : "";
      const ajuste = product.lace_type ? ` - ${product.lace_type}` : "";
      specsText = `${tapones}${ajuste}`;
    }

    const mensaje = `Hola! Quiero consultar por el modelo ${nombre}${specsText} en color ${color}${talleText}`;

    wppMessage = `https://api.whatsapp.com/send?phone=5493435349105&text=${encodeURIComponent(mensaje)}`;
  }
  async function comprarAhora() {
    if (!selectedSize) {
      alert("Seleccioná un talle.");
      return;
    }

    if (!buyerName || !buyerEmail || !buyerPhone) {
      alert("Completá tus datos antes de continuar.");
      return;
    }

    // Buscar el talle seleccionado
    const talleSeleccionado = activeSizes.find(
      (s: any) => s.size === selectedSize,
    );

    // Si el talle no tiene stock => es una reserva
    const esReserva = !talleSeleccionado || talleSeleccionado.stock === 0;

    // Si es reserva se cobra el 50%
    const precio = esReserva
      ? Number(product.price_total) / 2
      : Number(product.price_total);

    console.log({
      id: product.id,
      title: product.name,
      quantity: 1,
    });

    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
          buyerName,
          buyerEmail,
          buyerPhone,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error(data);
        alert(data.error || "No se pudo generar el pago.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al iniciar el pago.");
    }
  }
</script>

<div class="min-h-screen bg-obsidian text-titanium pt-28 pb-12 px-6">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
    <div class="space-y-4">
      <div
        class="aspect-square bg-carbon border border-white/5 overflow-hidden relative flex items-center justify-center p-8"
      >
        {#if activeImages.length > 0}
          <img
            src={activeImages[activeImageIndex]}
            alt={product.name}
            class="max-h-full object-contain transition-all duration-300"
          />
        {:else}
          <span
            class="font-mono text-xs text-white/20 uppercase tracking-widest"
            >Sin imágenes disponibles</span
          >
        {/if}
      </div>

      <div class="flex gap-2 overflow-x-auto">
        {#each activeImages as img, idx}
          <button
            type="button"
            on:click={() => (activeImageIndex = idx)}
            class="w-20 h-20 bg-carbon border p-2 flex-shrink-0 transition-all
              {activeImageIndex === idx
              ? 'border-volt'
              : 'border-white/10 hover:border-white/30'}"
          >
            <img
              src={img}
              alt="Vista alternativa"
              class="w-full h-full object-contain"
            />
          </button>
        {/each}
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest uppercase"
          >// {product.category || "BOTINES"}</span
        >
        <h1
          class="font-heading text-4xl uppercase text-titanium tracking-tight mt-2 mb-1"
        >
          {product.name || ""}
        </h1>
        <div class="flex items-baseline gap-3 mb-4">
          <!-- Precio Actual / Oferta -->
          <span class="font-heading text-volt text-3xl font-black">
            ${parseFloat(product.price_total || 0).toLocaleString("es-AR")}
          </span>

          <!-- Precio Anterior Tachado (se muestra solo si existe y es mayor al precio actual) -->
          {#if product.original_price && parseFloat(product.original_price) > parseFloat(product.price_total)}
            <span
              class="text-white/40 font-mono text-lg line-through decoration-red-500/80 decoration-2"
            >
              ${parseFloat(product.original_price).toLocaleString("es-AR")}
            </span>
          {/if}
        </div>

        {#if product.category === "Botines" && (product.stud_type || product.lace_type)}
          <div class="flex flex-wrap gap-2 mb-6">
            {#if product.stud_type}
              <div
                class="bg-carbon border border-white/10 px-3 py-2 flex flex-col justify-center"
              >
                <span
                  class="text-[8px] font-mono tracking-widest text-white/30 uppercase"
                  >Distribución</span
                >
                <span
                  class="text-xs font-mono font-bold text-volt uppercase mt-0.5"
                  >{product.stud_type}</span
                >
              </div>
            {/if}
            {#if product.lace_type}
              <div
                class="bg-carbon border border-white/10 px-3 py-2 flex flex-col justify-center"
              >
                <span
                  class="text-[8px] font-mono tracking-widest text-white/30 uppercase"
                  >Tecnología de Ajuste</span
                >
                <span
                  class="text-xs font-mono font-bold text-titanium uppercase mt-0.5"
                  >{product.lace_type}</span
                >
              </div>
            {/if}
          </div>
        {/if}

        <div class="mb-6 pt-4 border-t border-white/5">
          <span
            class="block font-mono text-[10px] text-volt tracking-wider uppercase mb-2"
            >// DESCRIPCIÓN</span
          >
          <p
            class="text-sm text-titanium/70 leading-relaxed whitespace-pre-line max-w-xl"
          >
            {product.description || "Sin descripción disponible."}
          </p>
        </div>

        <div class="mb-6 pt-4 border-t border-white/5">
          <span
            class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3"
          >
            Colores Disponibles: <span class="text-titanium font-bold"
              >{selectedColor}</span
            >
          </span>
          <div class="flex gap-3 flex-wrap">
            {#each uniqueColors as colorItem}
              <button
                type="button"
                on:click={() => {
                  selectedColor = colorItem.name;
                  selectedSize = "";
                  if (
                    colorItem.productId &&
                    colorItem.productId !== product.id
                  ) {
                    goto(`/catalog/${colorItem.productId}`, {
                      replaceState: true,
                      noScroll: true,
                    });
                  }
                }}
                class="w-14 h-14 bg-carbon p-1 border transition-all relative group overflow-hidden
                  {selectedColor === colorItem.name
                  ? 'border-volt'
                  : 'border-white/10 hover:border-white/40'}"
              >
                {#if colorItem.thumbnail}
                  <img
                    src={colorItem.thumbnail}
                    alt={colorItem.name}
                    class="w-full h-full object-contain"
                  />
                {:else}
                  <div
                    class="w-full h-full flex items-center justify-center text-[8px] text-white/30 uppercase bg-obsidian"
                  >
                    Base
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </div>

        <div class="mb-8">
          <span
            class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3"
            >Seleccionar Talle (AR / US)</span
          >
          <div class="grid grid-cols-4 gap-2">
            {#each activeSizes as sizeItem}
              {@const inStock = sizeItem.stock > 0}
              <button
                type="button"
                on:click={() => (selectedSize = sizeItem.size)}
                class="py-3 font-mono text-xs font-bold tracking-widest relative border transition-all
		{selectedSize === sizeItem.size
                  ? 'bg-volt text-obsidian border-volt'
                  : inStock
                    ? 'bg-carbon text-titanium border-white/10 hover:border-volt/50'
                    : 'bg-carbon text-white/60 border-yellow-500/40 hover:border-yellow-400'}"
              >
                {sizeItem.size}

                {#if inStock && sizeItem.stock <= 2}
                  <span
                    class="absolute top-1 right-1 text-[7px] text-orange-400"
                  >
                    -{sizeItem.stock}
                  </span>
                {/if}

                {#if !inStock}
                  <span
                    class="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] text-yellow-400 uppercase"
                  >
                    Pedido
                  </span>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="mb-6 pt-4 border-t border-white/5">
        <span
          class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3"
        >
          Datos para tu pedido
        </span>

        <div class="space-y-3">
          <input
            type="text"
            bind:value={buyerName}
            placeholder="Nombre y apellido"
            class="w-full bg-carbon border border-white/10 p-3 text-sm text-titanium"
          />

          <input
            type="email"
            bind:value={buyerEmail}
            placeholder="Email"
            class="w-full bg-carbon border border-white/10 p-3 text-sm text-titanium"
          />

          <input
            type="tel"
            bind:value={buyerPhone}
            placeholder="WhatsApp"
            class="w-full bg-carbon border border-white/10 p-3 text-sm text-titanium"
          />
        </div>
      </div>

      <div class="space-y-3">
        {#if product.is_on_demand}
          <div class="rounded border border-yellow-500/30 bg-yellow-500/10 p-4">
            <p class="text-sm text-yellow-300 font-semibold">
              📦 Producto por pedido
            </p>

            <p class="text-xs text-white/70 mt-2">
              Reservalo abonando el <strong>50%</strong>. El saldo restante lo
              abonás cuando llegue a Argentina.
            </p>
          </div>
        {/if}

        <button
          type="button"
          on:click={comprarAhora}
          disabled={!selectedSize}
          class="w-full bg-volt text-obsidian font-black text-center py-4 text-xs tracking-widest uppercase hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if !selectedSize}
            SELECCIONÁ UN TALLE
          {:else if activeSizes.find((s: any) => s.size === selectedSize)?.stock === 0}
            RESERVAR CON EL 50%
          {:else}
            COMPRAR AHORA
          {/if}
        </button>

        <a
          href={wppMessage}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full border border-white/20 text-titanium font-black text-center block py-4 text-xs tracking-widest uppercase hover:border-white hover:bg-white/5 transition-all duration-300"
        >
          CONSULTAR POR WHATSAPP
        </a>
      </div>
    </div>
  </div>
</div>
