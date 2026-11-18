// ==UserScript==
// @name             ChatGPT: Remove login requirement
// @name:de          ChatGPT: Login-Bedingung entfernen
// @name:en          ChatGPT: Remove login requirement
// @author           Maingron
// @namespace        https://maingron.com/
// @homepage         https://maingron.com/
// @supportURL       https://github.com/Maingron/random-stuff/issues
// @source           
// @downloadURL      
// @updateURL        
// @version          2026.11.0
// @description      Remove login requirement for ChatGPT. This includes all annoying overlays, cookie banner and Login features.
// @description:de   Login Bedingung auf Perpexity.ai entfernen. Dies entfernt alle nervigen Overlays, Cookie Banner und Login Features.
// @description:en   Remove login requirement for ChatGPT. This includes all annoying overlays, cookie banner and Login features.
// @icon             https://chatgpt.com/unauth-mweb/favicon.ico
// @copyright        2026 Maingron
// @created          2026-11-19
// @modified         2026-11-19
// @license          MIT
// @match            http*://www.chatgpt.com/*
// @match            http*://chatgpt.com/*
// @grant            GM_addStyle
// @tag              ChatGPT
// @tag              Chatty
// @tag              Pop-Up
// OpenUserJS:       
// Greasy Fork:      
// ==/UserScript==

// THIS IS WIP.


(function() {
	'use strict';
	console.log("[UserScript][Maingron][ChatGPT: Remove login requirement] Removing overlays and writing CSS Code to page");

	// Allow scrolling - Perplexity disables scrolling by preventDefault(e). We intercept and prevent preventDefault if wheel or scroll
	const originalPreventDefault = Event.prototype.preventDefault;
	Event.prototype.preventDefault = function () {
		if (this.type == "wheel" || this.type == "scroll" | this.type == "touchmove") { } else {
			return originalPreventDefault.call(this);
		}
	};


	const elementsSelectors = [
		"html body [data-octane-recurring-login-banner-shell]"
	];

	const elementsSelectorsEager = [
		"html[lang][dir] body span[data-radix-focus-guard]", // From Perplexity Script
		"html img[src*='edge.perplexity.ai/image']" // From Perplexity Script
	]

	GM_addStyle(`
		${elementsSelectors.join(",")} {
			display: none !important;
			visibility: hidden !important;
			opacity: 0 !important;
			pointer-events: none !important;
			user-select: none !important;
		}
	`);

	window.addEventListener("load", function () {
		window.setTimeout(function () {
			document.querySelectorAll(elementsSelectors).forEach((item) => {
				item.remove();
			});
		}, 4000 + Math.random() * 2000); // Timeout value is slightly randomized to make it seem more organic

		document.querySelectorAll(elementsSelectorsEager).forEach((item) => {
			item.remove();
		});
	});
})();
