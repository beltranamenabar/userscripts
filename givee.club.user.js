// ==UserScript==
// @name         Givee Club non-giveaway remover (and more)
// @version      1.3
// @author       Beltrán Amenábar (https://github.com/beltranamenabar)
// @description  Removes the giveaways or ads that aren't related to the page in the "All active giveaways" section
// @homepageURL  https://github.com/beltranamenabar/userscripts
// @icon         https://givee.club/favicon.ico
// @updateURL    https://github.com/beltranamenabar/userscripts/raw/main/givee.club.user.js
// @supportURL   https://github.com/beltranamenabar/userscripts/issues
// @match        https://givee.club/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Remove ads
    // Check if we are on a giveaway page or not
    if (window.location.href.match(/https:\/\/givee.club\/[a-z]{2}\/event\/\d+/)) {
        document.querySelectorAll(".definetelynotanad").forEach(ad => {
            ad.remove()
        });
    }
    else {
        document.querySelectorAll(".definetelynotanad").forEach(ad => {
            ad.parentElement.remove()
        });
    }
    // Remove giveaways that aren't from givee club
    document.querySelectorAll(".event-source").forEach(nonGiveaway => {
        nonGiveaway.parentElement.parentElement.parentElement.parentElement.remove();
    });
    // They added a new type of giveaway card, so we need to remove it
    document.querySelectorAll(".event-platform-epicgames").forEach(nonGiveaway => {
        nonGiveaway.parentElement.parentElement.parentElement.remove();
    });

    // Change steam wishlist modals for a direct link (as it was before)
    document.querySelectorAll("a.pseudo").forEach(game => {
        let app_id = game.getAttribute("data-steam-wishlist-appid");
        if (app_id) {
            // change the element to a direct url
            let new_element = document.createElement("a")
            new_element.href = "https://store.steampowered.com/app/" + app_id;
            new_element.textContent = game.textContent;
            new_element.target = "_blank";

            // Delete the actual element and replace it with the new one,
            // because it triggers the modal opening when clicked
            let parent = game.parentElement;
            game.remove();
            parent.appendChild(new_element);
        }

    });

})();