import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_01HAHmUo.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/","cacheDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/node_modules/.astro/","outDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/dist/","srcDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/src/","publicDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/public/","buildClientDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/dist/","buildServerDir":"file:///Users/scott/Code%20With%20Scott/Blog/daytripper.tw/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"atom.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/atom.xml","isIndex":false,"type":"endpoint","pattern":"^\\/atom\\.xml\\/?$","segments":[[{"content":"atom.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/atom.xml.ts","pathname":"/atom.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://daytripper.tw","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[...posts_slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...posts_slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/PostList.astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[...index].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...index]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[...tags_tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...tags_tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[...about].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...about]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[...tags].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...tags]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/og/[...image].ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og/[...image]@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/utils/content.ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/utils/feed.ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[lang]/atom.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/atom.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/[lang]/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/atom.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/atom.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/atom.xml@_@ts":"pages/atom.xml.astro.mjs","\u0000@astro-page:src/pages/og/[...image]@_@ts":"pages/og/_---image_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/[lang]/atom.xml@_@ts":"pages/_lang_/atom.xml.astro.mjs","\u0000@astro-page:src/pages/[lang]/rss.xml@_@ts":"pages/_lang_/rss.xml.astro.mjs","\u0000@astro-page:src/pages/[...about]@_@astro":"pages/_---about_.astro.mjs","\u0000@astro-page:src/pages/[...index]@_@astro":"pages/_---index_.astro.mjs","\u0000@astro-page:src/pages/[...posts_slug]@_@astro":"pages/_---posts_slug_.astro.mjs","\u0000@astro-page:src/pages/[...tags_tag]@_@astro":"pages/_---tags_tag_.astro.mjs","\u0000@astro-page:src/pages/[...tags]@_@astro":"pages/_---tags_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/src/config.ts":"chunks/config_NxS_qSWU.mjs","\u0000@astrojs-manifest":"manifest_CRAtb31F.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/node_modules/.pnpm/unstorage@1.16.0_@netlify+blobs@8.2.0/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/node_modules/.pnpm/astro@5.10.2_@netlify+blobs@8.2.0_@types+node@24.0.10_jiti@2.4.2_lightningcss@1.29.3_ro_01da815b2bea4938d39f3edf72a7fb06/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BLtPFvEU.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DU3DAO_6.mjs","/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/BackButton.astro?astro&type=script&index=0&lang.ts":"_astro/BackButton.astro_astro_type_script_index_0_lang.C59jkn9X.js","/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/TOC.astro?astro&type=script&index=0&lang.ts":"_astro/TOC.astro_astro_type_script_index_0_lang.BXFydYX2.js","/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/CodeCopyButton.astro?astro&type=script&index=0&lang.ts":"_astro/CodeCopyButton.astro_astro_type_script_index_0_lang.ArWxAxMb.js","/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/GithubCard.astro?astro&type=script&index=0&lang.ts":"_astro/GithubCard.astro_astro_type_script_index_0_lang.CdQADZwQ.js","/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/GsapAnimation.astro?astro&type=script&index=0&lang.ts":"_astro/GsapAnimation.astro_astro_type_script_index_0_lang.PzFQ5g7l.js","/Users/scott/Code With Scott/Blog/daytripper.tw/node_modules/.pnpm/astro@5.10.2_@netlify+blobs@8.2.0_@types+node@24.0.10_jiti@2.4.2_lightningcss@1.29.3_ro_01da815b2bea4938d39f3edf72a7fb06/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CLDwYp7M.js","astro:scripts/page.js":"_astro/page.BNYwb576.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/BackButton.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"click\",t=>{if(t.target instanceof Element&&t.target.closest(\"#back-button\")){if(window.history.length>1){window.history.back();return}document.getElementById(\"site-title-link\")?.click()}});"],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/TOC.astro?astro&type=script&index=0&lang.ts","let i=null,c=null;function u(){if(i?.disconnect(),c?.disconnect(),!(window.innerWidth>=1536))return;const r=document.getElementById(\"toc-accordion-content\");if(!r)return;const a=r.getElementsByTagName(\"a\");if(a.length===0)return;const e=Array.from(a,t=>t),l=e.some(t=>t.classList.contains(\"toc-links-h2\"))?\"toc-links-h2\":\"toc-links-h3\",d=new Map;e.forEach(t=>{const n=t.getAttribute(\"href\")?.substring(1);n&&d.set(n,t)});let s=null;function v(t){const n=e.indexOf(t);for(let o=n-1;o>=0;o--){const g=e[o];if(g.classList.contains(l)){g.classList.add(\"toc-link-active\");break}}}function h(t){t!==s&&(e.forEach(n=>{n.classList.remove(\"toc-link-active\")}),t.classList.add(\"toc-link-active\"),t.classList.contains(l)||v(t),s=t,t.scrollIntoView({behavior:\"smooth\",block:\"nearest\"}))}i=new IntersectionObserver(t=>{const n=t.find(o=>o.isIntersecting)?.target?.id;if(n){const o=d.get(n);o&&h(o)}},{rootMargin:\"0% 0% -66% 0%\",threshold:[.4]}),Array.from(document.querySelectorAll(\"h2, h3, h4\")).filter(t=>t.id&&t.id!==\"footnotes\").forEach(t=>i?.observe(t));const f=document.getElementById(\"gsap-post-content\")?.lastElementChild;f&&(c=new IntersectionObserver(t=>{!t[0].isIntersecting&&t[0].boundingClientRect.top<0&&(e.forEach(n=>n.classList.remove(\"toc-link-active\")),s=null)},{rootMargin:\"0px 0px 0px 0px\",threshold:0}),c?.observe(f),e.length>0&&h(e[0]))}u();document.addEventListener(\"astro:after-swap\",u);"],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/CodeCopyButton.astro?astro&type=script&index=0&lang.ts","const s={copy:`<svg\n      viewBox=\"0 0 24 24\"\n      fill=\"currentColor\"\n    >\n      <path d=\"M6.9.8v18h14.5V.8zm12.8 16h-11v-14h11z\"/>\n      <path d=\"M4.3 21.2V5.6l-1.7.5v17.1h14.3l.6-2z\"/>\n    </svg>`,success:`<svg\n      viewBox=\"0 0 24 24\"\n      fill=\"currentColor\"\n    >\n      <path d=\"m23.1 6.4-1.3-1.3L9.4 16.6l-6.3-5.4-1.2 1.2L9.4 20z\"/>\n    </svg>`},o=new WeakMap;function r(){const e=document.querySelectorAll(\".code-copy-button\");e.length!==0&&e.forEach(t=>{t.innerHTML=s.copy})}async function a(e){if(e.classList.contains(\"copy-success\"))return;const t=e.parentElement?.querySelector(\"pre code\");if(!t)return;const n=t.textContent??\"\";if(n)try{await navigator.clipboard.writeText(n);const c=o.get(e);c&&clearTimeout(c),e.innerHTML=s.success,e.classList.add(\"copy-success\");const i=setTimeout(()=>{e.isConnected&&(e.innerHTML=s.copy,e.classList.remove(\"copy-success\"),o.delete(e))},1500);o.set(e,i)}catch(c){console.error(\"Failed to copy code\",c)}}r();document.addEventListener(\"astro:page-load\",r);document.addEventListener(\"click\",e=>{const t=e.target instanceof Element&&e.target.closest(\".code-copy-button\");t&&a(t)},{passive:!0});"],["/Users/scott/Code With Scott/Blog/daytripper.tw/src/components/Widgets/GithubCard.astro?astro&type=script&index=0&lang.ts","let a=null;async function i(t){const r=t.dataset.repo;if(!r)return;const e={avatar:t.querySelector(\".gc-owner-avatar\"),desc:t.querySelector(\".gc-repo-description\"),stars:t.querySelector(\".gc-stars-count\"),forks:t.querySelector(\".gc-forks-count\"),license:t.querySelector(\".gc-license-info\")};try{const n=await fetch(`https://api.github.com/repos/${r}`);if(!n.ok){e.desc&&(e.desc.textContent=\"Loading failed.\");return}const o=await n.json(),s=new Intl.NumberFormat(\"en\",{notation:\"compact\",maximumFractionDigits:1});e.avatar&&o.owner?.avatar_url&&(e.avatar.style.backgroundImage=`url(${o.owner.avatar_url})`),e.desc&&(e.desc.textContent=o.description??\"No description\"),e.stars&&(e.stars.textContent=s.format(o.stargazers_count??0)),e.forks&&(e.forks.textContent=s.format(o.forks_count??0)),e.license&&(e.license.textContent=o.license?.spdx_id??\"No License\")}catch(n){console.error(`Failed to fetch ${r}:`,n)}}function c(){a?.disconnect();const t=document.getElementsByClassName(\"gc-container\");t.length!==0&&(a=new IntersectionObserver(r=>{r.forEach(e=>{e.isIntersecting&&(i(e.target),a?.unobserve(e.target))})},{rootMargin:\"200px\"}),Array.from(t).forEach(r=>a?.observe(r)))}c();document.addEventListener(\"astro:page-load\",c);"]],"assets":["/_astro/pin-icon.BqRF32Gx.svg","/_astro/go-back.Dd29vIDa.svg","/_astro/toc-icon.SHZ3uwFj.svg","/_astro/lite-yt-embed.aX1H4qKi.js","/_astro/photoswipe-lightbox.esm.Dun5WlRs.js","/_astro/photoswipe.esm.Cp3BRxe1.js","/_astro/waline.DLjEnSq5.js","/_astro/theme-toggle.CtHfbrdZ.svg","/_astro/language-switcher.CYbg8-mA.svg","/_astro/twikoo.nocss.lHwNw-sE.js","/_astro/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2","/_astro/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2","/_astro/KaTeX_AMS-Regular.BQhdFMY1.woff2","/_astro/KaTeX_Fraktur-Bold.CL6g_b3V.woff2","/_astro/KaTeX_Fraktur-Regular.CTYiF6lA.woff2","/_astro/KaTeX_Main-Bold.Cx986IdX.woff2","/_astro/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2","/_astro/KaTeX_Main-Italic.NWA7e6Wa.woff2","/_astro/KaTeX_Main-Regular.B22Nviop.woff2","/_astro/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2","/_astro/KaTeX_Math-Italic.t53AETM-.woff2","/_astro/KaTeX_SansSerif-Bold.D1sUS0GD.woff2","/_astro/KaTeX_SansSerif-Italic.C3H0VqGB.woff2","/_astro/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2","/_astro/KaTeX_Size1-Regular.mCD8mA8B.woff2","/_astro/KaTeX_Script-Regular.D3wIWfF6.woff2","/_astro/KaTeX_Size2-Regular.Dy4dx90m.woff2","/_astro/KaTeX_Size4-Regular.Dl5lxZxV.woff2","/_astro/KaTeX_Typewriter-Regular.CO6r4hn1.woff2","/_astro/KaTeX_Caligraphic-Regular.CTRA-rTL.woff","/_astro/KaTeX_Caligraphic-Bold.BEiXGLvX.woff","/_astro/KaTeX_Fraktur-Bold.BsDP51OF.woff","/_astro/KaTeX_Fraktur-Regular.Dxdc4cR9.woff","/_astro/KaTeX_AMS-Regular.DMm9YOAa.woff","/_astro/KaTeX_Main-Bold.Jm3AIy58.woff","/_astro/KaTeX_Main-BoldItalic.SpSLRI95.woff","/_astro/KaTeX_Main-Italic.BMLOBm91.woff","/_astro/KaTeX_Main-Regular.Dr94JaBh.woff","/_astro/KaTeX_Math-BoldItalic.iY-2wyZ7.woff","/_astro/KaTeX_SansSerif-Bold.DbIhKOiC.woff","/_astro/KaTeX_Math-Italic.DA0__PXp.woff","/_astro/KaTeX_Size1-Regular.C195tn64.woff","/_astro/KaTeX_Size2-Regular.oD1tc_U0.woff","/_astro/KaTeX_SansSerif-Italic.DN2j7dab.woff","/_astro/KaTeX_SansSerif-Regular.CS6fqUqJ.woff","/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff","/_astro/KaTeX_Size4-Regular.BF-4gkZK.woff","/_astro/KaTeX_Script-Regular.D5yQViql.woff","/_astro/KaTeX_Typewriter-Regular.C0xS9mPB.woff","/_astro/KaTeX_Caligraphic-Regular.wX97UBjC.ttf","/_astro/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf","/_astro/KaTeX_Fraktur-Regular.CB_wures.ttf","/_astro/KaTeX_Fraktur-Bold.BdnERNNW.ttf","/_astro/KaTeX_AMS-Regular.DRggAlZN.ttf","/_astro/KaTeX_Main-Bold.waoOVXN0.ttf","/_astro/KaTeX_Main-BoldItalic.DzxPMmG6.ttf","/_astro/KaTeX_Main-Italic.3WenGoN9.ttf","/_astro/KaTeX_Main-Regular.ypZvNtVU.ttf","/_astro/KaTeX_Math-BoldItalic.B3XSjfu4.ttf","/_astro/KaTeX_SansSerif-Bold.CFMepnvq.ttf","/_astro/KaTeX_Size1-Regular.Dbsnue_I.ttf","/_astro/KaTeX_Math-Italic.flOr_0UB.ttf","/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf","/_astro/KaTeX_Size2-Regular.B7gKUWhC.ttf","/_astro/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf","/_astro/KaTeX_SansSerif-Regular.BNo7hRIc.ttf","/_astro/KaTeX_Size4-Regular.DWFBv043.ttf","/_astro/KaTeX_Script-Regular.C5JkGWo-.ttf","/_astro/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf","/_astro/twikoo.2FqUvUbJ.css","/_astro/waline.CuFmBLBo.css","/_astro/_posts_slug_.mf9Kv_1e.css","/_astro/lite-yt-embed.CiVzV6ix.css","/_astro/photoswipe.cPPnkASS.css","/_astro/katex.min.COXD5gRV.css","/_astro/_about_.BQUcoPl3.css","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CLDwYp7M.js","/_astro/GsapAnimation.astro_astro_type_script_index_0_lang.PzFQ5g7l.js","/_astro/index.Bel2lkwj.js","/_astro/page.BNYwb576.js","/admin/index.html","/feeds/atom-style.xsl","/feeds/rss-style.xsl","/fonts/STIX-Italic-VF.woff2","/fonts/STIX-VF.woff2","/fonts/Snell-Black-SF.woff2","/fonts/Snell-Bold-SF.woff2","/giscus/theme-dark.css","/giscus/theme-light.css","/icons/favicon.svg","/icons/og-logo.png","/sounds/tap_01.wav","/sounds/tap_02.wav","/sounds/tap_03.wav","/sounds/tap_04.wav","/sounds/tap_05.wav","/sounds/type_01.wav","/sounds/type_02.wav","/sounds/type_03.wav","/sounds/type_04.wav","/sounds/type_05.wav","/fonts/Font Subset List/CJK Common Characters.txt","/fonts/Font Subset List/EarlySummer Subset.txt","/fonts/Font Subset List/Japanese Kana + Korean Letters.txt","/fonts/Font Subset List/Latin + Cyrillic + Greek + Arabic Glyphs.txt","/fonts/Font Subset List/unicode_range.py","/fonts/EarlySummer-VF-Split/00785494587e3487ac63a0e7e4fa30f0.woff2","/fonts/EarlySummer-VF-Split/08e5d941a4c76fad7b68e7a937ebb21f.woff2","/fonts/EarlySummer-VF-Split/1268e5072156188d601f1eeb4473655d.woff2","/fonts/EarlySummer-VF-Split/12a385475353c815d7a5add53ee51e37.woff2","/fonts/EarlySummer-VF-Split/12b11ca08223c65a21fc731d59dcfc11.woff2","/fonts/EarlySummer-VF-Split/16d6676d3cb645c520ee6df8a1f89afd.woff2","/fonts/EarlySummer-VF-Split/2912a75ffef95e7a5ae9e2b2311ad61d.woff2","/fonts/EarlySummer-VF-Split/298d96ea561e419a4104bc9fc18499ce.woff2","/fonts/EarlySummer-VF-Split/2a2c71acc17ec39f6780835899e53096.woff2","/fonts/EarlySummer-VF-Split/2a7e2d0e59d3f638074c50fab39fdef1.woff2","/fonts/EarlySummer-VF-Split/36931fc4370e1670ed76af5d3feccba2.woff2","/fonts/EarlySummer-VF-Split/3a68fdc792e4a9e0399a04e32d0cc2e3.woff2","/fonts/EarlySummer-VF-Split/4054d6a4d6b37719b51e0f71da6e7cd9.woff2","/fonts/EarlySummer-VF-Split/429cb25f825c3cbde6bfac5b36ae9675.woff2","/fonts/EarlySummer-VF-Split/42a9efc11298368ecdc1b85ab46f0b4f.woff2","/fonts/EarlySummer-VF-Split/432018d2bdc9df92a7662056eb2b1261.woff2","/fonts/EarlySummer-VF-Split/44a6fb782f2a01560faa0f95248b60ef.woff2","/fonts/EarlySummer-VF-Split/45367b060e8ba0aa2507e6b91b86620b.woff2","/fonts/EarlySummer-VF-Split/571db7564bda7c1a93542881b8976f4b.woff2","/fonts/EarlySummer-VF-Split/58d55eeef4cf455e86a1142b1f3110d3.woff2","/fonts/EarlySummer-VF-Split/59ea41e77309160a0f63cdc76a010202.woff2","/fonts/EarlySummer-VF-Split/5d19d9174e568db4755981aa2e4ab380.woff2","/fonts/EarlySummer-VF-Split/5e811eb3b4175ee93d7ec000bf4631c2.woff2","/fonts/EarlySummer-VF-Split/6268e0cd5d66d6fe05b331f259e7b9e4.woff2","/fonts/EarlySummer-VF-Split/6549844aa3d833ca06a68a8e839db465.woff2","/fonts/EarlySummer-VF-Split/714b459658a7321ceeb1e1386ce165c2.woff2","/fonts/EarlySummer-VF-Split/7511d97a469915013683eae06cb21cd9.woff2","/fonts/EarlySummer-VF-Split/7784b4ebe543d13f62f6f6e05beb0b2e.woff2","/fonts/EarlySummer-VF-Split/77c9bea70b3c6ab24e1497d5468c825b.woff2","/fonts/EarlySummer-VF-Split/789ebea9e81df623e930b86de98fbfab.woff2","/fonts/EarlySummer-VF-Split/885bb7ab0717e8a47fc17f953adcdbf1.woff2","/fonts/EarlySummer-VF-Split/896c58aff69a9a857764cee0663bc56d.woff2","/fonts/EarlySummer-VF-Split/8fb6fc01c59d1e3ad1910b58dec7f5e7.woff2","/fonts/EarlySummer-VF-Split/95be5462b91b9a0458797cdc89d94cb5.woff2","/fonts/EarlySummer-VF-Split/9a5b2724f983ca0fc0d5ff8d10c41396.woff2","/fonts/EarlySummer-VF-Split/9ffe17f9c0e4cc4356cb3f08ffdb9c6d.woff2","/fonts/EarlySummer-VF-Split/EarlySummer-VF-Subset.woff2","/fonts/EarlySummer-VF-Split/EarlySummerSerif License.txt","/fonts/EarlySummer-VF-Split/a097ef49be62cd2565aca45600e1e3ac.woff2","/fonts/EarlySummer-VF-Split/a17a1ae6063088e5b3a48c06b816929a.woff2","/fonts/EarlySummer-VF-Split/a83fdcfc5ecf2f6996704b0c02758689.woff2","/fonts/EarlySummer-VF-Split/a8cf15ff9b71e59407d8406866ff6f99.woff2","/fonts/EarlySummer-VF-Split/af530ed51dd519e4456f8a5e259e908b.woff2","/fonts/EarlySummer-VF-Split/b195a8924915deec4aa9c3ec777cc93f.woff2","/fonts/EarlySummer-VF-Split/b4b6bb5df9239dd67b52ca858fd2a506.woff2","/fonts/EarlySummer-VF-Split/b7592e1e027923f19e0e55dfdac69668.woff2","/fonts/EarlySummer-VF-Split/b965859f69d8ccceaf0e2d6292afbcfb.woff2","/fonts/EarlySummer-VF-Split/bbe9333f1ff242bd96ecb23ff9e723b1.woff2","/fonts/EarlySummer-VF-Split/be758580e295339ea98f0240b9869f24.woff2","/fonts/EarlySummer-VF-Split/c07099e1d025617f6d40966986e1941b.woff2","/fonts/EarlySummer-VF-Split/c1b593dda62fdeb7dde3af02016da282.woff2","/fonts/EarlySummer-VF-Split/c89f0335910a68a0958f2846108370e8.woff2","/fonts/EarlySummer-VF-Split/ca49aa409fdedd3f2f894cd20a16640a.woff2","/fonts/EarlySummer-VF-Split/ccd4a28d2f63797e0183c87792e20b75.woff2","/fonts/EarlySummer-VF-Split/d2718da923fce8e7ea229d65e306e92c.woff2","/fonts/EarlySummer-VF-Split/d893e9b307d96041e9cfcbd03761b9f4.woff2","/fonts/EarlySummer-VF-Split/dafaedaee41b75e21479d4ff324b6a34.woff2","/fonts/EarlySummer-VF-Split/db392af65f1867e5fd580eed2195df99.woff2","/fonts/EarlySummer-VF-Split/dc7c73a9e5577143ccd11e05ab55cb39.woff2","/fonts/EarlySummer-VF-Split/de396881189f747eba67685298363242.woff2","/fonts/EarlySummer-VF-Split/df625b213228bba22a7733d4eff8f148.woff2","/fonts/EarlySummer-VF-Split/e6e60b384f220b893ef31a926ece829a.woff2","/fonts/EarlySummer-VF-Split/e6e8ce2c5972ab665630bb705383d0fb.woff2","/fonts/EarlySummer-VF-Split/e963c7ed7104c2d6d68fcb5f952fe2f5.woff2","/fonts/EarlySummer-VF-Split/e966b23b4cd7783f43e31032d41784f4.woff2","/fonts/EarlySummer-VF-Split/edaac57c3856ec13128f4c6c3e00975c.woff2","/fonts/EarlySummer-VF-Split/ee54e0d86edf068c6c9cbddb76a856fe.woff2","/fonts/EarlySummer-VF-Split/f612c78a5544ff2dd3e8296ac3e58344.woff2","/fonts/EarlySummer-VF-Split/f9e539bd9b7bf999c3da82f5403ec3b6.woff2","/fonts/EarlySummer-VF-Split/fa5863b923ac15993c52a619f699ee63.woff2","/fonts/EarlySummer-VF-Split/fc759e56ec6f6e6d3d4cb163d62fb557.woff2","/_astro/page.BNYwb576.js","/404.html","/atom.xml","/rss.xml","/~partytown/partytown-atomics.js","/~partytown/partytown-media.js","/~partytown/partytown-sw.js","/~partytown/partytown.js"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":[{"path":"en","codes":["en-US"]},{"path":"zh-tw","codes":["zh-TW"]}],"defaultLocale":"zh-tw","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"K35oB2g9Y0ispL3KWSVsUi5gdV7xjuSibM6MoBm45i4=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/scott/Code With Scott/Blog/daytripper.tw/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
