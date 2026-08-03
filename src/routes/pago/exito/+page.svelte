<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  $: paymentId = page.url.searchParams.get("payment_id");
  $: status = page.url.searchParams.get("status");
</script>

<p>Payment ID: {paymentId}</p>
<p>Estado: {status}</p>

<svelte:head>
  <title>Pago aprobado</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-black text-white">
  <div class="text-center max-w-md">
    <h1 class="text-4xl font-bold text-green-400 mb-4">
      ✅ ¡Pago aprobado!
    </h1>

    <p class="text-white/70 mb-8">
      Gracias por tu compra. Recibimos tu pago correctamente.
    </p>

    <button
      class="bg-lime-400 text-black px-6 py-3 rounded font-bold"
      on:click={() => goto("/")}
    >
      Volver al inicio
    </button>
  </div>
</div>