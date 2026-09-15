"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   PREMIUM COMMERCE ENGINE
   VERSION 5.0

   - 120-product catalogue
   - Smart product gallery
   - Automatically detects available gallery images
   - Supports future -2 / -3 / -4 product images
   - Professional missing-image placeholders
   - Product details modal
   - Search
   - Filters
   - Sorting
   - Cart drawer
   - LocalStorage cart
   - Quantity controls
   - Mobile navigation
   - Hash routing
   - Equity calculator
   - Announcement bar
   - Keyboard controls
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {
    brand: "Area Boyz Enterprise",
    totalEquity: 758000,
    currency: "USD",
    storageKey: "areaBoyzCart",
    defaultPage: "home",
    preloaderDuration: 1100
};


/* =========================================================
   APPLICATION STATE
   ========================================================= */

const state = {
    currentPage: "home",
    currentCategory: "all",
    currentSearch: "",
    currentSort: "featured",
    cart: loadCart(),
    products: [],
    activeProduct: null,
    galleryIndex: 0,
    galleryImages: []
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   CATEGORY NAMES
   ========================================================= */

const categoryNames = {
    streetwear: "Streetwear",
    hoodies: "Hoodies",
    shirts: "Shirts",
    outerwear: "Outerwear",
    bottoms: "Bottoms",
    denim: "Denim",
    footwear: "Footwear",
    bags: "Bags",
    headwear: "Headwear",
    accessories: "Accessories",
    jewelry: "Jewelry",
    sets: "Sets"
};


/* =========================================================
   PRODUCT CATALOGUE
   ========================================================= */

const productNames = [

    /* STREETWEAR */
    ["AB Essential Oversized Tee", "streetwear", 55],
    ["Area Motion Graphic Tee", "streetwear", 60],
    ["Evolution Heavyweight Tee", "streetwear", 68],
    ["Area Boyz Signature Tee", "streetwear", 58],
    ["Street Philosophy Tee", "streetwear", 62],
    ["Move Different Tee", "streetwear", 55],
    ["Everyday Energy Tee", "streetwear", 52],
    ["AB Core Cotton Tee", "streetwear", 48],
    ["Area Boyz Archive Tee", "streetwear", 65],
    ["The Evolution Tee", "streetwear", 70],

    /* HOODIES */
    ["Evolution Heavyweight Hoodie", "hoodies", 125],
    ["AB Essential Pullover Hoodie", "hoodies", 110],
    ["Area Motion Zip Hoodie", "hoodies", 135],
    ["Street Energy Hoodie", "hoodies", 120],
    ["Move Different Hoodie", "hoodies", 118],
    ["AB Signature Hoodie", "hoodies", 145],
    ["Tranquility Hoodie", "hoodies", 130],
    ["Crafted Intention Hoodie", "hoodies", 155],
    ["Archive Logo Hoodie", "hoodies", 115],
    ["Area Boyz Premium Hoodie", "hoodies", 165],

    /* SHIRTS */
    ["AB Classic Button Shirt", "shirts", 85],
    ["Area Boyz Resort Shirt", "shirts", 95],
    ["Motion Utility Shirt", "shirts", 105],
    ["Everyday Camp Shirt", "shirts", 78],
    ["Evolution Linen Shirt", "shirts", 110],
    ["Street Collar Shirt", "shirts", 88],
    ["AB Relaxed Shirt", "shirts", 82],
    ["Craft Cotton Shirt", "shirts", 115],
    ["Archive Pattern Shirt", "shirts", 120],
    ["Intention Overshirt", "shirts", 125],

    /* OUTERWEAR */
    ["AB Utility Jacket", "outerwear", 180],
    ["Evolution Coach Jacket", "outerwear", 165],
    ["Area Motion Bomber", "outerwear", 220],
    ["Street Command Jacket", "outerwear", 195],
    ["Crafted Work Jacket", "outerwear", 210],
    ["Tranquility Overshirt Jacket", "outerwear", 175],
    ["AB Technical Shell", "outerwear", 240],
    ["Archive Track Jacket", "outerwear", 155],
    ["Everyday Windbreaker", "outerwear", 135],
    ["Intention Utility Coat", "outerwear", 260],

    /* BOTTOMS */
    ["AB Everyday Cargo", "bottoms", 95],
    ["Area Motion Track Pant", "bottoms", 105],
    ["Evolution Wide Leg Pant", "bottoms", 115],
    ["Street Utility Pant", "bottoms", 120],
    ["Tranquility Relaxed Pant", "bottoms", 98],
    ["Crafted Work Pant", "bottoms", 130],
    ["AB Signature Jogger", "bottoms", 90],
    ["Move Different Sweatpant", "bottoms", 100],
    ["Archive Cargo Pant", "bottoms", 125],
    ["Intention Pleated Pant", "bottoms", 140],

    /* DENIM */
    ["AB Classic Denim", "denim", 110],
    ["Evolution Washed Denim", "denim", 125],
    ["Area Boyz Straight Denim", "denim", 115],
    ["Motion Relaxed Denim", "denim", 130],
    ["Street Blue Denim", "denim", 105],
    ["Archive Black Denim", "denim", 135],
    ["AB Carpenter Denim", "denim", 145],
    ["Crafted Denim Jean", "denim", 150],
    ["Evolution Wide Denim", "denim", 140],
    ["Intention Raw Denim", "denim", 165],

    /* FOOTWEAR */
    ["AB Motion Runner", "footwear", 150],
    ["Area Boyz Street Runner", "footwear", 165],
    ["Evolution High Top", "footwear", 180],
    ["AB Classic Sneaker", "footwear", 145],
    ["Move Different Trainer", "footwear", 175],
    ["Street Court Sneaker", "footwear", 155],
    ["Crafted Leather Sneaker", "footwear", 220],
    ["Tranquility Slide", "footwear", 85],
    ["Archive High Top", "footwear", 195],
    ["Intention Platform Sneaker", "footwear", 240],

    /* BAGS */
    ["AB Everyday Tote", "bags", 75],
    ["Area Motion Crossbody", "bags", 85],
    ["Evolution Utility Bag", "bags", 105],
    ["Street Carry Bag", "bags", 65],
    ["Crafted Canvas Tote", "bags", 90],
    ["AB Signature Backpack", "bags", 125],
    ["Archive Messenger Bag", "bags", 115],
    ["Tranquility Shoulder Bag", "bags", 95],
    ["Move Different Sling", "bags", 80],
    ["Intention Leather Bag", "bags", 180],

    /* HEADWEAR */
    ["AB Classic Cap", "headwear", 40],
    ["Area Boyz Logo Cap", "headwear", 45],
    ["Evolution Five Panel", "headwear", 48],
    ["Street Trucker Cap", "headwear", 42],
    ["Crafted Bucket Hat", "headwear", 55],
    ["Tranquility Knit Beanie", "headwear", 38],
    ["Archive Dad Cap", "headwear", 40],
    ["Move Different Cap", "headwear", 45],
    ["Intention Bucket Hat", "headwear", 60],
    ["AB Premium Headwear", "headwear", 65],

    /* ACCESSORIES */
    ["AB Signature Belt", "accessories", 55],
    ["Area Boyz Utility Belt", "accessories", 65],
    ["Evolution Card Holder", "accessories", 45],
    ["Street Key Chain", "accessories", 30],
    ["Crafted Leather Wallet", "accessories", 75],
    ["AB Everyday Socks", "accessories", 28],
    ["Archive Phone Pouch", "accessories", 50],
    ["Move Different Sunglasses", "accessories", 70],
    ["Tranquility Scarf", "accessories", 60],
    ["Intention Leather Gloves", "accessories", 85],

    /* JEWELRY */
    ["AB Core Chain", "jewelry", 65],
    ["Area Boyz Signature Chain", "jewelry", 90],
    ["Evolution Pendant", "jewelry", 85],
    ["Street Identity Bracelet", "jewelry", 55],
    ["Crafted Metal Ring", "jewelry", 45],
    ["AB Signet Ring", "jewelry", 75],
    ["Archive Pendant", "jewelry", 80],
    ["Move Different Bracelet", "jewelry", 60],
    ["Tranquility Beaded Chain", "jewelry", 70],
    ["Intention Statement Ring", "jewelry", 95],

    /* SETS */
    ["AB Everyday Set", "sets", 145],
    ["Evolution Lounge Set", "sets", 175],
    ["Area Motion Tracksuit", "sets", 190],
    ["Street Energy Set", "sets", 160],
    ["Crafted Intention Set", "sets", 220],
    ["Tranquility Co-Ord Set", "sets", 185],
    ["Archive Signature Set", "sets", 200],
    ["Move Different Set", "sets", 170],
    ["AB Premium Travel Set", "sets", 240],
    ["Intention Evolution Set", "sets", 260]
];


/* =========================================================
   PRIMARY CATEGORY
   ========================================================= */

function primaryCategory(category) {

    if (
        [
            "streetwear",
            "hoodies",
            "shirts",
            "outerwear",
            "bottoms",
            "denim",
            "sets"
        ].includes(category)
    ) {
        return "streetwear";
    }

    if (category === "footwear") {
        return "footwear";
    }

    if (category === "accessories") {
        return "accessories";
    }

    if (
        ["bags", "headwear", "jewelry"].includes(category)
    ) {
        return "accessories";
    }

    if (category === "handmade") {
        return "handmade";
    }

    return category;
}


/* =========================================================
   CATEGORY MATERIALS
   ========================================================= */

function getMaterial(category) {

    const materials = {
        streetwear: "Premium cotton blend",
        hoodies: "Heavyweight cotton fleece",
        shirts: "Premium cotton blend",
        outerwear: "Technical woven fabric",
        bottoms: "Structured cotton twill",
        denim: "Premium denim",
        footwear: "Performance textile and rubber",
        bags: "Durable canvas and premium textile",
        headwear: "Structured cotton",
        accessories: "Premium mixed materials",
        jewelry: "Polished metal",
        sets: "Premium coordinated fabric"
    };

    return materials[category] || "Premium Area Boyz materials";
}


/* =========================================================
   PRODUCT FIT
   ========================================================= */

function getFit(category) {

    const fits = {
        streetwear: "Relaxed everyday fit",
        hoodies: "Relaxed oversized fit",
        shirts: "Relaxed contemporary fit",
        outerwear: "Modern structured fit",
        bottoms: "Relaxed utility fit",
        denim: "Contemporary straight fit",
        footwear: "True-to-size everyday fit",
        bags: "Everyday carry design",
        headwear: "Adjustable universal fit",
        accessories: "Designed for everyday use",
        jewelry: "Statement everyday fit",
        sets: "Relaxed coordinated fit"
    };

    return fits[category] || "Contemporary Area Boyz fit";
}


/* =========================================================
   PRODUCT CARE
   ========================================================= */

function getCare(category) {

    if (
        ["jewelry", "accessories"].includes(category)
    ) {
        return "Store clean and dry. Avoid prolonged exposure to moisture.";
    }

    if (category === "footwear") {
        return "Clean gently with a soft cloth and allow to air dry.";
    }

    if (category === "denim") {
        return "Wash inside out with similar colours. Avoid excessive heat.";
    }

    return "Follow garment care instructions. Wash with similar colours.";
}


/* =========================================================
   PRODUCT DESCRIPTION
   ========================================================= */

function getProductDescription(name, category) {

    const categoryText = {
        streetwear:
            "Built for everyday movement with a clean Area Boyz attitude.",

        hoodies:
            "A heavyweight everyday layer combining comfort, structure and Area Boyz identity.",

        shirts:
            "A versatile Area Boyz staple designed for effortless everyday styling.",

        outerwear:
            "A functional statement layer designed to bring structure and personality to your rotation.",

        bottoms:
            "Designed around comfort, movement and practical everyday style.",

        denim:
            "A contemporary denim essential designed to become part of your everyday uniform.",

        footwear:
            "Built for everyday movement with a balance of comfort, utility and street attitude.",

        bags:
            "An everyday carry piece designed around function, movement and intentional style.",

        headwear:
            "A finishing piece designed to add a clean Area Boyz signature to your look.",

        accessories:
            "An everyday essential designed to complement the Area Boyz lifestyle.",

        jewelry:
            "A statement accessory designed to add identity and character without overdoing it.",

        sets:
            "A coordinated Area Boyz look designed for effortless everyday styling."
    };

    return `${name} by Area Boyz Enterprise. ${
        categoryText[category] ||
        "Designed around movement, individuality and intentional everyday style."
    }`;
}


/* =========================================================
   IMAGE PATH
   ========================================================= */

function productImagePath(number) {
    return `images/products/product-${String(number).padStart(3, "0")}.jpg`;
}


/* =========================================================
   CREATE PRODUCTS
   ========================================================= */

function createProducts() {

    return productNames.map((item, index) => {

        const [
            name,
            category,
            price
        ] = item;

        const number = index + 1;

        const mainImage = productImagePath(number);

        const gallery = [
            mainImage,
            `images/products/product-${String(number).padStart(3, "0")}-2.jpg`,
            `images/products/product-${String(number).padStart(3, "0")}-3.jpg`,
            `images/products/product-${String(number).padStart(3, "0")}-4.jpg`
        ];

        let badge = "";

        if (index < 6) {
            badge = "NEW";
        } else if ((index + 1) % 11 === 0) {
            badge = "LIMITED";
        } else if ((index + 1) % 7 === 0) {
            badge = "BESTSELLER";
        }

        const isOneSize =
            ["jewelry", "accessories"].includes(category);

        return {
            id: `AB-${String(number).padStart(3, "0")}`,

            sku: `AB-${String(number).padStart(3, "0")}`,

            name,

            category,

            categoryLabel:
                categoryNames[category] || category,

            primaryCategory:
                primaryCategory(category),

            price,

            image: mainImage,

            gallery,

            imageAlt:
                `${name} — Area Boyz Enterprise`,

            rating:
                Number((4.5 + ((index * 7) % 5) / 10).toFixed(1)),

            reviews:
                18 + ((index * 13) % 180),

            badge,

            description:
                getProductDescription(name, category),

            material:
                getMaterial(category),

            fit:
                getFit(category),

            care:
                getCare(category),

            colors:
                ["sets", "jewelry", "bags"].includes(category)
                    ? ["Black", "Gold", "Cream"]
                    : ["Black", "White", "Yellow"],

            sizes:
                isOneSize
                    ? ["One Size"]
                    : ["S", "M", "L", "XL", "XXL"],

            stock:
                3 + ((index * 7) % 28)
        };
    });
}


/* =========================================================
   CART STORAGE
   ========================================================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(CONFIG.storageKey);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.warn(
            "Could not load cart:",
            error
        );

        return [];
    }
}


function saveCart() {

    try {

        localStorage.setItem(
            CONFIG.storageKey,
            JSON.stringify(state.cart)
        );

    } catch (error) {

        console.warn(
            "Could not save cart:",
            error
        );
    }
}


/* =========================================================
   CURRENCY
   ========================================================= */

function formatCurrency(amount) {

    try {

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: CONFIG.currency,
                maximumFractionDigits: 0
            }
        ).format(amount);

    } catch {

        return `$${Number(amount).toFixed(0)}`;
    }
}


/* =========================================================
   IMAGE TEST
   ========================================================= */

function imageExists(src) {

    return new Promise(resolve => {

        const image = new Image();

        image.onload = () => resolve(true);

        image.onerror = () => resolve(false);

        image.src = src;
    });
}


/* =========================================================
   GET AVAILABLE GALLERY
   ========================================================= */

async function getAvailableGallery(product) {

    const results = await Promise.all(
        product.gallery.map(async src => {

            const exists =
                await imageExists(src);

            return exists
                ? src
                : null;

        })
    );

    return results.filter(Boolean);
}


/* =========================================================
   PRODUCT MEDIA PLACEHOLDER
   ========================================================= */

function productPlaceholder(product) {

    return `
        <div class="ab-product-placeholder">
            <span class="ab-placeholder-mark">AB</span>
            <span class="ab-placeholder-category">
                ${escapeHTML(product.categoryLabel)}
            </span>
            <small>
                ${escapeHTML(product.sku)}
            </small>
        </div>
    `;
}


/* =========================================================
   PRODUCT IMAGE HTML
   ========================================================= */

function productImageHTML(product, extraClass = "") {

    return `
        <div class="ab-product-media ${extraClass}">
            <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.imageAlt)}"
                loading="lazy"
                data-product-image
            >

            ${productPlaceholder(product)}
        </div>
    `;
}


/* =========================================================
   INJECT FUNCTIONAL STYLES
   ========================================================= */

function injectFunctionalStyles() {

    if ($("#ab-functional-styles")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id = "ab-functional-styles";

    style.textContent = `

        .ab-product-media {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 260px;
            overflow: hidden;
            background: #111;
        }

        .ab-product-media img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
        }

        .ab-product-placeholder {
            position: absolute;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 8px;
            background:
                radial-gradient(
                    circle at center,
                    #242424 0%,
                    #101010 65%,
                    #080808 100%
                );
            color: #ffd400;
            text-align: center;
        }

        .ab-product-placeholder.visible {
            display: flex;
        }

        .ab-placeholder-mark {
            font-size: 48px;
            font-weight: 900;
            letter-spacing: -4px;
        }

        .ab-placeholder-category {
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .ab-product-placeholder small {
            color: #999;
            font-size: 10px;
            letter-spacing: 1px;
        }

        .ab-gallery-loading {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,.12);
            pointer-events: none;
        }

        .ab-gallery-count {
            position: absolute;
            right: 14px;
            bottom: 14px;
            z-index: 4;
            background: rgba(0,0,0,.75);
            color: #fff;
            padding: 7px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: .5px;
        }

        .ab-gallery-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 5;
            width: 42px;
            height: 42px;
            border: 0;
            border-radius: 50%;
            background: rgba(0,0,0,.78);
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ab-gallery-arrow:hover {
            background: #ffd400;
            color: #000;
        }

        .ab-gallery-arrow.prev {
            left: 14px;
        }

        .ab-gallery-arrow.next {
            right: 14px;
        }

        .ab-gallery-arrow.hidden {
            display: none;
        }

        .ab-gallery-thumbs {
            display: flex;
            gap: 9px;
            overflow-x: auto;
            padding: 10px 0 3px;
            scrollbar-width: thin;
        }

        .ab-gallery-thumb {
            flex: 0 0 68px;
            width: 68px;
            height: 68px;
            border: 2px solid transparent;
            background: #151515;
            padding: 0;
            cursor: pointer;
            overflow: hidden;
            border-radius: 7px;
        }

        .ab-gallery-thumb.active {
            border-color: #ffd400;
        }

        .ab-gallery-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .ab-product-info-grid {
            display: grid;
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 10px;
            margin: 18px 0;
        }

        .ab-product-info-item {
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.08);
            padding: 12px;
            border-radius: 8px;
        }

        .ab-product-info-item span {
            display: block;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .55;
            margin-bottom: 5px;
        }

        .ab-product-info-item strong {
            font-size: 13px;
        }

        .ab-stock {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            font-weight: 700;
        }

        .ab-stock-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #38c172;
        }

        .ab-stock-dot.low {
            background: #ff9d00;
        }

        .ab-stock-dot.out {
            background: #e74c3c;
        }

        .ab-modal-product-code {
            opacity: .5;
            font-size: 11px;
            letter-spacing: 1px;
        }

        .ab-card-clickable {
            cursor: pointer;
        }

        @media (max-width: 600px) {

            .ab-product-info-grid {
                grid-template-columns: 1fr;
            }

            .ab-gallery-arrow {
                width: 36px;
                height: 36px;
            }

        }
    `;

    document.head.appendChild(style);
}


/* =========================================================
   HASH ROUTING
   ========================================================= */

function initHashRouting() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();

    state.currentPage =
        hash || CONFIG.defaultPage;
}


function listenForHashChanges() {

    window.addEventListener(
        "hashchange",
        () => {

            const page =
                window.location.hash
                    .replace("#", "")
                    .trim()
                    .toLowerCase();

            navigateTo(
                page || CONFIG.defaultPage
            );
        }
    );
}


function navigateTo(page) {

    const allowedPages = [
        "home",
        "shop",
        "collections",
        "investment",
        "about",
        "contact"
    ];

    if (!allowedPages.includes(page)) {
        page = "home";
    }

    state.currentPage = page;

    document.body.dataset.page = page;

    $$(".page").forEach(section => {

        section.classList.toggle(
            "active",
            section.id === `page-${page}`
        );

    });

    $$(".nav-link").forEach(link => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${page}`
        );

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    closeMobileMenu();
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function bindNavigation() {

    $$("[data-nav]").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const page =
                    link.dataset.nav;

                if (!page) {
                    return;
                }

                event.preventDefault();

                window.location.hash =
                    page;
            }
        );
    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const toggle =
        $("#menu-toggle");

    const nav =
        $("#nav-links");

    const overlay =
        $("#mobile-overlay");

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener(
        "click",
        () => {

            const open =
                nav.classList.toggle("active");

            toggle.classList.toggle(
                "active",
                open
            );

            if (overlay) {
                overlay.classList.toggle(
                    "active",
                    open
                );
            }

            document.body.classList.toggle(
                "menu-open",
                open
            );
        }
    );

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMobileMenu
        );
    }

    $$("#nav-links a").forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );
    });
}


function closeMobileMenu() {

    const nav =
        $("#nav-links");

    const toggle =
        $("#menu-toggle");

    const overlay =
        $("#mobile-overlay");

    nav?.classList.remove("active");

    toggle?.classList.remove("active");

    overlay?.classList.remove("active");

    document.body.classList.remove(
        "menu-open"
    );
}


/* =========================================================
   AUTO HIDE HEADER
   ========================================================= */

function initAutoHideHeader() {

    const header =
        $(".site-header");

    if (!header) {
        return;
    }

    let lastScroll =
        window.scrollY;

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (ticking) {
                return;
            }

            window.requestAnimationFrame(
                () => {

                    const current =
                        window.scrollY;

                    if (
                        current > lastScroll &&
                        current > 100
                    ) {

                        header.classList.add(
                            "header-hidden"
                        );

                    } else {

                        header.classList.remove(
                            "header-hidden"
                        );
                    }

                    lastScroll =
                        Math.max(current, 0);

                    ticking = false;
                }
            );

            ticking = true;
        },
        { passive: true }
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function initSearch() {

    const searchInputs =
        $$("[data-search-input], #search-input, #shop-search");

    searchInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                state.currentSearch =
                    input.value
                        .trim()
                        .toLowerCase();

                renderShopProducts();
            }
        );
    });
}


/* =========================================================
   FILTERS
   ========================================================= */

function initFilters() {

    $$("[data-category]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.currentCategory =
                    button.dataset.category ||
                    "all";

                $$("[data-category]").forEach(
                    item => {
                        item.classList.toggle(
                            "active",
                            item === button
                        );
                    }
                );

                renderShopProducts();

                if (
                    state.currentPage !==
                    "shop"
                ) {
                    window.location.hash =
                        "shop";
                }
            }
        );
    });

    const sort =
        $("#sort-products");

    if (sort) {

        sort.addEventListener(
            "change",
            () => {

                state.currentSort =
                    sort.value;

                renderShopProducts();
            }
        );
    }
}


/* =========================================================
   FILTER PRODUCT LIST
   ========================================================= */

function getFilteredProducts() {

    let products =
        [...state.products];

    if (
        state.currentCategory &&
        state.currentCategory !== "all"
    ) {

        products =
            products.filter(product =>

                product.category ===
                state.currentCategory ||

                product.primaryCategory ===
                state.currentCategory
            );
    }

    if (state.currentSearch) {

        products =
            products.filter(product => {

                const haystack =
                    [
                        product.name,
                        product.categoryLabel,
                        product.description,
                        product.sku
                    ]
                    .join(" ")
                    .toLowerCase();

                return haystack.includes(
                    state.currentSearch
                );
            });
    }

    switch (state.currentSort) {

        case "price-low":
            products.sort(
                (a, b) =>
                    a.price - b.price
            );
            break;

        case "price-high":
            products.sort(
                (a, b) =>
                    b.price - a.price
            );
            break;

        case "name":
            products.sort(
                (a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
            );
            break;

        case "rating":
            products.sort(
                (a, b) =>
                    b.rating - a.rating
            );
            break;

        default:
            break;
    }

    return products;
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCard(product) {

    const stockClass =
        product.stock <= 5
            ? "low"
            : "";

    return `
        <article
            class="product-card ab-card-clickable"
            data-product-id="${escapeHTML(product.id)}"
            tabindex="0"
            role="button"
            aria-label="View ${escapeHTML(product.name)}"
        >

            <div class="product-image">

                ${productImageHTML(product)}

                ${
                    product.badge
                        ? `
                            <span class="product-badge">
                                ${escapeHTML(product.badge)}
                            </span>
                          `
                        : ""
                }

                <button
                    class="product-quick-view"
                    type="button"
                    data-view-product="${escapeHTML(product.id)}"
                >
                    Quick View
                </button>

            </div>

            <div class="product-card-body">

                <div class="product-category">
                    ${escapeHTML(product.categoryLabel)}
                </div>

                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>

                <div class="product-rating">
                    <span>★</span>
                    ${product.rating}
                    <small>
                        (${product.reviews})
                    </small>
                </div>

                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatCurrency(product.price)}
                    </strong>

                    <button
                        type="button"
                        class="add-to-cart"
                        data-add-product="${escapeHTML(product.id)}"
                    >
                        Add
                    </button>

                </div>

                <div class="ab-stock">
                    <span class="ab-stock-dot ${stockClass}"></span>
                    ${
                        product.stock <= 5
                            ? `Only ${product.stock} left`
                            : "In stock"
                    }
                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

function bindProductImageFallbacks(parent = document) {

    $$("[data-product-image]", parent)
        .forEach(image => {

            const placeholder =
                image
                    .closest(".ab-product-media")
                    ?.querySelector(
                        ".ab-product-placeholder"
                    );

            const showPlaceholder = () => {

                image.style.display =
                    "none";

                placeholder?.classList.add(
                    "visible"
                );
            };

            image.addEventListener(
                "error",
                showPlaceholder,
                { once: true }
            );

        });
}


/* =========================================================
   FEATURED PRODUCTS
   ========================================================= */

function renderFeaturedProducts() {

    const container =
        $("#featuredProducts");

    if (!container) {
        return;
    }

    const products =
        state.products.slice(0, 8);

    container.innerHTML =
        products.map(productCard).join("");

    bindProductImageFallbacks(container);
}


/* =========================================================
   SHOP PRODUCTS
   ========================================================= */

function renderShopProducts() {

    const container =
        $("#shopProducts");

    if (!container) {
        return;
    }

    const products =
        getFilteredProducts();

    if (!products.length) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        products.map(productCard).join("");

    bindProductImageFallbacks(container);

    bindProductActions();
}


/* =========================================================
   PRODUCT ACTIONS
   ========================================================= */

function initProductActions() {

    bindProductActions();
}


function bindProductActions() {

    $$("[data-add-product]")
        .forEach(button => {

            button.onclick = event => {

                event.stopPropagation();

                addToCart(
                    button.dataset.addProduct
                );
            };
        });

    $$("[data-view-product]")
        .forEach(button => {

            button.onclick = event => {

                event.stopPropagation();

                openProductModal(
                    button.dataset.viewProduct
                );
            };
        });

    $$(".product-card")
        .forEach(card => {

            card.onclick = event => {

                if (
                    event.target.closest(
                        "button"
                    )
                ) {
                    return;
                }

                openProductModal(
                    card.dataset.productId
                );
            };

            card.onkeydown = event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openProductModal(
                        card.dataset.productId
                    );
                }
            };
        });
}


/* =========================================================
   CREATE PRODUCT MODAL
   ========================================================= */

function createProductModal() {

    if ($("#productModal")) {
        return;
    }

    const modal =
        document.createElement("div");

    modal.id = "productModal";

    modal.className =
        "product-modal";

    modal.innerHTML = `

        <div
            class="product-modal-overlay"
            data-close-product-modal
        ></div>

        <div
            class="product-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Product details"
        >

            <button
                type="button"
                class="product-modal-close"
                data-close-product-modal
                aria-label="Close product"
            >
                ×
            </button>

            <div
                class="product-modal-content"
                id="productModalContent"
            ></div>

        </div>
    `;

    document.body.appendChild(modal);

    $$(
        "[data-close-product-modal]",
        modal
    ).forEach(button => {

        button.addEventListener(
            "click",
            closeProductModal
        );
    });
}


/* =========================================================
   OPEN PRODUCT MODAL
   ========================================================= */

async function openProductModal(productId) {

    const product =
        state.products.find(
            item =>
                item.id === productId
        );

    if (!product) {
        return;
    }

    state.activeProduct =
        product;

    state.galleryIndex = 0;

    const modal =
        $("#productModal");

    const content =
        $("#productModalContent");

    if (!modal || !content) {
        return;
    }

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

    content.innerHTML = `

        <div class="product-detail">

            <div class="product-detail-gallery">

                <div
                    class="product-detail-main-image"
                    id="productMainGallery"
                >
                    <div class="ab-gallery-loading">
                        Loading images...
                    </div>
                </div>

                <div
                    class="ab-gallery-thumbs"
                    id="productGalleryThumbs"
                ></div>

            </div>

            <div class="product-detail-info">

                <div class="ab-modal-product-code">
                    ${escapeHTML(product.sku)}
                </div>

                <div class="product-category">
                    ${escapeHTML(product.categoryLabel)}
                </div>

                <h2>
                    ${escapeHTML(product.name)}
                </h2>

                <div class="product-rating">
                    <span>★</span>
                    ${product.rating}
                    <small>
                        (${product.reviews} reviews)
                    </small>
                </div>

                <div class="product-detail-price">
                    ${formatCurrency(product.price)}
                </div>

                <p class="product-description">
                    ${escapeHTML(product.description)}
                </p>

                <div class="ab-stock">
                    <span
                        class="ab-stock-dot ${
                            product.stock <= 5
                                ? "low"
                                : ""
                        }"
                    ></span>

                    ${
                        product.stock <= 5
                            ? `Only ${product.stock} left`
                            : `${product.stock} available`
                    }
                </div>

                <div class="ab-product-info-grid">

                    <div class="ab-product-info-item">
                        <span>Material</span>
                        <strong>
                            ${escapeHTML(product.material)}
                        </strong>
                    </div>

                    <div class="ab-product-info-item">
                        <span>Fit</span>
                        <strong>
                            ${escapeHTML(product.fit)}
                        </strong>
                    </div>

                    <div class="ab-product-info-item">
                        <span>Category</span>
                        <strong>
                            ${escapeHTML(product.categoryLabel)}
                        </strong>
                    </div>

                    <div class="ab-product-info-item">
                        <span>Product Code</span>
                        <strong>
                            ${escapeHTML(product.sku)}
                        </strong>
                    </div>

                </div>

                <div class="product-option-group">

                    <label>
                        Size
                    </label>

                    <div
                        class="product-options"
                        id="productSizeOptions"
                    >
                        ${product.sizes
                            .map(
                                (size, index) =>
                                    `
                                    <button
                                        type="button"
                                        class="product-option ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }"
                                        data-size="${escapeHTML(size)}"
                                    >
                                        ${escapeHTML(size)}
                                    </button>
                                    `
                            )
                            .join("")}
                    </div>

                </div>

                <div class="product-option-group">

                    <label>
                        Colour
                    </label>

                    <div
                        class="product-options"
                        id="productColorOptions"
                    >
                        ${product.colors
                            .map(
                                (color, index) =>
                                    `
                                    <button
                                        type="button"
                                        class="product-option ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }"
                                        data-color="${escapeHTML(color)}"
                                    >
                                        ${escapeHTML(color)}
                                    </button>
                                    `
                            )
                            .join("")}
                    </div>

                </div>

                <div class="product-option-group">

                    <label>
                        Quantity
                    </label>

                    <div class="quantity-control">

                        <button
                            type="button"
                            data-detail-quantity-minus
                        >
                            −
                        </button>

                        <input
                            type="number"
                            id="detailQuantity"
                            value="1"
                            min="1"
                            max="${product.stock}"
                        >

                        <button
                            type="button"
                            data-detail-quantity-plus
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    type="button"
                    class="btn btn-primary product-add-detail"
                    data-detail-add
                >
                    Add to Bag
                </button>

                <div class="product-care-note">
                    <strong>Care:</strong>
                    ${escapeHTML(product.care)}
                </div>

            </div>

        </div>
    `;

    bindProductDetailControls(product);

    const images =
        await getAvailableGallery(product);

    if (
        state.activeProduct?.id !==
        product.id
    ) {
        return;
    }

    state.galleryImages =
        images;

    renderProductGallery();
}


/* =========================================================
   RENDER PRODUCT GALLERY
   ========================================================= */

function renderProductGallery() {

    const product =
        state.activeProduct;

    const main =
        $("#productMainGallery");

    const thumbs =
        $("#productGalleryThumbs");

    if (!product || !main || !thumbs) {
        return;
    }

    const images =
        state.galleryImages;

    if (!images.length) {

        main.innerHTML =
            productPlaceholder(product);

        const placeholder =
            $(".ab-product-placeholder", main);

        placeholder?.classList.add(
            "visible"
        );

        thumbs.innerHTML = "";

        return;
    }

    if (
        state.galleryIndex >=
        images.length
    ) {
        state.galleryIndex =
            0;
    }

    const current =
        images[state.galleryIndex];

    main.innerHTML = `

        <div class="ab-product-media">

            <img
                src="${escapeHTML(current)}"
                alt="${escapeHTML(
                    product.name
                )}"
            >

        </div>

        <button
            type="button"
            class="ab-gallery-arrow prev ${
                images.length <= 1
                    ? "hidden"
                    : ""
            }"
            data-gallery-prev
            aria-label="Previous image"
        >
            ‹
        </button>

        <button
            type="button"
            class="ab-gallery-arrow next ${
                images.length <= 1
                    ? "hidden"
                    : ""
            }"
            data-gallery-next
            aria-label="Next image"
        >
            ›
        </button>

        <div class="ab-gallery-count">
            ${state.galleryIndex + 1}
            /
            ${images.length}
        </div>
    `;

    thumbs.innerHTML =
        images.map(
            (src, index) =>
                `
                <button
                    type="button"
                    class="ab-gallery-thumb ${
                        index === state.galleryIndex
                            ? "active"
                            : ""
                    }"
                    data-gallery-index="${index}"
                    aria-label="View image ${index + 1}"
                >
                    <img
                        src="${escapeHTML(src)}"
                        alt="${escapeHTML(
                            product.name
                        )} image ${index + 1}"
                    >
                </button>
                `
        ).join("");

    $("[data-gallery-prev]", main)
        ?.addEventListener(
            "click",
            () => {

                state.galleryIndex =
                    (
                        state.galleryIndex -
                        1 +
                        images.length
                    ) %
                    images.length;

                renderProductGallery();
            }
        );

    $("[data-gallery-next]", main)
        ?.addEventListener(
            "click",
            () => {

                state.galleryIndex =
                    (
                        state.galleryIndex +
                        1
                    ) %
                    images.length;

                renderProductGallery();
            }
        );

    $$("[data-gallery-index]", thumbs)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    state.galleryIndex =
                        Number(
                            button.dataset
                                .galleryIndex
                        );

                    renderProductGallery();
                }
            );
        });
}


/* =========================================================
   PRODUCT DETAIL CONTROLS
   ========================================================= */

function bindProductDetailControls(product) {

    const sizeButtons =
        $$(
            "[data-size]",
            $("#productModalContent")
        );

    const colorButtons =
        $$(
            "[data-color]",
            $("#productModalContent")
        );

    sizeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                sizeButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );
            }
        );
    });

    colorButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                colorButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );
            }
        );
    });

    const quantity =
        $("#detailQuantity");

    $(
        "[data-detail-quantity-minus]"
    )?.addEventListener(
        "click",
        () => {

            const current =
                Number(quantity.value) || 1;

            quantity.value =
                Math.max(
                    1,
                    current - 1
                );
        }
    );

    $(
        "[data-detail-quantity-plus]"
    )?.addEventListener(
        "click",
        () => {

            const current =
                Number(quantity.value) || 1;

            quantity.value =
                Math.min(
                    product.stock,
                    current + 1
                );
        }
    );

    quantity?.addEventListener(
        "change",
        () => {

            let value =
                Number(quantity.value) || 1;

            value =
                Math.max(
                    1,
                    Math.min(
                        product.stock,
                        value
                    )
                );

            quantity.value =
                value;
        }
    );

    $("[data-detail-add]")
        ?.addEventListener(
            "click",
            () => {

                const selectedSize =
                    $(
                        "[data-size].active",
                        $("#productModalContent")
                    )?.dataset.size ||
                    product.sizes[0];

                const selectedColor =
                    $(
                        "[data-color].active",
                        $("#productModalContent")
                    )?.dataset.color ||
                    product.colors[0];

                const qty =
                    Number(
                        quantity?.value
                    ) || 1;

                addToCart(
                    product.id,
                    qty,
                    selectedSize,
                    selectedColor
                );

                closeProductModal();
            }
        );
}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProductModal() {

    const modal =
        $("#productModal");

    modal?.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

    state.activeProduct =
        null;

    state.galleryImages =
        [];

    state.galleryIndex =
        0;
}


/* =========================================================
   CART
   ========================================================= */

function addToCart(
    productId,
    quantity = 1,
    size = null,
    color = null
) {

    const product =
        state.products.find(
            item =>
                item.id === productId
        );

    if (!product) {
        return;
    }

    quantity =
        Math.max(
            1,
            Number(quantity) || 1
        );

    size =
        size ||
        product.sizes[0];

    color =
        color ||
        product.colors[0];

    const key =
        `${productId}-${size}-${color}`;

    const existing =
        state.cart.find(
            item =>
                item.key === key
        );

    if (existing) {

        existing.quantity =
            Math.min(
                product.stock,
                existing.quantity +
                quantity
            );

    } else {

        state.cart.push({
            key,
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity
        });
    }

    saveCart();

    renderCart();

    showToast(
        `${product.name} added to your bag.`
    );

    openCartDrawer();
}


/* =========================================================
   REMOVE CART ITEM
   ========================================================= */

function removeCartItem(key) {

    state.cart =
        state.cart.filter(
            item =>
                item.key !== key
        );

    saveCart();

    renderCart();
}


/* =========================================================
   UPDATE CART QUANTITY
   ========================================================= */

function updateCartQuantity(
    key,
    quantity
) {

    const item =
        state.cart.find(
            cartItem =>
                cartItem.key === key
        );

    if (!item) {
        return;
    }

    const product =
        state.products.find(
            productItem =>
                productItem.id ===
                item.productId
        );

    const max =
        product?.stock || 99;

    quantity =
        Math.max(
            1,
            Math.min(
                max,
                Number(quantity) || 1
            )
        );

    item.quantity =
        quantity;

    saveCart();

    renderCart();
}


/* =========================================================
   CART TOTAL
   ========================================================= */

function getCartTotal() {

    return state.cart.reduce(
        (total, item) =>
            total +
            item.price *
            item.quantity,
        0
    );
}


/* =========================================================
   CART COUNT
   ========================================================= */

function getCartCount() {

    return state.cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );
}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const containers =
        [
            "#cartItems",
            "[data-cart-items]"
        ];

    let container = null;

    for (const selector of containers) {

        container =
            $(selector);

        if (container) {
            break;
        }
    }

    if (container) {

        if (!state.cart.length) {

            container.innerHTML = `
                <div class="cart-empty">
                    <h3>Your bag is empty</h3>
                    <p>
                        Add something you love from Area Boyz.
                    </p>
                </div>
            `;

        } else {

            container.innerHTML =
                state.cart
                    .map(cartItemHTML)
                    .join("");
        }
    }

    updateCartTotals();

    bindCartItemActions();
}


/* =========================================================
   CART ITEM HTML
   ========================================================= */

function cartItemHTML(item) {

    return `
        <div
            class="cart-item"
            data-cart-key="${escapeHTML(item.key)}"
        >

            <div class="cart-item-image">

                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                >

            </div>

            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ${escapeHTML(item.color)}
                    ·
                    ${escapeHTML(item.size)}
                </p>

                <strong>
                    ${formatCurrency(item.price)}
                </strong>

                <div class="cart-item-controls">

                    <button
                        type="button"
                        data-cart-minus
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-cart-plus
                    >
                        +
                    </button>

                    <button
                        type="button"
                        data-cart-remove
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   CART ACTIONS
   ========================================================= */

function bindCartItemActions() {

    $$("[data-cart-key]")
        .forEach(itemElement => {

            const key =
                itemElement.dataset.cartKey;

            const item =
                state.cart.find(
                    cartItem =>
                        cartItem.key === key
                );

            if (!item) {
                return;
            }

            $(
                "[data-cart-minus]",
                itemElement
            )?.addEventListener(
                "click",
                () => {

                    updateCartQuantity(
                        key,
                        item.quantity - 1
                    );
                }
            );

            $(
                "[data-cart-plus]",
                itemElement
            )?.addEventListener(
                "click",
                () => {

                    updateCartQuantity(
                        key,
                        item.quantity + 1
                    );
                }
            );

            $(
                "[data-cart-remove]",
                itemElement
            )?.addEventListener(
                "click",
                () => {

                    removeCartItem(key);
                }
            );
        });
}


/* =========================================================
   CART TOTALS
   ========================================================= */

function updateCartTotals() {

    const total =
        getCartTotal();

    const count =
        getCartCount();

    $$(
        "[data-cart-total], #cartTotal"
    ).forEach(element => {

        element.textContent =
            formatCurrency(total);
    });

    $$(
        "[data-cart-count], #cartCount"
    ).forEach(element => {

        element.textContent =
            count;

        element.classList.toggle(
            "has-items",
            count > 0
        );
    });

    $$(
        "[data-cart-subtotal], #cartSubtotal"
    ).forEach(element => {

        element.textContent =
            formatCurrency(total);
    });
}


/* =========================================================
   CART DRAWER
   ========================================================= */

function initCartDrawer() {

    $$(
        "[data-open-cart], #cart-button, #cart-toggle"
    ).forEach(button => {

        button.addEventListener(
            "click",
            openCartDrawer
        );
    });

    $$(
        "[data-close-cart], #cartClose"
    ).forEach(button => {

        button.addEventListener(
            "click",
            closeCartDrawer
        );
    });
}


function openCartDrawer() {

    const drawer =
        $("#cartDrawer");

    if (!drawer) {
        return;
    }

    drawer.classList.add(
        "active"
    );

    document.body.classList.add(
        "cart-open"
    );

    renderCart();
}


function closeCartDrawer() {

    const drawer =
        $("#cartDrawer");

    drawer?.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "cart-open"
    );
}


function initCartActions() {

    $$(
        "[data-close-cart-overlay]"
    ).forEach(element => {

        element.addEventListener(
            "click",
            closeCartDrawer
        );
    });
}


/* =========================================================
   EQUITY CALCULATOR
   ========================================================= */

function initEquityCalculator() {

    const input =
        $(
            "#investmentAmount, #equityAmount, [data-investment-input]"
        );

    const output =
        $(
            "#equityShares, #shareOutput, [data-equity-shares]"
        );

    if (!input || !output) {
        return;
    }

    const update =
        () => {

            const amount =
                Number(input.value) || 0;

            const shares =
                CONFIG.totalEquity > 0
                    ? (
                        amount /
                        CONFIG.totalEquity
                    ) * 100
                    : 0;

            output.textContent =
                `${shares.toFixed(2)}%`;
        };

    input.addEventListener(
        "input",
        update
    );

    update();
}


/* =========================================================
   ANNOUNCEMENT BAR
   ========================================================= */

function initAnnouncement() {

    $$(
        "[data-close-announcement], #announcementClose"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const announcement =
                    button.closest(
                        ".announcement"
                    ) ||
                    $(".announcement");

                announcement?.remove();
            }
        );
    });
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        $("#abToast");

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "abToast";

        toast.style.cssText = `
            position:fixed;
            left:50%;
            bottom:24px;
            transform:translate(-50%,20px);
            z-index:100000;
            background:#ffd400;
            color:#000;
            padding:13px 18px;
            border-radius:999px;
            font-size:13px;
            font-weight:800;
            box-shadow:0 15px 40px rgba(0,0,0,.3);
            opacity:0;
            pointer-events:none;
            transition:.25s ease;
        `;

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        message;

    toast.style.opacity =
        "1";

    toast.style.transform =
        "translate(-50%,0)";

    clearTimeout(
        toast._timer
    );

    toast._timer =
        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translate(-50%,20px)";

            },
            2600
        );
}


/* =========================================================
   KEYBOARD
   ========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeProductModal();

                closeCartDrawer();

                closeMobileMenu();
            }

            if (
                event.key === "/" &&
                !["INPUT", "TEXTAREA"].includes(
                    document.activeElement?.tagName
                )
            ) {

                event.preventDefault();

                const search =
                    $(
                        "#search-input, #shop-search, [data-search-input]"
                    );

                search?.focus();
            }

            if (
                state.activeProduct &&
                state.galleryImages.length > 1
            ) {

                if (event.key === "ArrowLeft") {

                    state.galleryIndex =
                        (
                            state.galleryIndex -
                            1 +
                            state.galleryImages.length
                        ) %
                        state.galleryImages.length;

                    renderProductGallery();
                }

                if (event.key === "ArrowRight") {

                    state.galleryIndex =
                        (
                            state.galleryIndex +
                            1
                        ) %
                        state.galleryImages.length;

                    renderProductGallery();
                }
            }
        }
    );
}


/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

function initHeroSlideshow() {

    const slides =
        $$(".hero-slide");

    const dots =
        $$(".hero-dot");

    if (!slides.length) {

        console.log(
            "Hero slideshow: no slides found."
        );

        return;
    }

    let currentSlide =
        0;

    let slideshowTimer;

    function showSlide(index) {

        slides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );
            }
        );

        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );
            }
        );

        currentSlide =
            index;
    }

    function nextSlide() {

        const next =
            (
                currentSlide + 1
            ) %
            slides.length;

        showSlide(next);
    }

    function startSlideshow() {

        clearInterval(
            slideshowTimer
        );

        slideshowTimer =
            setInterval(
                nextSlide,
                5000
            );
    }

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    startSlideshow();
                }
            );
        }
    );

    showSlide(0);

    startSlideshow();
}


/* =========================================================
   PRELOADER
   ========================================================= */

function initPreloader() {

    const preloader =
        $("#preloader");

    if (!preloader) {
        return;
    }

    const hide =
        () => {

            preloader.classList.add(
                "loaded"
            );

            setTimeout(
                () => {

                    preloader.style.display =
                        "none";

                },
                500
            );
        };

    setTimeout(
        hide,
        CONFIG.preloaderDuration
    );

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                hide,
                250
            );
        },
        { once: true }
    );
}


/* =========================================================
   YEAR
   ========================================================= */

function updateYear() {

    const year =
        new Date().getFullYear();

    $$(
        "[data-year], #currentYear"
    ).forEach(element => {

        element.textContent =
            year;
    });
}


/* =========================================================
   PRODUCT MODAL CSS FALLBACK
   ========================================================= */

function injectModalStyles() {

    if ($("#ab-modal-styles")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "ab-modal-styles";

    style.textContent = `

        .product-modal {
            position: fixed;
            inset: 0;
            z-index: 99990;
            display: none;
        }

        .product-modal.active {
            display: block;
        }

        .product-modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.78);
            backdrop-filter: blur(8px);
        }

        .product-modal-dialog {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: min(1100px,94vw);
            max-height: 92vh;
            overflow-y: auto;
            background: #101010;
            color: #fff;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 16px;
            box-shadow: 0 30px 100px rgba(0,0,0,.5);
        }

        .product-modal-close {
            position: absolute;
            right: 15px;
            top: 15px;
            z-index: 20;
            width: 40px;
            height: 40px;
            border: 0;
            border-radius: 50%;
            background: rgba(0,0,0,.8);
            color: #fff;
            font-size: 28px;
            line-height: 1;
            cursor: pointer;
        }

        .product-modal-close:hover {
            background: #ffd400;
            color: #000;
        }

        .product-modal-content {
            padding: 34px;
        }

        .product-detail {
            display: grid;
            grid-template-columns: minmax(0,1.05fr) minmax(0,.95fr);
            gap: 38px;
        }

        .product-detail-gallery {
            min-width: 0;
        }

        .product-detail-main-image {
            position: relative;
            aspect-ratio: 1/1;
            overflow: hidden;
            border-radius: 12px;
            background: #161616;
        }

        .product-detail-main-image .ab-product-media {
            min-height: 100%;
        }

        .product-detail-info {
            padding: 15px 8px 20px 0;
        }

        .product-detail-info h2 {
            margin: 8px 0 12px;
            font-size: clamp(28px,4vw,46px);
            line-height: 1;
        }

        .product-detail-price {
            margin: 15px 0;
            font-size: 28px;
            font-weight: 900;
            color: #ffd400;
        }

        .product-description {
            color: rgba(255,255,255,.7);
            line-height: 1.7;
        }

        .product-option-group {
            margin-top: 20px;
        }

        .product-option-group > label {
            display: block;
            margin-bottom: 9px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            opacity: .7;
        }

        .product-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .product-option {
            min-width: 48px;
            padding: 10px 14px;
            border: 1px solid rgba(255,255,255,.15);
            background: #181818;
            color: #fff;
            border-radius: 7px;
            cursor: pointer;
        }

        .product-option.active,
        .product-option:hover {
            border-color: #ffd400;
            background: #ffd400;
            color: #000;
        }

        .quantity-control {
            display: inline-flex;
            align-items: center;
            border: 1px solid rgba(255,255,255,.15);
            border-radius: 8px;
            overflow: hidden;
        }

        .quantity-control button {
            width: 42px;
            height: 42px;
            border: 0;
            background: #181818;
            color: #fff;
            cursor: pointer;
            font-size: 20px;
        }

        .quantity-control input {
            width: 55px;
            height: 42px;
            border: 0;
            outline: 0;
            text-align: center;
            background: #101010;
            color: #fff;
        }

        .product-add-detail {
            width: 100%;
            margin-top: 25px;
        }

        .product-care-note {
            margin-top: 17px;
            color: rgba(255,255,255,.55);
            font-size: 12px;
            line-height: 1.6;
        }

        @media (max-width: 800px) {

            .product-modal-content {
                padding: 22px;
            }

            .product-detail {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .product-detail-info {
                padding-right: 0;
            }

            .product-detail-info h2 {
                font-size: 30px;
            }

        }

        @media (max-width: 480px) {

            .product-modal-dialog {
                width: 96vw;
                max-height: 94vh;
                border-radius: 12px;
            }

            .product-modal-content {
                padding: 15px;
            }

        }
    `;

    document.head.appendChild(style);
}


/* =========================================================
   SWIPE GALLERY
   ========================================================= */

function initGallerySwipe() {

    let startX = 0;
    let startY = 0;

    document.addEventListener(
        "touchstart",
        event => {

            if (
                !state.activeProduct ||
                !state.galleryImages.length
            ) {
                return;
            }

            const touch =
                event.touches[0];

            startX =
                touch.clientX;

            startY =
                touch.clientY;
        },
        { passive: true }
    );

    document.addEventListener(
        "touchend",
        event => {

            if (
                !state.activeProduct ||
                state.galleryImages.length < 2
            ) {
                return;
            }

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX - startX;

            const deltaY =
                touch.clientY - startY;

            if (
                Math.abs(deltaX) <
                50
            ) {
                return;
            }

            if (
                Math.abs(deltaX) <
                Math.abs(deltaY)
            ) {
                return;
            }

            if (deltaX < 0) {

                state.galleryIndex =
                    (
                        state.galleryIndex + 1
                    ) %
                    state.galleryImages.length;

            } else {

                state.galleryIndex =
                    (
                        state.galleryIndex - 1 +
                        state.galleryImages.length
                    ) %
                    state.galleryImages.length;
            }

            renderProductGallery();
        },
        { passive: true }
    );
}


/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function initApp() {

    console.log(
        "AREA BOYZ ENTERPRISE — APP 5.0 INITIALIZING"
    );

    state.products =
        createProducts();

    injectFunctionalStyles();

    injectModalStyles();

    createProductModal();

    initHashRouting();

    bindNavigation();

    listenForHashChanges();

    initAutoHideHeader();

    initMobileMenu();

    initSearch();

    initFilters();

    initProductActions();

    initCartActions();

    initCartDrawer();

    renderCart();

    renderFeaturedProducts();

    renderShopProducts();

    initEquityCalculator();

    initAnnouncement();

    initKeyboard();

    initGallerySwipe();

    updateYear();

    initPreloader();

    navigateTo(
        state.currentPage
    );

    console.log(
        `Loaded ${state.products.length} Area Boyz products.`
    );
}


/* =========================================================
   START APPLICATION
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            initHeroSlideshow();

            initApp();
        }
    );

} else {

    initHeroSlideshow();

    initApp();
                            }
