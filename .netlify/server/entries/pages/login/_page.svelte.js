import { c as attr_class, b as attr, e as escape_html } from "../../../chunks/renderer.js";
import "../../../chunks/supabase.js";
import "../../../chunks/client.js";
import { p as push_element, a as pop_element } from "../../../chunks/dev.js";
import { F as FILENAME } from "../../../chunks/dev2.js";
_page[FILENAME] = "src/routes/login/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      let email = "";
      let password = "";
      let loading = false;
      $$renderer2.push(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian px-6 py-20">`);
      push_element($$renderer2, "section", 58, 0);
      $$renderer2.push(`<div class="absolute inset-0 pointer-events-none">`);
      push_element($$renderer2, "div", 60, 2);
      $$renderer2.push(`<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]">`);
      push_element($$renderer2, "div", 61, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="relative z-10 w-full max-w-md">`);
      push_element($$renderer2, "div", 64, 2);
      $$renderer2.push(`<div class="text-center mb-10">`);
      push_element($$renderer2, "div", 65, 4);
      $$renderer2.push(`<h1 class="font-heading text-titanium text-5xl mb-2">`);
      push_element($$renderer2, "h1", 66, 8);
      $$renderer2.push(`PUNTO <span class="text-volt">`);
      push_element($$renderer2, "span", 67, 18);
      $$renderer2.push(`CERO</span>`);
      pop_element();
      $$renderer2.push(`</h1>`);
      pop_element();
      $$renderer2.push(` <div class="flex justify-center gap-4 mt-6">`);
      push_element($$renderer2, "div", 69, 8);
      $$renderer2.push(`<button type="button"${attr_class(`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${"text-volt border-b border-volt pb-1"}`)}>`);
      push_element($$renderer2, "button", 70, 10);
      $$renderer2.push(`Entrar</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${"text-titanium/30 hover:text-titanium"}`)}>`);
      push_element($$renderer2, "button", 77, 10);
      $$renderer2.push(`Registrarse</button>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="bg-carbon/50 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative">`);
      push_element($$renderer2, "div", 87, 0);
      $$renderer2.push(`<form class="space-y-6">`);
      push_element($$renderer2, "form", 88, 6);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div>`);
      push_element($$renderer2, "div", 96, 8);
      $$renderer2.push(`<label for="email" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase mb-2">`);
      push_element($$renderer2, "label", 97, 10);
      $$renderer2.push(`Email</label>`);
      pop_element();
      $$renderer2.push(` <input type="email" id="email"${attr("value", email)} required="" class="w-full bg-obsidian border border-white/10 text-titanium px-4 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors placeholder:text-white/10" placeholder="TU@EMAIL.COM"/>`);
      push_element($$renderer2, "input", 98, 10);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div>`);
      push_element($$renderer2, "div", 108, 8);
      $$renderer2.push(`<div class="flex justify-between items-center mb-2">`);
      push_element($$renderer2, "div", 109, 10);
      $$renderer2.push(`<label for="password" class="block text-[10px] font-bold text-volt tracking-[0.2em] uppercase">`);
      push_element($$renderer2, "label", 110, 12);
      $$renderer2.push(`Contraseña</label>`);
      pop_element();
      $$renderer2.push(` `);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button type="button" class="text-[9px] font-bold text-titanium/30 hover:text-volt transition-colors uppercase tracking-widest">`);
        push_element($$renderer2, "button", 113, 14);
        $$renderer2.push(`¿Te la olvidaste?</button>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(` <div class="relative">`);
      push_element($$renderer2, "div", 123, 10);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<input type="password" id="password"${attr("value", password)} required="" class="w-full bg-obsidian border border-white/10 text-titanium pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-volt/50 transition-colors"/>`);
        push_element($$renderer2, "input", 133, 14);
        pop_element();
      }
      $$renderer2.push(`<!--]--> <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-titanium/30 hover:text-volt transition-colors focus:outline-none" aria-label="Mostrar contraseña">`);
      push_element($$renderer2, "button", 142, 12);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
        push_element($$renderer2, "svg", 154, 16);
        $$renderer2.push(`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">`);
        push_element($$renderer2, "path", 155, 18);
        $$renderer2.push(`</path>`);
        pop_element();
        $$renderer2.push(`<circle cx="12" cy="12" r="3">`);
        push_element($$renderer2, "circle", 156, 18);
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
      $$renderer2.push(` <button type="submit"${attr("disabled", loading, true)} class="group relative w-full bg-volt text-obsidian font-black text-xs tracking-[0.3em] py-5 hover:bg-white transition-all duration-300 disabled:opacity-50 uppercase overflow-hidden">`);
      push_element($$renderer2, "button", 163, 8);
      $$renderer2.push(`<span class="relative z-10">`);
      push_element($$renderer2, "span", 168, 10);
      $$renderer2.push(`${escape_html("Confirmar Acceso")}</span>`);
      pop_element();
      $$renderer2.push(`</button>`);
      pop_element();
      $$renderer2.push(`</form>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="text-center mt-10">`);
      push_element($$renderer2, "div", 175, 4);
      $$renderer2.push(`<a href="/" class="text-titanium/30 hover:text-volt text-[9px] tracking-[0.4em] uppercase transition-colors flex items-center justify-center gap-2">`);
      push_element($$renderer2, "a", 176, 8);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 177, 12);
      $$renderer2.push(`<line x1="19" y1="12" x2="5" y2="12">`);
      push_element($$renderer2, "line", 177, 186);
      $$renderer2.push(`</line>`);
      pop_element();
      $$renderer2.push(`<polyline points="12 19 5 12 12 5">`);
      push_element($$renderer2, "polyline", 177, 224);
      $$renderer2.push(`</polyline>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` Volver a la tienda</a>`);
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
