

const currencyFlags = {
  USD: "https://flagcdn.com/us.svg",
  EUR: "https://flagcdn.com/eu.svg",
  GBP: "https://flagcdn.com/gb.svg",
  GHS: "https://flagcdn.com/gh.svg",
  JPY: "https://flagcdn.com/jp.svg",
  AUD: "https://flagcdn.com/au.svg",
  CAD: "https://flagcdn.com/ca.svg",
  INR: "https://flagcdn.com/in.svg",
  CNY: "https://flagcdn.com/cn.svg",
  NZD: "https://flagcdn.com/nz.svg",
  CHF: "https://flagcdn.com/ch.svg",
  ZAR: "https://flagcdn.com/za.svg",
  KES: "https://flagcdn.com/ke.svg",
  NGN: "https://flagcdn.com/ng.svg",
  BRL: "https://flagcdn.com/br.svg",
  MXN: "https://flagcdn.com/mx.svg",
  SAR: "https://flagcdn.com/sa.svg",
  AED: "https://flagcdn.com/ae.svg",
  SEK: "https://flagcdn.com/se.svg",
  NOK: "https://flagcdn.com/no.svg",
  DKK: "https://flagcdn.com/dk.svg",
  SGD: "https://flagcdn.com/sg.svg",
  HKD: "https://flagcdn.com/hk.svg",
  KRW: "https://flagcdn.com/kr.svg",
  THB: "https://flagcdn.com/th.svg",
  PLN: "https://flagcdn.com/pl.svg",
  TRY: "https://flagcdn.com/tr.svg",
  RUB: "https://flagcdn.com/ru.svg",
  EGP: "https://flagcdn.com/eg.svg",
  PKR: "https://flagcdn.com/pk.svg",
};

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromAmount = document.getElementById("from-amount");
const toAmount = document.getElementById("to-amount");
const dateInput = document.querySelector(".date-input");
const today = new Date();
dateInput.value = today.toISOString().split("T")[0];
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");



function updateFlags() {
  fromFlag.src = currencyFlags[fromCurrency.value];
  toFlag.src = currencyFlags[toCurrency.value];
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(fromAmount.value);
  const date = dateInput.value;

  if (!amount || amount <= 0) {
    toAmount.value = "";
    return;
  }

   // Prevent future dates (API may fail)
  const todayISO = new Date().toISOString().split("T")[0];
  if (date > todayISO) date = todayISO;

  try {
    const url = `https://api.exchangerate.host/${date}?base=${from}&symbols=${to}`;
    console.log("API URL:", url);
    console.log("API Response:", data);

    if (data.rates && data.rates[to]) {console.log(url, data);
      const rate = data.rates[to];
      toAmount.value = (amount * rate).toFixed(4);
    } else {
      toAmount.value = "N/A";
    }
  } catch (err) {
    console.error(err);
    toAmount.value = "Error";
  }
}

[fromCurrency, toCurrency].forEach(sel =>
  sel.addEventListener("change", () => { updateFlags(); convertCurrency(); })
);

fromAmount.addEventListener("input", convertCurrency);
dateInput.addEventListener("change", convertCurrency);

// Initial load
updateFlags();
convertCurrency();
