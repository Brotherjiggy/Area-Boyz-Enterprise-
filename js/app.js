"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   PREMIUM FRONTEND ENGINE
   VERSION 4.0
   HTML-MATCHED EDITION

   FEATURES
   - SPA navigation
   - Desktop navigation
   - Mobile navigation
   - Search panel
   - Product search
   - Product filtering
   - Product sorting
   - 120-product catalogue
   - Product quick view
   - Multi-image product gallery
   - Size / colour selection
   - Quantity controls
   - Shopping cart
   - Cart drawer
   - LocalStorage cart
   - Equity calculator
   - Announcement close
   - Auto-hiding navbar
   - Keyboard shortcuts
   - Preloader failsafe
========================================================= */


/* =========================================================
   CONFIG
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
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {
    currentPage: "home",
    currentCategory: "all",
    currentSearch: "",
    currentSort: "featured",
    cart: loadCart(),
    products: []
};


/* =========================================================
   PRODUCT DATA
========================================================= */

const productNames = [

    /* 001 - 010 */
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

    /* 011 - 020 */
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

    /* 021 - 030 */
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

    /* 031 - 040 */
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

    /* 041 - 050 */
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

    /* 051 - 060 */
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

    /* 061 - 070 */
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

    /* 071 - 080 */
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

    /* 081 - 090 */
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

    /* 091 - 100 */
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

    /* 101 - 110 */
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

    /* 111 - 120 */
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
   CATEGORY DISPLAY NAMES
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
   CATEGORY GROUPING
   Your HTML has four main filters.
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
        [
            "bags",
            "headwear",
            "jewelry"
        ].includes(category)
    ) {
        return "accessories";
    }

    if (category === "handmade") {
        return "handmade";
    }

    return category;
}


/* =========================================================
   CREATE PRODUCTS
========================================================= */

function createProducts() {

    return productNames.map((item, index) => {

        const number = String(index + 1).padStart(3, "0");

        const [name, category, price] = item;

        const handmade =
            category === "sets" ||
            category === "jewelry" ||
            category === "bags";

        return {

            id: `AB-${number}`,

            name,

            category,

            categoryLabel:
                categoryNames[category] || category,

            primaryCategory:
                primaryCategory(category),

            price,

            image:
                `images/products/product-${number}.jpg`,

            gallery: [

                `images/products/product-${number}.jpg`,

                `images/products/product-${number}-2.jpg`,

                `images/products/product-${number}-3.jpg`,

                `images/products/product-${number}-4.jpg`

            ],

            rating:
                Number((4.5 + ((index % 5) * 0.1)).toFixed(1)),

            reviews:
                18 + ((index * 13) % 180),

            badge:
                index < 6
                    ? "NEW"
                    : index % 11 === 0
                        ? "LIMITED"
                        : index % 7 === 0
                            ? "BESTSELLER"
                            : "",

            description:
                `${name} by Area Boyz Enterprise. Designed around movement, individuality and intentional everyday style.`,

            colors:
                handmade
                    ? ["Black", "Gold", "Cream"]
                    : ["Black", "White", "Yellow"],

            sizes:
                category === "jewelry" ||
                category === "accessories"
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

        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.warn(
            "Could not load cart.",
            error
        );

        return [];

    }

}


function saveCart() {

    localStorage.setItem(
        CONFIG.storageKey,
        JSON.stringify(state.cart)
    );

}


/* =========================================================
   CURRENCY
========================================================= */

function money(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: CONFIG.currency
        }
    ).format(value);

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigateTo(page) {

    const validPages = [
        "home",
        "shop",
        "collections",
        "investment",
        "about",
        "contact"
    ];

    if (!validPages.includes(page)) {
        page = "home";
    }

    state.currentPage = page;

    $$("[data-page-section]").forEach(section => {

        const isActive =
            section.dataset.pageSection === page;

        section.classList.toggle(
            "active-page",
            isActive
        );

        section.classList.toggle(
            "active",
            isActive
        );

    });


    $$("[data-page]").forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    closeMobileMenu();

    closeSearchPanel();

    if (window.location.hash !== `#${page}`) {

        history.replaceState(
            null,
            "",
            `#${page}`
        );

    }


    if (page === "shop") {
        renderShopProducts();
    }

}


/* =========================================================
   NAVIGATION CLICK HANDLERS
========================================================= */

function bindNavigation() {

    $$("[data-page]").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const page =
                    link.dataset.page;

                if (!page) return;

                event.preventDefault();

                navigateTo(page);

            }
        );

    });

}


/* =========================================================
   HEADER AUTO HIDE
========================================================= */

function initAutoHideHeader() {

    const header =
        $("#siteHeader");

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const current =
                window.scrollY;

            if (current > 120) {

                if (current > lastScroll) {

                    header.classList.add(
                        "header-hidden"
                    );

                } else {

                    header.classList.remove(
                        "header-hidden"
                    );

                }

            } else {

                header.classList.remove(
                    "header-hidden"
                );

            }

            lastScroll = current;

        },
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function openMobileMenu() {

    const menu =
        $("#mobileMenu");

    const overlay =
        $("#menuOverlay");

    const toggle =
        $("#menuToggle");

    if (menu) {

        menu.classList.add("open");

        menu.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    if (overlay) {

        overlay.classList.add("active");

    }

    if (toggle) {

        toggle.classList.add("active");

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    document.body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    const menu =
        $("#mobileMenu");

    const overlay =
        $("#menuOverlay");

    const toggle =
        $("#menuToggle");

    if (menu) {

        menu.classList.remove("open");

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    if (overlay) {

        overlay.classList.remove("active");

    }

    if (toggle) {

        toggle.classList.remove("active");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    document.body.classList.remove(
        "menu-open"
    );

}


function initMobileMenu() {

    const toggle =
        $("#menuToggle");

    const close =
        $("#mobileMenuClose");

    const overlay =
        $("#menuOverlay");

    if (toggle) {

        toggle.addEventListener(
            "click",
            () => {

                const menu =
                    $("#mobileMenu");

                const open =
                    menu &&
                    menu.classList.contains(
                        "open"
                    );

                if (open) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }

    if (close) {

        close.addEventListener(
            "click",
            closeMobileMenu
        );

    }

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMobileMenu
        );

    }

}


/* =========================================================
   SEARCH PANEL
========================================================= */

function openSearchPanel() {

    const panel =
        $("#searchPanel");

    const input =
        $("#productSearch");

    if (!panel) return;

    panel.classList.add("active");

    panel.classList.add("open");

    if (input) {

        setTimeout(
            () => input.focus(),
            100
        );

    }

}


function closeSearchPanel() {

    const panel =
        $("#searchPanel");

    if (!panel) return;

    panel.classList.remove("active");

    panel.classList.remove("open");

}


function initSearch() {

    const toggle =
        $("#searchToggle");

    const close =
        $("#closeSearch");

    const input =
        $("#productSearch");

    if (toggle) {

        toggle.addEventListener(
            "click",
            () => {

                const panel =
                    $("#searchPanel");

                const open =
                    panel &&
                    (
                        panel.classList.contains(
                            "active"
                        ) ||
                        panel.classList.contains(
                            "open"
                        )
                    );

                if (open) {

                    closeSearchPanel();

                } else {

                    openSearchPanel();

                }

            }
        );

    }

    if (close) {

        close.addEventListener(
            "click",
            closeSearchPanel
        );

    }

    if (input) {

        input.addEventListener(
            "input",
            () => {

                state.currentSearch =
                    input.value.trim().toLowerCase();

                if (
                    state.currentSearch
                ) {

                    navigateTo("shop");

                }

                renderShopProducts();

            }
        );

    }

}


/* =========================================================
   PRODUCT FILTERING
========================================================= */

function getFilteredProducts() {

    let products =
        [...state.products];


    /* CATEGORY */

    if (
        state.currentCategory !== "all"
    ) {

        products =
            products.filter(
                product =>
                    product.primaryCategory ===
                    state.currentCategory
            );

    }


    /* SEARCH */

    if (state.currentSearch) {

        products =
            products.filter(
                product => {

                    const searchable = [

                        product.name,

                        product.category,

                        product.categoryLabel,

                        product.description

                    ]
                        .join(" ")
                        .toLowerCase();

                    return searchable.includes(
                        state.currentSearch
                    );

                }
            );

    }


    /* SORT */

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


        default:

            products.sort(
                (a, b) =>
                    a.id.localeCompare(
                        b.id
                    )
            );

    }


    return products;

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <div class="product-image-wrap">

                ${
                    product.badge
                        ? `
                            <span class="product-badge">
                                ${product.badge}
                            </span>
                        `
                        : ""
                }

                <button
                    class="quick-view"
                    type="button"
                    data-product-action="quick-view"
                    data-product-id="${product.id}"
                    aria-label="Quick view ${product.name}"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='images/hero/hero-main.jpg';"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryLabel}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-rating">

                    <span>
                        ${"★".repeat(Math.round(product.rating))}
                    </span>

                    <small>
                        ${product.rating}
                        (${product.reviews})
                    </small>

                </div>

                <div class="product-bottom">

                    <strong>
                        ${money(product.price)}
                    </strong>

                    <button
                        class="add-to-cart"
                        type="button"
                        data-product-action="add"
                        data-product-id="${product.id}"
                    >
                        Add to bag
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   FEATURED PRODUCTS
========================================================= */

function renderFeaturedProducts() {

    const container =
        $("#featuredProducts");

    if (!container) return;

    const featured =
        state.products.slice(0, 8);

    container.innerHTML =
        featured.map(productCard).join("");

}


/* =========================================================
   SHOP PRODUCTS
========================================================= */

function renderShopProducts() {

    const container =
        $("#shopProducts");

    if (!container) return;

    const products =
        getFilteredProducts();

    if (!products.length) {

        container.innerHTML = `

            <div class="empty-products">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>
                    No products found.
                </h3>

                <p>
                    Try another search or category.
                </p>

                <button
                    class="btn btn-primary"
                    type="button"
                    id="clearFilters"
                >
                    Clear filters
                </button>

            </div>

        `;

        const clear =
            $("#clearFilters");

        if (clear) {

            clear.addEventListener(
                "click",
                clearFilters
            );

        }

        return;

    }

    container.innerHTML =
        products.map(productCard).join("");

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

function initFilters() {

    $$(".filter-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove(
                            "active"
                        )
                    );

                button.classList.add(
                    "active"
                );

                state.currentCategory =
                    button.dataset.filter ||
                    "all";

                renderShopProducts();

            }
        );

    });


    const sort =
        $("#sortProducts");

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


    $$(".category-card").forEach(card => {

        card.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const category =
                    card.dataset.category ||
                    "all";

                navigateTo("shop");

                state.currentCategory =
                    category === "handmade"
                        ? "handmade"
                        : category;

                $$(".filter-btn")
                    .forEach(btn => {

                        btn.classList.toggle(
                            "active",
                            btn.dataset.filter ===
                            state.currentCategory
                        );

                    });

                if (
                    ![
                        "all",
                        "streetwear",
                        "handmade",
                        "footwear",
                        "accessories"
                    ].includes(
                        state.currentCategory
                    )
                ) {

                    state.currentCategory =
                        "streetwear";

                    $$(".filter-btn")
                        .forEach(btn => {

                            btn.classList.toggle(
                                "active",
                                btn.dataset.filter ===
                                "streetwear"
                            );

                        });

                }

                renderShopProducts();

            }
        );

    });

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearFilters() {

    state.currentCategory = "all";

    state.currentSearch = "";

    state.currentSort = "featured";


    const search =
        $("#productSearch");

    if (search) {
        search.value = "";
    }


    const sort =
        $("#sortProducts");

    if (sort) {
        sort.value = "featured";
    }


    $$(".filter-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter ===
                "all"
            );

        });


    renderShopProducts();

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function createProductModal() {

    if ($("#productModal")) return;

    const modal =
        document.createElement("div");

    modal.id =
        "productModal";

    modal.className =
        "product-modal";

    modal.innerHTML = `

        <div
            class="product-modal-backdrop"
            data-modal-close
        ></div>

        <div
            class="product-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Product details"
        >

            <button
                class="product-modal-close"
                type="button"
                data-modal-close
                aria-label="Close product"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div
                class="product-modal-content"
                id="productModalContent"
            ></div>

        </div>

    `;

    document.body.appendChild(modal);


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    "[data-modal-close]"
                )
            ) {

                closeProductModal();

            }

        }
    );

}


function openProductModal(productId) {

    const product =
        state.products.find(
            item =>
                item.id === productId
        );

    if (!product) return;

    createProductModal();

    const modal =
        $("#productModal");

    const content =
        $("#productModalContent");

    if (!modal || !content) return;


    content.innerHTML = `

        <div class="product-detail">

            <div class="product-gallery">

                <div class="product-main-image">

                    <img
                        id="productMainImage"
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="this.onerror=null;this.src='images/hero/hero-main.jpg';"
                    >

                    <button
                        type="button"
                        class="gallery-arrow gallery-prev"
                        data-gallery-prev
                        aria-label="Previous image"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <button
                        type="button"
                        class="gallery-arrow gallery-next"
                        data-gallery-next
                        aria-label="Next image"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>

                </div>

                <div
                    class="product-thumbnails"
                    id="productThumbnails"
                >

                    ${product.gallery.map(
                        (image, index) => `

                            <button
                                type="button"
                                class="gallery-thumb ${index === 0 ? "active" : ""}"
                                data-gallery-index="${index}"
                            >

                                <img
                                    src="${image}"
                                    alt="${product.name} view ${index + 1}"
                                    onerror="this.closest('.gallery-thumb').style.display='none';"
                                >

                            </button>

                        `
                    ).join("")}

                </div>

            </div>


            <div class="product-detail-info">

                <span class="product-category">
                    ${product.categoryLabel}
                </span>

                <h2>
                    ${product.name}
                </h2>

                <div class="product-rating">

                    <span>
                        ${"★".repeat(Math.round(product.rating))}
                    </span>

                    <small>
                        ${product.rating}
                        (${product.reviews} reviews)
                    </small>

                </div>

                <strong class="product-detail-price">
                    ${money(product.price)}
                </strong>

                <p>
                    ${product.description}
                </p>


                <div class="product-option">

                    <label>
                        Size
                    </label>

                    <div class="option-buttons">

                        ${product.sizes.map(
                            (size, index) => `

                                <button
                                    type="button"
                                    class="option-btn ${index === 0 ? "active" : ""}"
                                    data-size="${size}"
                                >
                                    ${size}
                                </button>

                            `
                        ).join("")}

                    </div>

                </div>


                <div class="product-option">

                    <label>
                        Colour
                    </label>

                    <div class="option-buttons">

                        ${product.colors.map(
                            (color, index) => `

                                <button
                                    type="button"
                                    class="option-btn ${index === 0 ? "active" : ""}"
                                    data-color="${color}"
                                >
                                    ${color}
                                </button>

                            `
                        ).join("")}

                    </div>

                </div>


                <div class="product-purchase">

                    <div class="quantity-control">

                        <button
                            type="button"
                            data-quantity-minus
                        >
                            −
                        </button>

                        <span id="productQuantity">
                            1
                        </span>

                        <button
                            type="button"
                            data-quantity-plus
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="btn btn-primary product-add-button"
                        data-modal-add="${product.id}"
                    >
                        Add to bag
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>

                </div>


                <small class="product-stock">
                    ${product.stock} available
                </small>

            </div>

        </div>

    `;


    modal.classList.add("open");

    document.body.classList.add(
        "modal-open"
    );


    initProductModalControls(product);

}


function closeProductModal() {

    const modal =
        $("#productModal");

    if (!modal) return;

    modal.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   PRODUCT MODAL CONTROLS
========================================================= */

function initProductModalControls(product) {

    let galleryIndex = 0;

    let quantity = 1;


    const mainImage =
        $("#productMainImage");

    const thumbnails =
        $$(".gallery-thumb");

    const quantityDisplay =
        $("#productQuantity");


    function showGallery(index) {

        galleryIndex =
            (index + product.gallery.length) %
            product.gallery.length;

        if (mainImage) {

            mainImage.src =
                product.gallery[galleryIndex];

        }

        thumbnails.forEach(
            (thumb, i) => {

                thumb.classList.toggle(
                    "active",
                    i === galleryIndex
                );

            }
        );

    }


    thumbnails.forEach(
        thumb => {

            thumb.addEventListener(
                "click",
                () => {

                    showGallery(
                        Number(
                            thumb.dataset.galleryIndex
                        )
                    );

                }
            );

        }
    );


    const previous =
        $("[data-gallery-prev]");

    const next =
        $("[data-gallery-next]");


    if (previous) {

        previous.addEventListener(
            "click",
            () => showGallery(
                galleryIndex - 1
            )
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => showGallery(
                galleryIndex + 1
            )
        );

    }


    const minus =
        $("[data-quantity-minus]");

    const plus =
        $("[data-quantity-plus]");


    if (minus) {

        minus.addEventListener(
            "click",
            () => {

                quantity =
                    Math.max(
                        1,
                        quantity - 1
                    );

                if (quantityDisplay) {

                    quantityDisplay.textContent =
                        quantity;

                }

            }
        );

    }


    if (plus) {

        plus.addEventListener(
            "click",
            () => {

                quantity =
                    Math.min(
                        product.stock,
                        quantity + 1
                    );

                if (quantityDisplay) {

                    quantityDisplay.textContent =
                        quantity;

                }

            }
        );

    }


    $$("[data-size]").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    $$("[data-size]")
                        .forEach(
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

        }
    );


    $$("[data-color]").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    $$("[data-color]")
                        .forEach(
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

        }
    );


    const addButton =
        $(`[data-modal-add="${product.id}"]`);


    if (addButton) {

        addButton.addEventListener(
            "click",
            () => {

                const selectedSize =
                    $("[data-size].active")?.dataset.size ||
                    product.sizes[0];

                const selectedColor =
                    $("[data-color].active")?.dataset.color ||
                    product.colors[0];

                addToCart(
                    product.id,
                    quantity,
                    selectedSize,
                    selectedColor
                );

                closeProductModal();

                openCart();

            }
        );

    }

}


/* =========================================================
   PRODUCT ACTION DELEGATION
========================================================= */

function initProductActions() {

    document.addEventListener(
        "click",
        event => {

            const action =
                event.target.closest(
                    "[data-product-action]"
                );

            if (!action) return;

            const productId =
                action.dataset.productId;

            const type =
                action.dataset.productAction;


            if (type === "quick-view") {

                openProductModal(
                    productId
                );

            }


            if (type === "add") {

                const product =
                    state.products.find(
                        item =>
                            item.id === productId
                    );

                if (!product) return;

                addToCart(
                    product.id,
                    1,
                    product.sizes[0],
                    product.colors[0]
                );

            }

        }
    );

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(
    productId,
    quantity = 1,
    size = "One Size",
    color = "Black"
) {

    const product =
        state.products.find(
            item =>
                item.id === productId
        );

    if (!product) return;


    const existing =
        state.cart.find(
            item =>
                item.id === productId &&
                item.size === size &&
                item.color === color
        );


    if (existing) {

        existing.quantity =
            Math.min(
                product.stock,
                existing.quantity + quantity
            );

    } else {

        state.cart.push({

            id: productId,

            quantity:

                Math.min(
                    product.stock,
                    quantity
                ),

            size,

            color

        });

    }


    saveCart();

    renderCart();

    updateCartCount();

    showToast(
        `${product.name} added to your bag.`
    );

}


/* =========================================================
   CART
========================================================= */

function getCartTotal() {

    return state.cart.reduce(
        (total, item) => {

            const product =
                state.products.find(
                    product =>
                        product.id === item.id
                );

            if (!product) {
                return total;
            }

            return total +
                product.price *
                item.quantity;

        },
        0
    );

}


function getCartCount() {

    return state.cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


function updateCartCount() {

    const count =
        $("#cartCount");

    if (!count) return;

    count.textContent =
        getCartCount();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        $("#cartItems");

    const total =
        $("#cartTotal");

    if (!container) return;


    if (!state.cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your bag is empty.
                </h3>

                <p>
                    Find something that fits your life.
                </p>

            </div>

        `;

    } else {

        container.innerHTML =
            state.cart.map(
                cartItemMarkup
            ).join("");

    }


    if (total) {

        total.textContent =
            money(
                getCartTotal()
            );

    }

    updateCartCount();

}


function cartItemMarkup(item) {

    const product =
        state.products.find(
            product =>
                product.id === item.id
        );

    if (!product) return "";

    return `

        <article
            class="cart-item"
            data-cart-item="${product.id}"
        >

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.onerror=null;this.src='images/hero/hero-main.jpg';"
                >

            </div>

            <div class="cart-item-info">

                <span>
                    ${product.categoryLabel}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <small>
                    ${item.size} / ${item.color}
                </small>

                <strong>
                    ${money(product.price * item.quantity)}
                </strong>

                <div class="cart-item-controls">

                    <button
                        type="button"
                        data-cart-minus="${product.id}"
                        data-size="${item.size}"
                        data-color="${item.color}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-cart-plus="${product.id}"
                        data-size="${item.size}"
                        data-color="${item.color}"
                    >
                        +
                    </button>

                    <button
                        type="button"
                        class="cart-remove"
                        data-cart-remove="${product.id}"
                        data-size="${item.size}"
                        data-color="${item.color}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   CART ACTIONS
========================================================= */

function findCartItem(
    productId,
    size,
    color
) {

    return state.cart.find(
        item =>
            item.id === productId &&
            item.size === size &&
            item.color === color
    );

}


function changeCartQuantity(
    productId,
    size,
    color,
    amount
) {

    const item =
        findCartItem(
            productId,
            size,
            color
        );

    if (!item) return;


    const product =
        state.products.find(
            product =>
                product.id === productId
        );


    if (!product) return;


    item.quantity += amount;


    if (
        item.quantity <= 0
    ) {

        state.cart =
            state.cart.filter(
                cartItem =>
                    !(
                        cartItem.id === productId &&
                        cartItem.size === size &&
                        cartItem.color === color
                    )
            );

    } else {

        item.quantity =
            Math.min(
                product.stock,
                item.quantity
            );

    }


    saveCart();

    renderCart();

}


function removeCartItem(
    productId,
    size,
    color
) {

    state.cart =
        state.cart.filter(
            item =>
                !(
                    item.id === productId &&
                    item.size === size &&
                    item.color === color
                )
        );

    saveCart();

    renderCart();

}


/* =========================================================
   CART EVENT DELEGATION
========================================================= */

function initCartActions() {

    document.addEventListener(
        "click",
        event => {

            const plus =
                event.target.closest(
                    "[data-cart-plus]"
                );

            const minus =
                event.target.closest(
                    "[data-cart-minus]"
                );

            const remove =
                event.target.closest(
                    "[data-cart-remove]"
                );


            if (plus) {

                changeCartQuantity(
                    plus.dataset.cartPlus,
                    plus.dataset.size,
                    plus.dataset.color,
                    1
                );

            }


            if (minus) {

                changeCartQuantity(
                    minus.dataset.cartMinus,
                    minus.dataset.size,
                    minus.dataset.color,
                    -1
                );

            }


            if (remove) {

                removeCartItem(
                    remove.dataset.cartRemove,
                    remove.dataset.size,
                    remove.dataset.color
                );

            }

        }
    );

}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

    const drawer =
        $("#cartDrawer");

    const overlay =
        $("#cartOverlay");

    if (drawer) {

        drawer.classList.add(
            "open"
        );

        drawer.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

    document.body.classList.add(
        "cart-open"
    );

}


function closeCart() {

    const drawer =
        $("#cartDrawer");

    const overlay =
        $("#cartOverlay");

    if (drawer) {

        drawer.classList.remove(
            "open"
        );

        drawer.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

    document.body.classList.remove(
        "cart-open"
    );

}


function initCartDrawer() {

    const button =
        $("#cartButton");

    const close =
        $("#cartClose");

    const overlay =
        $("#cartOverlay");

    const checkout =
        $("#checkoutButton");


    if (button) {

        button.addEventListener(
            "click",
            openCart
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            closeCart
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCart
        );

    }


    if (checkout) {

        checkout.addEventListener(
            "click",
            () => {

                if (!state.cart.length) {

                    showToast(
                        "Your bag is empty."
                    );

                    return;

                }

                showToast(
                    "Checkout is ready for the next payment integration step."
                );

            }
        );

    }

}


/* =========================================================
   EQUITY CALCULATOR
========================================================= */

function initEquityCalculator() {

    const button =
        $("#calculateEquity");

    const amountInput =
        $("#investmentAmount");

    const percentageInput =
        $("#equityPercentage");

    const result =
        $("#calculatorResult");


    if (
        !button ||
        !amountInput ||
        !percentageInput ||
        !result
    ) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const amount =
                Number(
                    amountInput.value
                );

            const percentage =
                Number(
                    percentageInput.value
                );


            if (
                !amount ||
                amount <= 0 ||
                percentage < 0 ||
                percentage > 100
            ) {

                result.innerHTML = `

                    <span>
                        Illustration
                    </span>

                    <strong>
                        Check your figures
                    </strong>

                    <p>
                        Enter a positive amount and
                        an equity percentage from 0 to 100.
                    </p>

                `;

                return;

            }


            const impliedValue =
                amount /
                (percentage / 100);


            result.innerHTML = `

                <span>
                    Hypothetical allocation
                </span>

                <strong>
                    ${percentage}% = ${money(amount)}
                </strong>

                <p>
                    Implied enterprise value:
                    <strong>
                        ${money(impliedValue)}
                    </strong>
                </p>

            `;

        }
    );

}


/* =========================================================
   ANNOUNCEMENT BAR
========================================================= */

function initAnnouncement() {

    const close =
        $("#announcementClose");

    const bar =
        $(".announcement-bar");

    if (!close || !bar) return;


    close.addEventListener(
        "click",
        () => {

            bar.classList.add(
                "hidden"
            );

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    let toast =
        $("#areaBoyzToast");


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "areaBoyzToast";

        toast.className =
            "area-boyz-toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   TOAST STYLES
   Injected so the functionality works even if CSS
   does not yet contain toast styling.
========================================================= */

function injectFunctionalStyles() {

    if ($("#areaBoyzFunctionalStyles")) {
        return;
    }

    const style =
        document.createElement(
            "style"
        );

    style.id =
        "areaBoyzFunctionalStyles";

    style.textContent = `

        .area-boyz-toast {
            position: fixed;
            left: 50%;
            bottom: 30px;
            transform: translate(-50%, 20px);
            background: #111;
            color: #fff;
            padding: 14px 20px;
            border: 1px solid #ffd400;
            border-radius: 999px;
            z-index: 99999;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: .3s ease;
            font-size: 14px;
            max-width: calc(100% - 30px);
            text-align: center;
        }

        .area-boyz-toast.show {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
        }

        .header-hidden {
            transform: translateY(-100%);
        }

        .product-modal {
            position: fixed;
            inset: 0;
            z-index: 9990;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: .3s ease;
        }

        .product-modal.open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        .product-modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.78);
            backdrop-filter: blur(8px);
        }

        .product-modal-dialog {
            position: relative;
            width: min(1100px, 100%);
            max-height: 92vh;
            overflow-y: auto;
            background: #fff;
            color: #111;
            border-radius: 18px;
            z-index: 2;
        }

        .product-modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 42px;
            height: 42px;
            border: 0;
            border-radius: 50%;
            background: #ffd400;
            cursor: pointer;
            z-index: 5;
            font-size: 18px;
        }

        .product-detail {
            display: grid;
            grid-template-columns: 1.05fr .95fr;
            gap: 35px;
            padding: 35px;
        }

        .product-main-image {
            position: relative;
            aspect-ratio: 1 / 1;
            background: #f5f5f5;
            border-radius: 14px;
            overflow: hidden;
        }

        .product-main-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .gallery-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 42px;
            height: 42px;
            border: 0;
            border-radius: 50%;
            background: rgba(255,255,255,.9);
            cursor: pointer;
        }

        .gallery-prev {
            left: 15px;
        }

        .gallery-next {
            right: 15px;
        }

        .product-thumbnails {
            display: flex;
            gap: 10px;
            margin-top: 12px;
            overflow-x: auto;
        }

        .gallery-thumb {
            flex: 0 0 75px;
            height: 75px;
            padding: 0;
            border: 2px solid transparent;
            border-radius: 8px;
            overflow: hidden;
            background: #eee;
            cursor: pointer;
        }

        .gallery-thumb.active {
            border-color: #ffd400;
        }

        .gallery-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-detail-info {
            padding: 20px 5px;
        }

        .product-detail-info h2 {
            font-size: clamp(28px, 4vw, 48px);
            margin: 8px 0 12px;
        }

        .product-detail-price {
            display: block;
            font-size: 25px;
            margin: 20px 0;
        }

        .product-option {
            margin: 24px 0;
        }

        .product-option > label {
            display: block;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .option-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .option-btn {
            padding: 10px 15px;
            border: 1px solid #ccc;
            background: #fff;
            cursor: pointer;
            border-radius: 6px;
        }

        .option-btn.active {
            background: #111;
            color: #fff;
            border-color: #111;
        }

        .product-purchase {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-top: 25px;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            border-radius: 6px;
            overflow: hidden;
        }

        .quantity-control button {
            width: 40px;
            height: 45px;
            border: 0;
            background: #f5f5f5;
            cursor: pointer;
            font-size: 20px;
        }

        .quantity-control span {
            min-width: 40px;
            text-align: center;
        }

        .product-add-button {
            flex: 1;
        }

        @media (max-width: 800px) {

            .product-detail {
                grid-template-columns: 1fr;
                padding: 20px;
                gap: 10px;
            }

            .product-modal {
                padding: 8px;
            }

            .product-modal-dialog {
                max-height: 96vh;
            }

        }

    `;

    document.head.appendChild(
        style
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !==
                "INPUT"
            ) {

                event.preventDefault();

                openSearchPanel();

            }


            if (
                event.key === "Escape"
            ) {

                closeSearchPanel();

                closeMobileMenu();

                closeCart();

                closeProductModal();

            }

        }
    );

}


/* =========================================================
   HASH ROUTING
========================================================= */

function initHashRouting() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim();

    const validPages = [
        "home",
        "shop",
        "collections",
        "investment",
        "about",
        "contact"
    ];


    if (
        validPages.includes(hash)
    ) {

        state.currentPage =
            hash;

    } else {

        state.currentPage =
            CONFIG.defaultPage;

    }

}


function listenForHashChanges() {

    window.addEventListener(
        "hashchange",
        () => {

            const page =
                window.location.hash
                    .replace("#", "");

            if (page) {

                navigateTo(page);

            }

        }
    );

}


/* =========================================================
   YEAR
========================================================= */

function updateYear() {

    const year =
        $("#currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   PRELOADER
========================================================= */

function finishPreloader() {

    const preloader =
        $("#preloader");

    if (!preloader) return;

    preloader.classList.add(
        "loaded"
    );

    setTimeout(
        () => {

            preloader.style.display =
                "none";

        },
        900
    );

}


function initPreloader() {

    setTimeout(
        finishPreloader,
        CONFIG.preloaderDuration
    );


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                finishPreloader,
                250
            );

        }
    );

}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

function // =========================================================
// HERO SLIDESHOW ENGINE
// =========================================================

function initHeroSlideshow() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    let currentSlide = 0;
    let slideshowTimer;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlideshow();
        });
    });

    showSlide(0);
    startSlideshow();
       } 
initApp() {

    console.log(
        "AREA BOYZ ENTERPRISE — APP 4.0 INITIALIZING"
    );


    /* Products */

    state.products =
        createProducts();


    /* Functional styles */

    injectFunctionalStyles();


    /* Create modal */

    createProductModal();


    /* Navigation */

    initHashRouting();

    bindNavigation();

    listenForHashChanges();


    /* Header */

    initAutoHideHeader();


    /* Mobile */

    initMobileMenu();


    /* Search */

    initSearch();


    /* Shop */

    initFilters();


    /* Product actions */

    initProductActions();


    /* Cart */

    initCartActions();

    initCartDrawer();

    renderCart();


    /* Featured */

    renderFeaturedProducts();

    renderShopProducts();


    /* Equity */

    initEquityCalculator();


    /* Announcement */

    initAnnouncement();


    /* Keyboard */

    initKeyboard();


    /* Footer */

    updateYear();


    /* Preloader */

    initPreloader();


    /* Initial page */

    navigateTo(
        state.currentPage
    );


    console.log(
        `Loaded ${state.products.length} Area Boyz products.`
    );

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initApp
    );

} else {

    initApp();

   }
