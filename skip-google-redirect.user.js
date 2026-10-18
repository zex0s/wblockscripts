// ==UserScript==
// @name         Skip Google Redirect
// @namespace    https://github.com/user/zex0s
// @version      1.0
// @description  Skips Google's 'Redirect Notice' page.
// @match        *://*.google.com/url*
// @match        *://*.google.co.nz/url*
// @grant        none
// @run-at       document-start
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/zex0s/wblockscripts/main/skip-google-redirect.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/wblockscripts/main/skip-google-redirect.user.js
// ==/UserScript==

const p = new URLSearchParams(location.search);
const u = p.get("url") || p.get("q");
if (u && /^https?:\/\//i.test(u)) location.replace(u);
