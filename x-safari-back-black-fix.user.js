// ==UserScript==
// @name         X: fix black feed after going back (Safari)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  After back-navigation X restores scroll, but Safari's async scrolling keeps a stale position so the feed shows black until you scroll. Re-sync it with a quick scroll jump.
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/zex0s/wblockscripts/main/x-safari-back-black-fix.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/wblockscripts/main/x-safari-back-black-fix.user.js
// ==/UserScript==

(() => {
  let timer, deadline;

  // Once X has finished restoring scroll (no scroll events for 150ms),
  // jump to the top and back so Safari re-syncs and repaints.
  const resync = () => {
    clearTimeout(timer);
    if (Date.now() > deadline) return removeEventListener('scroll', resync);
    timer = setTimeout(() => {
      removeEventListener('scroll', resync);
      const y = scrollY;
      if (y < innerHeight) return; // near the top: nothing stale to fix
      scrollTo(0, 0);
      requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(0, y)));
    }, 150);
  };

  addEventListener('popstate', () => {
    deadline = Date.now() + 2000;
    addEventListener('scroll', resync, { passive: true });
    resync();
  });
})();
