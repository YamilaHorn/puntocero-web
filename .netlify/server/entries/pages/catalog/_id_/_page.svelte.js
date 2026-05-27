import { b as attr, a as ensure_array_like, c as attr_class, e as escape_html, d as bind_props } from "../../../../chunks/renderer.js";
import "../../../../chunks/client.js";
import { p as push_element, a as pop_element } from "../../../../chunks/dev.js";
import { F as FILENAME } from "../../../../chunks/dev2.js";
_page[FILENAME] = "src/routes/catalog/[id]/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      let product, variants, colorsMap, uniqueColors, activeImages, activeSizes;
      let data = $$props["data"];
      let selectedColor = "";
      let selectedSize = "";
      let activeImageIndex = 0;
      let wppMessage = "";
      product = data?.product || {};
      variants = product?.product_variants || [];
      colorsMap = variants.reduce(
        (acc, variant) => {
          const colorName = variant.color || "Único";
          if (!acc[colorName]) {
            acc[colorName] = {
              name: colorName,
              thumbnail: variant.images?.[0] || "",
              productId: variant.product_id || product.id,
              // ID del producto base al que pertenece
              sizes: []
            };
          }
          acc[colorName].sizes.push({ size: variant.size, stock: variant.stock_qty, id: variant.id });
          return acc;
        },
        {}
      );
      uniqueColors = Object.values(colorsMap);
      if (uniqueColors && uniqueColors.length > 0 && !selectedColor) {
        selectedColor = uniqueColors[0].name;
      }
      activeImages = variants.find((v) => v.color === selectedColor)?.images || [];
      activeSizes = colorsMap[selectedColor]?.sizes || [];
      if (selectedColor) activeImageIndex = 0;
      {
        const nombre = product?.name || "";
        const color = selectedColor || "";
        const talleText = "";
        wppMessage = `https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20por%2520el%2520modelo%2520${encodeURIComponent(nombre)}%2520en%2520color%2520${encodeURIComponent(color)}${encodeURIComponent(talleText)}`;
      }
      $$renderer2.push(`<div class="min-h-screen bg-obsidian text-titanium pt-28 pb-12 px-6">`);
      push_element($$renderer2, "div", 42, 0);
      $$renderer2.push(`<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">`);
      push_element($$renderer2, "div", 43, 2);
      $$renderer2.push(`<div class="space-y-4">`);
      push_element($$renderer2, "div", 45, 4);
      $$renderer2.push(`<div class="aspect-square bg-carbon border border-white/5 overflow-hidden relative flex items-center justify-center p-8">`);
      push_element($$renderer2, "div", 46, 6);
      if (activeImages.length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<img${attr("src", activeImages[activeImageIndex])}${attr("alt", product.name)} class="max-h-full object-contain transition-all duration-300"/>`);
        push_element($$renderer2, "img", 48, 10);
        pop_element();
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span class="font-mono text-xs text-white/20 uppercase tracking-widest">`);
        push_element($$renderer2, "span", 50, 10);
        $$renderer2.push(`Sin imágenes disponibles</span>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(` <div class="flex gap-2 overflow-x-auto">`);
      push_element($$renderer2, "div", 54, 6);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(activeImages);
      for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
        let img = each_array[idx];
        $$renderer2.push(`<button type="button"${attr_class(`w-20 h-20 bg-carbon border p-2 flex-shrink-0 transition-all ${activeImageIndex === idx ? "border-volt" : "border-white/10 hover:border-white/30"}`)}>`);
        push_element($$renderer2, "button", 56, 10);
        $$renderer2.push(`<img${attr("src", img)} alt="Vista alternativa" class="w-full h-full object-contain"/>`);
        push_element($$renderer2, "img", 62, 12);
        pop_element();
        $$renderer2.push(`</button>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="flex flex-col justify-between">`);
      push_element($$renderer2, "div", 68, 4);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 69, 6);
      $$renderer2.push(`<span class="font-mono text-xs text-volt tracking-widest uppercase">`);
      push_element($$renderer2, "span", 70, 8);
      $$renderer2.push(`// ${escape_html(product.category || "BOTINES")}</span>`);
      pop_element();
      $$renderer2.push(` <h1 class="font-heading text-4xl uppercase text-titanium tracking-tight mt-2 mb-1">`);
      push_element($$renderer2, "h1", 71, 8);
      $$renderer2.push(`${escape_html(product.name || "")}</h1>`);
      pop_element();
      $$renderer2.push(` <p class="font-heading text-volt text-3xl mb-6">`);
      push_element($$renderer2, "p", 72, 8);
      $$renderer2.push(`$${escape_html(parseFloat(product.price_total || 0).toLocaleString("es-AR"))}</p>`);
      pop_element();
      $$renderer2.push(` <div class="mb-6 pt-4 border-t border-white/5">`);
      push_element($$renderer2, "div", 74, 8);
      $$renderer2.push(`<span class="block font-mono text-[10px] text-volt tracking-wider uppercase mb-2">`);
      push_element($$renderer2, "span", 75, 10);
      $$renderer2.push(`// DESCRIPCIÓN</span>`);
      pop_element();
      $$renderer2.push(` <p class="text-sm text-titanium/70 leading-relaxed whitespace-pre-line max-w-xl">`);
      push_element($$renderer2, "p", 76, 10);
      $$renderer2.push(`${escape_html(product.description || "Sin descripción disponible.")}</p>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div${attr_class(`mb-6 ${product.description ? "" : "pt-4 border-t border-white/5"}`)}>`);
      push_element($$renderer2, "div", 81, 8);
      $$renderer2.push(`<span class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3">`);
      push_element($$renderer2, "span", 82, 10);
      $$renderer2.push(`Colores Disponibles: <span class="text-titanium font-bold">`);
      push_element($$renderer2, "span", 83, 33);
      $$renderer2.push(`${escape_html(selectedColor)}</span>`);
      pop_element();
      $$renderer2.push(`</span>`);
      pop_element();
      $$renderer2.push(` <div class="flex gap-3 flex-wrap">`);
      push_element($$renderer2, "div", 85, 10);
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(uniqueColors);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let colorItem = each_array_1[$$index_1];
        $$renderer2.push(`<button type="button"${attr_class(`w-14 h-14 bg-carbon p-1 border transition-all relative group overflow-hidden ${selectedColor === colorItem.name ? "border-volt" : "border-white/10 hover:border-white/40"}`)}>`);
        push_element($$renderer2, "button", 87, 14);
        if (colorItem.thumbnail) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<img${attr("src", colorItem.thumbnail)}${attr("alt", colorItem.name)} class="w-full h-full object-contain"/>`);
          push_element($$renderer2, "img", 102, 18);
          pop_element();
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div class="w-full h-full flex items-center justify-center text-[8px] text-white/30 uppercase bg-obsidian">`);
          push_element($$renderer2, "div", 104, 18);
          $$renderer2.push(`Base</div>`);
          pop_element();
        }
        $$renderer2.push(`<!--]--></button>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="mb-8">`);
      push_element($$renderer2, "div", 111, 8);
      $$renderer2.push(`<span class="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-3">`);
      push_element($$renderer2, "span", 112, 10);
      $$renderer2.push(`Seleccionar Talle (AR / US)</span>`);
      pop_element();
      $$renderer2.push(` <div class="grid grid-cols-4 gap-2">`);
      push_element($$renderer2, "div", 113, 10);
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(activeSizes);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let sizeItem = each_array_2[$$index_2];
        const hasStock = product.is_on_demand || sizeItem.stock > 0;
        $$renderer2.push(`<button type="button"${attr("disabled", !hasStock, true)}${attr_class(`py-3 font-mono text-xs font-bold tracking-widest relative border transition-all ${!hasStock ? "bg-zinc-900 border-white/5 text-white/20 line-through cursor-not-allowed" : selectedSize === sizeItem.size ? "bg-volt text-obsidian border-volt" : "bg-carbon text-titanium border-white/10 hover:border-volt/50"}`)}>`);
        push_element($$renderer2, "button", 116, 14);
        $$renderer2.push(`${escape_html(sizeItem.size)} `);
        if (hasStock && !product.is_on_demand && sizeItem.stock <= 2) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="absolute top-1 right-1 text-[7px] text-orange-400 font-sans font-normal">`);
          push_element($$renderer2, "span", 126, 18);
          $$renderer2.push(`-${escape_html(sizeItem.stock)}</span>`);
          pop_element();
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></button>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="space-y-3">`);
      push_element($$renderer2, "div", 134, 6);
      $$renderer2.push(`<a${attr("href", wppMessage)} target="_blank" rel="noopener noreferrer" class="w-full bg-volt text-obsidian font-black text-center block py-4 text-xs tracking-widest uppercase hover:bg-white transition-all duration-300">`);
      push_element($$renderer2, "a", 135, 8);
      $$renderer2.push(`${escape_html("SELECCIONÁ UN TALLE")}</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      bind_props($$props, { data });
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
