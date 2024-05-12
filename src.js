const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchange");
let exchangeTxt = document.querySelector(".exchangeTxt");
let fromCurrency = document.querySelector("#from_currency");
let toCurrency = document.querySelector("#to_currency");
let arrow = document.querySelector("#arrow");

for (select of dropdowns) {
  for (currencyCode in countryList) {
    let newCurrency = document.createElement("option");
    newCurrency.innerText = currencyCode;
    newCurrency.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newCurrency.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newCurrency.selected = "selected";
    }
    select.append(newCurrency);
  }

  select.addEventListener("click", (e) => {
    // or 'change' , instead of 'click'
    updateFlag(e.target);
  });
}




arrow.addEventListener("click", function () {
  let tempCode = fromCurrency.value;
  console.log(tempCode);
  fromCurrency.value = toCurrency.value;
  console.log(fromCurrency.value);
  toCurrency.value = tempCode;
  console.log(tempCode);
  updateFlag(fromCurrency);
  updateFlag(toCurrency);
});

function updateFlag(e) {
  let currencyCode = e.value; // IN, US
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newSrc;
}

// till 1 hr 3 mins

btn.addEventListener("click", function (e) {
    e.preventDefault();
  updataExchangeRate();
});

async function updataExchangeRate (){
   
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue < 1 || amountValue === "") {
    amount.placeholder = "Please enter a valid amount ...";
  }

  console.log(fromCurrency.value, toCurrency.value);
  const baseUrl = `https://v6.exchangerate-api.com/v6/177f20a3d243e2b9c37893cc/latest/${fromCurrency.value}`;
  
  let response = await fetch(baseUrl);
  let data = await response.json();

  let exchangeRate = data.conversion_rates[toCurrency.value];

  let totalExchangedValue = amountValue * exchangeRate;
  console.log(totalExchangedValue);
  if (amountValue !== "") {
    exchangeTxt.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangedValue} ${toCurrency.value}`;
  }
}



/*
Remaining functionalities ->
        1. Swap the flags
        2. Inital values when reload 
        3. Host in Github Pages 
*/
