<script lang="ts">
  import { onMount } from 'svelte';

  let scrolled = false;
  let mobileOpen = false;

  const navLinks = [
    { label: 'INICIO',    href: '#hero'     },
    { label: 'CATÁLOGO',  href: '#catalogo' },
    { label: 'NOSOTROS',  href: '#specs'    },
    { label: 'RESEÑAS',   href: '#social'   },
  ];

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 40; };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500
  {scrolled ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}">

  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">

      <!-- Logo -->
      <a href="#hero" class="flex items-center gap-2">
  <div class="w-28 h-30 flex items-center justify-center">
    <img 
      src="/logo.png" 
      alt="Logo Punto Cero" 
      class="w-full h-full object-contain"
    />
  </div>
</a>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-10">
        {#each navLinks as link}
          <a href={link.href}
             class="text-xs font-semibold tracking-widest text-titanium/50 hover:text-volt transition-colors duration-300">
            {link.label}
          </a>
        {/each}
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4">
        <a href="#catalogo"
           class="hidden lg:flex items-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-2.5 hover:bg-volt/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-obsidian">
          <!-- ShoppingBag SVG inline -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          VER CATÁLOGO
        </a>

        <!-- Hamburger -->
        <button on:click={() => mobileOpen = !mobileOpen}
                class="lg:hidden text-titanium p-2" aria-label="Menú">
          {#if mobileOpen}
            <!-- X icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          {:else}
            <!-- Menu icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="lg:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/5">
      <div class="px-6 py-6 space-y-4">
        {#each navLinks as link}
          <a href={link.href} on:click={() => mobileOpen = false}
             class="block text-sm font-semibold tracking-widest text-titanium hover:text-volt transition-colors">
            {link.label}
          </a>
        {/each}
        <a href="#catalogo" on:click={() => mobileOpen = false}
           class="block w-full text-center bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-3 mt-4">
          VER CATÁLOGO
        </a>
      </div>
    </div>
  {/if}
</nav>