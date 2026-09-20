/* =========================================================
   AREA BOYZ ENTERPRISE
   APP.JS — VERSION 6.1
   ========================================================= */

"use strict";

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
   HELPERS
   ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function money(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: CONFIG.currency,
        maximumFractionDigits: 2
    }).format(Number(value) || 0);
}

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function primaryCategory(category) {
    const map = {
        streetwear: "streetwear",
        hoodies: "streetwear",
        shirts: "streetwear",
        outerwear: "streetwear",
        bottoms: "streetwear",
        denim: "streetwear",
        footwear: "footwear",
        bags: "accessories",
        headwear: "accessories",
        accessories: "accessories",
        jewelry: "accessories",
        sets: "streetwear"
    };

    return map[category] || category;
}

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
   PRODUCT DATA
   ========================================================= */

const products = productNames.map((item, index) => {
    const [name, category, price] = item;
    const number = String(index + 1).padStart(3, "0");

    return {
        id: `product-${number}`,
        number,
        name,
        category,
        categoryName: categoryNames[category],
        price,
        image: `images/products/product-${number}.jpg`,
        slug: slugify(name),
        description: `${name} from the ${categoryNames[category]} collection by Area Boyz Enterprise.`,
        material: category === "jewelry"
            ? "Premium metal finish"
            : category === "footwear"
                ? "Premium engineered construction"
                : "Premium selected materials",
        fit: ["footwear", "jewelry", "accessories"].includes(category)
            ? "Designed for everyday use"
            : "Relaxed contemporary fit",
        care: "Follow product care instructions and store appropriately."
    };
});

/* =========================================================
   STATE
   ========================================================= */

const state = {
    currentPage: CONFIG.defaultPage,
    products: [...products],
    filteredProducts: [...products],
    activeFilter: "all",
    searchTerm: "",
    sort: "featured",
    cart: loadCart(),
    modalProduct: null,
    galleryImages: [],
    galleryIndex: 0
};

/* =========================================================
   CART STORAGE
   ========================================================= */

function loadCart() {
    try {
        const saved = localStorage.getItem(CONFIG.storageKey);
        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn("Unable to load cart:", error);
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.cart));
    } catch (error) {
        console.warn("Unable to save cart:", error);
    }
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function navigateTo(page, updateHash = true) {
    const allowedPages = [
        "home",
        "shop",
        "collections",
        "investment",
        "about",
        "contact"
    ];

    if (!allowedPages.includes(page)) {
        page = CONFIG.defaultPage;
    }

    state.currentPage = page;

    $$("[data-page-section]").forEach(section => {
        const active = section.id === page;

        section.classList.toggle("active", active);
        section.hidden = !active;
    });

    $$("[data-page]").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("data-page") === page
        );
    });

    if (updateHash) {
        history.replaceState(null, "", `#${page}`);
    }

    closeMobileMenu();
    closeSearch();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (page === "shop") {
        renderShop();
    }
}

function initNavigation() {
    $$("[data-page]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const page = link.getAttribute("data-page");

            if (page) {
                navigateTo(page);
            }
        });
    });

    window.addEventListener("hashchange", () => {
        const page = location.hash.replace("#", "") || "home";
        navigateTo(page, false);
    });

    const initialPage =
        location.hash.replace("#", "") || CONFIG.defaultPage;

    navigateTo(initialPage, false);
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMobileMenu() {
    const menu = $("#mobileMenu");
    const overlay = $("#menuOverlay");

    if (!menu) return;

    menu.classList.add("active", "open");

    if (overlay) {
        overlay.classList.add("active", "open");
    }

    document.body.classList.add("menu-open");
}

function closeMobileMenu() {
    const menu = $("#mobileMenu");
    const overlay = $("#menuOverlay");

    if (menu) {
        menu.classList.remove("active", "open");
    }

    if (overlay) {
        overlay.classList.remove("active", "open");
    }

    document.body.classList.remove("menu-open");
}

function initMobileMenu() {
    const toggle = $("#menuToggle");
    const close = $("#mobileMenuClose");
    const overlay = $("#menuOverlay");

    if (toggle) {
        toggle.addEventListener("click", event => {
            event.preventDefault();

            const menu = $("#mobileMenu");

            if (menu && menu.classList.contains("active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (close) {
        close.addEventListener("click", closeMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener("click", closeMobileMenu);
    }

    $$("#mobileMenu [data-page]").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
}

/* =========================================================
   HEADER AUTO HIDE
   ========================================================= */

function initHeader() {
    const header = $("#siteHeader");

    if (!header) return;

    let lastScroll = window.scrollY;
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (ticking) return;

        window.requestAnimationFrame(() => {
            const current = window.scrollY;

            if (current > 100 && current > lastScroll) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }

            if (current <= 30) {
                header.classList.remove("header-hidden");
            }

            lastScroll = current;
            ticking = false;
        });

        ticking = true;
    });
}

/* =========================================================
   SEARCH
   ========================================================= */

function openSearch() {
    const panel = $("#searchPanel");

    if (!panel) return;

    panel.classList.add("active", "open");

    const input = $("#productSearch");

    if (input) {
        setTimeout(() => input.focus(), 150);
    }
}

function closeSearch() {
    const panel = $("#searchPanel");

    if (panel) {
        panel.classList.remove("active", "open");
    }
}

function initSearch() {
    const toggle = $("#searchToggle");
    const close = $("#closeSearch");
    const input = $("#productSearch");

    if (toggle) {
        toggle.addEventListener("click", event => {
            event.preventDefault();
            openSearch();
        });
    }

    if (close) {
        close.addEventListener("click", closeSearch);
    }

    if (input) {
        input.addEventListener("input", event => {
            state.searchTerm = event.target.value.trim().toLowerCase();

            if (state.searchTerm) {
                navigateTo("shop");
            }

            renderShop();
        });

        input.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeSearch();
                input.blur();
            }
        });
    }
}

/* =========================================================
   FILTERS
   ========================================================= */

function initFilters() {
    $$(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";

            state.activeFilter = filter;

            $$(".filter-btn").forEach(item => {
                item.classList.toggle(
                    "active",
                    item === button
                );
            });

            renderShop();
        });
    });

    $$("[data-category]").forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;

            if (!category) return;

            state.activeFilter = category;
            navigateTo("shop");

            setTimeout(() => {
                $$(".filter-btn").forEach(button => {
                    button.classList.toggle(
                        "active",
                        button.dataset.filter === category
                    );
                });

                renderShop();
            }, 50);
        });
    });

    const sort = $("#sortProducts");

    if (sort) {
        sort.addEventListener("change", event => {
            state.sort = event.target.value;
            renderShop();
        });
    }
}

/* =========================================================
   PRODUCT FILTERING / SORTING
   ========================================================= */

function getFilteredProducts() {
    let result = [...products];

    if (state.activeFilter !== "all") {
        result = result.filter(product =>
            product.category === state.activeFilter ||
            primaryCategory(product.category) === state.activeFilter
        );
    }

    if (state.searchTerm) {
        result = result.filter(product => {
            const searchable = [
                product.name,
                product.category,
                product.categoryName,
                product.description
            ]
                .join(" ")
                .toLowerCase();

            return searchable.includes(state.searchTerm);
        });
    }

    switch (state.sort) {
        case "price-low":
        case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
        case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;

        case "name":
        case "name-asc":
            result.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "newest":
            result.reverse();
            break;

        default:
            break;
    }

    return result;
}

/* =========================================================
   PRODUCT IMAGE SYSTEM
   ========================================================= */

function productImage(product) {
    return product.image;
}

function imageExists(url) {
    return new Promise(resolve => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;
    });
}

function fallbackImageHTML(product, extraClass = "") {
    return `
        <div class="product-image-placeholder ${extraClass}">
            <span>AREA BOYZ</span>
            <small>${escapeHTML(product.categoryName)}</small>
        </div>
    `;
}

function createProductImage(product, extraClass = "") {
    return `
        <img
            class="product-image ${extraClass}"
            src="${escapeHTML(productImage(product))}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        >
        ${fallbackImageHTML(product)}
    `;
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCard(product) {
    return `
        <article class="product-card" data-product-id="${product.id}">

            <button
                class="product-card-image"
                type="button"
                data-product="${product.id}"
                aria-label="View ${escapeHTML(product.name)}"
            >
                ${createProductImage(product)}
            </button>

            <div class="product-card-info">

                <span class="product-category">
                    ${escapeHTML(product.categoryName)}
                </span>

                <h3>${escapeHTML(product.name)}</h3>

                <p class="product-price">
                    ${money(product.price)}
                </p>

                <div class="product-card-actions">

                    <button
                        class="btn btn-small"
                        type="button"
                        data-add-cart="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="product-view"
                        type="button"
                        data-product="${product.id}"
                    >
                        View
                    </button>

                </div>

            </div>
        </article>
    `;
}

/* =========================================================
   FEATURED PRODUCTS
   ========================================================= */

function renderFeatured() {
    const container = $("#featuredProducts");

    if (!container) return;

    const featured = products.slice(0, 8);

    container.innerHTML = featured
        .map(productCard)
        .join("");

    bindProductActions(container);
}

/* =========================================================
   SHOP
   ========================================================= */

function renderShop() {
    const container = $("#shopProducts");

    if (!container) return;

    state.filteredProducts = getFilteredProducts();

    if (!state.filteredProducts.length) {
        container.innerHTML = `
            <div class="empty-products">
                <h3>No products found</h3>
                <p>
                    Try another search term or choose another category.
                </p>
                <button
                    class="btn"
                    type="button"
                    id="clearProductSearch"
                >
                    View All Products
                </button>
            </div>
        `;

        const clear = $("#clearProductSearch");

        if (clear) {
            clear.addEventListener("click", () => {
                state.searchTerm = "";
                state.activeFilter = "all";

                const input = $("#productSearch");

                if (input) input.value = "";

                $$(".filter-btn").forEach(button => {
                    button.classList.toggle(
                        "active",
                        button.dataset.filter === "all"
                    );
                });

                renderShop();
            });
        }

        return;
    }

    container.innerHTML = state.filteredProducts
        .map(productCard)
        .join("");

    bindProductActions(container);
}

/* =========================================================
   PRODUCT ACTIONS
   ========================================================= */

function bindProductActions(parent = document) {

    $$("[data-product]", parent).forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const id = button.dataset.product;
            openProductModal(id);
        });
    });

    $$("[data-add-cart]", parent).forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const id = button.dataset.addCart;

            addToCart(id, 1);
        });
    });
}

/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function createModal() {
    if ($("#productModal")) return;

    const modal = document.createElement("div");

    modal.id = "productModal";
    modal.className = "product-modal";

    modal.innerHTML = `
        <div class="product-modal-backdrop" data-close-modal></div>

        <div class="product-modal-dialog" role="dialog" aria-modal="true">

            <button
                class="product-modal-close"
                type="button"
                data-close-modal
                aria-label="Close product"
            >
                &times;
            </button>

            <div id="productModalContent"></div>

        </div>
    `;

    document.body.appendChild(modal);

    $$("[data-close-modal]", modal).forEach(button => {
        button.addEventListener("click", closeProductModal);
    });

    modal.addEventListener("click", event => {
        const add = event.target.closest("[data-modal-add]");

        if (add) {
            addToCart(add.dataset.modalAdd, 1);
        }

        const prev = event.target.closest("[data-gallery-prev]");
        const next = event.target.closest("[data-gallery-next]");

        if (prev) {
            changeGallery(-1);
        }

        if (next) {
            changeGallery(1);
        }
    });
}

async function getGallery(product) {
    const images = [];

    const base = `images/products/product-${product.number}`;

    const possible = [
        `${base}.jpg`,
        `${base}-2.jpg`,
        `${base}-3.jpg`,
        `${base}-4.jpg`,
        `${base}-5.jpg`
    ];

    for (const image of possible) {
        if (await imageExists(image)) {
            images.push(image);
        }
    }

    if (!images.length) {
        images.push(product.image);
    }

    return images;
}

async function openProductModal(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    createModal();

    const modal = $("#productModal");
    const content = $("#productModalContent");

    if (!modal || !content) return;

    state.modalProduct = product;
    state.galleryImages = [];
    state.galleryIndex = 0;

    modal.classList.add("active", "open");
    document.body.classList.add("modal-open");

    content.innerHTML = `
        <div class="product-loading">
            Loading product...
        </div>
    `;

    state.galleryImages = await getGallery(product);

    renderProductModal();

    document.addEventListener(
        "keydown",
        handleModalEscape,
        { once: true }
    );
}

function renderProductModal() {
    const product = state.modalProduct;
    const content = $("#productModalContent");

    if (!product || !content) return;

    const currentImage =
        state.galleryImages[state.galleryIndex] ||
        product.image;

    const thumbnails = state.galleryImages
        .map((image, index) => `
            <button
                class="gallery-thumb ${index === state.galleryIndex ? "active" : ""}"
                type="button"
                data-gallery-index="${index}"
            >
                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(product.name)} ${index + 1}"
                    onerror="this.style.display='none'"
                >
            </button>
        `)
        .join("");

    content.innerHTML = `
        <div class="product-detail">

            <div class="product-gallery">

                <div class="gallery-main">

                    <img
                        src="${escapeHTML(currentImage)}"
                        alt="${escapeHTML(product.name)}"
                        id="galleryMainImage"
                        onerror="this.style.display='none'"
                    >

                    ${
                        state.galleryImages.length > 1
                            ? `
                                <button
                                    class="gallery-arrow gallery-prev"
                                    type="button"
                                    data-gallery-prev
                                    aria-label="Previous image"
                                >
                                    &#10094;
                                </button>

                                <button
                                    class="gallery-arrow gallery-next"
                                    type="button"
                                    data-gallery-next
                                    aria-label="Next image"
                                >
                                    &#10095;
                                </button>
                            `
                            : ""
                    }

                </div>

                ${
                    state.galleryImages.length > 1
                        ? `
                            <div class="gallery-thumbnails">
                                ${thumbnails}
                            </div>
                        `
                        : ""
                }

            </div>

            <div class="product-detail-info">

                <span class="product-category">
                    ${escapeHTML(product.categoryName)}
                </span>

                <h2>${escapeHTML(product.name)}</h2>

                <div class="product-detail-price">
                    ${money(product.price)}
                </div>

                <p class="product-description">
                    ${escapeHTML(product.description)}
                </p>

                <div class="product-specs">

                    <div>
                        <strong>Material</strong>
                        <span>${escapeHTML(product.material)}</span>
                    </div>

                    <div>
                        <strong>Fit</strong>
                        <span>${escapeHTML(product.fit)}</span>
                    </div>

                    <div>
                        <strong>Care</strong>
                        <span>${escapeHTML(product.care)}</span>
                    </div>

                </div>

                <button
                    class="btn btn-primary product-modal-cart"
                    type="button"
                    data-modal-add="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        </div>
    `;

    $$("[data-gallery-index]", content).forEach(button => {
        button.addEventListener("click", () => {
            state.galleryIndex =
                Number(button.dataset.galleryIndex);

            renderProductModal();
        });
    });
}

function changeGallery(direction) {
    if (state.galleryImages.length <= 1) return;

    state.galleryIndex += direction;

    if (state.galleryIndex < 0) {
        state.galleryIndex =
            state.galleryImages.length - 1;
    }

    if (state.galleryIndex >= state.galleryImages.length) {
        state.galleryIndex = 0;
    }

    renderProductModal();
}

function closeProductModal() {
    const modal = $("#productModal");

    if (!modal) return;

    modal.classList.remove("active", "open");
    document.body.classList.remove("modal-open");

    state.modalProduct = null;
}

function handleModalEscape(event) {
    if (event.key === "Escape") {
        closeProductModal();
    }
}

/* =========================================================
   CART
   ========================================================= */

function addToCart(productId, quantity = 1) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existing = state.cart.find(
        item => item.id === productId
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        state.cart.push({
            id: product.id,
            quantity
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart`);

    openCartDrawer();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(
        item => item.id !== productId
    );

    saveCart();
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = state.cart.find(
        cartItem => cartItem.id === productId
    );

    if (!item) return;

    item.quantity = Math.max(1, Number(quantity) || 1);

    saveCart();
    updateCartUI();
}

function cartDetailedItems() {
    return state.cart
        .map(item => {
            const product = products.find(
                product => product.id === item.id
            );

            if (!product) return null;

            return {
                ...product,
                quantity: item.quantity,
                subtotal: product.price * item.quantity
            };
        })
        .filter(Boolean);
}

function cartTotal() {
    return cartDetailedItems()
        .reduce(
            (total, item) => total + item.subtotal,
            0
        );
}

function cartCount() {
    return state.cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

function updateCartUI() {
    const count = $("#cartCount");
    const total = $("#cartTotal");
    const items = $("#cartItems");

    if (count) {
        count.textContent = cartCount();
    }

    if (total) {
        total.textContent = money(cartTotal());
    }

    if (!items) return;

    const detailed = cartDetailedItems();

    if (!detailed.length) {
        items.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add something from the collection.</p>
            </div>
        `;

        return;
    }

    items.innerHTML = detailed
        .map(item => `
            <div class="cart-item">

                <div class="cart-item-image">
                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        onerror="this.style.display='none'"
                    >
                </div>

                <div class="cart-item-info">

                    <h4>${escapeHTML(item.name)}</h4>

                    <span>${money(item.price)}</span>

                    <div class="cart-item-controls">

                        <button
                            type="button"
                            data-cart-minus="${item.id}"
                        >
                            −
                        </button>

                        <strong>${item.quantity}</strong>

                        <button
                            type="button"
                            data-cart-plus="${item.id}"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            class="cart-remove"
                            data-cart-remove="${item.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `)
        .join("");

    $$("[data-cart-minus]", items).forEach(button => {
        button.addEventListener("click", () => {
            const item = state.cart.find(
                cartItem =>
                    cartItem.id === button.dataset.cartMinus
            );

            if (!item) return;

            updateCartQuantity(
                item.id,
                item.quantity - 1
            );
        });
    });

    $$("[data-cart-plus]", items).forEach(button => {
        button.addEventListener("click", () => {
            const item = state.cart.find(
                cartItem =>
                    cartItem.id === button.dataset.cartPlus
            );

            if (!item) return;

            updateCartQuantity(
                item.id,
                item.quantity + 1
            );
        });
    });

    $$("[data-cart-remove]", items).forEach(button => {
        button.addEventListener("click", () => {
            removeFromCart(button.dataset.cartRemove);
        });
    });
}

/* =========================================================
   CART DRAWER
   ========================================================= */

function openCartDrawer() {
    const drawer = $("#cartDrawer");
    const overlay = $("#cartOverlay");

    if (drawer) {
        drawer.classList.add("active", "open");
    }

    if (overlay) {
        overlay.classList.add("active", "open");
    }

    document.body.classList.add("cart-open");
}

function closeCartDrawer() {
    const drawer = $("#cartDrawer");
    const overlay = $("#cartOverlay");

    if (drawer) {
        drawer.classList.remove("active", "open");
    }

    if (overlay) {
        overlay.classList.remove("active", "open");
    }

    document.body.classList.remove("cart-open");
}

function initCart() {
    const button = $("#cartButton");
    const close = $("#cartClose");
    const overlay = $("#cartOverlay");
    const checkout = $("#checkoutButton");

    if (button) {
        button.addEventListener("click", event => {
            event.preventDefault();
            openCartDrawer();
        });
    }

    if (close) {
        close.addEventListener("click", closeCartDrawer);
    }

    if (overlay) {
        overlay.addEventListener("click", closeCartDrawer);
    }

    if (checkout) {
        checkout.addEventListener("click", () => {
            if (!state.cart.length) {
                showToast("Your cart is empty");
                return;
            }

            showToast(
                "Checkout connection will be added next."
            );
        });
    }

    updateCartUI();
}

/* =========================================================
   EQUITY CALCULATOR
   ========================================================= */

function initEquityCalculator() {
    const amountInput = $("#investmentAmount");
    const percentageInput = $("#equityPercentage");
    const button = $("#calculateEquity");
    const result = $("#calculatorResult");

    if (!button || !result) return;

    button.addEventListener("click", () => {
        const investment =
            Number(amountInput?.value) || 0;

        let percentage =
            Number(percentageInput?.value) || 0;

        if (investment > 0 && percentage <= 0) {
            percentage =
                (investment / CONFIG.totalEquity) * 100;
        }

        if (percentage > 100) {
            percentage = 100;
        }

        const impliedValue =
            (percentage / 100) * CONFIG.totalEquity;

        result.innerHTML = `
            <div class="calculator-result-content">

                <strong>
                    ${percentage.toFixed(2)}% Equity
                </strong>

                <span>
                    Estimated equity value:
                    ${money(impliedValue)}
                </span>

            </div>
        `;

        if (percentageInput) {
            percentageInput.value =
                percentage.toFixed(2);
        }
    });
}

/* =========================================================
   ANNOUNCEMENT
   ========================================================= */

function initAnnouncement() {
    const close = $("#announcementClose");

    if (!close) return;

    close.addEventListener("click", () => {
        const announcement =
            close.closest(".announcement");

        if (announcement) {
            announcement.classList.add("hidden");
        }
    });
}

/* =========================================================
   TOAST
   ========================================================= */

function createToast() {
    if ($("#areaBoyzToast")) return;

    const toast = document.createElement("div");

    toast.id = "areaBoyzToast";
    toast.className = "area-boyz-toast";

    document.body.appendChild(toast);
}

let toastTimer = null;

function showToast(message) {
    createToast();

    const toast = $("#areaBoyzToast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("active");
    }, 2600);
}

/* =========================================================
   HERO SLIDESHOW
   ========================================================= */

function initHeroSlideshow() {
    const slides = $$(".hero-slide");
    const dots = $$(".hero-dot");

    if (!slides.length) return;

    let currentSlide = 0;
    let timer = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle(
                "active",
                i === index
            );
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === index
            );
        });

        currentSlide = index;
    }

    function nextSlide() {
        showSlide(
            (currentSlide + 1) % slides.length
        );
    }

    function restartTimer() {
        clearInterval(timer);

        timer = setInterval(
            nextSlide,
            5000
        );
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            restartTimer();
        });
    });

    showSlide(0);
    restartTimer();
}

/* =========================================================
   YEAR
   ========================================================= */

function updateYear() {
    const year = $("#currentYear");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }
}

/* =========================================================
   KEYBOARD
   ========================================================= */

function initKeyboard() {
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
            closeSearch();
            closeCartDrawer();
            closeProductModal();
        }

        if (
            event.key === "/" &&
            document.activeElement?.tagName !== "INPUT" &&
            document.activeElement?.tagName !== "TEXTAREA"
        ) {
            event.preventDefault();
            openSearch();
        }
    });
}

/* =========================================================
   DYNAMIC SAFETY CSS
   ========================================================= */

function injectSafetyCSS() {
    if ($("#areaBoyzRuntimeCSS")) return;

    const style = document.createElement("style");

    style.id = "areaBoyzRuntimeCSS";

    style.textContent = `
        [data-page-section][hidden] {
            display: none !important;
        }

        .header-hidden {
            transform: translateY(-110%);
        }

        .product-image-placeholder {
            display: none;
            width: 100%;
            height: 100%;
            min-height: 220px;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 8px;
            background: #111;
            color: #f5c400;
            text-align: center;
        }

        .product-image-placeholder span {
            font-weight: 800;
            letter-spacing: .12em;
        }

        .product-image-placeholder small {
            opacity: .65;
        }

        .search-panel.active,
        .search-panel.open {
            display: block;
        }

        .cart-drawer.active,
        .cart-drawer.open {
            visibility: visible;
            transform: translateX(0);
        }

        .cart-overlay.active,
        .cart-overlay.open {
            opacity: 1;
            visibility: visible;
        }

        .product-modal {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: none;
        }

        .product-modal.active,
        .product-modal.open {
            display: block;
        }

        .product-modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.78);
        }

        .product-modal-dialog {
            position: relative;
            z-index: 2;
            width: min(1100px, 94vw);
            max-height: 92vh;
            overflow: auto;
            margin: 4vh auto;
            background: #fff;
            color: #111;
            border-radius: 18px;
            padding: 28px;
        }

        .product-modal-close {
            position: absolute;
            right: 15px;
            top: 12px;
            z-index: 5;
            width: 42px;
            height: 42px;
            border: 0;
            border-radius: 50%;
            background: #111;
            color: #fff;
            font-size: 28px;
            cursor: pointer;
        }

        .product-detail {
            display: grid;
            grid-template-columns: 1.1fr .9fr;
            gap: 35px;
            padding-top: 15px;
        }

        .gallery-main {
            position: relative;
            min-height: 420px;
            background: #f4f4f4;
            border-radius: 14px;
            overflow: hidden;
        }

        .gallery-main img {
            width: 100%;
            height: 100%;
            min-height: 420px;
            object-fit: cover;
            display: block;
        }

        .gallery-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border: 0;
            border-radius: 50%;
            background: rgba(0,0,0,.7);
            color: #fff;
            cursor: pointer;
            font-size: 20px;
        }

        .gallery-prev {
            left: 12px;
        }

        .gallery-next {
            right: 12px;
        }

        .gallery-thumbnails {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            overflow-x: auto;
        }

        .gallery-thumb {
            width: 72px;
            height: 72px;
            padding: 0;
            border: 2px solid transparent;
            background: #eee;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            flex: 0 0 auto;
        }

        .gallery-thumb.active {
            border-color: #f5c400;
        }

        .gallery-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .product-detail-info {
            padding: 25px 10px;
        }

        .product-detail-info h2 {
            font-size: clamp(28px, 4vw, 48px);
            margin: 8px 0 15px;
        }

        .product-detail-price {
            font-size: 25px;
            font-weight: 800;
            margin-bottom: 20px;
        }

        .product-description {
            line-height: 1.7;
            opacity: .75;
        }

        .product-specs {
            display: grid;
            gap: 14px;
            margin: 25px 0;
        }

        .product-specs div {
            display: grid;
            gap: 4px;
            padding-bottom: 12px;
            border-bottom: 1px solid #ddd;
        }

        .product-specs span {
            opacity: .7;
        }

        .area-boyz-toast {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 10000;
            max-width: min(360px, calc(100vw - 40px));
            padding: 14px 18px;
            border-radius: 10px;
            background: #111;
            color: #fff;
            border-left: 4px solid #f5c400;
            transform: translateY(120px);
            opacity: 0;
            transition: .3s ease;
            pointer-events: none;
        }

        .area-boyz-toast.active {
            transform: translateY(0);
            opacity: 1;
        }

        .empty-products,
        .empty-cart,
        .product-loading {
            padding: 50px 20px;
            text-align: center;
        }

        body.modal-open,
        body.cart-open,
        body.menu-open {
            overflow: hidden;
        }

        @media (max-width: 800px) {
            .product-detail {
                grid-template-columns: 1fr;
                gap: 10px;
            }

            .gallery-main,
            .gallery-main img {
                min-height: 320px;
            }

            .product-modal-dialog {
                width: 96vw;
                margin: 2vh auto;
                padding: 18px;
            }
        }
    `;

    document.head.appendChild(style);
}

/* =========================================================
   PRELOADER
   ========================================================= */

function initPreloader() {
    const preloader = $("#preloader");

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("loaded");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 700);
    }, CONFIG.preloaderDuration);

    setTimeout(() => {
        preloader.classList.add("loaded");
        preloader.style.display = "none";
    }, 5000);
}

/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

function initImageFallbacks() {
    document.addEventListener("error", event => {
        const image = event.target;

        if (
            image &&
            image.tagName === "IMG" &&
            image.classList.contains("product-image")
        ) {
            image.style.display = "none";
        }
    }, true);
}

/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function initApp() {

    try {
        injectSafetyCSS();

        initPreloader();

        initNavigation();

        initMobileMenu();

        initHeader();

        initSearch();

        initFilters();

        initCart();

        initEquityCalculator();

        initAnnouncement();

        initHeroSlideshow();

        initKeyboard();

        initImageFallbacks();

        createModal();

        renderFeatured();

        renderShop();

        updateCartUI();

        updateYear();

        console.log(
            `Area Boyz Enterprise — App 6.1 loaded successfully. ${products.length} products ready.`
        );

    } catch (error) {
        console.error(
            "Area Boyz App initialization error:",
            error
        );
    }
}

/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initApp
    );
} else {
    initApp();
    }
