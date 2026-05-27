<script lang="ts">
  const links = [
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Garantía', href: '#specs'  },
    { label: 'Reseñas',   href: '#social'  },
    { label: 'Contacto',  href: '#contacto'},
  ];
</script>

<footer class="bg-obsidian border-t border-white/5">
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      
      <!-- Bloque del Logotipo Unificado -->
      <div class="flex items-center gap-3">
        <!-- Reemplazo del cuadro KP por tu logo local de la carpeta static -->
        <img 
          src="/logo.png" 
          alt="Punto Cero Logo" 
          class="h-40 w-auto object-contain brightness-95" 
        />
      </div>

      <nav class="flex flex-wrap gap-6">
        {#each links as link}
          <a href={link.href}
             class="text-xs text-white/40 hover:text-volt transition-colors tracking-widest uppercase font-medium">
            {link.label}
          </a>
        {/each}
      </nav>
    </div>

    <div class="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-[10px] font-mono text-white/20 tracking-widest">© 2026 Punto Cero — ALL RIGHTS RESERVED</p>
      <p class="text-[10px] font-mono text-white/20 tracking-widest">ENGINEERED FOR PERFORMANCE</p>
    </div>
  </div>
</footer>