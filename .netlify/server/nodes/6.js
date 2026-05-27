import * as server from '../entries/pages/catalog/_id_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/catalog/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/catalog/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.C6FJpHFq.js","_app/immutable/chunks/Dtw-iRmQ.js","_app/immutable/chunks/6BgvCUAE.js","_app/immutable/chunks/C1W51Mq8.js","_app/immutable/chunks/DparQVyj.js","_app/immutable/chunks/D6YBwakA.js","_app/immutable/chunks/DfiMXomg.js","_app/immutable/chunks/DllV-8yr.js","_app/immutable/chunks/BIGnXCbt.js","_app/immutable/chunks/CASBk2Hs.js"];
export const stylesheets = [];
export const fonts = [];
