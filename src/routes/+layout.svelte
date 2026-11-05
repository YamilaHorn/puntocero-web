<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import { supabase } from "$lib/supabase";
    import { favoritesStore, loadFavorites } from "$lib/components/favoritesStore"; // Importamos el cerebro
    import { onMount } from "svelte";
    import type { Session, User } from "@supabase/supabase-js";

    let user: User | null = null;
    let favoritesLoadedFor: string | null = null;

    function syncSession(session: Session | null) {
        user = session?.user ?? null;

        if (!user) {
            favoritesLoadedFor = null;
            favoritesStore.set([]);
            return;
        }

        if (favoritesLoadedFor !== user.id) {
            favoritesLoadedFor = user.id;
            void loadFavorites(user.id);
        }
    }

    onMount(() => {
        // Listener de autenticación: se activa al entrar, salir o registrarse
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            syncSession(session);
        });

        // Verificación inicial de sesión
        void supabase.auth.getSession().then(({ data: { session } }) => {
            syncSession(session);
        });

        return () => subscription.unsubscribe();
    });
</script>

<Navbar {user} />

<slot />