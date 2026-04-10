<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { PUBLIC_CLOUDINARY_CLOUD_NAME, PUBLIC_CLOUDINARY_UPLOAD_PRESET } from '$env/static/public';

    let name = '';
    let price_total = 0;
    let fileInput: HTMLInputElement;
    let uploading = false;

    async function handleSubmit() {
        if (!fileInput.files || fileInput.files.length === 0) return alert('Subí una foto che!');
        
        uploading = true;
        const file = fileInput.files[0];

        // 1. Subir imagen a Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const imgData = await res.json();

        // 2. Guardar todo en Supabase
        const { error } = await supabase.from('products').insert([
            { 
                name, 
                price_total, 
                image_url: imgData.secure_url 
            }
        ]);

        if (error) {
            alert('Error al guardar en base de datos');
        } else {
            alert('Botín cargado con éxito! 🚀');
            name = '';
            price_total = 0;
        }
        uploading = false;
    }
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Cargar Nuevo Botín</h1>

    <div class="space-y-4">
        <input type="text" placeholder="Nombre del botín" bind:value={name} class="w-full p-2 border rounded" />
        <input type="number" placeholder="Precio Total" bind:value={price_total} class="w-full p-2 border rounded" />
        
        <label for="foto-botin" class="block text-sm font-medium text-gray-700">Foto del botín</label>
<input 
    id="foto-botin"
    type="file" 
    bind:this={fileInput} 
    class="w-full text-sm text-gray-500" 
/>

        <button 
            on:click={handleSubmit} 
            disabled={uploading}
            class="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
            {uploading ? 'Subiendo...' : 'Publicar Botín'}
        </button>
    </div>
    
    <a href="/" class="block text-center mt-4 text-sm text-gray-500 underline">Volver al catálogo</a>
</div>