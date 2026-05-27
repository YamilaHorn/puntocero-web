import { F as FILENAME } from "../../../chunks/dev2.js";
import "clsx";
import { p as push_element, a as pop_element } from "../../../chunks/dev.js";
import "../../../chunks/supabase.js";
_page[FILENAME] = "src/routes/fav/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      $$renderer2.push(`<div class="min-h-screen bg-slate-50 p-6 md:p-10">`);
      push_element($$renderer2, "div", 25, 0);
      $$renderer2.push(`<div class="max-w-7xl mx-auto">`);
      push_element($$renderer2, "div", 26, 4);
      $$renderer2.push(`<header class="mb-10 flex justify-between items-center">`);
      push_element($$renderer2, "header", 27, 8);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 28, 12);
      $$renderer2.push(`<a href="/" class="text-blue-600 font-bold text-sm uppercase tracking-widest hover:underline">`);
      push_element($$renderer2, "a", 29, 16);
      $$renderer2.push(`← Volver al catálogo</a>`);
      pop_element();
      $$renderer2.push(` <h1 class="text-3xl font-black text-slate-900 uppercase mt-2">`);
      push_element($$renderer2, "h1", 30, 16);
      $$renderer2.push(`Mis <span class="text-blue-600">`);
      push_element($$renderer2, "span", 30, 82);
      $$renderer2.push(`Favoritos</span>`);
      pop_element();
      $$renderer2.push(`</h1>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</header>`);
      pop_element();
      $$renderer2.push(` `);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="text-slate-400 animate-pulse">`);
        push_element($$renderer2, "p", 35, 12);
        $$renderer2.push(`Cargando tu selección...</p>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
    },
    _page
  );
}
_page.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export {
  _page as default
};
