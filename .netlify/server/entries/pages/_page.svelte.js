import { a as ensure_array_like, e as escape_html, b as attr, c as attr_class, h as head } from "../../chunks/renderer.js";
import { N as Navbar } from "../../chunks/Navbar.js";
import { p as push_element, a as pop_element } from "../../chunks/dev.js";
import { F as FILENAME } from "../../chunks/dev2.js";
import "../../chunks/supabase.js";
HeroSection[FILENAME] = "src/lib/components/HeroSection.svelte";
function HeroSection($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const HERO_SHOE_IMG = "/logosolo.png";
      const stats = [
        { value: "+100", label: "Modelos" },
        { value: "+10", label: "Marcas" },
        { value: "48h", label: "Envío" }
      ];
      $$renderer2.push(`<section id="hero" class="relative min-h-screen flex items-center overflow-hidden bg-obsidian">`);
      push_element($$renderer2, "section", 9, 0);
      $$renderer2.push(`<div class="absolute inset-0 pointer-events-none">`);
      push_element($$renderer2, "div", 13, 2);
      $$renderer2.push(`<div class="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-volt/5 blur-[120px]">`);
      push_element($$renderer2, "div", 14, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-volt/5 blur-[80px]">`);
      push_element($$renderer2, "div", 15, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">`);
      push_element($$renderer2, "div", 19, 2);
      $$renderer2.push(`<span class="font-heading text-white/[0.02] text-[8rem] md:text-[14rem] lg:text-[18rem] whitespace-nowrap leading-none">`);
      push_element($$renderer2, "span", 20, 4);
      $$renderer2.push(`PUNTO CERO</span>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">`);
      push_element($$renderer2, "div", 25, 2);
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">`);
      push_element($$renderer2, "div", 26, 4);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 29, 6);
      $$renderer2.push(`<div class="flex items-center gap-2 mb-6">`);
      push_element($$renderer2, "div", 30, 8);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 32, 10);
      $$renderer2.push(`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2">`);
      push_element($$renderer2, "polygon", 34, 12);
      $$renderer2.push(`</polygon>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` <span class="text-xs font-semibold tracking-[0.3em] text-volt uppercase">`);
      push_element($$renderer2, "span", 36, 10);
      $$renderer2.push(`@punt0.cero</span>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <h1 class="font-heading text-titanium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] mb-6">`);
      push_element($$renderer2, "h1", 41, 8);
      $$renderer2.push(`DONDE<br/>`);
      push_element($$renderer2, "br", 42, 15);
      pop_element();
      $$renderer2.push(`TODO<br/>`);
      push_element($$renderer2, "br", 42, 25);
      pop_element();
      $$renderer2.push(`<span class="text-volt">`);
      push_element($$renderer2, "span", 42, 31);
      $$renderer2.push(`COMIENZA</span>`);
      pop_element();
      $$renderer2.push(`</h1>`);
      pop_element();
      $$renderer2.push(` <p class="text-titanium/50 text-base md:text-lg leading-relaxed max-w-md mb-10">`);
      push_element($$renderer2, "p", 45, 8);
      $$renderer2.push(`Botines, zapatillas y artículos deportivos seleccionados para quienes viven el deporte al máximo. Rendimiento, estilo y calidad en cada paso.</p>`);
      pop_element();
      $$renderer2.push(` <div class="flex flex-col sm:flex-row items-start gap-3 mb-12">`);
      push_element($$renderer2, "div", 50, 8);
      $$renderer2.push(`<a href="#catalogo" class="group inline-flex items-center gap-3 bg-volt text-obsidian font-bold text-sm tracking-widest px-7 py-4 hover:bg-volt/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-obsidian">`);
      push_element($$renderer2, "a", 51, 10);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 53, 12);
      $$renderer2.push(`<circle cx="9" cy="21" r="1">`);
      push_element($$renderer2, "circle", 55, 14);
      $$renderer2.push(`</circle>`);
      pop_element();
      $$renderer2.push(`<circle cx="20" cy="21" r="1">`);
      push_element($$renderer2, "circle", 55, 44);
      $$renderer2.push(`</circle>`);
      pop_element();
      $$renderer2.push(`<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6">`);
      push_element($$renderer2, "path", 56, 14);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` VER CATÁLOGO <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 59, 12);
      $$renderer2.push(`<line x1="5" y1="12" x2="19" y2="12">`);
      push_element($$renderer2, "line", 62, 14);
      $$renderer2.push(`</line>`);
      pop_element();
      $$renderer2.push(`<polyline points="12 5 19 12 12 19">`);
      push_element($$renderer2, "polyline", 62, 52);
      $$renderer2.push(`</polyline>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(` <a href="https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20por%20un%20calzado" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 border border-white/20 text-titanium font-semibold text-sm tracking-wide px-7 py-4 hover:border-volt/50 hover:text-volt transition-all duration-300">`);
      push_element($$renderer2, "a", 66, 10);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 69, 12);
      $$renderer2.push(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">`);
      push_element($$renderer2, "path", 71, 14);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` CONSULTAR POR WPP</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="flex items-center gap-8 pt-8 border-t border-white/10">`);
      push_element($$renderer2, "div", 78, 8);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(stats);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let stat = each_array[$$index];
        $$renderer2.push(`<div>`);
        push_element($$renderer2, "div", 80, 12);
        $$renderer2.push(`<p class="font-heading text-volt text-2xl md:text-3xl">`);
        push_element($$renderer2, "p", 81, 14);
        $$renderer2.push(`${escape_html(stat.value)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="text-titanium/40 text-[10px] tracking-widest uppercase mt-1">`);
        push_element($$renderer2, "p", 82, 14);
        $$renderer2.push(`${escape_html(stat.label)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="flex items-center justify-center relative">`);
      push_element($$renderer2, "div", 89, 6);
      $$renderer2.push(`<div class="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-volt/10 blur-[80px]">`);
      push_element($$renderer2, "div", 90, 8);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <img${attr("src", HERO_SHOE_IMG)} alt="Zapatilla de alto rendimiento con tecnología de amortiguación avanzada" class="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl"/>`);
      push_element($$renderer2, "img", 91, 8);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">`);
      push_element($$renderer2, "div", 99, 2);
      $$renderer2.push(`<span class="text-[9px] tracking-[0.4em] text-titanium/30 uppercase">`);
      push_element($$renderer2, "span", 100, 4);
      $$renderer2.push(`Scroll</span>`);
      pop_element();
      $$renderer2.push(` <div class="w-px h-8 bg-gradient-to-b from-volt to-transparent animate-bounce">`);
      push_element($$renderer2, "div", 101, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
      pop_element();
    },
    HeroSection
  );
}
HeroSection.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
ProductCatalog[FILENAME] = "src/lib/components/ProductCatalog.svelte";
function ProductCatalog($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      let products = [];
      let activeCategory = "TODOS";
      products.filter((p) => {
        const filtro = activeCategory.toLowerCase();
        const secProducto = p.section.toLowerCase();
        if (filtro === "todos") return true;
        if (filtro === "fútbol") return secProducto === "fútbol";
        if (filtro === "running") return secProducto === "running";
        if (filtro === "rugby") return secProducto === "rugby";
        if (filtro === "basketball") return secProducto === "basketball";
        if (filtro === "trail") return secProducto === "trail";
        if (filtro === "urbano") return secProducto === "urbano";
        if (filtro === "accesorios") return secProducto === "accesorios";
        return secProducto === filtro;
      });
      $$renderer2.push(`<section id="catalogo" class="relative bg-obsidian py-24 lg:py-36">`);
      push_element($$renderer2, "section", 70, 0);
      $$renderer2.push(`<div class="absolute inset-0 pointer-events-none">`);
      push_element($$renderer2, "div", 72, 2);
      $$renderer2.push(`<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt/5 blur-[120px]">`);
      push_element($$renderer2, "div", 73, 4);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">`);
      push_element($$renderer2, "div", 76, 2);
      $$renderer2.push(`<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">`);
      push_element($$renderer2, "div", 78, 4);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 79, 6);
      $$renderer2.push(`<span class="font-mono text-xs text-volt tracking-widest">`);
      push_element($$renderer2, "span", 80, 8);
      $$renderer2.push(`// CATÁLOGO</span>`);
      pop_element();
      $$renderer2.push(` <h2 class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">`);
      push_element($$renderer2, "h2", 81, 8);
      $$renderer2.push(`NUESTROS<br/>`);
      push_element($$renderer2, "br", 82, 18);
      pop_element();
      $$renderer2.push(`<span class="text-volt">`);
      push_element($$renderer2, "span", 82, 24);
      $$renderer2.push(`MODELOS</span>`);
      pop_element();
      $$renderer2.push(`</h2>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="flex gap-2 flex-wrap mb-10 overflow-x-auto pb-2 scrollbar-none">`);
      push_element($$renderer2, "div", 88, 4);
      $$renderer2.push(`<button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"bg-volt text-obsidian"}`)}>`);
      push_element($$renderer2, "button", 89, 6);
      $$renderer2.push(`TODOS</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 98, 6);
      $$renderer2.push(`Urbano</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 107, 6);
      $$renderer2.push(`Running</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 116, 6);
      $$renderer2.push(`Fútbol</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 125, 6);
      $$renderer2.push(`Rugby</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 134, 6);
      $$renderer2.push(`Basketball</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 143, 6);
      $$renderer2.push(`Trail</button>`);
      pop_element();
      $$renderer2.push(` <button type="button"${attr_class(`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${"border border-white/10 text-white/40 hover:border-volt/40"}`)}>`);
      push_element($$renderer2, "button", 153, 6);
      $$renderer2.push(`Accesorios</button>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">`);
      push_element($$renderer2, "div", 163, 4);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="text-white/50 p-10 font-mono text-xs uppercase tracking-widest">`);
        push_element($$renderer2, "p", 165, 8);
        $$renderer2.push(`Cargando catálogo desde Punto Cero...</p>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
      pop_element();
    },
    ProductCatalog
  );
}
ProductCatalog.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
SpecGrid[FILENAME] = "src/lib/components/SpecGrid.svelte";
function SpecGrid($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const ATENCION_IMG = "/atencion.avif";
      const ENVIOS_IMG = "/envios.png";
      const GARANTIA_IMG = "/garantia.avif";
      const specs = [
        {
          id: "01",
          title: "ATENCIÓN PERSONALIZADA",
          subtitle: "Asesoramiento personalizado",
          description: "No somos un bot. Te asesoramos directamente por WhatsApp para sacarte todas las dudas sobre talles, hormas y materiales antes de realizar tu compra.",
          metric: "1 a 1",
          metricLabel: "Contacto Directo",
          image: ATENCION_IMG,
          imageAlt: "Asesoramiento personalizado de artículos deportivos"
        },
        {
          id: "02",
          title: "ENVÍOS A DOMICILIO",
          subtitle: "Entregas en Persona",
          description: "Coordinamos y te llevamos tu pedido personalmente a tu puerta, cuidando el producto desde que sale de nuestro stock hasta que llega a tus manos.",
          metric: "100%",
          metricLabel: "Gestión Propia",
          image: ENVIOS_IMG,
          imageAlt: "Envío y entrega de productos deportivos a domicilio"
        },
        {
          id: "03",
          title: "GARANTÍA TOTAL",
          subtitle: "Compra Sin Riesgos",
          description: "Tu confianza es lo primero. Cuentas con una garantía real de 30 días por cualquier falla de fabricación en tus botines, zapatillas o indumentaria.",
          metric: "30 Días",
          metricLabel: "Garantía Asegurada",
          image: GARANTIA_IMG,
          imageAlt: "Garantía y control de calidad premium"
        }
      ];
      $$renderer2.push(`<section id="specs" aria-labelledby="specs-heading" class="relative bg-carbon py-24 lg:py-36">`);
      push_element($$renderer2, "section", 38, 0);
      $$renderer2.push(`<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">`);
      push_element($$renderer2, "div", 41, 2);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="max-w-7xl mx-auto px-6 lg:px-8">`);
      push_element($$renderer2, "div", 43, 2);
      $$renderer2.push(`<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">`);
      push_element($$renderer2, "div", 44, 4);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 45, 6);
      $$renderer2.push(`<span class="font-mono text-xs text-volt tracking-widest">`);
      push_element($$renderer2, "span", 46, 8);
      $$renderer2.push(`// POR QUÉ ELEGIRNOS</span>`);
      pop_element();
      $$renderer2.push(` <h2 id="specs-heading" class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">`);
      push_element($$renderer2, "h2", 47, 8);
      $$renderer2.push(`COMPRA<br/>`);
      push_element($$renderer2, "br", 49, 16);
      pop_element();
      $$renderer2.push(`<span class="text-volt">`);
      push_element($$renderer2, "span", 49, 22);
      $$renderer2.push(`GARANTIZADA</span>`);
      pop_element();
      $$renderer2.push(`</h2>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <p class="text-white/40 text-sm max-w-sm leading-relaxed lg:text-right">`);
      push_element($$renderer2, "p", 52, 6);
      $$renderer2.push(`Llevamos el equipamiento deportivo al siguiente nivel, acompañándote en cada paso desde la elección hasta la puerta de tu casa.</p>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">`);
      push_element($$renderer2, "div", 57, 4);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(specs);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let spec = each_array[$$index];
        $$renderer2.push(`<article class="group relative bg-carbon p-6 lg:p-8 flex flex-col hover:bg-obsidian/60 transition-colors duration-300">`);
        push_element($$renderer2, "article", 59, 8);
        $$renderer2.push(`<span class="font-mono text-[10px] text-white/30 tracking-widest mb-6">`);
        push_element($$renderer2, "span", 60, 10);
        $$renderer2.push(`${escape_html(spec.id)}</span>`);
        pop_element();
        $$renderer2.push(` <div class="relative w-full aspect-square mb-8 overflow-hidden bg-obsidian">`);
        push_element($$renderer2, "div", 62, 10);
        $$renderer2.push(`<img${attr("src", spec.image)}${attr("alt", spec.imageAlt)} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"/>`);
        push_element($$renderer2, "img", 63, 12);
        pop_element();
        $$renderer2.push(` <div class="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent">`);
        push_element($$renderer2, "div", 65, 12);
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <div class="absolute bottom-4 left-4">`);
        push_element($$renderer2, "div", 66, 12);
        $$renderer2.push(`<p class="font-heading text-volt text-3xl lg:text-4xl">`);
        push_element($$renderer2, "p", 67, 14);
        $$renderer2.push(`${escape_html(spec.metric)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="font-mono text-[9px] text-white/40 tracking-widest uppercase">`);
        push_element($$renderer2, "p", 68, 14);
        $$renderer2.push(`${escape_html(spec.metricLabel)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <h3 class="font-heading text-titanium text-lg mb-1">`);
        push_element($$renderer2, "h3", 72, 10);
        $$renderer2.push(`${escape_html(spec.title)}</h3>`);
        pop_element();
        $$renderer2.push(` <p class="text-volt text-xs font-semibold tracking-widest uppercase mb-4">`);
        push_element($$renderer2, "p", 73, 10);
        $$renderer2.push(`${escape_html(spec.subtitle)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="text-white/40 text-sm leading-relaxed flex-1">`);
        push_element($$renderer2, "p", 74, 10);
        $$renderer2.push(`${escape_html(spec.description)}</p>`);
        pop_element();
        $$renderer2.push(` <div class="mt-6 pt-4 border-t border-white/5">`);
        push_element($$renderer2, "div", 76, 10);
        $$renderer2.push(`<span class="font-mono text-[9px] text-white/30 tracking-widest">`);
        push_element($$renderer2, "span", 77, 12);
        $$renderer2.push(`PUNTO_CERO — SERVICE_${escape_html(spec.id)}</span>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</article>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
      pop_element();
    },
    SpecGrid
  );
}
SpecGrid.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
SocialProof[FILENAME] = "src/lib/components/SocialProof.svelte";
function SocialProof($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const MARATHON_IMG = "testimonio 1.jpeg";
      const CROSSFIT_IMG = "testimonio 2.jpeg";
      const TRAIL_IMG = "testimonio 3.jpeg";
      const RUNNER_IMG = "testimonio 4.jpeg";
      const reviews = [
        {
          image: MARATHON_IMG,
          alt: "Atleta durante maratón",
          name: "Dylan",
          location: "Seguí, Entre Ríos",
          product: "Botines Phantom",
          rating: 5,
          metric: "Insta",
          metricLabel: "",
          quote: "Botines de calidad y con suerte."
        },
        {
          image: CROSSFIT_IMG,
          alt: "Atleta de CrossFit",
          name: "Nestor R.",
          location: "Hernandarias, Entre Ríos",
          product: "ADIZERO",
          rating: 5,
          metric: "INSTA",
          metricLabel: "",
          quote: "Compré online, llegó en 48 horas y calzó perfecto. Servicio impecable."
        },
        {
          image: TRAIL_IMG,
          alt: "Corredor en montaña",
          name: "Augusto V.",
          location: "Crespo, Entre Ríos",
          product: "Botines F50",
          rating: 5,
          metric: "wpp",
          metricLabel: "",
          quote: "Consulté por WhatsApp el fin de semana y me lo prepararon enseguida. Atención de primera."
        },
        {
          image: RUNNER_IMG,
          alt: "Corredor urbano",
          name: "Valentín A.",
          location: "Crespo, Entre Ríos",
          product: "Botines CrazyFast",
          rating: 5,
          metric: "wpp",
          metricLabel: "",
          quote: "Hice mas de una compra y siempre me atendieron excelente."
        }
      ];
      const tickerItems = [
        "ENVÍO EN 24H A TODO EL PAÍS",
        "★ 4.9/5 — MÁS DE 3,500 CLIENTES",
        "CONSULTA SIN CARGO POR WHATSAPP",
        "CAMBIOS Y DEVOLUCIONES GRATIS",
        "PAGO EN CUOTAS CON INTERÉS",
        "STOCK PERMANENTE DE TALLES ESPECIALES"
      ];
      const doubled = [...tickerItems, ...tickerItems];
      $$renderer2.push(`<section id="social" aria-labelledby="social-heading" class="relative bg-carbon overflow-hidden">`);
      push_element($$renderer2, "section", 22, 0);
      $$renderer2.push(`<div class="border-y border-white/5 py-3 overflow-hidden">`);
      push_element($$renderer2, "div", 25, 2);
      $$renderer2.push(`<div class="animate-scroll-left flex whitespace-nowrap">`);
      push_element($$renderer2, "div", 26, 4);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(doubled);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        $$renderer2.push(`<span class="inline-flex items-center gap-6 mx-6 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">`);
        push_element($$renderer2, "span", 28, 8);
        $$renderer2.push(`${escape_html(item)}<span class="w-1.5 h-1.5 bg-volt rounded-full inline-block">`);
        push_element($$renderer2, "span", 29, 16);
        $$renderer2.push(`</span>`);
        pop_element();
        $$renderer2.push(`</span>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">`);
      push_element($$renderer2, "div", 35, 2);
      $$renderer2.push(`<div class="mb-16">`);
      push_element($$renderer2, "div", 36, 4);
      $$renderer2.push(`<span class="font-mono text-xs text-volt tracking-widest">`);
      push_element($$renderer2, "span", 37, 6);
      $$renderer2.push(`// RESEÑAS</span>`);
      pop_element();
      $$renderer2.push(` <h2 id="social-heading" class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-3">`);
      push_element($$renderer2, "h2", 38, 6);
      $$renderer2.push(`LO QUE DICEN<br/>`);
      push_element($$renderer2, "br", 40, 20);
      pop_element();
      $$renderer2.push(`<span class="text-volt">`);
      push_element($$renderer2, "span", 40, 26);
      $$renderer2.push(`NUESTROS CLIENTES</span>`);
      pop_element();
      $$renderer2.push(`</h2>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">`);
      push_element($$renderer2, "div", 44, 4);
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(reviews);
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let review = each_array_1[$$index_2];
        $$renderer2.push(`<article class="group relative bg-carbon overflow-hidden">`);
        push_element($$renderer2, "article", 46, 8);
        $$renderer2.push(`<div class="relative aspect-[4/3] overflow-hidden">`);
        push_element($$renderer2, "div", 47, 10);
        $$renderer2.push(`<img${attr("src", review.image)}${attr("alt", review.alt)} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"/>`);
        push_element($$renderer2, "img", 48, 12);
        pop_element();
        $$renderer2.push(` <div class="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent">`);
        push_element($$renderer2, "div", 50, 12);
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <div class="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-sm border border-white/10 px-3 py-2">`);
        push_element($$renderer2, "div", 51, 12);
        $$renderer2.push(`<p class="font-heading text-volt text-base leading-none">`);
        push_element($$renderer2, "p", 52, 14);
        $$renderer2.push(`${escape_html(review.metric)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="font-mono text-[8px] text-white/40 tracking-widest uppercase mt-0.5">`);
        push_element($$renderer2, "p", 53, 14);
        $$renderer2.push(`${escape_html(review.metricLabel)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <div class="absolute bottom-4 left-4 bg-volt/10 border border-volt/20 px-2.5 py-1">`);
        push_element($$renderer2, "div", 55, 12);
        $$renderer2.push(`<p class="font-mono text-[9px] text-volt tracking-widest">`);
        push_element($$renderer2, "p", 56, 14);
        $$renderer2.push(`${escape_html(review.product)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <div class="p-6 lg:p-8">`);
        push_element($$renderer2, "div", 59, 10);
        $$renderer2.push(`<div class="flex gap-1 mb-4">`);
        push_element($$renderer2, "div", 60, 12);
        $$renderer2.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(Array(review.rating));
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          each_array_2[$$index_1];
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-volt fill-current" viewBox="0 0 24 24">`);
          push_element($$renderer2, "svg", 62, 16);
          $$renderer2.push(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">`);
          push_element($$renderer2, "polygon", 63, 18);
          $$renderer2.push(`</polygon>`);
          pop_element();
          $$renderer2.push(`</svg>`);
          pop_element();
        }
        $$renderer2.push(`<!--]--></div>`);
        pop_element();
        $$renderer2.push(` <p class="text-titanium/90 text-sm leading-relaxed italic mb-4">`);
        push_element($$renderer2, "p", 67, 12);
        $$renderer2.push(`"${escape_html(review.quote)}"</p>`);
        pop_element();
        $$renderer2.push(` <div class="flex items-center gap-3">`);
        push_element($$renderer2, "div", 68, 12);
        $$renderer2.push(`<div class="w-6 h-px bg-volt">`);
        push_element($$renderer2, "div", 69, 14);
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <span class="font-heading text-titanium text-xs">`);
        push_element($$renderer2, "span", 70, 14);
        $$renderer2.push(`${escape_html(review.name)}</span>`);
        pop_element();
        $$renderer2.push(` <span class="text-white/40 text-xs">`);
        push_element($$renderer2, "span", 71, 14);
        $$renderer2.push(`— ${escape_html(review.location)}</span>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</article>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="border-y border-white/5 py-3 overflow-hidden">`);
      push_element($$renderer2, "div", 80, 2);
      $$renderer2.push(`<div class="animate-scroll-left flex whitespace-nowrap" style="animation-direction: reverse">`);
      push_element($$renderer2, "div", 81, 4);
      $$renderer2.push(`<!--[-->`);
      const each_array_3 = ensure_array_like(doubled);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let item = each_array_3[$$index_3];
        $$renderer2.push(`<span class="inline-flex items-center gap-6 mx-6 text-[10px] font-semibold tracking-[0.3em] text-white/30 uppercase">`);
        push_element($$renderer2, "span", 83, 8);
        $$renderer2.push(`${escape_html(item)}<span class="w-1.5 h-1.5 bg-volt rounded-full inline-block">`);
        push_element($$renderer2, "span", 84, 16);
        $$renderer2.push(`</span>`);
        pop_element();
        $$renderer2.push(`</span>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
      pop_element();
    },
    SocialProof
  );
}
SocialProof.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
CTASection[FILENAME] = "src/lib/components/CTASection.svelte";
function CTASection($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const WPP_URL = "https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20sobre%20calzado%20deportivo";
      const benefits = [
        { title: "Envío Express", desc: "24h a todo el país" },
        { title: "Cambios Gratis", desc: "30 días" },
        { title: "Cuotas con Interés", desc: "Hasta 12 cuotas" },
        { title: "Compra Segura", desc: "Garantía de autenticidad" }
      ];
      const perks = [
        "Asesoramiento personalizado según tu deporte",
        "Consulta de stock en tiempo real",
        "Talles especiales",
        "Calidad G5 y Original"
      ];
      const stats = [
        { value: "+3.5k", label: "Clientes" },
        { value: "4.9★", label: "Calificación" },
        { value: "<5min", label: "Respuesta WPP" }
      ];
      $$renderer2.push(`<section id="contacto" aria-labelledby="cta-heading" class="relative bg-obsidian overflow-hidden">`);
      push_element($$renderer2, "section", 21, 0);
      $$renderer2.push(`<div class="h-px bg-gradient-to-r from-transparent via-volt/40 to-transparent">`);
      push_element($$renderer2, "div", 22, 2);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="border-b border-white/5">`);
      push_element($$renderer2, "div", 25, 2);
      $$renderer2.push(`<div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">`);
      push_element($$renderer2, "div", 26, 4);
      $$renderer2.push(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">`);
      push_element($$renderer2, "div", 27, 6);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(benefits);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let b = each_array[$$index];
        $$renderer2.push(`<div class="bg-obsidian flex items-center gap-4 p-5">`);
        push_element($$renderer2, "div", 29, 10);
        $$renderer2.push(`<div class="w-5 h-5 text-volt flex-shrink-0">`);
        push_element($$renderer2, "div", 30, 12);
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
        push_element($$renderer2, "svg", 32, 14);
        $$renderer2.push(`<rect x="1" y="3" width="15" height="13">`);
        push_element($$renderer2, "rect", 34, 16);
        $$renderer2.push(`</rect>`);
        pop_element();
        $$renderer2.push(`<polygon points="16 8 20 8 23 11 23 16 16 16 16 8">`);
        push_element($$renderer2, "polygon", 34, 58);
        $$renderer2.push(`</polygon>`);
        pop_element();
        $$renderer2.push(`<circle cx="5.5" cy="18.5" r="2.5">`);
        push_element($$renderer2, "circle", 35, 16);
        $$renderer2.push(`</circle>`);
        pop_element();
        $$renderer2.push(`<circle cx="18.5" cy="18.5" r="2.5">`);
        push_element($$renderer2, "circle", 35, 52);
        $$renderer2.push(`</circle>`);
        pop_element();
        $$renderer2.push(`</svg>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(` <div>`);
        push_element($$renderer2, "div", 38, 12);
        $$renderer2.push(`<p class="text-titanium font-bold text-sm">`);
        push_element($$renderer2, "p", 39, 14);
        $$renderer2.push(`${escape_html(b.title)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="text-white/40 text-xs">`);
        push_element($$renderer2, "p", 40, 14);
        $$renderer2.push(`${escape_html(b.desc)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">`);
      push_element($$renderer2, "div", 48, 2);
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">`);
      push_element($$renderer2, "div", 49, 4);
      $$renderer2.push(`<div>`);
      push_element($$renderer2, "div", 52, 6);
      $$renderer2.push(`<span class="font-mono text-xs text-volt tracking-widest">`);
      push_element($$renderer2, "span", 53, 8);
      $$renderer2.push(`// ATENCIÓN PERSONALIZADA</span>`);
      pop_element();
      $$renderer2.push(` <h2 id="cta-heading" class="font-heading text-titanium text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">`);
      push_element($$renderer2, "h2", 54, 8);
      $$renderer2.push(`¿DUDAS?<br/>`);
      push_element($$renderer2, "br", 56, 17);
      pop_element();
      $$renderer2.push(`<span class="text-volt">`);
      push_element($$renderer2, "span", 56, 23);
      $$renderer2.push(`HABLEMOS</span>`);
      pop_element();
      $$renderer2.push(`</h2>`);
      pop_element();
      $$renderer2.push(` <p class="text-white/40 text-base leading-relaxed max-w-md mb-8">`);
      push_element($$renderer2, "p", 58, 8);
      $$renderer2.push(`Nosotras te asesoramos para encontrar el modelo ideal según tu deporte, pisada y presupuesto.
          Respondemos en minutos por WhatsApp.</p>`);
      pop_element();
      $$renderer2.push(` <ul class="space-y-3 mb-10">`);
      push_element($$renderer2, "ul", 62, 8);
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(perks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        $$renderer2.push(`<li class="flex items-start gap-3">`);
        push_element($$renderer2, "li", 64, 12);
        $$renderer2.push(`<span class="w-4 h-4 mt-0.5 border border-volt/50 flex-shrink-0 flex items-center justify-center">`);
        push_element($$renderer2, "span", 65, 14);
        $$renderer2.push(`<span class="w-1.5 h-1.5 bg-volt rounded-full">`);
        push_element($$renderer2, "span", 66, 16);
        $$renderer2.push(`</span>`);
        pop_element();
        $$renderer2.push(`</span>`);
        pop_element();
        $$renderer2.push(` <span class="text-titanium/80 text-sm">`);
        push_element($$renderer2, "span", 68, 14);
        $$renderer2.push(`${escape_html(item)}</span>`);
        pop_element();
        $$renderer2.push(`</li>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></ul>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div>`);
      push_element($$renderer2, "div", 75, 6);
      $$renderer2.push(`<div class="relative bg-carbon border border-white/5 p-8 lg:p-10">`);
      push_element($$renderer2, "div", 76, 8);
      $$renderer2.push(`<div class="absolute top-0 right-0 w-16 h-16 border-t border-r border-volt/30">`);
      push_element($$renderer2, "div", 77, 10);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-volt/10">`);
      push_element($$renderer2, "div", 78, 10);
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="relative z-10">`);
      push_element($$renderer2, "div", 80, 10);
      $$renderer2.push(`<div class="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-6">`);
      push_element($$renderer2, "div", 81, 12);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 82, 14);
      $$renderer2.push(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">`);
      push_element($$renderer2, "path", 84, 16);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <h3 class="font-heading text-titanium text-2xl mb-2">`);
      push_element($$renderer2, "h3", 87, 12);
      $$renderer2.push(`WHATSAPP DIRECTO</h3>`);
      pop_element();
      $$renderer2.push(` <p class="font-mono text-[10px] text-white/40 tracking-widest mb-6">`);
      push_element($$renderer2, "p", 88, 12);
      $$renderer2.push(`RESPUESTA EN MENOS DE 5 MINUTOS</p>`);
      pop_element();
      $$renderer2.push(` <p class="text-white/40 text-sm leading-relaxed mb-8">`);
      push_element($$renderer2, "p", 89, 12);
      $$renderer2.push(`Mandanos un mensaje con el modelo que buscás, tu talle y deporte. Te asesoramos sin compromiso.</p>`);
      pop_element();
      $$renderer2.push(` <a${attr("href", WPP_URL)} target="_blank" rel="noopener noreferrer" class="group w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold text-sm tracking-widest py-4 hover:bg-[#20bc5a] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-carbon mb-3">`);
      push_element($$renderer2, "a", 92, 12);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 94, 14);
      $$renderer2.push(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">`);
      push_element($$renderer2, "path", 96, 16);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(` CONSULTAR POR WHATSAPP <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 99, 14);
      $$renderer2.push(`<line x1="5" y1="12" x2="19" y2="12">`);
      push_element($$renderer2, "line", 102, 16);
      $$renderer2.push(`</line>`);
      pop_element();
      $$renderer2.push(`<polyline points="12 5 19 12 12 19">`);
      push_element($$renderer2, "polyline", 102, 54);
      $$renderer2.push(`</polyline>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(` <a href="#catalogo" class="w-full flex items-center justify-center gap-3 border border-white/10 text-white/40 font-semibold text-xs tracking-wide py-3.5 hover:border-volt/30 hover:text-volt transition-colors">`);
      push_element($$renderer2, "a", 105, 12);
      $$renderer2.push(`VER CATÁLOGO COMPLETO</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="grid grid-cols-3 gap-px mt-px bg-white/5">`);
      push_element($$renderer2, "div", 112, 8);
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(stats);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let stat = each_array_2[$$index_2];
        $$renderer2.push(`<div class="bg-carbon p-4 text-center">`);
        push_element($$renderer2, "div", 114, 12);
        $$renderer2.push(`<p class="font-heading text-volt text-lg">`);
        push_element($$renderer2, "p", 115, 14);
        $$renderer2.push(`${escape_html(stat.value)}</p>`);
        pop_element();
        $$renderer2.push(` <p class="text-[9px] font-mono text-white/30 tracking-widest uppercase mt-1">`);
        push_element($$renderer2, "p", 116, 14);
        $$renderer2.push(`${escape_html(stat.label)}</p>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</section>`);
      pop_element();
    },
    CTASection
  );
}
CTASection.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
Footer[FILENAME] = "src/lib/components/Footer.svelte";
function Footer($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const links = [
        { label: "Catálogo", href: "#catalogo" },
        { label: "Garantía", href: "#specs" },
        { label: "Reseñas", href: "#social" },
        { label: "Contacto", href: "#contacto" }
      ];
      $$renderer2.push(`<footer class="bg-obsidian border-t border-white/5">`);
      push_element($$renderer2, "footer", 9, 0);
      $$renderer2.push(`<div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">`);
      push_element($$renderer2, "div", 10, 2);
      $$renderer2.push(`<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">`);
      push_element($$renderer2, "div", 11, 4);
      $$renderer2.push(`<div class="flex items-center gap-3">`);
      push_element($$renderer2, "div", 14, 6);
      $$renderer2.push(`<img src="/logo.png" alt="Punto Cero Logo" class="h-40 w-auto object-contain brightness-95"/>`);
      push_element($$renderer2, "img", 15, 8);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12">`);
      push_element($$renderer2, "div", 23, 6);
      $$renderer2.push(`<nav class="flex flex-wrap gap-6">`);
      push_element($$renderer2, "nav", 24, 8);
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(links);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        $$renderer2.push(`<a${attr("href", link.href)} class="text-xs text-white/40 hover:text-volt transition-colors tracking-widest uppercase font-medium">`);
        push_element($$renderer2, "a", 26, 12);
        $$renderer2.push(`${escape_html(link.label)}</a>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--></nav>`);
      pop_element();
      $$renderer2.push(` <div class="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">`);
      push_element($$renderer2, "div", 34, 8);
      $$renderer2.push(`<a href="https://instagram.com/punt0.cero" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-volt transition-colors p-1" aria-label="Instagram">`);
      push_element($$renderer2, "a", 35, 10);
      $$renderer2.push(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">`);
      push_element($$renderer2, "svg", 36, 12);
      $$renderer2.push(`<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z">`);
      push_element($$renderer2, "path", 36, 73);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(` <a href="https://tiktok.com/@punt0_cero" target="_blank" rel="noopener noreferrer" class="text-white/40 hover:text-volt transition-colors p-1" aria-label="TikTok">`);
      push_element($$renderer2, "a", 38, 10);
      $$renderer2.push(`<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">`);
      push_element($$renderer2, "svg", 39, 12);
      $$renderer2.push(`<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.11.13.23.26.36.38.15.14.31.27.47.4 1.15.86 2.53 1.34 3.96 1.4v4.17c-1.29-.07-2.56-.47-3.66-1.16-.3-.19-.59-.4-.87-.63-.2-.17-.39-.35-.57-.54V13.8c0 2.02-.45 3.97-1.35 5.73-.82 1.6-2.06 2.95-3.6 3.84a11.18 11.18 0 01-11.72-.11c-1.6-.98-2.89-2.42-3.71-4.13A11.43 11.43 0 010 14.4c.05-2.91 1.21-5.64 3.25-7.72 1.83-1.87 4.26-2.99 6.85-3.17V7.6c-1.15.08-2.27.5-3.21 1.18A6.87 6.87 0 004.4 11.6c-.36.98-.49 2.03-.39 3.07.15 1.51.85 2.91 1.98 3.91a7.12 7.12 0 007.49 1.13 7.02 7.02 0 003.93-4.8c.24-1.12.22-2.3-.07-3.41V0h-4.81z">`);
      push_element($$renderer2, "path", 39, 73);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(` <div class="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">`);
      push_element($$renderer2, "div", 46, 4);
      $$renderer2.push(`<p class="text-[10px] font-mono text-white/20 tracking-widest">`);
      push_element($$renderer2, "p", 47, 6);
      $$renderer2.push(`© 2026 Punto Cero — ALL RIGHTS RESERVED</p>`);
      pop_element();
      $$renderer2.push(` <p class="text-[10px] font-mono text-white/20 tracking-widest">`);
      push_element($$renderer2, "p", 48, 6);
      $$renderer2.push(`ENGINEERED FOR PERFORMANCE</p>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
      $$renderer2.push(`</footer>`);
      pop_element();
    },
    Footer
  );
}
Footer.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
WhatsAppBubble[FILENAME] = "src/lib/components/WhatsAppBubble.svelte";
function WhatsAppBubble($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      const WPP_URL = "https://wa.me/message/QQP7UIPIOEKKD1?text=Hola!%20Quiero%20consultar%20sobre%20calzado%20deportivo";
      $$renderer2.push(`<div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">`);
      push_element($$renderer2, "div", 5, 0);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="relative bg-carbon border border-white/10 px-4 py-3 max-w-[200px] shadow-xl">`);
        push_element($$renderer2, "div", 7, 4);
        $$renderer2.push(`<button class="absolute -top-2 -right-2 w-5 h-5 bg-obsidian border border-white/10 flex items-center justify-center" aria-label="Cerrar">`);
        push_element($$renderer2, "button", 8, 6);
        $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
        push_element($$renderer2, "svg", 11, 8);
        $$renderer2.push(`<line x1="18" y1="6" x2="6" y2="18">`);
        push_element($$renderer2, "line", 13, 10);
        $$renderer2.push(`</line>`);
        pop_element();
        $$renderer2.push(`<line x1="6" y1="6" x2="18" y2="18">`);
        push_element($$renderer2, "line", 13, 47);
        $$renderer2.push(`</line>`);
        pop_element();
        $$renderer2.push(`</svg>`);
        pop_element();
        $$renderer2.push(`</button>`);
        pop_element();
        $$renderer2.push(` <p class="text-titanium text-xs font-medium leading-snug">`);
        push_element($$renderer2, "p", 16, 6);
        $$renderer2.push(`¿No encontrás tu talle?  <span class="text-[#25D366] font-bold">`);
        push_element($$renderer2, "span", 18, 8);
        $$renderer2.push(`Consultanos</span>`);
        pop_element();
        $$renderer2.push(`</p>`);
        pop_element();
        $$renderer2.push(` <div class="absolute bottom-[-6px] right-5 w-3 h-3 bg-carbon border-r border-b border-white/10 rotate-45">`);
        push_element($$renderer2, "div", 20, 6);
        $$renderer2.push(`</div>`);
        pop_element();
        $$renderer2.push(`</div>`);
        pop_element();
      }
      $$renderer2.push(`<!--]--> <a${attr("href", WPP_URL)} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp" class="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-obsidian">`);
      push_element($$renderer2, "a", 24, 2);
      $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">`);
      push_element($$renderer2, "svg", 27, 4);
      $$renderer2.push(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">`);
      push_element($$renderer2, "path", 29, 6);
      $$renderer2.push(`</path>`);
      pop_element();
      $$renderer2.push(`</svg>`);
      pop_element();
      $$renderer2.push(`</a>`);
      pop_element();
      $$renderer2.push(`</div>`);
      pop_element();
    },
    WhatsAppBubble
  );
}
WhatsAppBubble.render = function() {
  throw new Error("Component.render(...) is no longer valid in Svelte 5. See https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes for more information");
};
_page[FILENAME] = "src/routes/+page.svelte";
function _page($$renderer, $$props) {
  $$renderer.component(
    ($$renderer2) => {
      head("1uha8ag", $$renderer2, ($$renderer3) => {
        $$renderer3.title(($$renderer4) => {
          $$renderer4.push(`<title>Punto Cero — Calzado Deportivo de Alto Rendimiento</title>`);
        });
        $$renderer3.push(`<meta name="description" content="Botines y zapatillas de alto rendimiento. Comprá online o consultá por WhatsApp."/>`);
        push_element($$renderer3, "meta", 13, 2);
        pop_element();
      });
      $$renderer2.push(`<div class="bg-obsidian min-h-screen">`);
      push_element($$renderer2, "div", 16, 0);
      Navbar($$renderer2);
      $$renderer2.push(`<!----> <main>`);
      push_element($$renderer2, "main", 18, 2);
      HeroSection($$renderer2);
      $$renderer2.push(`<!----> `);
      ProductCatalog($$renderer2);
      $$renderer2.push(`<!----> `);
      SpecGrid($$renderer2);
      $$renderer2.push(`<!----> `);
      SocialProof($$renderer2);
      $$renderer2.push(`<!----> `);
      CTASection($$renderer2);
      $$renderer2.push(`<!----></main>`);
      pop_element();
      $$renderer2.push(` `);
      Footer($$renderer2);
      $$renderer2.push(`<!----> `);
      WhatsAppBubble($$renderer2);
      $$renderer2.push(`<!----></div>`);
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
