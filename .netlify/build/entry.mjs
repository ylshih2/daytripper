import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DY9ynlPF.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/atom.xml.astro.mjs');
const _page2 = () => import('./pages/og/_---image_.astro.mjs');
const _page3 = () => import('./pages/rss.xml.astro.mjs');
const _page4 = () => import('./pages/_lang_/atom.xml.astro.mjs');
const _page5 = () => import('./pages/_lang_/rss.xml.astro.mjs');
const _page6 = () => import('./pages/_---about_.astro.mjs');
const _page7 = () => import('./pages/_---index_.astro.mjs');
const _page8 = () => import('./pages/_---posts_slug_.astro.mjs');
const _page9 = () => import('./pages/_---tags_tag_.astro.mjs');
const _page10 = () => import('./pages/_---tags_.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/atom.xml.ts", _page1],
    ["src/pages/og/[...image].ts", _page2],
    ["src/pages/rss.xml.ts", _page3],
    ["src/pages/[lang]/atom.xml.ts", _page4],
    ["src/pages/[lang]/rss.xml.ts", _page5],
    ["src/pages/[...about].astro", _page6],
    ["src/pages/[...index].astro", _page7],
    ["src/pages/[...posts_slug].astro", _page8],
    ["src/pages/[...tags_tag].astro", _page9],
    ["src/pages/[...tags].astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c8ee0c41-fcee-4c08-b40e-2a6cec851627"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
