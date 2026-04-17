<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let favoriteProducts: any[] = [];
    let loading = true;
    let user: any = null;

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user ?? null;

        if (user) {
            // Traemos los IDs de la tabla favorites
            const { data: fData } = await supabase
                .from('favorites')
                .select('product_id');
            
            if (fData && fData.length > 0) {
                const ids = fData.map(f => f.product_id);
                
                // Traemos la info de esos productos específicos
                const { data: pData } = await supabase
                    .from('products')
                    .select('*')
                    .in('id', ids);
                
                if (pData) favoriteProducts = pData;
            }
        }
        loading = false;
    });

    async function removeFavorite(productId: number) {
        await supabase.from('favorites').delete().eq('product_id', productId).eq('user_id', user.id);
        favoriteProducts = favoriteProducts.filter(p => p.id !== productId);
    }
</script>

<div class="min-h-screen bg-slate-50 p-6 md:p-10">
    <div class="max-w-7xl mx-auto">
        <header class="mb-10 flex justify-between items-center">
            <div>
                <a href="/" class="text-blue-600 font-bold text-sm uppercase tracking-widest hover:underline">← Volver al catálogo</a>
                <h1 class="text-3xl font-black text-slate-900 uppercase mt-2">Mis <span class="text-blue-600">Favoritos</span></h1>
            </div>
        </header>

        {#if loading}
            <p class="text-slate-400 animate-pulse">Cargando tu selección...</p>
        {:else if favoriteProducts.length === 0}
            <div class="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
                <p class="text-slate-500 font-medium">Todavía no guardaste ningún producto.</p>
                <a href="/" class="inline-block mt-4 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">Explorar tienda</a>
            </div>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each favoriteProducts as product}
                    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative group">
                        <button 
                            on:click={() => removeFavorite(product.id)}
                            class="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                        <img src={product.image_url} alt="" class="w-full aspect-square object-contain mb-4">
                        <h3 class="font-bold text-slate-800 text-sm truncate">{product.name}</h3>
                        <p class="text-blue-600 font-black mt-1">${Number(product.price_total).toLocaleString('es-AR')}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>