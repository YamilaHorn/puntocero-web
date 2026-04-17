import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

// Este es el almacén central de IDs de favoritos
export const favoritesStore = writable<number[]>([]);

// Función para cargar favoritos desde la base de datos
export const loadFavorites = async (userId: string) => {
    const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

    if (!error && data) {
        favoritesStore.set(data.map(f => f.product_id));
    }
};

// Función para agregar/quitar que actualiza TODO en tiempo real
export const toggleFavorite = async (userId: string, productId: number) => {
    let currentFavs: number[] = [];
    favoritesStore.subscribe(val => currentFavs = val)();

    const isFav = currentFavs.includes(productId);

    if (isFav) {
        // 1. Actualizamos la UI al toque (Optimista)
        favoritesStore.set(currentFavs.filter(id => id !== productId));
        
        // 2. Actualizamos la base de datos
        await supabase.from('favorites')
            .delete()
            .eq('product_id', productId)
            .eq('user_id', userId);
    } else {
        // 1. Actualizamos la UI al toque
        favoritesStore.set([...currentFavs, productId]);
        
        // 2. Actualizamos la base de datos
        await supabase.from('favorites')
            .insert([{ user_id: userId, product_id: productId }]);
    }
};