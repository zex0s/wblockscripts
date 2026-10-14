// ==UserScript==
// @name         YouTube Preview Volume Control
// @description  Sets the volume of YouTube hover previews. Port of github.com/Master-Chief-Burner/YouTube-Preview-Volume-Control
// @version      2.1
// @match        *://*.youtube.com/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @downloadURL  https://raw.githubusercontent.com/zex0s/wblockscripts/main/youtube-preview-volume.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/wblockscripts/main/youtube-preview-volume.user.js
// ==/UserScript==

(function () {
  let previewVolume = GM_getValue('previewVolume', 15) / 100;

  const proto = unsafeWindow.HTMLMediaElement.prototype;
  const original = Object.getOwnPropertyDescriptor(proto, 'volume');

  Object.defineProperty(proto, 'volume', {
    get: original.get,
    set(value) {
      original.set.call(this, isPreview(this) ? previewVolume : value);
    },
    configurable: true,
  });

  // Only videos positively inside the hover-preview container. Detached or unknown = normal video.
  function isPreview(video) {
    return !!video.closest('ytd-video-preview, #video-preview');
  }

  // Replaces the extension's popup
  GM_registerMenuCommand(`Set preview volume (now ${Math.round(previewVolume * 100)}%)`, () => {
    const input = prompt('Preview volume (0-100):', Math.round(previewVolume * 100));
    const n = Number(input);
    if (input === null || input.trim() === '' || !(n >= 0 && n <= 100)) return;
    GM_setValue('previewVolume', n);
    previewVolume = n / 100;
    document.querySelectorAll('video').forEach(v => { if (isPreview(v)) original.set.call(v, previewVolume); });
  });
})();
