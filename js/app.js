
"use strict";

/* =========================================================
   AREA BOYZ ENTERPRISE
   PREMIUM COMMERCE APPLICATION ENGINE

   VANILLA JAVASCRIPT
   NO REACT
   NO FRAMEWORK

   FEATURES
   ---------------------------------------------------------
   - Preloader
   - SPA page switching
   - Browser back / forward
   - Mobile navigation
   - Auto-hide header
   - Search
   - 100-product catalogue
   - Product filtering
   - Product sorting
   - Category filtering
   - Cart
   - Quantity controls
   - LocalStorage cart persistence
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

    preloaderDuration: 1100,

    pageTransitionDelay: 120

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
   04. PRODUCT DATA ENGINE
   =========================================================

   We deliberately generate 100 catalogue records.

   Later, when your real fashion images are ready,
   we only need to replace the image paths and product
   information.

   Expected image format:

   images/products/product-001.jpg
   images/products/product-002.jpg
   ...
   images/products/product-100.jpg

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
   05. PRODUCT GENERATOR
   ========================================================= */

function generateProducts() {

    const products = [];

    let id = 1;

    productTemplates.forEach(template => {

        template.names.forEach((name, index) => {

            /*
             * 10 products per category.
             * Four categories = 40 base products.
             *
             * We then repeat controlled variants below
             * to reach 100 catalogue items.
             */

            const basePrice =
                template.priceRange[0] +
                (
                    (
                        template.priceRange[1] -
                        template.priceRange[0]
                    ) *
                    (index / 9)
                );

            products.push({

                id: id,

                name: name,

                category: template.category,

                price: Math.round(basePrice),

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
     * Generate additional catalogue variants
     * until we reach exactly 100 products.
     */

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


    while (products.length < 100) {

        const template =
            productTemplates[
                products.length %
                productTemplates.length
            ];

        const variantIndex =
            products.length % variantNames.length;

        const productNumber =
            products.length + 1;

        const range = template.priceRange;

        const price =
            Math.round(
                range[0] +
                (
                    Math.random() *
                    (range[1] - range[0])
                )
            );

        products.push({

            id: productNumber,

            name:
                `${variantNames[variantIndex]} ${productNumber}`,

            category:
                template.category,

            price:
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
                        Math.random() * 0.7
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
   06. INITIALIZE PRODUCTS
   ========================================================= */

state.products = generateProducts();


/* =========================================================
   07. CURRENCY FORMATTER
   ========================================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: AB_CONFIG.currency,
            maximumFractionDigits: 0
        }
    ).format(amount);

}


/* =========================================================
   08. LOCAL STORAGE
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

        if (Array.isArray(parsed)) {

            state.cart = parsed;

        } else {

            state.cart = [];

        }

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
            JSON.stringify(state.cart)
        );

    } catch (error) {

        console.warn(
            "Area Boyz: Could not save cart.",
            error
        );

    }

}


/* =========================================================
   09. PRELOADER
   ========================================================= */

function initializePreloader() {

    if (!DOM.preloader) {
        return;
    }

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    DOM.preloader.classList.add(
                        "loaded"
                    );

                },
                AB_CONFIG.preloaderDuration
            );

        }
    );

}


/* =========================================================
   10. PAGE NAVIGATION
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

    return validPages.includes(page)
        ? page
        : AB_CONFIG.defaultPage;

}


function getPageFromHash() {

    const hash =
        window.location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();

    return normalizePage(
        hash || AB_CONFIG.defaultPage
    );

}


function navigateTo(
    page,
    pushHistory = true
) {

    page =
        normalizePage(page);


    if (
        page === state.currentPage &&
        document.querySelector(
            `.page[data-page-section="${page}"]`
        )
    ) {

        closeMobileMenu();

        return;

    }


    const pages =
        document.querySelectorAll(
            ".page[data-page-section]"
        );


    pages.forEach(section => {

        section.classList.remove(
            "active-page"
        );

    });


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
     * Change the browser URL without
     * forcing a full document reload.
     */

    if (pushHistory) {

        history.pushState(
            {
                page: page
            },
            "",
            `#${page}`
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (page === "shop") {

        renderShopProducts();

    }

}


/* =========================================================
   11. INITIAL HISTORY STATE
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


/* =========================================================
   12. BROWSER BACK / FORWARD
   ========================================================= */

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

}


/* =========================================================
   13. NAVIGATION STATE
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
   14. GLOBAL NAVIGATION CLICK HANDLER
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
   15. MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    if (!DOM.mobileMenu) {
        return;
    }

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

    if (!DOM.mobileMenu) {
        return;
    }

    DOM.mobileMenu.classList.remove(
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

    DOM.mobileMenu.setAttribute(
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

            const open =
                DOM.mobileMenu.classList.contains(
                    "open"
                );

            if (open) {

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
   16. SEARCH PANEL
   ========================================================= */

function openSearchPanel() {

    DOM.searchPanel?.classList.add(
        "open"
    );

    setTimeout(
        () => {

            DOM.productSearch?.focus();

        },
        100
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

            const open =
                DOM.searchPanel.classList.contains(
                    "open"
                );

            if (open) {

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
                state.currentSearch.length > 0
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

            if (event.key === "Escape") {

                closeSearchPanel();

                closeMobileMenu();

                closeCart();

            }

        }
    );

}


/* =========================================================
   17. PRODUCT CARD HTML
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
                                ${product.badge}
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
                    ${product.category}
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
   18. ESCAPE HTML
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
   19. FEATURED PRODUCTS
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
   20. FILTER PRODUCTS
   ========================================================= */

function getFilteredProducts() {

    let products =
        [...state.products];


    /*
     * Category
     */

    if (
        state.currentCategory !== "all"
    ) {

        products =
            products.filter(
                product =>
                    product.category ===
                    state.currentCategory
            );

    }


    /*
     * Search
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
     * Sorting
     */

    switch (
        state.currentSort
    ) {

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
   21. SHOP PRODUCTS
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
   22. CATEGORY FILTERS
   ========================================================= */

function initializeFilters() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".filter-btn"
                );


            if (button) {

                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(
                        btn =>
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


                navigateTo(
                    "shop",
                    true
                );


                setActiveFilterButton(
                    state.currentCategory
                );


                renderShopProducts();

            }

        }
    );

}


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


/* =========================================================
   23. SORTING
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
   24. CART HELPERS
   ========================================================= */

function findCartItem(productId) {

    return state.cart.find(
        item =>
            Number(item.id) ===
            Number(productId)
    );

}


function addToCart(productId) {

    const product =
        state.products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {

        console.warn(
            "Product not found:",
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

            id: product.id,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    openCart();

}


/* =========================================================
   25. CART QUANTITY
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


    item.quantity += change;


    if (item.quantity <= 0) {

        state.cart =
            state.cart.filter(
                cartItem =>
                    Number(cartItem.id) !==
                    Number(productId)
            );

    }


    saveCart();

    renderCart();

}


/* =========================================================
   26. REMOVE CART ITEM
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
   27. CART TOTAL
   ========================================================= */

function calculateCartTotal() {

    return state.cart.reduce(
        (total, item) => {

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
   28. CART COUNT
   ========================================================= */

function calculateCartCount() {

    return state.cart.reduce(
        (
            total,
            item
        ) =>
            total +
            item.quantity,
        0
    );

}


/* =========================================================
   29. RENDER CART
   ========================================================= */

function renderCart() {

    if (!DOM.cartItems) {
        return;
    }


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
   30. CART ITEM HTML
   ========================================================= */

function cartItemHTML(item) {

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
   31. CART EVENT HANDLER
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

                const id =
                    Number(
                        addButton.dataset.addProduct
                    );


                addToCart(id);

                return;

            }


            const cartAction =
                event.target.closest(
                    "[data-cart-action]"
                );


            if (!cartAction) {
                return;
            }


            const id =
                Number(
                    cartAction.dataset.productId
                );


            const action =
                cartAction.dataset.cartAction;


            if (action === "increase") {

                changeCartQuantity(
                    id,
                    1
                );

            }


            if (action === "decrease") {

                changeCartQuantity(
                    id,
                    -1
                );

            }


            if (action === "remove") {

                removeFromCart(id);

            }

        }
    );

}


/* =========================================================
   32. CART DRAWER
   ========================================================= */

function openCart() {

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
        .getElementById("checkoutButton")
        ?.addEventListener(
            "click",
            () => {

                if (!state.cart.length) {

                    alert(
                        "Your Area Boyz bag is currently empty."
                    );

                    return;

                }


                /*
                 * Real payment integration comes later.
                 */

                alert(
                    "Checkout engine ready for backend integration. Your cart contains " +
                    calculateCartCount() +
                    " item(s)."
                );

            }
        );

}


/* =========================================================
   33. EQUITY CALCULATOR
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
        !amount &&
        !requestedPercentage
    ) {

        showCalculatorMessage(
            "Enter an amount or an equity percentage."
        );

        return;

    }


    let html = "";


    /*
     * If amount is supplied,
     * calculate the corresponding
     * percentage of the stated
     * $758,000 equity figure.
     */

    if (amount > 0) {

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
                equity figure of ${formatCurrency(
                    AB_CONFIG.totalEquity
                )}.
            </p>

        `;

    }


    /*
     * If percentage is supplied,
     * calculate the corresponding
     * implied amount.
     */

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
                    ${formatCurrency(impliedValue)}
                </strong>

                <p>
                    A hypothetical ${requestedPercentage}%
                    allocation against the stated
                    ${formatCurrency(
                        AB_CONFIG.totalEquity
                    )} equity figure.
                </p>

            </div>

        `;

    }


    DOM.calculatorResult.innerHTML =
        html;

}


function showCalculatorMessage(
    message
) {

    if (!DOM.calculatorResult) {
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
   34. ANNOUNCEMENT BAR
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
   35. AUTO-HIDE HEADER
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


            /*
             * Don't hide the header
             * while the mobile menu,
             * search or cart is open.
             */

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
   36. CURRENT YEAR
   ========================================================= */

function initializeYear() {

    if (DOM.currentYear) {

        DOM.currentYear.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   37. PRODUCT CLICK
   =========================================================

   For now clicking the image/card gives us
   a simple product information experience.

   The next upgrade can turn this into a
   full product detail modal/page with:

   - Multiple product images
   - Size selector
   - Color selector
   - Quantity
   - Description
   - Related products
   - Add to bag
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


            /*
             * Don't trigger when the
             * Add to Bag button was clicked.
             */

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
                        item.id ===
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
   38. PRODUCT PREVIEW
   ========================================================= */

function showProductPreview(product) {

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


                <div class="ab-product-modal-image">

                    <img
                        id="previewImage"
                        src=""
                        alt=""
                    >

                </div>


                <div class="ab-product-modal-content">

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
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        addProductModalStyles(
            modal
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal ||
                    event.target.closest(
                        ".ab-product-modal-close"
                    )
                ) {

                    closeProductPreview();

                }

            }
        );

    }


    document.getElementById(
        "previewImage"
    ).src =
        product.image;


    document.getElementById(
        "previewImage"
    ).alt =
        product.name;


    document.getElementById(
        "previewCategory"
    ).textContent =
        product.category;


    document.getElementById(
        "previewName"
    ).textContent =
        product.name;


    document.getElementById(
        "previewPrice"
    ).textContent =
        formatCurrency(
            product.price
        );


    document.getElementById(
        "previewDescription"
    ).textContent =
        product.description;


    document.getElementById(
        "previewAdd"
    ).onclick =
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
   39. PRODUCT MODAL STYLES
   =========================================================

   We keep these here so you don't have to
   touch CSS just to test the product preview.
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
                1fr
                1fr;

            border-radius: 24px;

            background: #fff;

            color: #080808;

            box-shadow:
                0 30px 100px rgba(0,0,0,.35);

            transform: translateY(15px);

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

            background: rgba(255,255,255,.9);

            color: #080808;

            box-shadow:
                0 5px 20px rgba(0,0,0,.1);

        }


        @media(max-width:700px) {

            .ab-product-modal {

                grid-template-columns: 1fr;

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
   40. INITIALIZE EVERYTHING
   ========================================================= */

function initializeAreaBoyz() {

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

    updateNavigationState(
        state.currentPage
    );


    /*
     * If the user directly loads:
     *
     * #shop
     *
     * #investment
     *
     * etc.
     *
     * show that page immediately.
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
   41. START APPLICATION
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
