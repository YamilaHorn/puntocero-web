<script lang="ts">
  const WPP_URL = 'https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20sobre%20calzado%20deportivo';

  const benefits = [
    { title: 'Envío Express',   desc: '24h a todo el país'     },
    { title: 'Cambios Gratis',  desc: '30 días sin preguntas'  },
    { title: 'Cuotas sin Interés', desc: 'Hasta 12 cuotas'    },
    { title: 'Compra Segura',   desc: 'Garantía de autenticidad' },
  ];

  const perks = [
    'Asesoramiento personalizado según tu deporte',
    'Consulta de stock en tiempo real',
    'Talles especiales y pedidos a medida',
    'Seguimiento de tu envío en todo momento',
  ];

  const stats = [
    { value: '+3.5k', label: 'Clientes'      },
    { value: '4.9★',  label: 'Calificación'  },
    { value: '<5min', label: 'Respuesta WPP' },
  ];
</script>

<section id="contacto" aria-labelledby="cta-heading" class="relative bg-obsidian overflow-hidden">
  <div class="h-px bg-gradient-to-r from-transparent via-volt/40 to-transparent" />

  <!-- Benefits strip -->
  <div class="border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {#each benefits as b}
          <div class="bg-obsidian flex items-center gap-4 p-5">
            <div class="w-5 h-5 text-volt flex-shrink-0">
              <!-- Truck icon SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <div>
              <p class="text-titanium font-bold text-sm">{b.title}</p>
              <p class="text-white/40 text-xs">{b.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <!-- Left -->
      <div>
        <span class="font-mono text-xs text-volt tracking-widest">// ATENCIÓN PERSONALIZADA</span>
        <h2 id="cta-heading"
            class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
          ¿DUDAS?<br /><span class="text-volt">HABLEMOS</span>
        </h2>
        <p class="text-white/40 text-base leading-relaxed max-w-md mb-8">
          Nuestro equipo te asesora para encontrar el modelo ideal según tu deporte, pisada y presupuesto.
          Respondemos en minutos por WhatsApp.
        </p>
        <ul class="space-y-3 mb-10">
          {#each perks as item}
            <li class="flex items-start gap-3">
              <span class="w-4 h-4 mt-0.5 border border-volt/50 flex-shrink-0 flex items-center justify-center">
                <span class="w-1.5 h-1.5 bg-volt rounded-full" />
              </span>
              <span class="text-titanium/80 text-sm">{item}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Right -->
      <div>
        <div class="relative bg-carbon border border-white/5 p-8 lg:p-10">
          <div class="absolute top-0 right-0 w-16 h-16 border-t border-r border-volt/30" />
          <div class="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-volt/10" />

          <div class="relative z-10">
            <div class="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 class="font-heading text-titanium text-2xl mb-2">WHATSAPP DIRECTO</h3>
            <p class="font-mono text-[10px] text-white/40 tracking-widest mb-6">RESPUESTA EN MENOS DE 5 MINUTOS</p>
            <p class="text-white/40 text-sm leading-relaxed mb-8">
              Mandanos un mensaje con el modelo que buscás, tu talle y deporte. Te asesoramos sin compromiso.
            </p>
            <a href={WPP_URL} target="_blank" rel="noopener noreferrer"
               class="group w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-sm tracking-widest py-4 hover:bg-[#20bc5a] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-carbon mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              CONSULTAR POR WHATSAPP
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#catalogo"
               class="w-full flex items-center justify-center gap-3 border border-white/10 text-white/40 font-semibold text-xs tracking-wide py-3.5 hover:border-volt/30 hover:text-volt transition-colors">
              VER CATÁLOGO COMPLETO
            </a>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-px mt-px bg-white/5">
          {#each stats as stat}
            <div class="bg-carbon p-4 text-center">
              <p class="font-heading text-volt text-lg">{stat.value}</p>
              <p class="text-[9px] font-mono text-white/30 tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>