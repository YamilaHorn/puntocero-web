<script lang="ts">
  const links = [
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Tecnología', href: '#specs'  },
    { label: 'Reseñas',   href: '#social'  },
    { label: 'Contacto',  href: '#contacto'},
  ];
</script>

<footer class="bg-obsidian border-t border-white/5">
  <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 bg-volt rounded-sm flex items-center justify-center">
          <span class="text-obsidian font-black text-[10px]">KP</span>
        </div>
        <span class="font-heading text-titanium text-sm">Punto Cero</span>
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