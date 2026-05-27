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
        <img 
          src="/logo.png" 
          alt="Punto Cero Logo" 
          class="h-40 w-auto object-contain brightness-95" 
        />
      </div>

      <!-- Menú de Enlaces + Redes Sociales agrupados -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12">
        <nav class="flex flex-wrap gap-6">
          {#each links as link}
            <a href={link.href}
               class="text-xs text-white/40 hover:text-volt transition-colors tracking-widest uppercase font-medium">
              {link.label}
            </a>
          {/each}
        </nav>

        <!-- ICONOS REDES EN FOOTER -->
        <div class="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">
          <a href="https://instagram.com/punt0.cero" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-volt transition-colors p-1" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://tiktok.com/@punt0_cero" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-volt transition-colors p-1" aria-label="TikTok">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 10.86 4.43v-8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.12z"/></svg>
          </a>
        </div>
      </div>

    </div>

    <div class="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-[10px] font-mono text-white/20 tracking-widest">© 2026 Punto Cero — ALL RIGHTS RESERVED</p>
      <p class="text-[10px] font-mono text-white/20 tracking-widest">ENGINEERED FOR PERFORMANCE</p>
    </div>
  </div>
</footer>