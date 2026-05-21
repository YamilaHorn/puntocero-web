<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let isLogin = true; // Switch entre login y registro
  let email = '';
  let password = '';
  let loading = false;
  let message = '';
  let isError = false;

  // Controla el estado del ojito (mostrar/ocultar clave)
  let showPassword = false;

  async function handleSubmit() {
    loading = true;
    message = '';
    isError = false;
    
    if (isLogin) {
      // Lógica de Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        message = 'Error: Credenciales incorrectas.';
        isError = true;
        loading = false;
      } else {
        goto('/'); // Te lleva al inicio como pediste
      }
    } else {
      // Lógica de Registro
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        message = 'Error al registrarse. Intentá con otro mail.';
        isError = true;
      } else {
        message = '¡Cuenta creada! Revisá tu mail para confirmar.';
        isError = false;
      }
      loading = false;
    }
  }

  // Envía el correo de recuperación utilizando el email ingresado
  async function handleForgotPassword() {
    if (!email) {
      message = 'Ingresá tu email primero para poder restablecer la contraseña.';
      isError = true;
      return;
    }

    loading = true;
    message = '';
    isError = false;

    // Supabase envía el mail y redirige al usuario a la ruta /reset-password
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      message = 'Error al enviar el correo: ' + error.message;
      isError = true;
    } else {
      message = `Enlace enviado a ${email.toUpperCase()}. Revisá tu bandeja o spam.`;
      isError = false;
    }
    
    loading = false;
  }
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian px-6 py-20">
  
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]" />
  </div>

  <div class="relative z-10 w-full max-w-md">
    <div class="text-center mb-10">
        <h1 class="font-heading text-titanium text-5xl mb-2">
            PUNTO <span class="text-volt">CERO</span>
        </h1>
        <div class="flex justify-center gap-4 mt-6">
          <button 
            type="button"
            on:click={() => { isLogin = true; message = ''; }}
            class="text-[10px] tracking-[0.3em] uppercase font-bold transition-colors {isLogin ? 'text-volt border-b border-volt pb-1' : 'text-titanium/30 hover:text-titanium'}"
          >
            Entrar
          </button>
          <button 
            type="button"
            on:click={() => { isLogin = false; message = ''; }}
            class="text-[10px] tracking-[0.3em] uppercase font-bold transition-colors {!isLogin ? 'text-volt border-b border-volt pb-1' : 'text-titanium/30 hover:text-titanium'}"
          >
            Registrarse
          </button>
        </div>
    </div>

<div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative">
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        
        {#if message}
          <div class="border p-3 text-[10px] text-center uppercase tracking-widest {isError ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-volt/10 border-volt text-volt'}">
            {message}
          </div>
        {/if}

        <div>
          <label for="email" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-2">Email</label>
          <input 
            type="email" 
            id="email"
            bind:value={email}
            required
            class="w-full bg-obsidian border border-white/10 text-titanium px-4 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/10"
            placeholder="TU@EMAIL.COM"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <label for="password" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase">Contraseña</label>
            
            {#if isLogin}
              <button 
                type="button" 
                on:click={handleForgotPassword}
                class="text-[9px] font-bold text-titanium/30 hover:text-volt transition-colors uppercase tracking-widest"
              >
                ¿Te la olvidaste?
              </button>
            {/if}
          </div>

          <div class="relative">
            {#if showPassword}
              <input 
                type="text" 
                id="password-text"
                bind:value={password}
                required
                class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors"
              />
            {:else}
              <input 
                type="password" 
                id="password"
                bind:value={password}
                required
                class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors"
              />
            {/if}
            
            <button 
              type="button"
              on:click={() => showPassword = !showPassword}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-titanium/30 hover:text-volt transition-colors focus:outline-none"
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
          disabled={loading}
          class="group relative w-full bg-volt text-obsidian font-black text-xs tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 disabled:opacity-50 uppercase overflow-hidden"
        >
          <span class="relative z-10">
            {loading ? 'Procesando...' : (isLogin ? 'Confirmar Acceso' : 'Crear mi Cuenta')}
          </span>
        </button>
      </form>
    </div>

    <div class="text-center mt-10">
        <a href="/" class="text-titanium/30 hover:text-volt text-[9px] tracking-[0.4em] uppercase transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a la tienda
        </a>
    </div>
  </div>
</section>