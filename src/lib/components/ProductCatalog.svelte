<script lang="ts">
  import ProductCard from './ProductCard.svelte';

  // En tu proyecto real, estos products vendrían de Supabase:
  // import { supabase } from '$lib/supabaseClient';
  // const { data: products } = await supabase.from('products').select('*');

  type Product = {
    id:         number;
    name:       string;
    category:   string;
    price:      number;
    image:      string;
    alt:        string;
    inStock:    boolean;
    sizes:      string[];
    badge:      string;
    badgeColor: string;
  };

  const products: Product[] = [
    {
      id: 1, name: 'REACT PRO 360', category: 'Running', price: 89990,
      image: 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/779a80379_generated_image.png',
      alt: 'Zapatilla de running de alto rendimiento con suela reactiva',
      inStock: true, sizes: ['38','39','40','41','42','43','44'],
      badge: 'NUEVO', badgeColor: 'bg-[#D1FF00] text-[#0A0A0A]',
    },
    {
      id: 2, name: 'STRIKE FX CLEAT', category: 'Fútbol', price: 74990,
      image: 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/9f51869c6_generated_image.png',
      alt: 'Botín de fútbol de alto rendimiento con suela de carbono',
      inStock: true, sizes: ['39','40','41','42','43'],
      badge: 'TOP VENTAS', badgeColor: 'bg-white/10 text-white',
    },
    {
      id: 3, name: 'COURT ELITE X', category: 'Basketball', price: 95990,
      image: 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/55eb91a13_generated_image.png',
      alt: 'Zapatilla de basketball con soporte de tobillo y amortiguación máxima',
      inStock: false, sizes: [],
      badge: 'AGOTADO', badgeColor: 'bg-white/10 text-white/40',
    },
    {
      id: 4, name: 'TRAIL GRIP V2', category: 'Trail', price: 67990,
      image: 'https://media.base44.com/images/public/69e26d84d90da8813570f5e2/15b8f1877_generated_image.png',
      alt: 'Zapatilla de trail con suela de agarre extremo',
      inStock: true, sizes: ['38','39','40','41','42','43','44','45'],
      badge: 'OFERTA', badgeColor: 'bg-red-600/80 text-white',
    },
  ];

  const categories = ['TODOS', 'Running', 'Fútbol', 'Basketball', 'Trail'];
  let activeCategory = 'TODOS';

  $: filtered = activeCategory === 'TODOS'
    ? products
    : products.filter(p => p.category === activeCategory);
</script>

<section id="catalogo" aria-labelledby="catalogo-heading"
  class="relative bg-obsidian py-24 lg:py-36">

  <div class="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent absolute top-0 left-0 right-0" />

  <div class="max-w-7xl mx-auto px-6 lg:px-8">

    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
      <div>
        <span class="font-mono text-xs text-volt tracking-widest">// CATÁLOGO</span>
        <h2 id="catalogo-heading"
            class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">
          NUESTROS<br /><span class="text-volt">MODELOS</span>
        </h2>
      </div>
      <p class="text-white/40 text-sm max-w-xs leading-relaxed">
        Comprá online si está en stock, o consultanos por WhatsApp para más talles y modelos.
      </p>
    </div>

    <!-- Category Filter -->
    <div class="flex gap-2 flex-wrap mb-10">
      {#each categories as cat}
        <button on:click={() => activeCategory = cat}
                class="px-4 py-2 text-[10px] font-bold tracking-widest transition-all
                  {activeCategory === cat
                    ? 'bg-volt text-obsidian'
                    : 'border border-white/10 text-white/40 hover:border-volt/40 hover:text-titanium'}">
          {cat}
        </button>
      {/each}
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
      {#each filtered as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>

    <!-- Bottom CTA -->
    <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t border-white/5">
      <p class="text-white/40 text-sm">¿No encontrás lo que buscás?</p>
      <a href="https://wa.me/5491100000000?text=Hola!%20Busco%20un%20modelo%20específico%20y%20quiero%20consultar"
         target="_blank" rel="noopener noreferrer"
         class="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-bold text-xs tracking-widest px-6 py-3 hover:bg-[#25D366]/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        CONSULTANOS POR WHATSAPP
      </a>
    </div>
  </div>
</section>