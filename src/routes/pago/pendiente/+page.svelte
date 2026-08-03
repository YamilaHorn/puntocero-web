<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>Pago pendiente</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-black text-white">
  <div class="text-center max-w-md">
    <h1 class="text-4xl font-bold text-yellow-400 mb-4">
      ⏳ Pago pendiente
    </h1>

    <p class="text-white/70 mb-8">
      Tu pago está siendo procesado. Cuando Mercado Pago lo confirme, nos pondremos en contacto con vos.
    </p>

    <button
      class="bg-yellow-400 text-black px-6 py-3 rounded font-bold"
      on:click={() => goto("/")}
    >
      Volver al inicio
    </button>
  </div>
</div>