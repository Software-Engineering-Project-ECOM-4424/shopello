let cartList = document.getElementById("cartList");
let remove_All = document.getElementById("removeAll");
let unKnown_user = JSON.parse(localStorage.getItem("unknown"));
let cart = JSON.parse(localStorage.getItem("cart"));
let products = unKnown_user.Product;
let count = document.getElementById("count");
let price = document.getElementsByClassName('price')[0];
let cartTop = document.getElementsByClassName('cart-top')[0];
let cartBottom = document.getElementById("cart-bottom");
let emptyCart = document.getElementsByClassName('empty-cart')[0];


count.textContent = `(${cart.length} Items)`;
let totalPrice = 0;

let Currency,
  rate = 1,
  symbol = '';
if (unKnown_user.Currency == '') Currency = 'USD'
else {
  Currency = unKnown_user.Currency
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
price.textContent = "$ " +(totalPrice * rate).toFixed(2);

createList();

remove_All.setAttribute('onClick','removeAll()');

async function createList(){

  if(cart.length == 0){
    emptyCart.setAttribute('style','display: flex;')
    cartList.setAttribute('style','display: none;')
    cartBottom.setAttribute('style','display: none;')
    cartTop.setAttribute('style','display: none;')
  }
  cartList.innerHTML = '';
  
  for (let i = 0; i < cart.length; i++) {
    
    if (cart[i].id == "") continue;
    let productDetails = `http://127.0.0.1:3000/api/v1/products/${cart[i].id}`
    
    try {
      const response = await fetch(productDetails)
      const data = await response.json()
      totalPrice += (parseFloat(data.price) * parseInt(cart[i].quantity));
      buildDataRow(data,i);
    } catch (e) {
      console.log("error", e.message)
    } 
  }
}
function buildDataRow(data,i){
  let productBlock = document.createElement("div");
    productBlock.className = "product-block";

  let productImg = document.createElement("div");
  let img = document.createElement("img");
  img.src = `http://127.0.0.1:3000/${data.image}`;
  img.className = "product-img";
  productImg.appendChild(img);
  productBlock.appendChild(productImg);

  let productData = document.createElement("div");
  productData.className = "product-data";

  let dataRow_1 = document.createElement("div");
  dataRow_1.className = "row-data";
  dataRow_1.setAttribute("style", "margin-top: 0.8125rem;");

  let productName = document.createElement("h2");
  productName.className = "normal-text";
  productName.textContent = data.name.split(" ").slice(0, 2).join(" ");

  let productPrice = document.createElement("h2");
  productPrice.className = "normal-text";
  productPrice.setAttribute("style", "font-weight: 700;");
  productPrice.textContent =  "$ " + (parseFloat(data.price) * parseInt(cart[i].quantity) * rate).toFixed(2);;

  dataRow_1.appendChild(productName);
  dataRow_1.appendChild(productPrice);

  let dataRow_2 = document.createElement("div");
  dataRow_2.className = "row-data";

  let countSection = document.createElement("div");
  countSection.className = "count-section";

  let minusBox = document.createElement("button");
  minusBox.setAttribute("id", `minusBox#${i}`);
  let minus = document.createElement("img");
  minus.setAttribute("id", `minus#${i}`);
  minus.src = "../assets/img/minus.svg";
  minusBox.appendChild(minus);
  minusBox.className = "svg-box";
  let count = document.createElement("h2");
  count.className = "count";
  count.textContent = cart[i].quantity;
  let plusBox = document.createElement("button");
  plusBox.setAttribute("id", `plusBox#${i}`);
  plusBox.className = "svg-box";
  let plus = document.createElement("img");
  plus.setAttribute("id", `plus#${i}`);
  plus.src = "../assets/img/plus.svg";
  plusBox.appendChild(plus);

  countSection.appendChild(minusBox);
  countSection.appendChild(count);
  countSection.appendChild(plusBox);

  let removeSection = document.createElement("div");
  let removeText = document.createElement("button");
  removeText.className = "remove-button";
  removeText.textContent = "Remove";
  removeText.setAttribute('onClick',`remove(${cart[i].id})`)
  removeSection.appendChild(removeText);

  dataRow_2.appendChild(countSection);
  dataRow_2.appendChild(removeSection);

  productData.appendChild(dataRow_1);
  productData.appendChild(dataRow_2);
  productBlock.appendChild(productData);

  cartList.appendChild(productBlock);
  
  price.textContent = "$ " +(totalPrice * rate).toFixed(2);
}

function remove(id){
  for(let i=0;i<cart.length;i++){
    if(cart[i].id == id){
      cart.splice(i, 1);
      break
    }
  }
  console.log(cart)
  localStorage.setItem('cart',JSON.stringify(cart));

  location.reload();
  createList();
}
function removeAll(){
  cart = [];
  localStorage.setItem('cart',JSON.stringify(cart));

  location.reload();
  createList();
}

// async function totalPrice(){
//   let total = 0;
//   for(let i=0;i<cart.length;i++){
//     // total += (parseFloat(cart[i].price) * parseInt(cart[i].quantity));
//   }
//   return symbol+ " " +(total * rate).toFixed(2) ;
// }


window.onclick = function (event) {
  if (event.target.getAttribute("id").split("#")[0] == "plus") {
    let temp = increment(event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent = temp;
    index = parseInt(event.target.getAttribute("id").split("#")[1]);
    cart[index].quantity = temp;

  } else if (event.target.getAttribute("id").split("#")[0] == "plusBox") {
    let temp = increment(event.target.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.getElementsByClassName("count")[0].textContent = temp;
    index = parseInt(event.target.getAttribute("id").split("#")[1]);
    cart[index].quantity = temp;
      
  } else if (event.target.getAttribute("id").split("#")[0] == "minus") {
    let temp = decrement(event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.parentElement.getElementsByClassName("count")[0].textContent = temp;
    index = parseInt(event.target.getAttribute("id").split("#")[1]);
    cart[index].quantity = temp;

  } else if (event.target.getAttribute("id").split("#")[0] == "minusBox") {
    let temp = decrement(event.target.parentElement.getElementsByClassName("count")[0].textContent);
    event.target.parentElement.getElementsByClassName("count")[0].textContent = temp;
    index = parseInt(event.target.getAttribute("id").split("#")[1]);
    cart[index].quantity = temp;
  
  }

  localStorage.setItem('cart',JSON.stringify(cart));
  createList()
};

function increment(num) {
  return parseInt(num) + 1;
}
function decrement(num) {
  num--;
  if (num < 1) return 1;
  return parseInt(num);
}


// function getIndexOfProduct(id){
//   for (let i = 0; i < cart.length; i++) {
//     if(id == cart[i].id)
//       return i;
    
//   }
// }

let buy = document.getElementById('buy');

buy.addEventListener('click', ()=>{
  let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
  if(unknown.Name === ''){
      window.location.href = '../createAccount/createAccount.html'
  }
  else
  products = []
  buyMsg.style.display = 'block'
})
