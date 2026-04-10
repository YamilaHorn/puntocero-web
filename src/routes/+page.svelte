<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let products: any[] = [];

    onMount(async () => {
        // Traemos los datos
        const { data, error } = await supabase.from('products').select('*');
        if (data) products = data;
        if (error) console.error("Error trayendo botines:", error);
    });
</script>

<div class="min-h-screen bg-gray-100 p-8">
    <header class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 uppercase tracking-tighter">
            Punto Cero <span class="text-blue-600">Web</span>
        </h1>
        <p class="text-gray-500">Catálogo exclusivo de botines</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each products as product}
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div class="h-48 bg-gray-200 overflow-hidden">
    {#if product.image_url}
        <img 
            src={product.image_url} 
            alt={product.name} 
            class="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
    {:else}
        <div class="h-full flex items-center justify-center text-gray-400">
            <span>Sin imagen todavía</span>
        </div>
    {/if}
</div>
                
                <div class="p-5">
                    <h2 class="text-xl font-bold text-gray-800">{product.name}</h2>
                    <p class="text-2xl font-black text-blue-600 mt-2">
    ${Number(product.price_total || 0).toLocaleString('es-AR')}
</p>
                    
                    <button class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition">
                        Consultar por WhatsApp
                    </button>
                </div>
            </div>
        {:else}
            <p class="text-center col-span-full text-gray-500">Cargando los mejores botines...</p>
        {/each}
    </div>
</div>