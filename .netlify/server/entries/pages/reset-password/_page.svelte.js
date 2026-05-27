import { F as FILENAME } from "../../../chunks/dev2.js";
import { b as attr, e as escape_html } from "../../../chunks/renderer.js";
import { p as push_element, a as pop_element } from "../../../chunks/dev.js";
import "../../../chunks/supabase.js";
import "../../../chunks/client.js";
_page[FILENAME] = "src/routes/reset-password/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      let password = "";
      let isError = false;
      $$renderer2.push(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian px-6 py-20">`);
      push_element($$renderer2, "section", 37, 0);
      $$renderer2.push(`<div class="absolute inset-0 pointer-events-none">`);
      push_element($$renderer2, "div", 39, 2);
      $$renderer2.push(`<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]">`);
      push_element($$renderer2, "div", 40, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="relative z-10 w-full max-w-md">`);
      push_element($$renderer2, "div", 43, 2);
      $$renderer2.push(`<div class="text-center mb-10">`);
      push_element($$renderer2, "div", 44, 4);
      $$renderer2.push(`<h1 class="font-heading text-titanium text-4xl mb-2">`);
      push_element($$renderer2, "h1", 45, 6);
      $$renderer2.push(`NUEVA <span class="text-volt">`);
      push_element($$renderer2, "span", 46, 14);
      $$renderer2.push(`CLAVE</span>`);
      pop_element();
      $$renderer2.push(`</h1>`);
      pop_element();
      $$renderer2.push(` <p class="text-titanium/40 text-[10px] tracking-[0.3em] uppercase mt-2">`);
      push_element($$renderer2, "p", 48, 6);
      $$renderer2.push(`Restablecer acceso — Punto Cero</p>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative">`);
      push_element($$renderer2, "div", 51, 4);
      $$renderer2.push(`<form class="space-y-6">`);
      push_element($$renderer2, "form", 52, 6);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div>`);
      push_element($$renderer2, "div", 60, 8);
      $$renderer2.push(`<label for="new-password" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-2">`);
      push_element($$renderer2, "label", 61, 10);
      $$renderer2.push(`Nueva Contraseña</label>`);
      pop_element();
      $$renderer2.push(` <div class="relative">`);
      push_element($$renderer2, "div", 63, 10);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<input type="password" id="new-password"${attr("value", password)} required=""${attr("disabled", isError, true)} placeholder="••••••••" class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/10"/>`);
        push_element($$renderer2, "input", 75, 14);
        pop_element();
      }
      $$renderer2.push(`<!--]--> <button type="button"${attr("disabled", isError, true)} class="absolute right-4 top-1/2 -translate-y-1/2 text-titanium/30 hover:text-volt transition-colors focus:outline-none disabled:opacity-0" aria-label="Mostrar contraseña">`);
      push_element($$renderer2, "button", 86, 12);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
        push_element($$renderer2, "svg", 99, 16);
        $$renderer2.push(`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">`);
        push_element($$renderer2, "path", 100, 18);
        $$renderer2.push(`</path>`);
        pop_element();
        $$renderer2.push(`<circle cx="12" cy="12" r="3">`);
        push_element($$renderer2, "circle", 101, 18);
        $$renderer2.push(`</circle>`);
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
      $$renderer2.push(` <button type="submit"${attr("disabled", isError, true)} class="group relative w-full bg-volt text-obsidian font-black text-xs tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 disabled:opacity-50 uppercase overflow-hidden">`);
      push_element($$renderer2, "button", 108, 8);
      $$renderer2.push(`<span class="relative z-10">`);
      push_element($$renderer2, "span", 113, 10);
      $$renderer2.push(`${escape_html("Cambiar Contraseña")}</span>`);
      pop_element();
      $$renderer2.push(`</button>`);
      pop_element();
      $$renderer2.push(`</form>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
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
