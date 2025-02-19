//Slider for (ul.tags.items, ul.listOfPopulore.items, ul.listOfPopulore.items, ul.listOfRecommeded.items)Sections
let isDown = false,
  startX,
  scrollLeft;
const slider = Array.from(document.querySelectorAll('.items'));

const end = (e) => {
  isDown = false;
  e.currentTarget.classList.remove('active');
}

const start = (e) => {
  isDown = true;
  e.currentTarget.classList.add('active');
  startX = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  scrollLeft = e.currentTarget.scrollLeft;
}

const move = (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  const dist = (x - startX);
  e.currentTarget.scrollLeft = scrollLeft - dist;
}

(() => {
  slider.forEach(element => {
    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start);

    element.addEventListener('mousemove', move);
    element.addEventListener('touchmove', move);

    element.addEventListener('mouseleave', end);
    element.addEventListener('mouseup', end);
    element.addEventListener('touchend', end);
  });
})();


//fetch currencies and exchange prices 

let Currency,
  rate = 1,
  symbol = '$',
  timer;
  /*
if (unknown.Currency == '') {
  Currency = 'USD'
  timer = 0
} else {
  timer = 200
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
}*/

//get element by id form html tags by getElementById and declared the apis
const listOfPopulore = document.getElementById('listOfPopulore'),
  tags = document.getElementById('tags'),
  listOfOffers = document.getElementById('listOfOffers'),
  listOfRecommeded = document.getElementById('listOfRecommeded'),
  main = document.getElementById('main'),
  cateApi = 'http://127.0.0.1:3000/api/v1/HomePage/category-list',
  productsApi = "http://127.0.0.1:3000/api/v1/HomePage/products";

//fetch api for categories
(async function getData() {
  try {
    const response = await fetch(cateApi)
    const data = await response.json()
    createCate(data)

  } catch (e) {
    console.log("error", e.message)
  }
})()

//create dom for categories
function createCate(data) {
  data.forEach(el => {
    const eleOfTag = document.createElement('li');
    eleOfTag.setAttribute('class', 'item')
    eleOfTag.innerText = `${el.name}`
    eleOfTag.addEventListener('click', getProductByCate)
    tags.appendChild(eleOfTag)
  })
}

//fetch api for listOfPopulore, listOfOffers, listOfRecommeded
let dataForSearch;
setTimeout(() => {
  (async function getData() {
    try {
      // const response = await fetch('https://fakestoreapi.com/products?limit=10'),
      const response = await fetch(productsApi),
        data = await response.json();
      dataForSearch = data;
      createPro(data);
      createOffer(data.reverse());
      createRecomeded(data.reverse())

    } catch (e) {
      console.log("error", e.message)
    }
  })()
}, timer)

//create dom for listOfPopulore
function createPro(data) {
  data.forEach(product => {
    let objTitle = product.productname,
      readyTitle = objTitle.split(' ').slice(0, 3).join(' '),
      exPrice = product.price * rate,
      objPrice = exPrice.toFixed(2),
      objImage = product.image,
      objid = product.id;

    const el = document.createElement('li'),
      proImg = document.createElement('img'),
      textAndImg = document.createElement('div'),
      titleAndPrice = document.createElement('div'),
      cartImg = document.createElement('img'),
      proTitle = document.createElement('h3'),
      proPrice = document.createElement('span');

    listOfPopulore.appendChild(el)
    el.appendChild(proImg)
    el.appendChild(textAndImg)
    textAndImg.appendChild(titleAndPrice)
    textAndImg.appendChild(cartImg)
    titleAndPrice.appendChild(proTitle)
    titleAndPrice.appendChild(proPrice)

    el.setAttribute("class", "item")
    proImg.setAttribute("class", "imgOfPopulore")
    proImg.setAttribute('src', `http://127.0.0.1:3000/${objImage}`)
    proImg.setAttribute('onclick', `displayDetails(${objid})`)
    textAndImg.setAttribute('class', 'wrapOfText')
    proTitle.setAttribute('class', 'title')
    proTitle.setAttribute('onclick', `displayDetails(${objid})`)
    proPrice.setAttribute('class', 'price')
    cartImg.setAttribute('src', '../assets/img/cart with plus.svg')
    cartImg.setAttribute('onclick', `addToCart(${objid})`)

    proTitle.innerText = `${readyTitle}`
    proPrice.innerText = `${symbol} ${objPrice}`

  });
}

//create dom for listOfOffers
function createOffer(data) {
  data.forEach(product => {

    let objImage = product.image,
      objCate = product.categoryname,
      objid = product.id;
    const elemOfOffer = document.createElement('li'),
      offerCate = document.createElement('img'),
      offSpan = document.createElement('span'),
      wrapOfOffer = document.createElement('div'),
      wrapOfDesc = document.createElement('div'),
      offImg = document.createElement('img'),
      saveUp = document.createElement('p'),
      disc = document.createElement('p'),
      off = document.createElement('p');

    elemOfOffer.appendChild(offerCate)
    elemOfOffer.appendChild(offSpan)
    elemOfOffer.appendChild(wrapOfOffer)
    wrapOfOffer.appendChild(wrapOfDesc)
    wrapOfOffer.appendChild(offImg)
    wrapOfDesc.appendChild(saveUp)
    wrapOfDesc.appendChild(disc)
    wrapOfDesc.appendChild(off)
    listOfOffers.appendChild(elemOfOffer)

    elemOfOffer.setAttribute("class", "item")
    
    
    // console.log(x)
    offerCate.setAttribute('src', `../assets/img/${objCate}.svg`)
    offerCate.setAttribute("class", "imgOfTag")
    offSpan.setAttribute('class', 'nameOfTag')
    wrapOfOffer.setAttribute('class', 'wrapOfOffer')
    wrapOfDesc.setAttribute('class', 'wrapOfDesc')
    offImg.setAttribute('src', `http://127.0.0.1:3000/${objImage}`)
    offImg.setAttribute('onclick', `getDataDetails(${objid}, displayDetails)`)
    offImg.setAttribute('onclick', `displayDetails(${objid})`)
    disc.setAttribute('class', 'disc')

    offSpan.innerText = `${objCate}`
    saveUp.innerText = "Save up"
    disc.innerText = `${Math.floor(Math.random() * 50)}%`
    off.innerText = "Off!"

  });
}

//create dom for listOfRecommeded
function createRecomeded(data) {
  data.forEach(product => {

    let objTitle = product.productname,
      readyTitle = objTitle.split(' ').slice(0, 2).join(' '),
      exPrice = product.price * rate,
      objPrice = exPrice.toFixed(2),
      objImage = product.image,
      objid = product.id;

    const elemOfRecom = document.createElement('li'),
      imgOfRecom = document.createElement('img'),
      wrapOfTitleAndPrice = document.createElement('div'),
      proTitle = document.createElement('h3'),
      proPrice = document.createElement('span'),
      imgCart = document.createElement('img');

    listOfRecommeded.appendChild(elemOfRecom)
    elemOfRecom.appendChild(imgOfRecom)
    elemOfRecom.appendChild(wrapOfTitleAndPrice)
    elemOfRecom.appendChild(imgCart)
    wrapOfTitleAndPrice.appendChild(proTitle)
    wrapOfTitleAndPrice.appendChild(proPrice)

    elemOfRecom.setAttribute("class", "item")
    imgOfRecom.setAttribute("class", "imgOfRecom")
    imgOfRecom.setAttribute('src', `http://127.0.0.1:3000/${objImage}`)
    imgOfRecom.setAttribute('onclick', `displayDetails(${objid})`)
    wrapOfTitleAndPrice.setAttribute('class', 'wrapOfTitleAndPrice')
    proTitle.setAttribute('class', 'title')
    proTitle.setAttribute('onclick', `displayDetails(${objid})`)

    proPrice.setAttribute('class', 'price')
    imgCart.setAttribute('class', 'addToCart')
    imgCart.setAttribute('src', '../assets/img/cart with plus.svg')
    imgCart.setAttribute('onclick', `getDataDetails(${objid},addToCart)`)

    proTitle.innerText = `${readyTitle}`
    proPrice.innerText = `${symbol} ${objPrice}`

  });
}

//get product by category
async function getProductByCate(e) {
  let category = e.target.textContent;
  let apiCategory = `http://127.0.0.1:3000/api/v1/HomePage/products/category?category_name=${category}`
  main.style.display = 'none'
  // getCategoryData(apiCategory);
  try {
    const response = await fetch(apiCategory)
    const data = await response.json()
    createProByCategory(data);

  } catch (e) {
    console.log("error", e.message)
  }
}

//create list of products and display it
const mainOfCategory = document.createElement('main');

function createProByCategory(data) {
  let mainCategory = document.getElementById('mainOfCategory')
  if (mainCategory != null) {
    mainCategory.style.display = 'block'
  }

  const sectionOfCategory = document.createElement('section'),
    ulOfCategory = document.createElement('ul'),
    container = document.getElementById('container');

  mainOfCategory.innerHTML = "";
  data.forEach(product => {

    let objTitle = product.productname,
      readyTitle = objTitle.split(' ').slice(0, 3).join(' '),
      objPrice = product.price,
      objImage = product.image,
      objid = product.id;

    const elemOfCategory = document.createElement('li'),
      proImgOfCategory = document.createElement('img'),
      textAndImgOfCategory = document.createElement('div'),
      titleAndPriceOfCategory = document.createElement('div'),
      cartImgOfCategory = document.createElement('img'),
      proTitleOfCategory = document.createElement('h3'),
      proPriceOfCategory = document.createElement('span');

    container.appendChild(mainOfCategory)
    mainOfCategory.appendChild(sectionOfCategory)
    sectionOfCategory.appendChild(ulOfCategory)
    ulOfCategory.appendChild(elemOfCategory)
    elemOfCategory.appendChild(proImgOfCategory)
    elemOfCategory.appendChild(textAndImgOfCategory)
    textAndImgOfCategory.appendChild(titleAndPriceOfCategory)
    textAndImgOfCategory.appendChild(cartImgOfCategory)
    titleAndPriceOfCategory.appendChild(proTitleOfCategory)
    titleAndPriceOfCategory.appendChild(proPriceOfCategory)

    mainOfCategory.setAttribute("id", "mainOfCategory")
    sectionOfCategory.setAttribute("class", "wrapPopulore")
    elemOfCategory.setAttribute("class", "item")
    ulOfCategory.setAttribute("class", "listOfPopulore items")
    proImgOfCategory.setAttribute("class", "imgOfPopulore")
    proImgOfCategory.setAttribute('src', `http://127.0.0.1:3000/${objImage}`)
    proImgOfCategory.setAttribute('onclick', `displayDetails(${objid})`)
    textAndImgOfCategory.setAttribute('class', 'wrapOfText')
    proTitleOfCategory.setAttribute('class', 'title')
    proTitleOfCategory.setAttribute('onclick', `displayDetails(${objid})`)
    proPriceOfCategory.setAttribute('class', 'price')
    cartImgOfCategory.setAttribute('src', '../assets/img/cart with plus.svg')
    cartImgOfCategory.setAttribute('onclick', `getDataDetails(${objid}, addToCart)`)

    proTitleOfCategory.innerText = `${readyTitle}`
    proPriceOfCategory.innerText = `$${objPrice}`
  });
}

const nameOfApp = document.getElementById('nameOfApp')
nameOfApp.addEventListener('click', showHomePage)

// get back to home page from Category
function showHomePage() {
  let mainCategory = document.getElementById('mainOfCategory')
  mainCategory.style.display = 'none'
  main.style.display = 'block'
}

//get details data of product by id
async function getDataDetails(id, fun) {
  console.log(id)
  let productDetails = `http://127.0.0.1:3000/api/v1/products/${id}`
  try {
    const response = await fetch(productDetails)
    const data = await response.json()

    fun(data);

  } catch (e) {
    console.log("error", e.message)
  }
}

function displayDetails(id) {
  location.href = `../details/details.html?id=${id}`
}

//add the product into object and storage it into loacal storage
function addToCart(id) {
  console.log(id)
  let cart = localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
  let i=0;
  for(i=0;i<cart.length;i++){
    if(cart[i].id == id){
      cart[i].quantity++;
      break;
    }
  }
  if(i == cart.length)
    cart.push({id:parseInt(id),quantity:1})
  localStorage.setItem("cart", JSON.stringify(cart));

  showCount()
}

//show the count of product in cart
function showCount() {
  let count = document.getElementById('count')
  let cart = JSON.parse(localStorage.getItem('cart'))
  if (cart.length > 0){
    count.style.display = 'block'
    count.textContent = cart.length;
  }
}  
showCount()

//change the name depend on some state
let account = document.getElementById('account'),
  wrapAccount = document.getElementById('wrapAccount'),
  logout = document.getElementById('logout'),
  arrowIcon = document.getElementById('arrowIcon');

(async function getUser() {
  if(localStorage.getItem('token') == ''){
    arrowIcon.style.display = 'none'
    return;
  }
  try {
    const response = await fetch("http://127.0.0.1:3000/api/v1/auth/user",{
      "method": "get",
      "headers": {
          "Content-Type": "application/json",
          "authorization": JSON.parse(localStorage.getItem('token'))
      },
  })
    arrowIcon.style.display = 'none'
    
    if(!(response.status == 401)){
      console.log(response.status )
      const data = await response.json()
      currentUser = data;
      account.textContent = currentUser.username
      arrowIcon.style.display = 'inline-block'
    }


  } catch (e) {
    console.log("error", e.message)
  }
})()


//add link for createAccount page
wrapAccount.addEventListener('click', () => {
  if (account.textContent == 'Sign up') {
    location.href = '../createAccount/createAccount.html'
  } else {
    logout.classList.toggle('activeLogOut')
    arrowIcon.classList.toggle('rotateIcon')
  }
})

//add event when click on logout
logout.addEventListener('click', logOutFunction)

//logout function
function logOutFunction() {
  localStorage.setItem("token", "");
  logout.classList.toggle('activeLogOut')
  arrowIcon.classList.toggle('rotateIcon')
  arrowIcon.style.display = 'none'
  account.textContent = 'Sign up'
  showCount()
}

//add link for cart page
let cartShow = document.getElementById('cartShow')
cartShow.addEventListener('click', () => {
  location.href = '../cart/cart.html'
})

//get element for dom and event listener (for search function)
const wrapTags = document.getElementById('wrapTags'),
  searchInput = document.getElementById('searchInput'),
  itemsSection = document.getElementById('itemsSection'),
  lists = document.createElement('ul');

lists.setAttribute('class', 'itemsSearch')
searchInput.addEventListener('keyup', search)


// let engWord = '';
// async function getDataTranslate(arabicWord) {
//   try {
//     const response = await fetch(`https://api.mymemory.translated.net/get?q=${arabicWord}&langpair=ar%7Cen-US%22`)
//     const data = await response.json()
//     engWord = await data.matches[0].translation
    
//     return engWord;
//   } catch (e) {
//     console.log("error", e.message)
//   }
// }
// console.log(getDataTranslate("رجل"))
// console.log(engWord)

async function getDataTranslate(arabicWord) {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${arabicWord}&langpair=ar%7Cen-US%22`)
    const dataWord = await response.json()
    getEnglishWord(dataWord)
  } catch (e) {
    console.log("error", e.message)
  }
}

//get translated Word
let translatedWord;

function getEnglishWord(dataWord) {
  translatedWord = dataWord.matches[0].translation
}

getDataTranslate("رجل")
//search function

let notfound = document.getElementById('notfound');
async function search() {
  if(searchInput.value == '' || onlySpaces(searchInput.value)){
    itemsSection.style.display = 'none'
    return;
  } 
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/v1/HomePage/search?query=${searchInput.value}`,{
      "method": "get",
      "headers": {
          "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    itemsSection.style.display = 'block'
    lists.textContent = ''
    console.log(data)
    if(response.status == 500){
      itemsSection.style.display = 'block'
      wrapTags.style.display = 'none'
      main.style.display = 'none'
      notfound.style.display = 'flex'
    }
    else{
      data.forEach(product =>{
        wrapTags.style.display = 'flex'
          main.style.display = 'block'
          notfound.style.display = 'none'
          const list = document.createElement('li')
          list.textContent = product.productname.split(' ').splice(0, 5).join(' ')
          list.setAttribute('class', 'itemSearch')
          list.setAttribute('onclick', `displayDetails(${product.id})`)
          lists.appendChild(list)
  
      })
    }

    itemsSection.appendChild(lists);

  } catch (e) {
    console.log("error", e.message)
  }
}

function onlySpaces(str) {
  return str.trim().length === 0;
}