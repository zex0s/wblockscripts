// ==UserScript==
// @name         YouTube: disable 0-9 seek keys
// @version      1.0
// @description  Stops the number keys (0-9, incl. numpad) from jumping the video to 0%-90%. Typing in search, comments etc. still works.
// @match        *://*.youtube.com/*
// @run-at       document-start
// @grant        none
// @inject-into  content
// @downloadURL  https://raw.githubusercontent.com/zex0s/wblockscripts/main/youtube-disable-number-keys.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/wblockscripts/main/youtube-disable-number-keys.user.js
// ==/UserScript==

// Capture on window at document-start = runs before YouTube's own key handlers
window.addEventListener('keydown', e => {
  if (!/^(Digit|Numpad)\d$/.test(e.code) || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.composedPath()[0];
  if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
  e.stopImmediatePropagation();
}, true);
