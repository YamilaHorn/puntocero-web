import { s as slot } from "../../chunks/renderer.js";
import { N as Navbar } from "../../chunks/Navbar.js";
import "../../chunks/supabase.js";
import { F as FILENAME } from "../../chunks/dev2.js";
_layout[FILENAME] = "src/routes/+layout.svelte";
function _layout($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      Navbar($$renderer2);
      $$renderer2.push(`<!----> <!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    },
    _layout
  );
}
_layout.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
export {
  _layout as default
};
