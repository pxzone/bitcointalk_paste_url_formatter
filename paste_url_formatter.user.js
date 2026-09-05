// ==UserScript==
// @name         Bitcointalk Paste URL Formatter
// @namespace    https://bitcointalk.org/
// @version      1.0
// @description  Automatically formats copy/pasted URLs as [url=URL]change_text[/url] BBCode.
// @match        https://bitcointalk.org/index.php?action=post*
// @grant        none
// @author       PX-Z
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('paste', function (e) {
        const target = e.target;

        // Only handle textareas
        if (!(target instanceof HTMLTextAreaElement)) {
            return;
        }

        const text = e.clipboardData.getData('text/plain').trim();

        // Only process a single HTTP/HTTPS URL
        if (!/^https?:\/\/\S+$/i.test(text)) {
            return;
        }

        const bbcode = `[url=${text}]change_text[/url]`;

        e.preventDefault();

        const start = target.selectionStart;
        const end = target.selectionEnd;

        target.setRangeText(
            bbcode,
            start,
            end,
            'end'
        );

        // Notify site's JavaScript that the textarea changed
        target.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    });

})();
