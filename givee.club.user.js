// ==UserScript==
// @name         Givee Club non-giveaway remover
// @version      1.0
// @author       Beltrán Amenábar (https://github.com/beltranamenabar)
// @description  Removes the giveaways or ads that aren't related to the page in the "All active giveaways" section
// @homepageURL  https://github.com/beltranamenabar/userscripts
// @icon         https://givee.club/favicon.ico
// @updateURL    https://github.com/beltranamenabar/userscripts/raw/master/givee.club.user.js
// @supportURL   https://github.com/beltranamenabar/userscripts/issues
// @match        https://givee.club/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Remove ads
    document.querySelectorAll(".definetelynotanad").forEach(ad => {
        ad.parentElement.remove()
    });

    // Remove giveaways that aren't from givee club
    document.querySelectorAll(".event-source").forEach(nonGiveaway => {
        nonGiveaway.parentElement.parentElement.parentElement.parentElement.remove();
    });
})();