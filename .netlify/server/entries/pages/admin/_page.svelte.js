import { F as FILENAME } from "../../../chunks/dev2.js";
import "clsx";
import { p as push_element, a as pop_element } from "../../../chunks/dev.js";
import "../../../chunks/supabase.js";
import "../../../chunks/client.js";
_page[FILENAME] = "src/routes/admin/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="fixed inset-0 bg-obsidian flex items-center justify-center text-titanium font-mono text-xs tracking-widest z-50">`);
        push_element($$renderer2, "div", 41, 2);
        $$renderer2.push(`VERIFICANDO CREDENCIALES DE ADMINISTRADOR...</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]-->`);
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
