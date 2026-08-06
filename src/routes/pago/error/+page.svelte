<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>Pago rechazado</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-black text-white">
  <div class="text-center max-w-md">
    <h1 class="text-4xl font-bold text-red-500 mb-4">
      ❌ Pago rechazado
    </h1>

    <p class="text-white/70 mb-8">
      No pudimos procesar el pago. Intentá nuevamente.
    </p>

    <button
      class="bg-red-500 text-white px-6 py-3 rounded font-bold"
      on:click={() => history.back()}
    >
      Intentar nuevamente
    </button>
  </div>
</div>