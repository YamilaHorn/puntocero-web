<script lang="ts">
  let showTooltip = true;
  const PHONE = '5493435349105';
  const WPP_URL = `https://wa.me/${PHONE}`;
</script>

<!-- ⚡ POSICIONAMIENTO PERFECTO CONTRA EL BORDE DERECHO DEL CONTENEDOR ⚡ -->
<div class="fixed bottom-4 right-[calc(50%-160px)] sm:right-6 md:bottom-6 z-[9999] flex flex-col items-end gap-2 md:gap-3">
  
  {#if showTooltip}
    <!-- Tooltip: Solo visible en PC -->
    <div class="hidden md:block relative bg-carbon border border-white/10 px-4 py-3 max-w-[200px] shadow-2xl">
      <button on:click={() => showTooltip = false}
              class="absolute -top-2 -right-2 w-5 h-5 bg-obsidian border border-white/10 flex items-center justify-center cursor-pointer"
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

  <!-- Botón de WhatsApp -->
  <a href={WPP_URL} target="_blank" rel="noopener noreferrer"
     aria-label="Consultar por WhatsApp"
     class="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer">
    
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24"
         fill="white" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </a>
</div>