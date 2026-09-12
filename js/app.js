"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   PREMIUM COMMERCE APPLICATION ENGINE
   VERSION 2.1

   VANILLA JAVASCRIPT
   NO FRAMEWORK

   CORE FEATURES
   ---------------------------------------------------------
   - Reliable preloader
   - SPA page navigation
   - Browser history
   - Hash navigation
   - Mobile navigation
   - Auto-hide header
   - Search
   - 100-product catalogue
   - Category filtering
   - Product sorting
   - Product preview
   - Shopping cart
   - Quantity controls
   - LocalStorage persistence
   - Equity calculator
   - Dynamic year
   - Announcement bar
   ========================================================= */


/* =========================================================
   01. GLOBAL CONFIGURATION
   ========================================================= */

const AB_CONFIG = {

    brand: "Area Boyz Enterprise",

    totalEquity: 758000,

    currency: "USD",

    storageKey: "areaBoyzCart",

    defaultPage: "home",

    preloaderDuration: 1100

};


/* =========================================================
   02. APPLICATION STATE
   ========================================================= */

const state = {

    currentPage: "home",

    currentCategory: "all",

    currentSearch: "",

    currentSort: "featured",

    cart: [],

    products: []

};


/* =========================================================
   03. DOM REFERENCES
   ========================================================= */

const DOM = {

    preloader:
        document.getElementById("preloader"),

    header:
        document.getElementById("siteHeader"),

    app:
        document.getElementById("app"),

    menuToggle:
        document.getElementById("menuToggle"),

    mobileMenu:
        document.getElementById("mobileMenu"),

    mobileMenuClose:
        document.getElementById("mobileMenuClose"),

    menuOverlay:
        document.getElementById("menuOverlay"),

    searchToggle:
        document.getElementById("searchToggle"),

    searchPanel:
        document.getElementById("searchPanel"),

    closeSearch:
        document.getElementById("closeSearch"),

    productSearch:
        document.getElementById("productSearch"),

    cartButton:
        document.getElementById("cartButton"),

    cartDrawer:
        document.getElementById("cartDrawer"),

    cartClose:
        document.getElementById("cartClose"),

    cartOverlay:
        document.getElementById("cartOverlay"),

    cartItems:
        document.getElementById("cartItems"),

    cartCount:
        document.getElementById("cartCount"),

    cartTotal:
        document.getElementById("cartTotal"),

    featuredProducts:
        document.getElementById("featuredProducts"),

    shopProducts:
        document.getElementById("shopProducts"),

    sortProducts:
        document.getElementById("sortProducts"),

    investmentAmount:
        document.getElementById("investmentAmount"),

    equityPercentage:
        document.getElementById("equityPercentage"),

    calculateEquity:
        document.getElementById("calculateEquity"),

    calculatorResult:
        document.getElementById("calculatorResult"),

    currentYear:
        document.getElementById("currentYear"),

    announcementClose:
        document.getElementById("announcementClose")

};


/* =========================================================
   04. PRODUCT TEMPLATE DATA
   ========================================================= */

const productTemplates = [

    {
        category: "streetwear",

        names: [
            "AB Essential Oversized Tee",
            "Area Motion Tee",
            "Evolution Graphic Tee",
            "Area Boyz Heavy Tee",
            "Everyday Energy Tee",
            "AB Core Cotton Tee",
            "Street Philosophy Tee",
            "Move Different Tee",
            "Area Boyz Signature Tee",
            "The Evolution Tee"
        ],

        priceRange: [45, 85]
    },

    {
        category: "handmade",

        names: [
            "Crafted Tranquility Shirt",
            "Handmade Intention Jacket",
            "AB Artisan Overshirt",
            "Craft Culture Hoodie",
            "Handmade Utility Top",
            "Tranquility Knit",
            "Intention Patchwork Shirt",
            "Area Crafted Pullover",
            "Handmade Everyday Jacket",
            "Crafted Soul Shirt"
        ],

        priceRange: [95, 220]
    },

    {
        category: "footwear",

        names: [
            "AB Motion Runner",
            "Area Street Trainer",
            "Evolution High Top",
            "Craft Runner",
            "AB Daily Sneaker",
            "Area Boyz Court Shoe",
            "Tranquility Slide",
            "AB Utility Boot",
            "Evolution Street Runner",
            "Area Classic Trainer"
        ],

        priceRange: [110, 320]
    },

    {
        category: "accessories",

        names: [
            "AB Signature Cap",
            "Area Boyz Crossbody",
            "Evolution Mini Bag",
            "AB Utility Tote",
            "Area Signature Belt",
            "Crafted Canvas Bag",
            "AB Statement Sunglasses",
            "Area Boyz Wallet",
            "Evolution Chain",
            "AB Everyday Beanie"
        ],

        priceRange: [30, 180]
    }

];


/* =========================================================
   05. VARIANT DATA
   ========================================================= */

const variantNames = [

    "AB Limited Edition",
    "Area Boyz Studio Piece",
    "AB Evolution Edition",
    "Area Boyz Archive Piece",
    "AB Everyday Series",
    "Area Boyz Select",
    "AB Movement Series",
    "Area Boyz Premium",
    "AB Crafted Edition",
    "Area Boyz Essential"

];


/* =========================================================
   06. PRODUCT GENERATOR
   ========================================================= */

function generateProducts() {

    const products = [];

    let id = 1;


    /*
     * First 40 core products.
     */

    productTemplates.forEach(template => {

        template.names.forEach((name, index) => {

            const range =
                template.priceRange;


            const basePrice =
                range[0] +
                (
                    (range[1] - range[0]) *
                    (index / 9)
                );


            products.push({

                id,

                name,

                category:
                    template.category,

                price:
                    Math.round(basePrice),

                image:
                    `images/products/product-${String(id).padStart(3, "0")}.jpg`,

                badge:
                    index < 2
                        ? "New"
                        : index === 3
                            ? "Popular"
                            : "",

                rating:
                    Number(
                        (
                            4.4 +
                            (index % 6) * 0.1
                        ).toFixed(1)
                    ),

                featured:
                    index < 4,

                description:
                    `A signature Area Boyz ${template.category} piece designed around movement, individuality and intention.`

            });


            id++;

        });

    });


    /*
     * Additional products.
     *
     * IMPORTANT:
     * Prices are deterministic.
     * They no longer change randomly
     * every time the website reloads.
     */

    while (products.length < 100) {

        const productNumber =
            products.length + 1;


        const template =
            productTemplates[
                (productNumber - 1) %
                productTemplates.length
            ];


        const variantIndex =
            (productNumber - 1) %
            variantNames.length;


        const range =
            template.priceRange;


        const spread =
            range[1] - range[0];


        const price =
            Math.round(
                range[0] +
                (
                    spread *
                    (
                        (
                            productNumber * 7
                        ) %
                        100
                    ) /
                    100
                )
            );


        products.push({

            id:
                productNumber,

            name:
                `${variantNames[variantIndex]} ${productNumber}`,

            category:
                template.category,

            price,

            image:
                `images/products/product-${String(productNumber).padStart(3, "0")}.jpg`,

            badge:
                productNumber % 11 === 0
                    ? "Limited"
                    : "",

            rating:
                Number(
                    (
                        4.3 +
                        (
                            (
                                productNumber * 13
                            ) %
                            7
                        ) /
                        10
                    ).toFixed(1)
                ),

            featured:
                productNumber <= 12,

            description:
                `An Area Boyz Enterprise ${template.category} piece created for modern expression, comfort and intentional style.`

        });

    }


    return products;

}


/* =========================================================
   07. INITIALIZE PRODUCT CATALOGUE
   ========================================================= */

state.products =
    generateProducts();


/* =========================================================
   08. CURRENCY FORMATTER
   ========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: AB_CONFIG.currency,
            maximumFractionDigits: 0
        }
    ).format(
        Number(amount) || 0
    );

}


/* =========================================================
   09. HTML ESCAPER
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   10. LOCAL STORAGE
   ========================================================= */

function loadCart() {

    try {

        const saved =
            localStorage.getItem(
                AB_CONFIG.storageKey
            );


        if (!saved) {

            state.cart = [];

            return;

        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {

            state.cart = [];

            return;

        }


        /*
         * Only accept valid cart records.
         */

        state.cart =
            parsed
                .filter(
                    item =>
                        item &&
                        Number.isFinite(
                            Number(item.id)
                        ) &&
                        Number.isFinite(
                            Number(item.quantity)
                        ) &&
                        Number(item.quantity) > 0
                )
                .map(item => ({

                    id:
                        Number(item.id),

                    quantity:
                        Math.max(
                            1,
                            Math.floor(
                                Number(
                                    item.quantity
                                )
                            )
                        )

                }));


    } catch (error) {

        console.warn(
            "Area Boyz: Could not load cart.",
            error
        );

        state.cart = [];

    }

}


function saveCart() {

    try {

        localStorage.setItem(
            AB_CONFIG.storageKey,
            JSON.stringify(
                state.cart
            )
        );

    } catch (error) {

        console.warn(
            "Area Boyz: Could not save cart.",
            error
        );

    }

}


/* =========================================================
   11. PRELOADER
   ========================================================= */

function initializePreloader() {

    if (!DOM.preloader) {
        return;
    }


    /*
     * Do not depend exclusively on
     * window "load".
     *
     * The CSS also contains a failsafe.
     */

    window.setTimeout(
        () => {

            DOM.preloader.classList.add(
                "loaded"
            );

        },
        AB_CONFIG.preloaderDuration
    );

}


/* =========================================================
   12. PAGE NORMALIZATION
   ========================================================= */

function normalizePage(page) {

    const validPages = [

        "home",
        "shop",
        "collections",
        "investment",
        "about",
        "contact"

    ];


    return validPages.includes(
        String(page).toLowerCase()
    )
        ? String(page).toLowerCase()
        : AB_CONFIG.defaultPage;

}


/* =========================================================
   13. GET PAGE FROM URL
   ========================================================= */

function getPageFromHash() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();


    return normalizePage(
        hash ||
        AB_CONFIG.defaultPage
    );

}


/* =========================================================
   14. NAVIGATE
   ========================================================= */

function navigateTo(
    page,
    pushHistory = true
) {

    page =
        normalizePage(page);


    const target =
        document.querySelector(
            `.page[data-page-section="${page}"]`
        );


    if (!target) {

        console.warn(
            `Area Boyz: Page "${page}" not found.`
        );

        return;

    }


    /*
     * Hide every page.
     */

    document
        .querySelectorAll(
            ".page[data-page-section]"
        )
        .forEach(section => {

            section.classList.remove(
                "active-page"
            );

        });


    /*
     * Show requested page.
     */

    target.classList.add(
        "active-page"
    );


    state.currentPage =
        page;


    updateNavigationState(
        page
    );


    closeMobileMenu();

    closeSearchPanel();

    closeCart();


    /*
     * Update browser history.
     */

    if (pushHistory) {

        const desiredHash =
            `#${page}`;


        if (
            window.location.hash !==
            desiredHash
        ) {

            history.pushState(
                {
                    page
                },
                "",
                desiredHash
            );

        }

    }


    /*
     * Render shop whenever
     * the shop becomes active.
     */

    if (page === "shop") {

        renderShopProducts();

    }


    /*
     * Move user to the top.
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   15. HISTORY
   ========================================================= */

function initializeHistory() {

    const initialPage =
        getPageFromHash();


    history.replaceState(
        {
            page: initialPage
        },
        "",
        `#${initialPage}`
    );


    state.currentPage =
        initialPage;

}


function initializeHistoryListener() {

    window.addEventListener(
        "popstate",
        event => {

            const page =
                event.state?.page ||
                getPageFromHash();


            navigateTo(
                page,
                false
            );

        }
    );


    /*
     * Also support direct hash changes.
     */

    window.addEventListener(
        "hashchange",
        () => {

            const page =
                getPageFromHash();


            if (
                page !==
                state.currentPage
            ) {

                navigateTo(
                    page,
                    false
                );

            }

        }
    );

}


/* =========================================================
   16. NAVIGATION STATE
   ========================================================= */

function updateNavigationState(page) {

    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === page
            );

        });


    document
        .querySelectorAll(
            ".mobile-nav a"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === page
            );

        });

}


/* =========================================================
   17. NAVIGATION CLICKS
   ========================================================= */

function initializeNavigationClicks() {

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest(
                    "[data-page]"
                );


            if (!link) {
                return;
            }


            const page =
                link.dataset.page;


            if (!page) {
                return;
            }


            event.preventDefault();


            navigateTo(
                page,
                true
            );

        }
    );

}


/* =========================================================
   18. MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (!DOM.mobileMenu) {
        return;
    }


    closeSearchPanel();

    closeCart();


    DOM.mobileMenu.classList.add(
        "open"
    );


    DOM.menuOverlay?.classList.add(
        "open"
    );


    DOM.menuToggle?.classList.add(
        "open"
    );


    DOM.menuToggle?.setAttribute(
        "aria-expanded",
        "true"
    );


    DOM.mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );

}


function closeMobileMenu() {

    DOM.mobileMenu?.classList.remove(
        "open"
    );


    DOM.menuOverlay?.classList.remove(
        "open"
    );


    DOM.menuToggle?.classList.remove(
        "open"
    );


    DOM.menuToggle?.setAttribute(
        "aria-expanded",
        "false"
    );


    DOM.mobileMenu?.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


function initializeMobileMenu() {

    DOM.menuToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                DOM.mobileMenu?.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    DOM.mobileMenuClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    DOM.menuOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* =========================================================
   19. SEARCH
   ========================================================= */

function openSearchPanel() {

    closeMobileMenu();

    closeCart();


    DOM.searchPanel?.classList.add(
        "open"
    );


    window.setTimeout(
        () => {

            DOM.productSearch?.focus();

        },
        120
    );

}


function closeSearchPanel() {

    DOM.searchPanel?.classList.remove(
        "open"
    );

}


function initializeSearchPanel() {

    DOM.searchToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                DOM.searchPanel?.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeSearchPanel();

            } else {

                openSearchPanel();

            }

        }
    );


    DOM.closeSearch?.addEventListener(
        "click",
        closeSearchPanel
    );


    DOM.productSearch?.addEventListener(
        "input",
        event => {

            state.currentSearch =
                event.target.value
                    .trim()
                    .toLowerCase();


            if (
                state.currentSearch &&
                state.currentPage !== "shop"
            ) {

                navigateTo(
                    "shop",
                    true
                );

            }


            renderShopProducts();

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeSearchPanel();

                closeMobileMenu();

                closeCart();

                closeProductPreview();

            }

        }
    );

}


/* =========================================================
   20. PRODUCT CARD
   ========================================================= */

function productCard(product) {

    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <div class="product-image">

                ${
                    product.badge
                        ? `
                            <span class="product-badge">
                                ${escapeHTML(product.badge)}
                            </span>
                          `
                        : ""
                }

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='images/hero/hero-main.jpg';"
                >

                <button
                    class="product-quick-add"
                    data-add-product="${product.id}"
                    type="button"
                >
                    Add to bag
                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>


                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>


                <div class="product-meta">

                    <strong class="product-price">
                        ${formatCurrency(product.price)}
                    </strong>


                    <span class="product-rating">

                        <i class="fa-solid fa-star"></i>

                        ${product.rating}

                    </span>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   21. FEATURED PRODUCTS
   ========================================================= */

function renderFeaturedProducts() {

    if (!DOM.featuredProducts) {
        return;
    }


    const featured =
        state.products
            .filter(
                product =>
                    product.featured
            )
            .slice(0, 8);


    DOM.featuredProducts.innerHTML =
        featured
            .map(productCard)
            .join("");

}


/* =========================================================
   22. FILTER PRODUCTS
   ========================================================= */

function getFilteredProducts() {

    let products =
        [...state.products];


    /*
     * Category filter
     */

    if (
        state.currentCategory !==
        "all"
    ) {

        products =
            products.filter(
                product =>
                    product.category ===
                    state.currentCategory
            );

    }


    /*
     * Search filter
     */

    if (
        state.currentSearch
    ) {

        products =
            products.filter(
                product => {

                    const searchable =
                        [
                            product.name,
                            product.category,
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


    /*
     * Sort
     */

    switch (
        state.currentSort
    ) {

        case "price-low":

            products.sort(
                (a, b) =>
                    a.price -
                    b.price
            );

            break;


        case "price-high":

            products.sort(
                (a, b) =>
                    b.price -
                    a.price
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


        case "featured":

        default:

            products.sort(
                (a, b) =>
                    Number(b.featured) -
                    Number(a.featured)
            );

            break;

    }


    return products;

}


/* =========================================================
   23. SHOP RENDER
   ========================================================= */

function renderShopProducts() {

    if (!DOM.shopProducts) {
        return;
    }


    const products =
        getFilteredProducts();


    if (!products.length) {

        DOM.shopProducts.innerHTML = `

            <div
                class="empty-cart"
                style="grid-column:1/-1;"
            >

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>
                    No pieces found.
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    DOM.shopProducts.innerHTML =
        products
            .map(productCard)
            .join("");

}


/* =========================================================
   24. CATEGORY FILTERS
   ========================================================= */

function setActiveFilterButton(
    category
) {

    document
        .querySelectorAll(
            ".filter-btn"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter ===
                category
            );

        });

}


function initializeFilters() {

    document.addEventListener(
        "click",
        event => {

            const filterButton =
                event.target.closest(
                    ".filter-btn"
                );


            if (filterButton) {

                state.currentCategory =
                    filterButton.dataset.filter ||
                    "all";


                setActiveFilterButton(
                    state.currentCategory
                );


                renderShopProducts();

                return;

            }


            const categoryCard =
                event.target.closest(
                    ".category-card"
                );


            if (
                categoryCard &&
                categoryCard.dataset.category
            ) {

                state.currentCategory =
                    categoryCard.dataset.category;


                setActiveFilterButton(
                    state.currentCategory
                );


                navigateTo(
                    "shop",
                    true
                );

            }

        }
    );

}


/* =========================================================
   25. SORTING
   ========================================================= */

function initializeSorting() {

    DOM.sortProducts?.addEventListener(
        "change",
        event => {

            state.currentSort =
                event.target.value;


            renderShopProducts();

        }
    );

}


/* =========================================================
   26. CART HELPERS
   ========================================================= */

function findCartItem(
    productId
) {

    return state.cart.find(
        item =>
            Number(item.id) ===
            Number(productId)
    );

}


function addToCart(
    productId
) {

    const product =
        state.products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {

        console.warn(
            "Area Boyz: Product not found.",
            productId
        );

        return;

    }


    const existing =
        findCartItem(
            productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        state.cart.push({

            id:
                product.id,

            quantity:
                1

        });

    }


    saveCart();

    renderCart();

    openCart();

}


/* =========================================================
   27. CHANGE CART QUANTITY
   ========================================================= */

function changeCartQuantity(
    productId,
    change
) {

    const item =
        findCartItem(
            productId
        );


    if (!item) {
        return;
    }


    item.quantity +=
        Number(change);


    if (
        item.quantity <= 0
    ) {

        removeFromCart(
            productId
        );

        return;

    }


    saveCart();

    renderCart();

}


/* =========================================================
   28. REMOVE CART ITEM
   ========================================================= */

function removeFromCart(
    productId
) {

    state.cart =
        state.cart.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveCart();

    renderCart();

}


/* =========================================================
   29. CART TOTAL
   ========================================================= */

function calculateCartTotal() {

    return state.cart.reduce(
        (
            total,
            item
        ) => {

            const product =
                state.products.find(
                    product =>
                        Number(product.id) ===
                        Number(item.id)
                );


            if (!product) {
                return total;
            }


            return total +
                (
                    product.price *
                    item.quantity
                );

        },
        0
    );

}


/* =========================================================
   30. CART COUNT
   ========================================================= */

function calculateCartCount() {

    return state.cart.reduce(
        (
            total,
            item
        ) =>
            total +
            Number(item.quantity || 0),
        0
    );

}


/* =========================================================
   31. CART ITEM HTML
   ========================================================= */

function cartItemHTML(
    item
) {

    const product =
        state.products.find(
            product =>
                Number(product.id) ===
                Number(item.id)
        );


    if (!product) {
        return "";
    }


    return `

        <article class="cart-item">

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.onerror=null;this.src='images/hero/hero-main.jpg';"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${escapeHTML(product.name)}
                </h4>


                <p>
                    ${formatCurrency(product.price)}
                </p>


                <div class="cart-item-controls">

                    <button
                        type="button"
                        data-cart-action="decrease"
                        data-product-id="${product.id}"
                        aria-label="Decrease quantity"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </button>


                    <span class="cart-item-quantity">
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-cart-action="increase"
                        data-product-id="${product.id}"
                        aria-label="Increase quantity"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>


                    <button
                        type="button"
                        data-cart-action="remove"
                        data-product-id="${product.id}"
                        aria-label="Remove item"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>


            <strong class="cart-item-price">

                ${formatCurrency(
                    product.price *
                    item.quantity
                )}

            </strong>

        </article>

    `;

}


/* =========================================================
   32. RENDER CART
   ========================================================= */

function renderCart() {

    const count =
        calculateCartCount();


    const total =
        calculateCartTotal();


    if (DOM.cartCount) {

        DOM.cartCount.textContent =
            count;

    }


    if (DOM.cartTotal) {

        DOM.cartTotal.textContent =
            formatCurrency(total);

    }


    if (!DOM.cartItems) {
        return;
    }


    if (!state.cart.length) {

        DOM.cartItems.innerHTML = `

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

        return;

    }


    DOM.cartItems.innerHTML =
        state.cart
            .map(cartItemHTML)
            .join("");

}


/* =========================================================
   33. CART ACTIONS
   ========================================================= */

function initializeCartActions() {

    document.addEventListener(
        "click",
        event => {

            const addButton =
                event.target.closest(
                    "[data-add-product]"
                );


            if (addButton) {

                addToCart(
                    Number(
                        addButton.dataset.addProduct
                    )
                );

                return;

            }


            const actionButton =
                event.target.closest(
                    "[data-cart-action]"
                );


            if (!actionButton) {
                return;
            }


            const productId =
                Number(
                    actionButton.dataset.productId
                );


            const action =
                actionButton.dataset.cartAction;


            if (
                action ===
                "increase"
            ) {

                changeCartQuantity(
                    productId,
                    1
                );

            }


            if (
                action ===
                "decrease"
            ) {

                changeCartQuantity(
                    productId,
                    -1
                );

            }


            if (
                action ===
                "remove"
            ) {

                removeFromCart(
                    productId
                );

            }

        }
    );

}


/* =========================================================
   34. CART DRAWER
   ========================================================= */

function openCart() {

    closeMobileMenu();

    closeSearchPanel();


    DOM.cartDrawer?.classList.add(
        "open"
    );


    DOM.cartOverlay?.classList.add(
        "open"
    );


    DOM.cartDrawer?.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "cart-open"
    );

}


function closeCart() {

    DOM.cartDrawer?.classList.remove(
        "open"
    );


    DOM.cartOverlay?.classList.remove(
        "open"
    );


    DOM.cartDrawer?.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "cart-open"
    );

}


function initializeCartDrawer() {

    DOM.cartButton?.addEventListener(
        "click",
        openCart
    );


    DOM.cartClose?.addEventListener(
        "click",
        closeCart
    );


    DOM.cartOverlay?.addEventListener(
        "click",
        closeCart
    );


    document
        .getElementById(
            "checkoutButton"
        )
        ?.addEventListener(
            "click",
            () => {

                if (
                    !state.cart.length
                ) {

                    alert(
                        "Your Area Boyz bag is currently empty."
                    );

                    return;

                }


                alert(
                    "Checkout engine ready for backend integration. Your bag contains " +
                    calculateCartCount() +
                    " item(s)."
                );

            }
        );

}


/* =========================================================
   35. EQUITY CALCULATOR
   ========================================================= */

function initializeEquityCalculator() {

    DOM.calculateEquity?.addEventListener(
        "click",
        calculateEquity
    );

}


function calculateEquity() {

    const amount =
        Number(
            DOM.investmentAmount?.value
        );


    const requestedPercentage =
        Number(
            DOM.equityPercentage?.value
        );


    if (
        amount <= 0 &&
        requestedPercentage <= 0
    ) {

        showCalculatorMessage(
            "Enter an amount or an equity percentage."
        );

        return;

    }


    let html = "";


    if (
        amount > 0
    ) {

        const ownership =
            (
                amount /
                AB_CONFIG.totalEquity
            ) *
            100;


        html += `

            <span>
                HYPOTHETICAL OWNERSHIP
            </span>


            <strong>
                ${ownership.toFixed(4)}%
            </strong>


            <p>
                A hypothetical ${formatCurrency(amount)}
                allocation against a stated enterprise
                equity figure of
                ${formatCurrency(
                    AB_CONFIG.totalEquity
                )}.
            </p>

        `;

    }


    if (
        requestedPercentage > 0
    ) {

        const impliedValue =
            (
                requestedPercentage /
                100
            ) *
            AB_CONFIG.totalEquity;


        html += `

            <div style="margin-top:18px;">

                <span>
                    HYPOTHETICAL VALUE
                </span>


                <strong>
                    ${formatCurrency(
                        impliedValue
                    )}
                </strong>


                <p>
                    A hypothetical
                    ${requestedPercentage}%
                    allocation against the stated
                    ${formatCurrency(
                        AB_CONFIG.totalEquity
                    )}
                    equity figure.
                </p>

            </div>

        `;

    }


    if (
        DOM.calculatorResult
    ) {

        DOM.calculatorResult.innerHTML =
            html;

    }

}


function showCalculatorMessage(
    message
) {

    if (
        !DOM.calculatorResult
    ) {
        return;
    }


    DOM.calculatorResult.innerHTML = `

        <span>
            SHARE EXPLORER
        </span>


        <strong>
            —
        </strong>


        <p>
            ${escapeHTML(message)}
        </p>

    `;

}


/* =========================================================
   36. ANNOUNCEMENT BAR
   ========================================================= */

function initializeAnnouncement() {

    DOM.announcementClose?.addEventListener(
        "click",
        () => {

            const bar =
                document.querySelector(
                    ".announcement-bar"
                );


            if (bar) {

                bar.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   37. HEADER BEHAVIOR
   ========================================================= */

function initializeHeaderBehavior() {

    let previousScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;


            if (
                currentScroll > 30
            ) {

                DOM.header?.classList.add(
                    "scrolled"
                );

            } else {

                DOM.header?.classList.remove(
                    "scrolled"
                );

            }


            const menuOpen =
                DOM.mobileMenu?.classList.contains(
                    "open"
                );


            const searchOpen =
                DOM.searchPanel?.classList.contains(
                    "open"
                );


            const cartOpen =
                DOM.cartDrawer?.classList.contains(
                    "open"
                );


            if (
                !menuOpen &&
                !searchOpen &&
                !cartOpen
            ) {

                if (
                    currentScroll >
                    previousScroll &&
                    currentScroll > 150
                ) {

                    DOM.header?.classList.add(
                        "header-hidden"
                    );

                } else {

                    DOM.header?.classList.remove(
                        "header-hidden"
                    );

                }

            }


            previousScroll =
                currentScroll;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   38. DYNAMIC YEAR
   ========================================================= */

function initializeYear() {

    if (
        DOM.currentYear
    ) {

        DOM.currentYear.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   39. PRODUCT CLICKS
   ========================================================= */

function initializeProductClicks() {

    document.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".product-card"
                );


            if (!card) {
                return;
            }


            if (
                event.target.closest(
                    "[data-add-product]"
                )
            ) {

                return;

            }


            const productId =
                Number(
                    card.dataset.productId
                );


            const product =
                state.products.find(
                    item =>
                        Number(item.id) ===
                        productId
                );


            if (!product) {
                return;
            }


            showProductPreview(
                product
            );

        }
    );

}


/* =========================================================
   40. PRODUCT PREVIEW
   ========================================================= */

function showProductPreview(
    product
) {

    let modal =
        document.getElementById(
            "productPreview"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "productPreview";


        modal.innerHTML = `

            <div
                class="ab-product-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Product preview"
            >

                <button
                    class="ab-product-modal-close"
                    type="button"
                    aria-label="Close product preview"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>


                <div
                    class="ab-product-modal-image"
                >

                    <img
                        id="previewImage"
                        src=""
                        alt=""
                    >

                </div>


                <div
                    class="ab-product-modal-content"
                >

                    <span
                        id="previewCategory"
                        class="eyebrow"
                    ></span>


                    <h2
                        id="previewName"
                    ></h2>


                    <strong
                        id="previewPrice"
                    ></strong>


                    <p
                        id="previewDescription"
                    ></p>


                    <button
                        id="previewAdd"
                        class="btn btn-primary"
                        type="button"
                    >
                        Add to bag

                        <i
                            class="fa-solid fa-bag-shopping"
                        ></i>

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        addProductModalStyles();


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal ||
                    event.target.closest(
                        ".ab-product-modal-close"
                    )
                ) {

                    closeProductPreview();

                }

            }
        );

    }


    const previewImage =
        document.getElementById(
            "previewImage"
        );


    const previewCategory =
        document.getElementById(
            "previewCategory"
        );


    const previewName =
        document.getElementById(
            "previewName"
        );


    const previewPrice =
        document.getElementById(
            "previewPrice"
        );


    const previewDescription =
        document.getElementById(
            "previewDescription"
        );


    const previewAdd =
        document.getElementById(
            "previewAdd"
        );


    previewImage.src =
        product.image;


    previewImage.alt =
        product.name;


    previewCategory.textContent =
        product.category;


    previewName.textContent =
        product.name;


    previewPrice.textContent =
        formatCurrency(
            product.price
        );


    previewDescription.textContent =
        product.description;


    previewAdd.onclick =
        () => {

            addToCart(
                product.id
            );


            closeProductPreview();

        };


    modal.classList.add(
        "open"
    );


    document.body.classList.add(
        "menu-open"
    );

}


/* =========================================================
   41. CLOSE PRODUCT PREVIEW
   ========================================================= */

function closeProductPreview() {

    const modal =
        document.getElementById(
            "productPreview"
        );


    modal?.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   42. PRODUCT MODAL STYLES
   ========================================================= */

function addProductModalStyles() {

    if (
        document.getElementById(
            "abProductModalStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "abProductModalStyles";


    style.textContent = `

        #productPreview {

            position: fixed;

            inset: 0;

            z-index: 12000;

            display: grid;

            place-items: center;

            padding: 20px;

            background: rgba(0,0,0,.72);

            opacity: 0;

            visibility: hidden;

            transition:
                opacity 250ms ease,
                visibility 250ms ease;

        }


        #productPreview.open {

            opacity: 1;

            visibility: visible;

        }


        .ab-product-modal {

            position: relative;

            width: min(
                920px,
                100%
            );

            max-height: 92vh;

            overflow: auto;

            display: grid;

            grid-template-columns:
                1fr 1fr;

            border-radius: 24px;

            background: #fff;

            color: #080808;

            box-shadow:
                0 30px 100px rgba(0,0,0,.35);

            transform:
                translateY(15px);

            transition:
                transform 300ms ease;

        }


        #productPreview.open
        .ab-product-modal {

            transform:
                translateY(0);

        }


        .ab-product-modal-image {

            min-height: 520px;

            background: #f2f2ee;

        }


        .ab-product-modal-image img {

            width: 100%;

            height: 100%;

            object-fit: cover;

        }


        .ab-product-modal-content {

            padding: 50px;

            display: flex;

            flex-direction: column;

            justify-content: center;

        }


        .ab-product-modal-content h2 {

            margin-top: 5px;

            font-size:
                clamp(
                    2rem,
                    4vw,
                    4rem
                );

            line-height: .95;

            letter-spacing: -.06em;

            font-weight: 950;

        }


        .ab-product-modal-content > strong {

            margin-top: 18px;

            font-size: 1.3rem;

        }


        .ab-product-modal-content p {

            margin:
                20px 0 28px;

            color: #65655f;

            line-height: 1.7;

        }


        .ab-product-modal-close {

            position: absolute;

            z-index: 5;

            top: 15px;

            right: 15px;

            width: 42px;

            height: 42px;

            display: grid;

            place-items: center;

            border-radius: 50%;

            background: rgba(255,255,255,.92);

            color: #080808;

            box-shadow:
                0 5px 20px rgba(0,0,0,.1);

        }


        @media(max-width:700px) {

            .ab-product-modal {

                grid-template-columns:
                    1fr;

            }


            .ab-product-modal-image {

                min-height: 350px;

            }


            .ab-product-modal-content {

                padding: 28px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   43. INITIALIZE APPLICATION
   ========================================================= */

function initializeAreaBoyz() {

    console.log(
        "AREA BOYZ ENTERPRISE — INITIALIZING..."
    );


    loadCart();

    initializeHistory();

    initializeHistoryListener();

    initializeNavigationClicks();

    initializeMobileMenu();

    initializeSearchPanel();

    initializeFilters();

    initializeSorting();

    initializeCartActions();

    initializeCartDrawer();

    initializeEquityCalculator();

    initializeAnnouncement();

    initializeHeaderBehavior();

    initializeYear();

    initializeProductClicks();

    initializePreloader();


    renderFeaturedProducts();

    renderShopProducts();

    renderCart();


    /*
     * Display initial page.
     */

    const initialPage =
        getPageFromHash();


    navigateTo(
        initialPage,
        false
    );


    console.log(
        "AREA BOYZ ENTERPRISE — SYSTEM ONLINE"
    );


    console.log(
        `Catalogue: ${state.products.length} products`
    );

}


/* =========================================================
   44. START APPLICATION
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAreaBoyz
    );

} else {

    initializeAreaBoyz();

   }
