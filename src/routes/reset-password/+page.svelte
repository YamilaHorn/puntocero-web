<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let password = '';
  let loading = false;
  let message = '';
  let isError = false;
  
  // Control del ojito para la contraseña nueva
  let showPassword = false;

  // Verificación inicial por si intentan entrar a la URL directo sin el token del mail
  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      message = 'El enlace expiró o es inválido. Volvé a solicitar la recuperación.';
      isError = true;
    }
  });

  async function handleResetPassword() {
    loading = true;
    message = '';
    isError = false;

    // Actualizamos la contraseña del usuario actual con la nueva clave tipeada
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      message = 'Error al actualizar: ' + error.message;
      isError = true;
      loading = false;
    } else {
      message = '¡Contraseña actualizada con éxito! Redirigiendo...';
      isError = false;
      
      // Esperamos 2 segundos para que lea el mensaje de éxito y lo mandamos a la Home ya logueado
      setTimeout(() => {
        goto('/');
      }, 2000);
    }
  }
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian px-6 py-20">
  
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]" />
  </div>

  <div class="relative z-10 w-full max-w-md">
    <div class="text-center mb-10">
      <h1 class="font-heading text-titanium text-4xl mb-2">
        NUEVA <span class="text-volt">CLAVE</span>
      </h1>
      <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">Restablecer acceso — Punto Cero</p>
    </div>

    <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative">
      <form on:submit|preventDefault={handleResetPassword} class="space-y-6">
        
        {#if message}
          <div class="border p-3 text-[10px] text-center uppercase tracking-widest {isError ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-volt/10 border-volt text-volt'}">
            {message}
          </div>
        {/if}

        <div>
          <label for="new-password" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-2">Nueva Contraseña</label>
          
          <div class="relative">
            {#if showPassword}
              <input 
                type="text" 
                id="new-password-text"
                bind:value={password}
                required
                disabled={isError}
                placeholder="MINIMO 6 CARACTERES"
                class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/10"
              />
            {:else}
              <input 
                type="password" 
                id="new-password"
                bind:value={password}
                required
                disabled={isError}
                placeholder="••••••••"
                class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/10"
              />
            {/if}
            
            <button 
              type="button"
              on:click={() => showPassword = !showPassword}
              disabled={isError}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-titanium/30 hover:text-volt transition-colors focus:outline-none disabled:opacity-0"
              aria-label="Mostrar contraseña"
            >
              {#if showPassword}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || isError}
          class="group relative w-full bg-volt text-obsidian font-black text-xs tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 disabled:opacity-50 uppercase overflow-hidden"
        >
          <span class="relative z-10">
            {loading ? 'Guardando...' : 'Cambiar Contraseña'}
          </span>
        </button>
      </form>
    </div>
  </div>
</section>