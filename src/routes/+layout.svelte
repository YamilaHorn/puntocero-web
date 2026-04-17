<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import { supabase } from "$lib/supabase";
    import { favoritesStore, loadFavorites } from "$lib/components/favoritesStore"; // Importamos el cerebro
    import { onMount } from "svelte";

    let user: any = null;

    onMount(async () => {
        // Listener de autenticación: se activa al entrar, salir o registrarse
        supabase.auth.onAuthStateChange((_event, session) => {
            user = session?.user ?? null;
            if (user) {
                loadFavorites(user.id); // Carga los favoritos al entrar
            } else {
                favoritesStore.set([]); // Limpia si cierra sesión
            }
        });

        // Verificación inicial de sesión
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user ?? null;
        if (user) {
            loadFavorites(user.id);
        }
    });
</script>

<Navbar  />

<slot />