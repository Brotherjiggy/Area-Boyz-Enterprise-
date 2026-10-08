/* =========================================================
   AREA BOYZ ENTERPRISE
   BRANDING CONTROLLER
   ========================================================= */

(function () {
  "use strict";

  const BRAND_NAME = "AREA BOYZ";
  const BRAND_MOTTO = "OUT OF PEOPLE THOUGHTS.";
  const LOGO_PATH = "area-boyz-footprint.jpg";

  /*
   * Automatically works from:
   *
   * /index.html
   * /pages/shop.html
   * /pages/collections.html
   * /investment/index.html
   * etc.
   */

  function getLogoPath() {
    const path = window.location.pathname;

    if (
      path.includes("/pages/") ||
      path.includes("/investment/") ||
      path.includes("/account/") ||
      path.includes("/admin/")
    ) {
      return "../images/brand/" + LOGO_PATH;
    }

    return "images/brand/" + LOGO_PATH;
  }

  const logoPath = getLogoPath();

  /* -------------------------------------------------------
     Create official Area Boyz logo
     ------------------------------------------------------- */

  function createLogoImage(extraClass) {
    const image = document.createElement("img");

    image.src = logoPath;
    image.alt = "Area Boyz footprint logo";
    image.className = extraClass || "area-brand-logo";
    image.loading = "eager";
    image.decoding = "async";

    return image;
  }

  /* -------------------------------------------------------
     Replace old AB logo marks
     ------------------------------------------------------- */

  function replaceOldLogoMarks() {
    document.querySelectorAll(".logo-mark").forEach(function (mark) {
      mark.textContent = "";

      const image = createLogoImage();

      mark.appendChild(image);
    });

    /*
     * Some existing pages use:
     *
     * <b>AB</b>
     *
     * Replace only those exact AB elements.
     */

    document.querySelectorAll("b").forEach(function (element) {
      if (element.textContent.trim() !== "AB") {
        return;
      }

      const image = createLogoImage("area-brand-logo");

      element.replaceWith(image);
    });
  }

  /* -------------------------------------------------------
     Replace old motto text
     ------------------------------------------------------- */

  function replaceTextInNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const original = node.nodeValue;

      if (
        original.includes("Styles that fit your life") ||
        original.includes("Styles That Fit Your Life")
      ) {
        node.nodeValue = original
          .replace(
            /Styles that fit your life/gi,
            BRAND_MOTTO
          )
          .replace(
            /Styles That Fit Your Life/gi,
            BRAND_MOTTO
          );
      }

      return;
    }

    /*
     * Don't modify scripts, styles, or metadata internals
     * recursively.
     */

    if (
      node.nodeName === "SCRIPT" ||
      node.nodeName === "STYLE"
    ) {
      return;
    }

    Array.from(node.childNodes).forEach(replaceTextInNode);
  }

  function replaceOldMotto() {
    replaceTextInNode(document.body);
  }

  /* -------------------------------------------------------
     Update page metadata
     ------------------------------------------------------- */

  function updateMetadata() {
    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      const current = description.getAttribute("content") || "";

      description.setAttribute(
        "content",
        current
          .replace(/Styles that fit your life/gi, BRAND_MOTTO)
          .replace(/Styles That Fit Your Life/gi, BRAND_MOTTO)
      );
    }

    if (document.title) {
      document.title = document.title
        .replace(/Styles that fit your life/gi, BRAND_MOTTO)
        .replace(/Styles That Fit Your Life/gi, BRAND_MOTTO);
    }
  }

  /* -------------------------------------------------------
     Favicon
     ------------------------------------------------------- */

  function updateFavicon() {
    let favicon = document.querySelector(
      'link[rel="icon"]'
    );

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.type = "image/jpeg";
    favicon.href = logoPath;
  }

  /* -------------------------------------------------------
     Main branding initialization
     ------------------------------------------------------- */

  function initializeBranding() {
    replaceOldLogoMarks();
    replaceOldMotto();
    updateMetadata();
    updateFavicon();
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
