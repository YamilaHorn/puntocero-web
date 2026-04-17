<script lang="ts">
  const FABRIC_IMG = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/f221b706f_generated_d1125414.png';
  const HEEL_IMG   = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/a9d104a21_generated_c1c001e1.png';
  const VENT_IMG   = 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/130982e19_generated_e4da024e.png';

  type Spec = { id: string; title: string; subtitle: string; description: string; metric: string; metricLabel: string; image: string; imageAlt: string; };

  const specs: Spec[] = [
    { id: '01', title: 'UPPER PREMIUM',  subtitle: 'Materiales Selectos',
      description: 'Solo trabajamos con marcas y modelos que utilizan materiales de primera línea: mallas técnicas, cueros de alta gama y textiles reciclados de rendimiento.',
      metric: 'Top 10', metricLabel: 'Marcas del mundo', image: FABRIC_IMG, imageAlt: 'Detalle del tejido técnico de una zapatilla de alto rendimiento' },
    { id: '02', title: 'SUELA REACTIVA', subtitle: 'Amortiguación y Retorno',
      description: 'Seleccionamos modelos con sistemas de amortiguación probados: React, ZoomX, Boost y tecnologías propias de cada marca para máximo confort en carrera.',
      metric: '87%', metricLabel: 'Retorno energético', image: HEEL_IMG, imageAlt: 'Corte transversal de la suela con tecnología de amortiguación' },
    { id: '03', title: 'VENTILACIÓN TOTAL', subtitle: 'Regulación Térmica',
      description: 'Priorizamos modelos con sistemas de ventilación activa para mantener el pie fresco durante el esfuerzo máximo, sin sacrificar soporte ni estabilidad.',
      metric: '−3°C', metricLabel: 'Temperatura del pie', image: VENT_IMG, imageAlt: 'Sistema de ventilación en la parte superior de la zapatilla' },
  ];
</script>

<section id="specs" aria-labelledby="specs-heading"
  class="relative bg-carbon py-24 lg:py-36">

  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest">// POR QUÉ ELEGIRNOS</span>
        <h2 id="specs-heading"
            class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">
          CALZADO<br /><span class="text-volt">DE ÉLITE</span>
        </h2>
      </div>
      <p class="text-white/40 text-sm max-w-sm leading-relaxed lg:text-right">
        Seleccionamos cada modelo de forma rigurosa. Si está en nuestro catálogo, es porque rinde al máximo nivel.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
      {#each specs as spec}
        <article class="group relative bg-carbon p-6 lg:p-8 flex flex-col hover:bg-obsidian/60 transition-colors duration-300">
          <span class="font-mono text-[10px] text-white/30 tracking-widest mb-6">{spec.id}</span>

          <div class="relative w-full aspect-square mb-8 overflow-hidden bg-obsidian">
            <img src={spec.image} alt={spec.imageAlt}
                 class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />
            <div class="absolute bottom-4 left-4">
              <p class="font-heading text-volt text-3xl lg:text-4xl">{spec.metric}</p>
              <p class="font-mono text-[9px] text-white/40 tracking-widest uppercase">{spec.metricLabel}</p>
            </div>
          </div>

          <h3 class="font-heading text-titanium text-lg mb-1">{spec.title}</h3>
          <p class="text-volt text-xs font-semibold tracking-widest uppercase mb-4">{spec.subtitle}</p>
          <p class="text-white/40 text-sm leading-relaxed flex-1">{spec.description}</p>

          <div class="mt-6 pt-4 border-t border-white/5">
            <span class="font-mono text-[9px] text-white/30 tracking-widest">SPEC_{spec.id} — VERIFIED</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>