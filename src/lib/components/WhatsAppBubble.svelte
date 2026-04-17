<script lang="ts">
  let showTooltip = true;
  const WPP_URL = 'https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20sobre%20calzado%20deportivo';
</script>

<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  {#if showTooltip}
    <div class="relative bg-carbon border border-white/10 px-4 py-3 max-w-[200px] shadow-xl">
      <button on:click={() => showTooltip = false}
              class="absolute -top-2 -right-2 w-5 h-5 bg-obsidian border border-white/10 flex items-center justify-center"
              aria-label="Cerrar">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-white/40" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <p class="text-titanium text-xs font-medium leading-snug">
        ¿No encontrás tu talle?{' '}
        <span class="text-[#25D366] font-bold">Consultanos</span>
      </p>
      <div class="absolute bottom-[-6px] right-5 w-3 h-3 bg-carbon border-r border-b border-white/10 rotate-45" />
    </div>
  {/if}

  <a href={WPP_URL} target="_blank" rel="noopener noreferrer"
     aria-label="Consultar por WhatsApp"
     class="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-obsidian">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24"
         fill="white" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </a>
</div>