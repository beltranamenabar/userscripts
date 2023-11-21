// ==UserScript==
// @name         AKS Enhancer
// @version      0.1.1
// @author       Beltrán Amenábar (https://github.com/beltranamenabar)
// @description  Simulates having the ASK extension on the page and also skips the animation of the wheel
// @homepageURL  https://github.com/beltranamenabar/userscripts
// @icon         https://www.allkeyshop.com/favicon.ico
// @downloadURL  https://github.com/beltranamenabar/userscripts/raw/main/allkeyshop.user.js
// @updateURL    https://github.com/beltranamenabar/userscripts/raw/main/allkeyshop.user.js
// @supportURL   https://github.com/beltranamenabar/userscripts/issues
// @match        https://www.allkeyshop.com/blog/reward-program/
// @match        https://cheapdigitaldownload.com/reward-program/
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

/**
 * Takes the wheel and shortens the animation time, so it's almost instant
 */
function skipWheel() {
    let wheel = unsafeWindow.wheel;
    if (!wheel || !wheel.context || !wheel.context.renderer || !wheel.context.renderer.spinner) {
        return false;
    }
    let spinner = wheel.context.renderer.spinner;
    spinner.accelerationDuration = 10;
    spinner.fullSpeedDuration = 10;
    spinner.decelerationDuration = 10;
    return true;
}

(function() {
    'use strict';

    // Act as if the extension was installed
    if (typeof unsafeWindow.__site === "object" && unsafeWindow.__site && !unsafeWindow.__site.isExtensionEnabled) {
        // That means that extension is not enabled
        if (unsafeWindow.confirmExtensionEnabled) {
            unsafeWindow.confirmExtensionEnabled();
        }
    }

    // We use setTimeout to redo the wheel skip in case the wheel is not loaded in document-idle
    const skipWheelCallback = () => {
        if (!skipWheel()) {
            setTimeout(skipWheelCallback, 1000);
        }
    };
    setTimeout(skipWheelCallback);
})();