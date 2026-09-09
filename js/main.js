/* Area Boyz Enterprise - Core Interactions */

// ========== CART SYSTEM ==========
const CART_KEY = 'areaboyz_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(function(item) {
    return item.id === product.id;
  });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }
  saveCart(cart);
  showToast(product.name + ' added to cart');
}

function removeFromCart(id) {
  const cart = getCart().filter(function(item) {
    return item.id !== id;
  });
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(function(i) {
    return i.id === id;
  });
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce(function(sum, item) {
    return sum + (item.price * item.qty);
  }, 0);
}

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count');
  const total = getCart().reduce(function(s, i) {
    return s + i.qty;
  }, 0);
  countEls.forEach(function(el) {
    el.textContent = total;
    el.style.display = total > 0 ? 'grid' : 'none';
  });
}

// ========== TOAST ==========
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
  }, 2800);
}

// ========== HERO SLIDER ==========
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  const nextBtn = document.querySelector('.hero-nav.next');
  const prevBtn = document.querySelector('.hero-nav.prev');

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      next();
      resetTimer();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prev();
      resetTimer();
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      goTo(i);
      resetTimer();
    });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  resetTimer();
}

// ========== MOBILE NAV ==========
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
  });

  const navLinks = links.querySelectorAll('a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('open');
    });
  });

  window.addEventListener('scroll', function() {
    if (links.classList.contains('open')) {
      links.classList.remove('open');
    }
  });
}

// ========== PRODUCT DATA ==========
const PRODUCTS = [
  { id: 'p1', name: 'Emerald Brocade Vest Ensemble', category: 'Formal', price: 890, img: 'images/formal-green-vest.jpg' },
  { id: 'p2', name: 'Black Mandarin Collar Suit', category: 'Formal', price: 1250, img: 'images/black-mandarin-suit.jpg' },
  { id: 'p3', name: 'Nike Air Force 1 Blue Patent', category: 'Footwear', price: 220, img: 'images/nike-blue-af1-1.jpg' },
  { id: 'p4', name: 'Chanel Beige Anorak', category: 'Outerwear', price: 3200, img: 'images/chanel-beige-jacket.jpg' },
  { id: 'p5', name: 'Polka Dot & Pink Pleated Set', category: 'Contemporary', price: 480, img: 'images/polka-pink-outfit.jpg' },
  { id: 'p6', name: 'Dior Gray Leather Vest', category: 'Luxury', price: 2750, img: 'images/dior-gray-vest.jpg' },
  { id: 'p7', name: 'Lace-Trim Wide-Leg Jeans', category: 'Denim', price: 340, img: 'images/lace-jeans-full.jpg' },
  { id: 'p8', name: 'Marvel Varsity Collection', category: 'Streetwear', price: 420, img: 'images/marvel-varsity-jackets.jpg' },
  { id: 'p9', name: 'Spider-Man Comic Tee', category: 'Streetwear', price: 85, img: 'images/spiderman-tshirt.jpg' },
  { id: 'p10', name: 'Red Spider Hoodie', category: 'Streetwear', price: 195, img: 'images/spiderman-hoodie.jpg' },
  { id: 'p11', name: 'Zipper Utility Cap', category: 'Accessories', price: 65, img: 'images/zipper-cap.jpg' },
  { id: 'p12', name: 'Black Gold Branch Suit', category: 'Couture', price: 1850, img: 'images/black-gold-suit.jpg' },
  { id: 'p13', name: 'Ivory Bamboo Suit', category: 'Couture', price: 1680, img: 'images/white-bamboo-suit.jpg' },
  { id: 'p14', name: 'Gold Mirror Vest Look', category: 'Avant-Garde', price: 980, img: 'images/gold-vest-outfit.jpg' },
  { id: 'p15', name: 'Cyber Geometric Coat', category: 'Avant-Garde', price: 1450, img: 'images/blue-patterned-coat.jpg' },
  { id: 'p16', name: 'Charcoal Pleated Trousers', category: 'Bottoms', price: 290, img: 'images/gray-pleated-pants.jpg' }
];

// ========== RENDER PRODUCTS ==========
function renderProducts(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let list = PRODUCTS;
  if (limit) {
    list = list.slice(0, limit);
  }

  let html = '';

  list.forEach(function(p) {
    const badge = p.price > 1000 ? '<span class="product-badge">Luxury</span>' : '';

    html += '<article class="product-card">';
    html += '<div class="product-img">';
    html += '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">';
    html += badge;
    html += '</div>';
    html += '<div class="product-info">';
    html += '<div class="product-category">' + p.category + '</div>';
    html += '<h3 class="product-name">' + p.name + '</h3>';
    html += '<div class="product-price">';
    html += '<span class="price">$' + p.price.toLocaleString() + '</span>';
    html += '<button class="add-to-cart" data-id="' + p.id + '">＋</button>';
    html += '</div></div></article>';
  });

  container.innerHTML = html;

  const buttons = container.querySelectorAll('.add-to-cart');
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const product = PRODUCTS.find(function(p) {
        return p.id === id;
      });
      if (product) {
        addToCart(product);
      }
    });
  });
}

// ========== CART PAGE ==========
function renderCartPage() {
  const tbody = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!tbody) return;

  const cart = getCart();

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:3rem;color:#a0a0b0;">Your cart is empty. <a href="shop.html" style="color:#00f0ff;">Browse the collection</a></td></tr>';
    if (summary) summary.innerHTML = '';
    return;
  }

  let html = '';
  cart.forEach(function(item) {
    html += '<tr>';
    html += '<td><img src="' + item.img + '" alt="' + item.name + '" class="cart-item-img"></td>';
    html += '<td><strong>' + item.name + '</strong><br><small style="color:#a0a0b0;">' + item.category + '</small></td>';
    html += '<td>$' + item.price.toLocaleString() + '</td>';
    html += '<td><div class="qty-control">';
    html += '<button data-id="' + item.id + '" data-delta="-1">−</button>';
    html += '<span>' + item.qty + '</span>';
    html += '<button data-id="' + item.id + '" data-delta="1">+</button>';
    html += '</div></td>';
    html += '<td>$' + (item.price * item.qty).toLocaleString() + '</td>';
    html += '</tr>';
  });

  tbody.innerHTML = html;

  const qtyButtons = tbody.querySelectorAll('.qty-control button');
  qtyButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const id = btn.getAttribute('data-id');
      const delta = parseInt(btn.getAttribute('data-delta'));
      updateQty(id, delta);
      renderCartPage();
    });
  });

  const total = getCartTotal();
  if (summary) {
    summary.innerHTML = 
      '<h3 style="margin-bottom:1.25rem">Order Summary</h3>' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:0.75rem"><span style="color:#a0a0b0">Subtotal</span><span>$' + total.toLocaleString() + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;margin-bottom:0.75rem"><span style="color:#a0a0b0">Shipping</span><span>Calculated at checkout</span></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:1.25rem;font-weight:700;margin:1.25rem 0;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.08)"><span>Total</span><span style="color:#00f0ff">$' + total.toLocaleString() + '</span></div>' +
      '<a href="checkout.html" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Proceed to Checkout</a>';
  }
}

// ========== SHARES CALCULATOR ==========
function initSharesCalc() {
  const input = document.getElementById('share-amount');
  const result = document.getElementById('calc-result');
  if (!input || !result) return;

  const TOTAL = 756000;

  function calculate() {
    const amount = parseFloat(input.value) || 0;
    if (amount < 100) {
      result.innerHTML = '<p style="color:#a0a0b0">Minimum investment: $100</p>';
      return;
    }

    let rate = 0.09;
    if (amount >= 50000) rate = 0.18;
    else if (amount >= 20000) rate = 0.15;
    else if (amount >= 5000) rate = 0.12;

    const annual = amount * rate;
    const ownership = ((amount / TOTAL) * 100).toFixed(4);

    result.innerHTML = 
      '<div class="value">$' + annual.toLocaleString(undefined, {maximumFractionDigits: 0}) + '</div>' +
      '<p style="margin:0.5rem 0;color:#a0a0b0">Projected annual return (' + (rate * 100) + '%)</p>' +
      '<p style="font-size:0.9rem;color:#a0a0b0">Ownership: ' + ownership + '% of company equity pool</p>';
  }

  input.addEventListener('input', calculate);
  calculate();
}

// ========== CHECKOUT ==========
function initCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const totalEl = document.getElementById('checkout-total');
  if (totalEl) {
    totalEl.textContent = '$' + getCartTotal().toLocaleString();
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (getCart().length === 0) {
      showToast('Your cart is empty');
      return;
    }
    showToast('Payment successful! Order confirmed.');
    localStorage.removeItem(CART_KEY);
    updateCartUI();
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 1800);
  });
}

// ========== START EVERYTHING ==========
document.addEventListener('DOMContentLoaded', function() {
  updateCartUI();
  initSlider();
  initMobileNav();
  initSharesCalc();
  initCheckout();

  renderProducts('featured-products', 8);
  renderProducts('shop-products');
  renderCartPage();

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });
});
