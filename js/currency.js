/* =========================================================
   AREA BOYZ ENTERPRISE
   Global Currency Engine
   ========================================================= */

const CURRENCY_CONFIG = {
  USD: {
    symbol: "$",
    name: "US Dollar",
    locale: "en-US"
  },

  EUR: {
    symbol: "€",
    name: "Euro",
    locale: "de-DE"
  },

  GBP: {
    symbol: "£",
    name: "British Pound",
    locale: "en-GB"
  },

  NGN: {
    symbol: "₦",
    name: "Nigerian Naira",
    locale: "en-NG"
  },

  CAD: {
    symbol: "C$",
    name: "Canadian Dollar",
    locale: "en-CA"
  },

  AUD: {
    symbol: "A$",
    name: "Australian Dollar",
    locale: "en-AU"
  },

  GHS: {
    symbol: "₵",
    name: "Ghanaian Cedi",
    locale: "en-GH"
  },

  ZAR: {
    symbol: "R",
    name: "South African Rand",
    locale: "en-ZA"
  }
};


/*
   Temporary display rates.

   IMPORTANT:
   These are NOT payment-processing rates.

   Later, we'll move live exchange-rate retrieval
   to the backend so customers cannot manipulate
   currency conversion from the browser.
*/

const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  NGN: 1321.42,
  CAD: 1.38,
  AUD: 1.52,
  GHS: 12.10,
  ZAR: 17.20
};


function getSelectedCurrency() {
  return localStorage.getItem("areaBoyzCurrency") || "USD";
}


function setSelectedCurrency(currency) {

  if (!CURRENCY_CONFIG[currency]) {
    console.warn("Unsupported currency:", currency);
    return;
  }

  localStorage.setItem("areaBoyzCurrency", currency);

  window.dispatchEvent(
    new CustomEvent("currencyChanged", {
      detail: currency
    })
  );

  updateCurrencyDisplay();
}


function convertCurrency(amountUSD, currency = getSelectedCurrency()) {

  const rate = CURRENCY_RATES[currency];

  if (!rate) {
    return amountUSD;
  }

  return amountUSD * rate;
}


function formatCurrency(amountUSD, currency = getSelectedCurrency()) {

  const config = CURRENCY_CONFIG[currency];

  if (!config) {
    currency = "USD";
  }

  return new Intl.NumberFormat(
    CURRENCY_CONFIG[currency].locale,
    {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2
    }
  ).format(
    convertCurrency(amountUSD, currency)
  );
}


function updateCurrencyDisplay() {

  const currency = getSelectedCurrency();

  document.querySelectorAll("[data-price-usd]").forEach(element => {

    const usdAmount = Number(
      element.dataset.priceUsd
    );

    if (!Number.isNaN(usdAmount)) {
      element.textContent =
        formatCurrency(usdAmount, currency);
    }
  });


  document.querySelectorAll("[data-currency-selector]")
    .forEach(selector => {

      selector.value = currency;

    });
}


document.addEventListener("DOMContentLoaded", () => {

  updateCurrencyDisplay();

});


window.addEventListener("currencyChanged", () => {

  updateCurrencyDisplay();

});
