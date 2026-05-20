<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import type { User } from '@supabase/supabase-js';

  let scrolled = false;
  let mobileOpen = false;
  let dropdownOpen = false;

  // Estado del usuario autenticado
  let user: User | null = null;

  const navLinks = [
    { label: 'INICIO',    href: '/#hero'     },
    { label: 'CATÁLOGO',  href: '/#catalogo' },
    { label: 'NOSOTROS',  href: '/#specs'    },
    { label: 'RESEÑAS',   href: '/#social'   },
  ];

  onMount(() => {
    // Escuchar el scroll de la página
    const onScroll = () => { scrolled = window.scrollY > 40; };
    window.addEventListener('scroll', onScroll);

    // 1. Comprobar si hay sesión activa al cargar el componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      user = session?.user ?? null;
    });

    // 2. Escuchar cambios de estado en vivo (login, logout, registro)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      subscription.unsubscribe();
    };
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    dropdownOpen = false;
    mobileOpen = false;
    window.location.href = '/';
  }

  // Iniciales y nombres automáticos basados en los datos del usuario
  $: userInitial = user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || '?';
  $: userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500
  {scrolled ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}">

  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">

      <a href="/#hero" class="flex items-center gap-2">
        <div class="w-28 h-30 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Logo Punto Cero" 
            class="w-full h-full object-contain"
          />
        </div>
      </a>

      <div class="hidden lg:flex items-center gap-10">
        {#each navLinks as link}
          <a href={link.href}
             class="text-xs font-semibold tracking-widest text-titanium/50 hover:text-volt transition-colors duration-300">
            {link.label}
          </a>
        {/each}
      </div>

      <div class="flex items-center gap-4">
        
        <a href="/#catalogo"
           class="hidden lg:flex items-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-2.5 hover:bg-volt/90 transition-colors focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          VER CATÁLOGO
        </a>

        <div class="hidden lg:block">
          {#if user}
            <div class="relative">
              <button 
                on:click={() => dropdownOpen = !dropdownOpen}
                class="w-9 h-9 rounded-full bg-volt text-obsidian font-black text-xs flex items-center justify-center border-2 border-transparent hover:border-white/20 transition-all uppercase focus:outline-none"
              >
                {userInitial}
              </button>

              {#if dropdownOpen}
                <div class="absolute right-0 mt-3 w-48 bg-obsidian border border-white/10 p-2 shadow-2xl" on:click={() => dropdownOpen = false}>
                  <div class="px-3 py-2 border-b border-white/5 mb-1">
                    <p class="text-[9px] text-white/40 uppercase tracking-widest font-mono">Hola,</p>
                    <p class="text-xs text-titanium font-bold truncate">{userName}</p>
                  </div>
                  
                  <a href="/admin" class="block w-full text-left px-3 py-2 text-[10px] font-bold text-titanium/70 hover:text-volt transition-colors uppercase tracking-widest">
                    Panel Admin
                  </a>

                  <button 
                    on:click={handleLogout}
                    class="w-full text-left px-3 py-2 text-[10px] font-bold text-red-400 hover:bg-white/5 transition-colors uppercase tracking-widest"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              {/if}
            </div>
          {:else}
            <div class="flex items-center gap-4 pl-2">
              <a href="/login" class="text-[10px] font-bold tracking-widest text-titanium/50 hover:text-volt uppercase transition-colors">
                Ingresar
              </a>
              <a href="/registro" class="border border-white/10 hover:border-volt/40 text-titanium text-[10px] font-bold tracking-widest px-4 py-2 uppercase transition-all">
                Registrarse
              </a>
            </div>
          {/if}
        </div>

        <button on:click={() => mobileOpen = !mobileOpen}
                class="lg:hidden text-titanium p-2" aria-label="Menú">
          {#if mobileOpen}
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          {:else}
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

  {#if mobileOpen}
    <div class="lg:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/5">
      <div class="px-6 py-6 space-y-4">
        {#each navLinks as link}
          <a href={link.href} on:click={() => mobileOpen = false}
             class="block text-sm font-semibold tracking-widest text-titanium hover:text-volt transition-colors">
            {link.label}
          </a>
        {/each}
        
        <a href="/#catalogo" on:click={() => mobileOpen = false}
           class="block w-full text-center bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-3 mt-4">
          VER CATÁLOGO
        </a>

        <div class="border-t border-white/5 pt-4 mt-2">
          {#if user}
            <div class="flex items-center justify-between bg-white/5 p-3 rounded">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-volt text-obsidian font-black text-xs flex items-center justify-center uppercase">
                  {userInitial}
                </div>
                <span class="text-xs text-titanium font-bold truncate max-w-[150px]">{userName}</span>
              </div>
              <div class="flex gap-2">
                <a href="/admin" on:click={() => mobileOpen = false} class="text-[10px] bg-white/10 text-titanium px-2 py-1.5 uppercase font-bold tracking-wider">Admin</a>
                <button on:click={handleLogout} class="text-[10px] text-red-400 px-2 py-1.5 uppercase font-bold tracking-wider">Salir</button>
              </div>
            </div>
          {:else}
            <div class="grid grid-cols-2 gap-3">
              <a href="/login" on:click={() => mobileOpen = false} class="text-center text-xs font-bold tracking-widest text-titanium/70 bg-white/5 py-3 uppercase">
                Ingresar
              </a>
              <a href="/registro" on:click={() => mobileOpen = false} class="text-center text-xs font-bold tracking-widest text-obsidian bg-volt py-3 uppercase">
                Registrarse
              </a>
            </div>
          {/if}
        </div>

      </div>
    </div>
  {/if}
</nav>