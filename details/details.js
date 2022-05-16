
let add = document.getElementById('plus');
let remove = document.getElementById('minus');
let price = document.getElementById('originalPice');
let total = document.getElementById('totalPrice');
let title = document.getElementById('productTitle')
let description = document.getElementById('productDesc')
let category = document.getElementById('productCategory')
let image = document.getElementById('productImage')
let int = document.getElementById('amount');
let buy = document.getElementById('buy');
let addCart = document.getElementById('add');
let currencySymbol = document.getElementById('priceTag');
let buyMsg = document.getElementById('buyMsg');


let id = document.location.href.split('=')[1];
(async function getDataDetails() {
  
  let productDetails = `http://127.0.0.1:3000/api/v1/products/${id}`
  try {
    const response = await fetch(productDetails)
    const data = await response.json()
    console.log(data)
    displayDetails(data);
  } catch (e) {
    console.log("error", e.message)
  }
})();


let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));

//fetch currencies and exchange prices 
let Currency,
  rate = 1,
  symbol = '$',
  timer;
if (unknown.Currency == '') {
  Currency = 'USD'
  timer = 0
} else {
  timer = 300
  Currency = unknown.Currency
  symbol = Currency
  let from = "USD",
    to = Currency;

  (async function getData() {
    try {
      const response = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=1.0`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "6155594c89msh387173eac4635c0p108063jsnee1a9a20e441",
          "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
        }
      })
      const data = await response.json()
      rate = data;
    } catch (e) {
      console.log("error", e.message)
    }
  })()
}


let priceTotal
let currencyDiv = document.createElement('div')


function displayDetails(data) {
  currencySymbol.textContent = symbol
  image.setAttribute('src', `http://127.0.0.1:3000/${data.image}`)
  category.textContent = data.category
  title.textContent = data.title
  description.textContent = data.description
  let exchangePrice = data.price * rate
  price.textContent = exchangePrice.toFixed(2)
  priceTotal = parseFloat(price.textContent);
  currencyDiv.setAttribute('id', 'priceTag')
  currencyDiv.textContent = currencySymbol.textContent
  total.textContent = price.textContent
  total.insertBefore(currencyDiv,total.childNodes[0])
}

let number = 1;
// to add an item.
add.addEventListener('click', () => {
  number += 1;
  priceTotal += parseFloat(price.textContent);
  int.textContent = number;
  total.childNodes[1].textContent = priceTotal.toFixed(2);
})

// to remove an item.
remove.addEventListener('click', () => {
  if (number > 1) {
    number -= 1;
    priceTotal -= parseFloat(price.textContent);
    int.textContent = number;
    total.childNodes[1].textContent = priceTotal.toFixed(2);
  }

})

//add the product into object and storage it into loacal storage
function addToCart() {
  unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));


  let cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
  cart.push({id:parseInt(id),quantity:number})
  localStorage.setItem("cart", JSON.stringify(cart));
}

addCart.addEventListener('click', () => {
  addToCart()
  location.href = '../cart/cart.html'
})

buy.addEventListener('click', () => {
  let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
  if (unknown.Name === '') {
    window.location.href = '../createAccount/createAccount.html'
  } else
    buyMsg.style.display = 'block'
})
