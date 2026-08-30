// ==UserScript==
// @name         Bitcointalk Auto URL BBCode
// @description  Automatically converts pasted Bitcointalk URLs to [url=...]Text[/url] BBCode
// @namespace    https://bitcointalk.org/
// @match        https://bitcointalk.org/*
// @grant        none
// @version      1.0.0
// @author       PX-Z
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('paste', function (e) {
        const target = e.target;

        // Only handle textareas / text inputs / contenteditable
        if (
            !(target instanceof HTMLTextAreaElement) &&
            !(target instanceof HTMLInputElement) &&
            !target.isContentEditable
        ) {
            return;
        }

        const text = e.clipboardData.getData('text/plain').trim();
        const anchor_text = "change_text";

        // Only process Bitcointalk URLs
        if (!/^https?:\/\/(?:www\.)?bitcointalk\.org\//i.test(text)) {
            return;
        }

        const bbcode = `[url=${text}]${anchor_text}[/url]`;

        e.preventDefault();

        // textarea / input
        if (
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLInputElement
        ) {
            const start = target.selectionStart;
            const end = target.selectionEnd;

            target.setRangeText(
                bbcode,
                start,
                end,
                'end'
            );

            // Notify site's JS that the value changed
            target.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

})();
