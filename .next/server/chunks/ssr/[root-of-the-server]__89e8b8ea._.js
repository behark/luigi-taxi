module.exports = [
"[project]/i18n/routing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-rsc] (ecmascript) <export default as defineRouting>");
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        'en',
        'de'
    ],
    defaultLocale: 'de',
    pathnames: {
        '/': '/',
        '/services': '/services',
        '/fleet': '/fleet',
        '/booking': '/booking',
        '/contact': '/contact'
    }
});
}),
"[project]/i18n/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [app-rsc] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/routing.ts [app-rsc] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../messages/de.json": {
                id: ()=>"[project]/messages/de.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/messages/de.json (json, async loader)")
            },
            "../messages/en.json": {
                id: ()=>"[project]/messages/en.json (json, async loader)",
                module: ()=>__turbopack_context__.A("[project]/messages/en.json (json, async loader)")
            }
        }).import(`../messages/${locale}.json`)).default
    };
});
}),
"[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_a71539c9-module__T19VSG__className",
  "variable": "geist_a71539c9-module__T19VSG__variable",
});
}),
"[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_8d43a2aa-module__8Li5zG__className",
  "variable": "geist_mono_8d43a2aa-module__8Li5zG__variable",
});
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/app/components/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/Footer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/Footer.tsx <module evaluation>", "default");
}),
"[project]/app/components/Footer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/app/components/Footer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/Footer.tsx", "default");
}),
"[project]/app/components/Footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/Footer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/layout/Navigation.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/layout/Navigation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/Navigation.tsx <module evaluation>", "default");
}),
"[project]/components/layout/Navigation.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/layout/Navigation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/layout/Navigation.tsx", "default");
}),
"[project]/components/layout/Navigation.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/layout/Navigation.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/layout/Navigation.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/providers.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/providers.tsx <module evaluation>", "Providers");
}),
"[project]/app/providers.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Providers() from the server but Providers is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/providers.tsx", "Providers");
}),
"[project]/app/providers.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/providers.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/providers.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/components/ErrorBoundary.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ErrorBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ErrorBoundary() from the server but ErrorBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ErrorBoundary.tsx <module evaluation>", "ErrorBoundary");
}),
"[project]/app/components/ErrorBoundary.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ErrorBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ErrorBoundary() from the server but ErrorBoundary is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ErrorBoundary.tsx", "ErrorBoundary");
}),
"[project]/app/components/ErrorBoundary.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ErrorBoundary.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ErrorBoundary.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/lib/constants/business.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BUSINESS_INFO",
    ()=>BUSINESS_INFO
]);
const BUSINESS_INFO = {
    name: 'Luigi Taxi e.U',
    legalName: 'Luigi Taxi e.U',
    address: 'Wr. Str. 60',
    city: 'Wiener Neustadt',
    postalCode: '2700',
    state: 'Lower Austria',
    country: 'Austria',
    countryCode: 'AT',
    phone: '+43 660 900 2700',
    phoneFormatted: '+43 660 900 2700',
    phoneClean: '436609002700',
    email: 'booking@luigitaxi.at',
    infoEmail: 'info@luigitaxi.at',
    website: 'https://luigitaxi.at',
    hours: '24/7',
    timezone: 'Europe/Vienna',
    currency: 'EUR',
    currencySymbol: '€',
    languages: [
        'de',
        'en'
    ],
    defaultLanguage: 'de',
    features: [
        'LGBTQ+ friendly',
        'Available 24/7',
        'Airport transfers',
        'City tours',
        'Business travel',
        'Professional drivers'
    ],
    social: {
        facebook: 'https://facebook.com/luigitaxi',
        whatsapp: 'https://wa.me/436609002700'
    },
    location: {
        coordinates: {
            lat: 47.8167,
            lng: 16.2333
        },
        googleMapsUrl: 'https://share.google/6nXqNx1cpvhoR6Qae',
        googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.0!2d16.2333!3d47.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDQ5JzAwLjEiTiAxNsKwMTMnNTkuOSJF!5e0!3m2!1sen!2sat!4v1234567890'
    },
    pricing: {
        // Base rates per km for each vehicle type
        baseRates: {
            standard: 2.5,
            executive: 3.5,
            minivan: 4.0
        },
        // Vehicle type display info (single source of truth)
        vehicles: {
            standard: {
                id: 'standard',
                name: 'Standard Sedan',
                nameDE: 'Limousine',
                capacity: 4,
                ratePerKm: 2.5,
                description: 'Comfortable sedan for up to 4 passengers',
                descriptionDE: 'Bequeme Limousine für bis zu 4 Passagiere'
            },
            executive: {
                id: 'executive',
                name: 'Executive Car',
                nameDE: 'Executive',
                capacity: 4,
                ratePerKm: 3.5,
                description: 'Premium vehicle for business travel',
                descriptionDE: 'Premium-Fahrzeug für Geschäftsreisen'
            },
            minivan: {
                id: 'minivan',
                name: 'Minivan',
                nameDE: 'Kleinbus',
                capacity: 8,
                ratePerKm: 4.0,
                description: 'Spacious vehicle for groups and luggage',
                descriptionDE: 'Geräumiges Fahrzeug für Gruppen und Gepäck'
            }
        },
        minimumFare: 8,
        nightSurchargeMultiplier: 1.2,
        nightHoursStart: 22,
        nightHoursEnd: 6,
        serviceMultipliers: {
            oneway: 1,
            roundtrip: 1.8,
            hourly: 2.5,
            airport: 1.2
        },
        hourlyRate: 35,
        minimumHours: 2,
        // Common routes with fixed prices (from Wiener Neustadt)
        commonRoutes: [
            {
                id: 'vienna-airport',
                name: 'Flughafen Wien',
                nameEN: 'Vienna Airport',
                distanceKm: 45,
                basePrice: 65
            },
            {
                id: 'vienna-center',
                name: 'Wien Zentrum',
                nameEN: 'Vienna Center',
                distanceKm: 50,
                basePrice: 70
            },
            {
                id: 'train-station',
                name: 'Hauptbahnhof WN',
                nameEN: 'Main Train Station',
                distanceKm: 3,
                basePrice: 15
            },
            {
                id: 'baden',
                name: 'Baden bei Wien',
                nameEN: 'Baden bei Wien',
                distanceKm: 20,
                basePrice: 35
            },
            {
                id: 'bratislava',
                name: 'Bratislava',
                nameEN: 'Bratislava',
                distanceKm: 85,
                basePrice: 120
            },
            {
                id: 'graz',
                name: 'Graz',
                nameEN: 'Graz',
                distanceKm: 150,
                basePrice: 200
            }
        ]
    }
};
}),
"[project]/components/seo/JsonLd.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JsonLd,
    "generateBreadcrumbSchema",
    ()=>generateBreadcrumbSchema,
    "generateFAQSchema",
    ()=>generateFAQSchema,
    "generateHomePageSchemas",
    ()=>generateHomePageSchemas,
    "generateLocalBusinessSchema",
    ()=>generateLocalBusinessSchema,
    "generateTaxiServiceSchema",
    ()=>generateTaxiServiceSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/business.ts [app-rsc] (ecmascript)");
;
;
function generateLocalBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website}/#organization`,
        name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name,
        legalName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].legalName,
        description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly.',
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website,
        telephone: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].phone,
        email: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].email,
        address: {
            '@type': 'PostalAddress',
            streetAddress: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].address,
            addressLocality: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].city,
            addressRegion: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].state,
            postalCode: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].postalCode,
            addressCountry: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].countryCode
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].location.coordinates.lat,
            longitude: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].location.coordinates.lng
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            opens: '00:00',
            closes: '23:59'
        },
        priceRange: '€€',
        currenciesAccepted: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].currency,
        paymentAccepted: 'Cash, Credit Card, Debit Card',
        areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].location.coordinates.lat,
                longitude: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].location.coordinates.lng
            },
            geoRadius: '50000'
        },
        sameAs: [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].social.facebook,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].social.whatsapp
        ],
        image: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website}/taxi-hero.jpg`,
        logo: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website}/logo.png`
    };
}
function generateTaxiServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'TaxiService',
        name: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name} - Taxi Service`,
        description: 'Professional taxi and transportation services including airport transfers, city tours, and business travel.',
        provider: {
            '@type': 'LocalBusiness',
            name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name,
            telephone: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].phone
        },
        areaServed: {
            '@type': 'City',
            name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].city,
            containedInPlace: {
                '@type': 'Country',
                name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].country
            }
        },
        serviceType: 'Taxi Service',
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website}/booking`,
            servicePhone: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].phone
        }
    };
}
function generateFAQSchema(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq)=>({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
    };
}
function generateBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index)=>({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: item.url
            }))
    };
}
function JsonLd({ type = 'LocalBusiness', data }) {
    let schema;
    switch(type){
        case 'LocalBusiness':
            schema = generateLocalBusinessSchema();
            break;
        case 'Service':
            schema = generateTaxiServiceSchema();
            break;
        default:
            schema = data || generateLocalBusinessSchema();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(schema)
        }
    }, void 0, false, {
        fileName: "[project]/components/seo/JsonLd.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
function generateHomePageSchemas() {
    return [
        generateLocalBusinessSchema(),
        generateTaxiServiceSchema()
    ];
}
}),
"[project]/lib/utils/seo.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateBookingPageSEO",
    ()=>generateBookingPageSEO,
    "generateContactPageSEO",
    ()=>generateContactPageSEO,
    "generateFleetPageSEO",
    ()=>generateFleetPageSEO,
    "generateHomePageSEO",
    ()=>generateHomePageSEO,
    "generateSEO",
    ()=>generateSEO,
    "generateServicesPageSEO",
    ()=>generateServicesPageSEO
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/business.ts [app-rsc] (ecmascript)");
;
// Locale-specific SEO defaults
const localeSEO = {
    de: {
        title: 'Luigi Taxi - Professioneller Taxiservice in Wiener Neustadt',
        description: 'Professioneller und zuverlässiger Taxiservice in Wiener Neustadt, Österreich. 24/7 verfügbar, LGBTQ+ freundlich. Buchen Sie Ihre Fahrt mit Luigi Taxi für sichere und komfortable Beförderung.',
        keywords: 'taxi wiener neustadt, luigi taxi, flughafentransfer, stadtrundfahrten, geschäftsreisen, 24/7 taxiservice, taxi österreich',
        locale: 'de_AT'
    },
    en: {
        title: 'Luigi Taxi - Professional Taxi Service in Wiener Neustadt',
        description: 'Professional and reliable taxi service in Wiener Neustadt, Austria. Available 24/7, LGBTQ+ friendly. Book your ride with Luigi Taxi for safe and comfortable transportation.',
        keywords: 'taxi wiener neustadt, luigi taxi, airport transfer, city tours, business travel, 24/7 taxi service, taxi austria',
        locale: 'en_US'
    }
};
function generateSEO(options = {}) {
    const { locale = 'de', path = '', noIndex = false, ...data } = options;
    const localeDefaults = localeSEO[locale] || localeSEO.de;
    const seo = {
        title: data.title || localeDefaults.title,
        description: data.description || localeDefaults.description,
        keywords: data.keywords || localeDefaults.keywords,
        ogImage: data.ogImage || '/images/taxi-hero.jpg'
    };
    const baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].website;
    const currentUrl = `${baseUrl}/${locale}${path}`;
    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        authors: [
            {
                name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name
            }
        ],
        creator: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name,
        publisher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name,
        metadataBase: new URL(baseUrl),
        robots: noIndex ? {
            index: false,
            follow: false
        } : {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        openGraph: {
            type: 'website',
            locale: localeDefaults.locale,
            url: currentUrl,
            title: seo.title,
            description: seo.description,
            siteName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].name,
            images: [
                {
                    url: seo.ogImage,
                    width: 1200,
                    height: 630,
                    alt: seo.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.description,
            images: [
                seo.ogImage
            ]
        },
        alternates: {
            canonical: currentUrl,
            languages: {
                'de-AT': `${baseUrl}/de${path}`,
                'en-US': `${baseUrl}/en${path}`,
                'x-default': `${baseUrl}/de${path}`
            }
        },
        verification: {
            google: ("TURBOPACK compile-time value", "your-google-verification-code") || ''
        }
    };
}
function generateHomePageSEO(locale = 'de') {
    return generateSEO({
        locale,
        path: ''
    });
}
function generateBookingPageSEO(locale = 'de') {
    const titles = {
        de: 'Taxi buchen - Luigi Taxi Wiener Neustadt',
        en: 'Book a Taxi - Luigi Taxi Wiener Neustadt'
    };
    const descriptions = {
        de: 'Buchen Sie jetzt Ihren Taxi-Transfer in Wiener Neustadt. Flughafentransfers, Stadtrundfahrten und mehr. Online-Buchung oder telefonisch unter +43 660 900 2700.',
        en: 'Book your taxi transfer in Wiener Neustadt now. Airport transfers, city tours and more. Online booking or call +43 660 900 2700.'
    };
    return generateSEO({
        locale,
        path: '/booking',
        title: titles[locale],
        description: descriptions[locale]
    });
}
function generateContactPageSEO(locale = 'de') {
    const titles = {
        de: 'Kontakt - Luigi Taxi Wiener Neustadt',
        en: 'Contact - Luigi Taxi Wiener Neustadt'
    };
    const descriptions = {
        de: `Kontaktieren Sie Luigi Taxi in Wiener Neustadt. Telefon: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].phone}, E-Mail: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].email}. Wir sind 24/7 für Sie da.`,
        en: `Contact Luigi Taxi in Wiener Neustadt. Phone: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].phone}, Email: ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$business$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BUSINESS_INFO"].email}. Available 24/7.`
    };
    return generateSEO({
        locale,
        path: '/contact',
        title: titles[locale],
        description: descriptions[locale]
    });
}
function generateServicesPageSEO(locale = 'de') {
    const titles = {
        de: 'Unsere Services - Luigi Taxi Wiener Neustadt',
        en: 'Our Services - Luigi Taxi Wiener Neustadt'
    };
    const descriptions = {
        de: 'Entdecken Sie unsere Taxiservices: Flughafentransfers, Stadtrundfahrten, Geschäftsreisen und mehr. Professionelle Fahrer und komfortable Fahrzeuge.',
        en: 'Discover our taxi services: Airport transfers, city tours, business travel and more. Professional drivers and comfortable vehicles.'
    };
    return generateSEO({
        locale,
        path: '/services',
        title: titles[locale],
        description: descriptions[locale]
    });
}
function generateFleetPageSEO(locale = 'de') {
    const titles = {
        de: 'Unsere Fahrzeugflotte - Luigi Taxi Wiener Neustadt',
        en: 'Our Fleet - Luigi Taxi Wiener Neustadt'
    };
    const descriptions = {
        de: 'Unsere moderne Fahrzeugflotte: Standard Limousinen, Executive Fahrzeuge und Minivans für bis zu 8 Passagiere. Komfort und Sicherheit garantiert.',
        en: 'Our modern fleet: Standard sedans, executive vehicles and minivans for up to 8 passengers. Comfort and safety guaranteed.'
    };
    return generateSEO({
        locale,
        path: '/fleet',
        title: titles[locale],
        description: descriptions[locale]
    });
}
}),
"[project]/app/[locale]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocaleLayout,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-server/NextIntlClientProviderServer.js [app-rsc] (ecmascript) <export default as NextIntlClientProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getMessages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getMessages$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getMessages.js [app-rsc] (ecmascript) <export default as getMessages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Navigation.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/providers.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ErrorBoundary.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/seo/JsonLd.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/seo.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const locales = [
    'en',
    'de'
];
function generateStaticParams() {
    return locales.map((locale)=>({
            locale
        }));
}
async function generateMetadata({ params }) {
    const { locale } = await params;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$seo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateSEO"])({
        locale: locale
    });
}
async function LocaleLayout({ children, params }) {
    const { locale } = await params;
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    // Providing all messages to the client
    const messages = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getMessages$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getMessages$3e$__["getMessages"])();
    // Generate JSON-LD schemas
    const schemas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$seo$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateHomePageSchemas"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: locale,
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    schemas.map((schema, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                            type: "application/ld+json",
                            dangerouslySetInnerHTML: {
                                __html: JSON.stringify(schema)
                            }
                        }, index, false, {
                            fileName: "[project]/app/[locale]/layout.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/layout.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/layout.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/layout.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} antialiased bg-white dark:bg-gray-900 transition-colors`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__["NextIntlClientProvider"], {
                    messages: messages,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Providers"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ErrorBoundary$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "#main-content",
                                    className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-black focus:rounded-md",
                                    children: "Skip to main content"
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/layout.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/layout.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                    id: "main-content",
                                    role: "main",
                                    "aria-label": locale === 'de' ? 'Hauptinhalt' : 'Main content',
                                    children: children
                                }, void 0, false, {
                                    fileName: "[project]/app/[locale]/layout.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/[locale]/layout.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/[locale]/layout.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/[locale]/layout.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/[locale]/layout.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/[locale]/layout.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/[locale]/layout.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__89e8b8ea._.js.map