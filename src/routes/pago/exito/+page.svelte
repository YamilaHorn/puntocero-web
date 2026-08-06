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


<div class="min-h-screen flex items-center justify-center bg-black text-white px-6">


  <div class="text-center max-w-md w-full">


    <div class="text-6xl mb-6">
      ✅
    </div>


    <h1 class="text-4xl font-bold text-green-400 mb-4">
      ¡Pago aprobado!
    </h1>


    <p class="text-white/80 mb-4 leading-relaxed">
      Recibimos tu pago correctamente y tu pedido fue registrado.
    </p>


    <p class="text-white/60 text-sm mb-8 leading-relaxed">
      Nos pondremos en contacto para brindarte la información de seguimiento por WhatsApp.
    </p>



    {#if loading}

      <div class="border border-white/10 bg-white/5 p-5 mb-8">

        <p class="text-white/50">
          Cargando información del pedido...
        </p>

      </div>


    {:else if order}


      <div class="border border-white/10 bg-white/5 p-5 mb-8 text-left">


        <p class="text-xs uppercase tracking-widest text-white/40 mb-4">
          Detalle del pedido
        </p>


        <div class="space-y-2 text-sm">


          <p>
            <span class="text-white/50">
              Pedido:
            </span>

            <strong>
              #{order.id}
            </strong>
          </p>


          <p>
            <span class="text-white/50">
              Producto:
            </span>

            {order.product_name}
          </p>


          <p>
            <span class="text-white/50">
              Color:
            </span>

            {order.color}
          </p>


          <p>
            <span class="text-white/50">
              Talle:
            </span>

            {order.size}
          </p>


          <p>
            <span class="text-white/50">
              Estado:
            </span>

            <span class="text-green-400 font-bold uppercase">
              {order.status}
            </span>
          </p>


          <p class="pt-2 border-t border-white/10">

            <span class="text-white/50">
              Total:
            </span>

            <strong class="text-green-400">
              ${Number(order.amount).toLocaleString("es-AR")}
            </strong>

          </p>


        </div>



        <div class="mt-5 pt-5 border-t border-white/10">


          <p class="text-xs uppercase tracking-widest text-white/40 mb-2">
            Entrega
          </p>



          {#if order.delivery_method === "pickup"}

            <p>
              📍 Retiro por vendedor
            </p>


          {:else}

            <p>
              🚚 Envío
            </p>

            {#if order.shipping_city}

              <p class="text-white/70 text-sm mt-1">

                {order.shipping_city},
                {order.shipping_province}

              </p>

            {/if}


            {#if order.shipping_postal_code}

              <p class="text-white/50 text-sm">

                CP: {order.shipping_postal_code}

              </p>

            {/if}


            {#if order.shipping_cost > 0}

              <p class="text-white/70 text-sm mt-2">

                Envío:
                ${Number(order.shipping_cost).toLocaleString("es-AR")}

              </p>

            {/if}


          {/if}


        </div>


      </div>



    {:else}


      <div class="border border-white/10 bg-white/5 p-5 mb-8">

        <p class="text-white/60 text-sm">
          El pago fue recibido, pero no pudimos cargar los datos del pedido.
        </p>

      </div>


    {/if}



    <button
      class="w-full bg-lime-400 text-black px-6 py-3 rounded font-bold hover:bg-white transition"
      on:click={() => goto("/")}
    >
      Volver al inicio
    </button>
    
  </div>
</div>