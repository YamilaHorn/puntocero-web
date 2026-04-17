<script lang="ts">
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let isLogin = true; // Switch entre login y registro
  let email = '';
  let password = '';
  let loading = false;
  let message = '';
  let isError = false;

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
            on:click={() => isLogin = true}
            class="text-[10px] tracking-[0.3em] uppercase font-bold transition-colors {isLogin ? 'text-volt border-b border-volt pb-1' : 'text-titanium/30 hover:text-titanium'}"
          >
            Entrar
          </button>
          <button 
            on:click={() => isLogin = false}
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
          <label for="password" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-2">Contraseña</label>
          <input 
            type="password" 
            id="password"
            bind:value={password}
            required
            class="w-full bg-obsidian border border-white/10 text-titanium px-4 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors"
          />
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