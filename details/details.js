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

let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));



//fetch currencies and exchange prices 
unknown.Currency = 'USD'
let Currency,
  rate = 1,
  symbol = '$';
if (unknown.Currency == '') Currency = 'USD'
else {
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
      console.log(rate)
    } catch (e) {
      console.log("error", e.message)
    }
  })()
}



let priceTotal

// to get the producat information and display iton the page.
let data = localStorage.getItem("data") === null ? [] : JSON.parse(localStorage.getItem("data"));
console.log(data)
function displayDetails(data) {
    currencySymbol.textContent = symbol
    image.setAttribute('src', `${data.image}`)
    category.textContent = data.category
    title.textContent = data.title 
    description.textContent = data.description
    let exchangePrice = data.price * rate 
    price.textContent = exchangePrice.toFixed(2) 
    priceTotal = parseInt(price.textContent);
    console.log(price.textContent)
    total.textContent = price.textContent
    let currencyDiv = document.createElement('div')
    currencyDiv.setAttribute('id', 'priceTag')
    currencyDiv.textContent = currencySymbol.textContent
    total.appendChild(currencyDiv)

}


let number = 1;

// to add an item.
add.addEventListener('click', () =>{
    number += 1;
    priceTotal += parseInt(price.textContent);
    int.textContent = number;
    total.textContent = priceTotal;
    let currencyDiv = document.createElement('div')
    currencyDiv.setAttribute('id', 'priceTag')
    currencyDiv.textContent = currencySymbol.textContent
    total.appendChild(currencyDiv)
})

// to remove an item.
remove.addEventListener('click', () =>{
    if(number > 1 ){
        number -=1;
        priceTotal -= parseInt(price.textContent);
        int.textContent = number;
        total.textContent = priceTotal;
        let currencyDiv = document.createElement('div')
        currencyDiv.setAttribute('id', 'priceTag')
        currencyDiv.textContent = currencySymbol.textContent
        total.appendChild(currencyDiv)
    }
   
})

//add the product into object and storage it into loacal storage
function addToCart(data) {
    unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
  
    let newProduct = {
      id: "",
      title: "",
      description: "",
      category: "",
      image: "",
      price: "",
      quantity: ""
    }
  
    newProduct.id = data.id
    newProduct.title = data.title
    newProduct.description = data.description
    newProduct.category = data.category
    newProduct.image = data.image
    newProduct.price = data.price
    newProduct.quantity = 1
  
    if (unknown.Product.length == 0) {
      unknown.Product.push(newProduct)
    } else {
      let flag = false
      for (let index = 0; index < unknown.Product.length; index++) {
        if (unknown.Product[index].id == newProduct.id) {
          unknown.Product[index].quantity += 1;
          flag = false
          break;
        } else {
          flag = true
        }
      }
      if (flag) unknown.Product.push(newProduct)
    }
    localStorage.setItem("unknown", JSON.stringify(unknown));
  }
  



addCart.addEventListener('click', ()=>{
    addToCart(data)
    location.href = '../cart/cart.html'
})


buy.addEventListener('click', ()=>{
    let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
    if(unknown.Name === ''){
        window.location.href = '../createAccount/createAccount.html'
    }
    else
    buyMsg.style.display = 'block'
})

setTimeout(() =>{
    displayDetails(data)
}, 500)






