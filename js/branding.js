/* =========================================
   AREA BOYZ ENTERPRISE — BRANDING CONTROLLER
========================================= */

(function () {
    "use strict";

    const BRAND_NAME = "AREA BOYZ";
    const BRAND_MOTTO = "OUT OF PEOPLE THOUGHTS.";

    /*
     * Find the project root based on the location
     * of this JavaScript file.
     *
     * This allows the logo path to work from
     * the homepage and nested pages.
     */

    const scriptElement = document.currentScript;

    const scriptURL = scriptElement
        ? scriptElement.src
        : new URL("branding.js", window.location.href).href;

    const projectRoot = new URL("../", scriptURL);

    const LOGO_URL = new URL(
        "images/brand/Area-boyz-footprint.jpg",
        projectRoot
    ).href;

    /* =========================================
       CREATE FOOTPRINT LOGO
    ========================================= */

    function createLogo() {
        const image = document.createElement("img");

        image.src = LOGO_URL;
        image.alt = "Area Boyz Enterprise footprint logo";
        image.className = "area-brand-logo";
        image.loading = "eager";
        image.decoding = "async";

        return image;
    }

    /* =========================================
       REPLACE OLD LOGO MARKS
    ========================================= */

    function replaceOldLogos() {
        document.querySelectorAll(".logo-mark").forEach(function (element) {
            element.replaceChildren(createLogo());
            element.setAttribute(
                "aria-label",
                "Area Boyz Enterprise"
            );
        });

        /*
         * Replace standalone bold AB logos.
         * Only elements containing exactly "AB"
         * are replaced.
         */

        document.querySelectorAll("b").forEach(function (element) {
            if (element.textContent.trim() !== "AB") {
                return;
            }

            const image = createLogo();

            element.replaceWith(image);
        });
    }

    /* =========================================
       REPLACE THE OLD MOTTO
    ========================================= */

    function replaceMotto() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            const parent = node.parentElement;

            if (!parent) {
                return;
            }

            if (
                parent.closest(
                    "script, style, textarea, input, noscript"
                )
            ) {
                return;
            }

            node.nodeValue = node.nodeValue.replace(
                /Styles that fit your life/gi,
                BRAND_MOTTO
            );
        });
    }

    /* =========================================
       UPDATE PAGE TITLE AND DESCRIPTION
    ========================================= */

    function updateMetadata() {
        const description = document.querySelector(
            'meta[name="description"]'
        );

        if (description) {
            description.content = description.content.replace(
                /Styles that fit your life/gi,
                BRAND_MOTTO
            );
        }

        if (document.title) {
            document.title = document.title.replace(
                /Styles that fit your life/gi,
                BRAND_MOTTO
            );
        }
    }

    /* =========================================
       UPDATE FAVICON
    ========================================= */

    function updateFavicon() {
        let favicon = document.querySelector(
            'link[rel="icon"]'
        );

        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.href = LOGO_URL;
        favicon.type = "image/jpeg";
    }

    /* =========================================
       INITIALIZE BRANDING
    ========================================= */

    function initializeBranding() {
        replaceOldLogos();
        replaceMotto();
        updateMetadata();
        updateFavicon();

        console.log("Area Boyz branding initialized.");
        console.log("Footprint logo:", LOGO_URL);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeBranding
        );
    } else {
        initializeBranding();
    }
})();
