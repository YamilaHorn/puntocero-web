<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  let order: any = null;
  let loading = true;

  $: orderId = page.url.searchParams.get("order_id");


  onMount(async () => {

    if (!orderId) {
      loading = false;
      return;
    }


    try {

      const response = await fetch(
        `/api/orders/${orderId}`
      );


      if (response.ok) {
        order = await response.json();
      } else {
        console.error("No se encontró el pedido");
      }


    } catch (error) {

      console.error(
        "Error cargando pedido:",
        error
      );

    } finally {

      loading = false;

    }

  });

</script>


<svelte:head>
  <title>Pago aprobado | Punto Cero</title>
</svelte:head>


<div class="text-6xl mb-6">
  🎉
</div>

<h1 class="text-4xl font-bold text-green-400 mb-2">
  ¡Gracias por tu compra!
</h1>

<p class="text-green-300 font-semibold text-lg mb-4">
  Tu pago fue aprobado correctamente.
</p>

<p class="text-white/60 text-sm leading-relaxed mb-8">
  Tu pedido ya fue registrado. En las próximas horas nos pondremos en contacto
  por WhatsApp para coordinar la entrega o enviarte el seguimiento.
</p>

{#if loading}

  <div class="border border-white/10 bg-white/5 rounded-xl p-6">
    <p class="text-white/50">
      Cargando información del pedido...
    </p>
  </div>

{:else if order}

  <div class="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-6">

    <!-- Pedido -->

    <div>

      <p class="text-xs uppercase tracking-[3px] text-white/40 mb-4">
        Pedido confirmado
      </p>

      <div class="flex justify-between py-2 border-b border-white/10">
        <span class="text-white/50">Número</span>
        <span class="font-bold">#{order.id}</span>
      </div>

      <div class="flex justify-between py-2 border-b border-white/10">
        <span class="text-white/50">Estado</span>

        <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
          Pago aprobado
        </span>
      </div>

    </div>

    <!-- Producto -->

    <div>

      <p class="text-xs uppercase tracking-[3px] text-white/40 mb-4">
        Producto
      </p>

      <div class="flex justify-between py-2">
        <span class="text-white/50">Modelo</span>
        <span class="text-right font-semibold">
          {order.product_name}
        </span>
      </div>

      <div class="flex justify-between py-2">
        <span class="text-white/50">Color</span>
        <span>{order.color}</span>
      </div>

      <div class="flex justify-between py-2">
        <span class="text-white/50">Talle</span>
        <span>{order.size}</span>
      </div>

      {#if order.is_reservation}

        <div class="mt-5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">

          <p class="font-bold text-yellow-300">
            🟡 Reserva confirmada
          </p>

          <p class="text-sm text-white/70 mt-2">
            Abonaste el 50% para asegurar tu producto.
          </p>

          <p class="text-sm text-white/70 mt-1">
            Nos comunicaremos cuando llegue para coordinar el pago del saldo restante.
          </p>

        </div>

      {/if}

    </div>

    <!-- Entrega -->

    <div>

      <p class="text-xs uppercase tracking-[3px] text-white/40 mb-4">
        Entrega
      </p>

      {#if order.delivery_method === "pickup"}

        <div class="rounded-lg bg-black/30 border border-white/10 p-4">

          <p class="font-semibold text-lg">
            🏪 Retiro por el local
          </p>

          <p class="text-sm text-white/60 mt-2">
            Te avisaremos por WhatsApp cuando tu pedido esté listo para retirar.
          </p>

        </div>

      {:else}

        <div class="rounded-lg bg-black/30 border border-white/10 p-4 space-y-2">

          <p class="font-semibold text-lg">
            🚚 Envío a domicilio
          </p>

          <p class="text-white/70">
            {order.shipping_city}, {order.shipping_province}
          </p>

          <p class="text-white/50">
            Código Postal: {order.shipping_postal_code}
          </p>

          <p class="text-white/60">
            Costo de envío:
            <strong>
              ${Number(order.shipping_cost).toLocaleString("es-AR")}
            </strong>
          </p>

        </div>

      {/if}

    </div>

    <!-- Total -->

    <div class="border-t border-white/10 pt-6">

      <div class="flex justify-between items-center">

        <span class="text-lg font-semibold">
          Total abonado
        </span>

        <span class="text-3xl font-black text-lime-400">
          ${Number(order.amount).toLocaleString("es-AR")}
        </span>

      </div>

    </div>

  </div>

{:else}

  <div class="border border-yellow-500/30 bg-yellow-500/10 rounded-xl p-6">

    <p class="font-semibold text-yellow-300 mb-2">
      ⚠ Pago recibido
    </p>

    <p class="text-sm text-white/70">
      Recibimos tu pago correctamente, pero no pudimos cargar la información del pedido.
      Si el problema continúa, escribinos por WhatsApp y lo solucionaremos.
    </p>

  </div>

{/if}

<button
  class="mt-8 w-full bg-lime-400 text-black py-4 rounded-xl font-bold hover:bg-white transition"
  on:click={() => goto("/")}
>
  Volver al inicio
</button>