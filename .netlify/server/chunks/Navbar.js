import { c as attr_class, a as ensure_array_like, b as attr, e as escape_html } from "./renderer.js";
import { p as push_element, a as pop_element } from "./dev.js";
import "./supabase.js";
import { F as FILENAME } from "./dev2.js";
Navbar[FILENAME] = "src/lib/components/Navbar.svelte";
function Navbar($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const navLinks = [
        { label: "INICIO", href: "/#hero" },
        { label: "CATÁLOGO", href: "/#catalogo" },
        { label: "NOSOTROS", href: "/#specs" },
        { label: "RESEÑAS", href: "/#social" }
      ];
      $$renderer2.push(`<nav${attr_class(`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${"bg-transparent"}`)}>`);
      push_element($$renderer2, "nav", 42, 0);
      $$renderer2.push(`<div class="max-w-7xl mx-auto px-6 lg:px-8">`);
      push_element($$renderer2, "div", 48, 2);
      $$renderer2.push(`<div class="flex items-center justify-between h-16 lg:h-20">`);
      push_element($$renderer2, "div", 49, 4);
      $$renderer2.push(`<a href="/#hero" class="flex items-center gap-2">`);
      push_element($$renderer2, "a", 50, 6);
      $$renderer2.push(`<div class="w-28 h-30 flex items-center justify-center">`);
      push_element($$renderer2, "div", 51, 8);
      $$renderer2.push(`<img src="/logo.png" alt="Logo Punto Cero" class="w-full h-full object-contain"/>`);
      push_element($$renderer2, "img", 52, 10);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(` <div class="hidden lg:flex items-center gap-10">`);
      push_element($$renderer2, "div", 60, 6);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(navLinks);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        $$renderer2.push(`<a${attr("href", link.href)} class="text-xs font-semibold tracking-widest text-titanium/50 hover:text-volt transition-colors duration-300">`);
        push_element($$renderer2, "a", 62, 10);
        $$renderer2.push(`${escape_html(link.label)}</a>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(` <div class="flex items-center gap-4">`);
      push_element($$renderer2, "div", 71, 6);
      $$renderer2.push(`<a href="/#catalogo" class="hidden lg:flex items-center gap-2 bg-volt text-obsidian font-bold text-xs tracking-widest px-5 py-2.5 hover:bg-volt/90 transition-colors focus:outline-none">`);
      push_element($$renderer2, "a", 72, 8);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 76, 10);
      $$renderer2.push(`<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z">`);
      push_element($$renderer2, "path", 86, 12);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`<line x1="3" y1="6" x2="21" y2="6">`);
      push_element($$renderer2, "line", 87, 12);
      $$renderer2.push(`</line>`);
      pop_element();
      $$renderer2.push(`<path d="M16 10a4 4 0 0 1-8 0">`);
      push_element($$renderer2, "path", 88, 12);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` VER CATÁLOGO</a>`);
      pop_element();
      $$renderer2.push(` <div class="hidden lg:flex items-center gap-3 pr-2 border-r border-white/5">`);
      push_element($$renderer2, "div", 94, 8);
      $$renderer2.push(`<a href="https://instagram.com/tu_usuario" target="_blank" rel="noopener noreferrer" class="text-titanium/40 hover:text-volt transition-colors p-1" aria-label="Instagram">`);
      push_element($$renderer2, "a", 97, 10);
      $$renderer2.push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">`);
      push_element($$renderer2, "svg", 104, 12);
      $$renderer2.push(`<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z">`);
      push_element($$renderer2, "path", 105, 15);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(` <a href="https://tiktok.com/@tu_usuario" target="_blank" rel="noopener noreferrer" class="text-titanium/40 hover:text-volt transition-colors p-1" aria-label="TikTok">`);
      push_element($$renderer2, "a", 110, 10);
      $$renderer2.push(`<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">`);
      push_element($$renderer2, "svg", 117, 12);
      $$renderer2.push(`<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.11.13.23.26.36.38.15.14.31.27.47.4 1.15.86 2.53 1.34 3.96 1.4v4.17c-1.29-.07-2.56-.47-3.66-1.16-.3-.19-.59-.4-.87-.63-.2-.17-.39-.35-.57-.54V13.8c0 2.02-.45 3.97-1.35 5.73-.82 1.6-2.06 2.95-3.6 3.84a11.18 11.18 0 01-11.72-.11c-1.6-.98-2.89-2.42-3.71-4.13A11.43 11.43 0 010 14.4c.05-2.91 1.21-5.64 3.25-7.72 1.83-1.87 4.26-2.99 6.85-3.17V7.6c-1.15.08-2.27.5-3.21 1.18A6.87 6.87 0 004.4 11.6c-.36.98-.49 2.03-.39 3.07.15 1.51.85 2.91 1.98 3.91a7.12 7.12 0 007.49 1.13 7.02 7.02 0 003.93-4.8c.24-1.12.22-2.3-.07-3.41V0h-4.81z">`);
      push_element($$renderer2, "path", 118, 15);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="hidden lg:block">`);
      push_element($$renderer2, "div", 125, 8);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="flex items-center gap-4 pl-2">`);
        push_element($$renderer2, "div", 170, 12);
        $$renderer2.push(`<a href="/login" class="text-[10px] font-bold tracking-widest text-titanium/50 hover:text-volt uppercase transition-colors">`);
        push_element($$renderer2, "a", 171, 14);
        $$renderer2.push(`Ingresar</a>`);
        pop_element();
        $$renderer2.push(` <a href="/registro" class="border border-white/10 hover:border-volt/40 text-titanium text-[10px] font-bold tracking-widest px-4 py-2 uppercase transition-all">`);
        push_element($$renderer2, "a", 177, 14);
        $$renderer2.push(`Registrarse</a>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(` <button class="lg:hidden text-titanium p-2" aria-label="Menú">`);
      push_element($$renderer2, "button", 187, 8);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
        push_element($$renderer2, "svg", 211, 12);
        $$renderer2.push(`<line x1="3" y1="12" x2="21" y2="12">`);
        push_element($$renderer2, "line", 221, 14);
        $$renderer2.push(`</line>`);
        pop_element();
        $$renderer2.push(`<line x1="3" y1="6" x2="21" y2="6">`);
        push_element($$renderer2, "line", 222, 14);
        $$renderer2.push(`</line>`);
        pop_element();
        $$renderer2.push(`<line x1="3" y1="18" x2="21" y2="18">`);
        push_element($$renderer2, "line", 223, 14);
        $$renderer2.push(`</line>`);
        pop_element();
        $$renderer2.push(`</svg>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></button>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></nav>`);
      pop_element();
    },
    Navbar
  );
}
Navbar.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export {
  Navbar as N
};
