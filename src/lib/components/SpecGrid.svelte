<script lang="ts">
  // Imágenes de stock profesionales con estética urbana/deportiva oscura
  const ATENCION_IMG  = '/atencion.avif'; // Sesión / Asesoría deportiva
  const ENVIOS_IMG    = '/envios.png'; // Entrega en mano / Personal de confianza
  const GARANTIA_IMG  = '/garantia.avif'; // Calidad / Textura deportiva premium

  type Spec = { id: string; title: string; subtitle: string; description: string; metric: string; metricLabel: string; image: string; imageAlt: string; };

  const specs: Spec[] = [
    { 
      id: '01', 
      title: 'ATENCIÓN PERSONALIZADA', 
      subtitle: 'Asesoramiento personalizado',
      description: 'No somos un bot. Te asesoramos directamente por WhatsApp para sacarte todas las dudas sobre talles, hormas y materiales antes de realizar tu compra.',
      metric: '1 a 1', 
      metricLabel: 'Contacto Directo', 
      image: ATENCION_IMG, 
      imageAlt: 'Asesoramiento personalizado de artículos deportivos' 
    },
    { 
      id: '02', 
      title: 'ENVÍOS A DOMICILIO', 
      subtitle: 'Entregas en Persona',
      description: 'Coordinamos y te llevamos tu pedido personalmente a tu puerta, cuidando el producto desde que sale de nuestro stock hasta que llega a tus manos.',
      metric: '100%', 
      metricLabel: 'Gestión Propia', 
      image: ENVIOS_IMG, 
      imageAlt: 'Envío y entrega de productos deportivos a domicilio' 
    },
    { 
      id: '03', 
      title: 'GARANTÍA TOTAL', 
      subtitle: 'Compra Sin Riesgos',
      description: 'Tu confianza es lo primero. Cuentas con una garantía real de 30 días por cualquier falla de fabricación en tus botines, zapatillas o indumentaria.',
      metric: '30 Días', 
      metricLabel: 'Garantía Asegurada', 
      image: GARANTIA_IMG, 
      imageAlt: 'Garantía y control de calidad premium' 
    },
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
          COMPRA<br /><span class="text-volt">GARANTIZADA</span>
        </h2>
      </div>
      <p class="text-white/40 text-sm max-w-sm leading-relaxed lg:text-right">
        Llevamos el equipamiento deportivo al siguiente nivel, acompañándote en cada paso desde la elección hasta la puerta de tu casa.
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
            <span class="font-mono text-[9px] text-white/30 tracking-widest">PUNTO_CERO — SERVICE_{spec.id}</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>