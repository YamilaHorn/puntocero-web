<script lang="ts">
  const HERO_SHOE_IMG = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/779a80379_generated_image.png';

  const stats = [
    { value: '+200', label: 'Modelos'  },
    { value: '50+',  label: 'Marcas'   },
    { value: '24h',  label: 'Envío'    },
  ];
</script>

<section id="hero"
  class="relative min-h-screen flex items-center overflow-hidden bg-obsidian">

  <!-- Background glow -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-volt/5 blur-[120px]" />
    <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-volt/5 blur-[80px]" />
  </div>

  <!-- Background text -->
  <div class="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
    <span class="font-heading text-white/[0.03] text-[10rem] md:text-[18rem] lg:text-[24rem] whitespace-nowrap leading-none">
      SOLE
    </span>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

      <!-- Left – Copy -->
      <div>
        <div class="flex items-center gap-2 mb-6">
          <!-- Zap icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-volt" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span class="text-xs font-semibold tracking-[0.3em] text-volt uppercase">
            Colección 2026 — Alto Rendimiento
          </span>
        </div>

        <h1 class="font-heading text-titanium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] mb-6">
          EL<br />CALZADO<br />QUE <span class="text-volt">GANA</span>
        </h1>

        <p class="text-titanium/50 text-base md:text-lg leading-relaxed max-w-md mb-10">
          Botines y zapatillas de alto rendimiento. Cada modelo seleccionado
          para quienes exigen el máximo en cada pisada.
        </p>

        <div class="flex flex-col sm:flex-row items-start gap-3 mb-12">
          <a href="#catalogo"
             class="group inline-flex items-center gap-3 bg-volt text-obsidian font-bold text-sm tracking-widest px-7 py-4 hover:bg-volt/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-obsidian">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            VER CATÁLOGO
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <a href="https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20por%20un%20calzado"
             target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-3 border border-white/20 text-titanium font-semibold text-sm tracking-wide px-7 py-4 hover:border-volt/50 hover:text-volt transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            CONSULTAR POR WPP
          </a>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-8 pt-8 border-t border-white/10">
          {#each stats as stat}
            <div>
              <p class="font-heading text-volt text-2xl md:text-3xl">{stat.value}</p>
              <p class="text-titanium/40 text-[10px] tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right – Shoe Image -->
      <div class="flex items-center justify-center relative">
        <div class="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-volt/10 blur-[80px]" />
        <img src={HERO_SHOE_IMG}
             alt="Zapatilla de alto rendimiento con tecnología de amortiguación avanzada"
             class="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl" />
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
    <span class="text-[9px] tracking-[0.4em] text-titanium/30 uppercase">Scroll</span>
    <div class="w-px h-8 bg-gradient-to-b from-volt to-transparent animate-bounce" />
  </div>
</section>