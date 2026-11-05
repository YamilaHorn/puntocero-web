<script lang="ts">
  import HeroSection    from '$lib/components/HeroSection.svelte';
  import ProductCatalog from '$lib/components/ProductCatalog.svelte';
  import SpecGrid       from '$lib/components/SpecGrid.svelte';
  import SocialProof    from '$lib/components/SocialProof.svelte';
  import CTASection     from '$lib/components/CTASection.svelte';
  import Footer         from '$lib/components/Footer.svelte';
  import WhatsAppBubble from '$lib/components/WhatsAppBubble.svelte';
</script>

<svelte:head>
  <title>Punto Cero — Calzado Deportivo de Alto Rendimiento</title>
  <meta name="description" content="Botines y zapatillas de alto rendimiento. Comprá online o consultá por WhatsApp." />
  <link rel="preload" href="/logosolo.webp" as="image" fetchpriority="high" />
</svelte:head>

<div class="bg-obsidian min-h-screen">
  <main>
    <HeroSection />
    <ProductCatalog />
    <SpecGrid />
    <SocialProof />
    <CTASection />
  </main>
  <Footer />
  <WhatsAppBubble />
</div>