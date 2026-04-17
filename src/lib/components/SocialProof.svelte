<script lang="ts">
  const MARATHON_IMG = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/95b67868a_generated_38212d88.png';
  const CROSSFIT_IMG = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/1a4537bca_generated_fac91eaa.png';
  const TRAIL_IMG    = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/2a18352a8_generated_e1608c0a.png';
  const RUNNER_IMG   = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/955b256e0_generated_image.png';

  type Review = { image: string; alt: string; name: string; location: string; product: string; rating: number; metric: string; metricLabel: string; quote: string; };

  const reviews: Review[] = [
    { image: MARATHON_IMG, alt: 'Atleta durante maratón', name: 'MARCOS R.', location: 'Buenos Aires', product: 'REACT PRO 360',  rating: 5, metric: 'Sub 2:18',   metricLabel: 'Marca personal con este modelo', quote: 'Las mejores zapatillas que usé. Amortiguación increíble, llegué al final con los pies frescos.' },
    { image: CROSSFIT_IMG, alt: 'Atleta de CrossFit',    name: 'SOFÍA D.',   location: 'Córdoba',       product: 'COURT ELITE X', rating: 5, metric: '+600 WODs',  metricLabel: 'Entrenamientos con el mismo par', quote: 'Compré online, llegó en 24 horas y calzó perfecto. Servicio impecable.' },
    { image: TRAIL_IMG,    alt: 'Corredor en montaña',   name: 'ADRIÁN S.',  location: 'Mendoza',       product: 'TRAIL GRIP V2', rating: 5, metric: '8,500m D+', metricLabel: 'Desnivel acumulado en temporada', quote: 'Consulté por WhatsApp el talle y me respondieron al toque. Atención de primera.' },
    { image: RUNNER_IMG,   alt: 'Corredor urbano',       name: 'ELENA V.',   location: 'Rosario',       product: 'REACT PRO 360', rating: 5, metric: '−3 min/km', metricLabel: 'Mejora en ritmo de carrera',     quote: 'No tenían mi talle en stock, consulté por WPP y me consiguieron el par en dos días.' },
  ];

  const tickerItems = [
    'ENVÍO EN 24H A TODO EL PAÍS',
    '★ 4.9/5 — MÁS DE 3,500 CLIENTES',
    'CONSULTA SIN CARGO POR WHATSAPP',
    'CAMBIOS Y DEVOLUCIONES GRATIS',
    'PAGO EN CUOTAS SIN INTERÉS',
    'STOCK PERMANENTE DE TALLES ESPECIALES',
  ];
  const doubled = [...tickerItems, ...tickerItems];
</script>

<section id="social" aria-labelledby="social-heading" class="relative bg-carbon overflow-hidden">

  <!-- Ticker top -->
  <div class="border-y border-white/5 py-3 overflow-hidden">
    <div class="animate-scroll-left flex whitespace-nowrap">
      {#each doubled as item, i}
        <span class="inline-flex items-center gap-6 mx-6 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
          {item}<span class="w-1.5 h-1.5 bg-volt rounded-full inline-block" />
        </span>
      {/each}
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
    <div class="mb-16">
      <span class="font-mono text-xs text-volt tracking-widest">// RESEÑAS</span>
      <h2 id="social-heading"
          class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">
        LO QUE DICEN<br /><span class="text-volt">NUESTROS CLIENTES</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
      {#each reviews as review}
        <article class="group relative bg-carbon overflow-hidden">
          <div class="relative aspect-[4/3] overflow-hidden">
            <img src={review.image} alt={review.alt}
                 class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />
            <div class="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-sm border border-white/10 px-3 py-2">
              <p class="font-heading text-volt text-base leading-none">{review.metric}</p>
              <p class="font-mono text-[8px] text-white/40 tracking-widest uppercase mt-0.5">{review.metricLabel}</p>
            </div>
            <div class="absolute bottom-4 left-4 bg-volt/10 border border-volt/20 px-2.5 py-1">
              <p class="font-mono text-[9px] text-volt tracking-widest">{review.product}</p>
            </div>
          </div>
          <div class="p-6 lg:p-8">
            <div class="flex gap-1 mb-4">
              {#each Array(review.rating) as _}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-volt fill-current" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              {/each}
            </div>
            <p class="text-titanium/90 text-sm leading-relaxed italic mb-4">"{review.quote}"</p>
            <div class="flex items-center gap-3">
              <div class="w-6 h-px bg-volt" />
              <span class="font-heading text-titanium text-xs">{review.name}</span>
              <span class="text-white/40 text-xs">— {review.location}</span>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>

  <!-- Ticker bottom -->
  <div class="border-y border-white/5 py-3 overflow-hidden">
    <div class="animate-scroll-left flex whitespace-nowrap" style="animation-direction: reverse">
      {#each doubled as item}
        <span class="inline-flex items-center gap-6 mx-6 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">
          {item}<span class="w-1.5 h-1.5 bg-volt rounded-full inline-block" />
        </span>
      {/each}
    </div>
  </div>
</section>