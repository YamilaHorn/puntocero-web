<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import type { User } from "@supabase/supabase-js";

  let scrolled = false;
  let mobileOpen = false;
  let dropdownOpen = false;

  // Estado del usuario autenticado
  let user: User | null = null;

  const navLinks = [
    { label: "INICIO", href: "/#hero" },
    { label: "CATÁLOGO", href: "/#catalogo" },
    { label: "NOSOTROS", href: "/#specs" },
    { label: "RESEÑAS", href: "/#social" },
  ];

  onMount(() => {
    // Escuchar el scroll de la página
    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };
    window.addEventListener("scroll", onScroll);

    // 1. Comprobar si hay sesión activa al cargar el componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      user = session?.user ?? null;
    });

    // 2. Escuchar cambios de estado en vivo (login, logout, registro)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user ?? null;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      subscription.unsubscribe();
    };
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    dropdownOpen = false;
    mobileOpen = false;
    window.location.href = "/";
  }

  // Iniciales y nombres automáticos basados en los datos del usuario
  $: userInitial =
    user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "?";
  $: userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  $: isAdmin = user?.user_metadata?.role === "admin";
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500
  {scrolled
    ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/5'
    : 'bg-transparent'}"
>
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
          <a
            href={link.href}
            class="text-xs font-semibold tracking-widest text-titanium/50 hover:text-volt transition-colors duration-300"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <div class="flex items-center gap-4">
        <a
          href="/#catalogo"
          class="hidden lg:flex items-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-2.5 hover:bg-volt/90 transition-colors focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          VER CATÁLOGO
        </a>

        <!-- ICONOS REDES: ESCRITORIO -->
        <div
          class="hidden lg:flex items-center gap-3 pr-2 border-r border-white/5"
        >
          <a
            href="https://instagram.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            class="text-titanium/40 hover:text-volt transition-colors p-1"
            aria-label="Instagram"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"
              ><path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
              /></svg
            >
          </a>
          <a
            href="https://tiktok.com/@tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            class="text-titanium/40 hover:text-volt transition-colors p-1"
            aria-label="TikTok"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"
              ><path
                d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.11.13.23.26.36.38.15.14.31.27.47.4 1.15.86 2.53 1.34 3.96 1.4v4.17c-1.29-.07-2.56-.47-3.66-1.16-.3-.19-.59-.4-.87-.63-.2-.17-.39-.35-.57-.54V13.8c0 2.02-.45 3.97-1.35 5.73-.82 1.6-2.06 2.95-3.6 3.84a11.18 11.18 0 01-11.72-.11c-1.6-.98-2.89-2.42-3.71-4.13A11.43 11.43 0 010 14.4c.05-2.91 1.21-5.64 3.25-7.72 1.83-1.87 4.26-2.99 6.85-3.17V7.6c-1.15.08-2.27.5-3.21 1.18A6.87 6.87 0 004.4 11.6c-.36.98-.49 2.03-.39 3.07.15 1.51.85 2.91 1.98 3.91a7.12 7.12 0 007.49 1.13 7.02 7.02 0 003.93-4.8c.24-1.12.22-2.3-.07-3.41V0h-4.81z"
              /></svg
            >
          </a>
        </div>

        <div class="hidden lg:block">
          {#if user}
            <div class="relative">
              <button
                on:click={() => (dropdownOpen = !dropdownOpen)}
                class="w-9 h-9 rounded-full bg-volt text-obsidian font-black text-xs flex items-center justify-center border-2 border-transparent hover:border-white/20 transition-all uppercase focus:outline-none"
              >
                {userInitial}
              </button>

              {#if dropdownOpen}
                <div
                  class="absolute right-0 mt-3 w-48 bg-obsidian border border-white/10 p-2 shadow-2xl"
                  on:click={() => (dropdownOpen = false)}
                >
                  <div class="px-3 py-2 border-b border-white/5 mb-1">
                    <p
                      class="text-[9px] text-white/40 uppercase tracking-widest font-mono"
                    >
                      Hola,
                    </p>
                    <p class="text-xs text-titanium font-bold truncate">
                      {userName}
                    </p>
                  </div>

                  {#if isAdmin}
                    <a
                      href="/admin"
                      class="block w-full text-left px-3 py-2 text-[10px] font-bold text-titanium/70 hover:text-volt transition-colors uppercase tracking-widest"
                    >
                      Panel Admin
                    </a>
                  {/if}

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
              <a
                href="/login"
                class="text-[10px] font-bold tracking-widest text-titanium/50 hover:text-volt uppercase transition-colors"
              >
                Ingresar
              </a>
              <a
                href="/registro"
                class="border border-white/10 hover:border-volt/40 text-titanium text-[10px] font-bold tracking-widest px-4 py-2 uppercase transition-all"
              >
                Registrarse
              </a>
            </div>
          {/if}
        </div>

        <button
          on:click={() => (mobileOpen = !mobileOpen)}
          class="lg:hidden text-titanium p-2"
          aria-label="Menú"
        >
          {#if mobileOpen}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" /><line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>

  {#if mobileOpen}
    <div
      class="lg:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/5"
    >
      <div class="px-6 py-6 space-y-4">
        {#each navLinks as link}
          <a
            href={link.href}
            on:click={() => (mobileOpen = false)}
            class="block text-sm font-semibold tracking-widest text-titanium hover:text-volt transition-colors"
          >
            {link.label}
          </a>
        {/each}

        <a
          href="/#catalogo"
          on:click={() => (mobileOpen = false)}
          class="block w-full text-center bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-3 mt-4"
        >
          VER CATÁLOGO
        </a>

        <div class="border-t border-white/5 pt-4 mt-2">
          {#if user}
            <div
              class="flex items-center justify-between bg-white/5 p-3 rounded"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-volt text-obsidian font-black text-xs flex items-center justify-center uppercase"
                >
                  {userInitial}
                </div>
                <span
                  class="text-xs text-titanium font-bold truncate max-w-[150px]"
                  >{userName}</span
                >
              </div>
              <div class="flex gap-2">
                <a
                  href="/admin"
                  on:click={() => (mobileOpen = false)}
                  class="text-[10px] bg-white/10 text-titanium px-2 py-1.5 uppercase font-bold tracking-wider"
                  >Admin</a
                >
                <button
                  on:click={handleLogout}
                  class="text-[10px] text-red-400 px-2 py-1.5 uppercase font-bold tracking-wider"
                  >Salir</button
                >
              </div>
            </div>
          {:else}
            <div class="grid grid-cols-2 gap-3">
              <a
                href="/login"
                on:click={() => (mobileOpen = false)}
                class="text-center text-xs font-bold tracking-widest text-titanium/70 bg-white/5 py-3 uppercase"
              >
                Ingresar
              </a>
              <a
                href="/registro"
                on:click={() => (mobileOpen = false)}
                class="text-center text-xs font-bold tracking-widest text-obsidian bg-volt py-3 uppercase"
              >
                Registrarse
              </a>
            </div>
          {/if}
        </div>

        <!-- ICONOS REDES: RESPONSIVE MÓVIL -->
        <div
          class="flex items-center justify-center gap-6 pt-4 border-t border-white/5"
        >
          <a
            href="https://instagram.com/punt0.cero"
            class="text-titanium/40 hover:text-volt p-2 transition-colors"
            aria-label="Instagram"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
              ><path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
              /></svg
            >
          </a>
    <a href="https://tiktok.com/@punt0_cero" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-volt transition-colors p-1" aria-label="TikTok">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 10.86 4.43v-8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.12z"/></svg>
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>
