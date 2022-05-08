// let arrayOfUser = [{
//     Name: "User",
//     Email: "user@gmail.com",
//     Password: "123",
//     Currency: "USD",
//     Product: [],
//   }],
// import validator from 'validator';

    getStarted = document.getElementsByClassName("signupbtn")[0],
    msgEmpty = document.getElementById("msgEmpty"),
    input = Array.from(document.getElementsByTagName("input")),
    mailExistMsg = document.getElementById("msgExistMail");
    mailIncorrectMsg = document.getElementById("msgIncorrectMail");
    nameMsg = document.getElementById("msgName");
    passMsg = document.getElementById("msgPass");

// let unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));
input.forEach(element => {
    element.addEventListener('change', removeAlert)
});
function removeAlert() {
    msgEmpty.style.display = "none"
    mailExistMsg.style.display = "none"
    mailIncorrectMsg.style.display = "none"
    nameMsg.style.display = "none"
    passMsg.style.display = "none"
}

function checkEmail(user_Email, arrayUser) {
    let state = false
    if (arrayUser.length > 0) {
        for (let index = 0; index < arrayUser.length; index++) {
            if (arrayUser[index].Email == user_Email) {
                state = true
                break;
            }
        }
        return state
    }
}
// if the input is empty a message will appear and data will not store.
function checkEmptyInput(name, email, password) {
    if (name == '' || email == '' || password == '') {
        msgEmpty.style.display = "block";
        return true
    }
    return false
}

function IsValidData (name, email, password){
    if(checkEmptyInput(name, email, password)) return;
    IsValidName(name)
    IsValidEmail(email)
    isVaalidPassword(password)
    return IsValidName(name) && IsValidEmail(email) && isVaalidPassword(password);
}
function IsValidName(name){
    if(name.length >=3){
        return true;
    }
    nameMsg.style.display = "block"
    return false;
    
}
function IsValidEmail(email){
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex) != null){
        return true;
    }
    mailIncorrectMsg.style.display = "block"
    return false;
    
}

function isVaalidPassword(password){
    let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if(password.match(strongRegex) != null){
        return true;
    }
    passMsg.style.display = "block"
    return false;
}



//the user's data save in local storage as array of obj. when click get started button
getStarted.addEventListener('click', signUp);

// if (localStorage.getItem("users") == null) {
//     localStorage.setItem("users", JSON.stringify(arrayOfUser))
// }

async function signUp() {
    let user = {
        username:"",
        email:"",
        password:"",
        currency:""
    };
    let user_Name = document.getElementById("name").value,
        user_Email = document.getElementById("email").value,
        user_Password = document.getElementById("password").value,
        user_Currency = document.getElementById("currency").value;

        IsValidData(user_Name,user_Email,user_Password)
    if(checkEmptyInput(user_Name,user_Email,user_Password) && !IsValidData(user_Name,user_Email,user_Password))
        return;
    user.username = user_Name
    user.email = user_Email
    user.password = user_Password
    user.currency = user_Currency
    
    // arrayOfUser = localStorage.getItem("users") === null ? [] : JSON.parse(localStorage.getItem("users"));
    // arrayOfUser.push(unknown);
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/auth/signup", {
            "method": "post",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(user)

        })
        console.log(response)
        if(response.status == 409){
            mailExistMsg.style.display = "block"
        }
    } catch (e) {
        console.log("error", e.message)
    }
    
}

//DOM and fetch api so user can choose the preferred currency 

//getElementById("currency")
let selectCurrency = document.getElementById("currency");
//fetch api
(async function getData() {
    try {
        const response = await fetch("https://currency-exchange.p.rapidapi.com/listquotes", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "6155594c89msh387173eac4635c0p108063jsnee1a9a20e441",
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
            }
        })
        const data = await response.json()
        makeSelectCurrency(data)
    } catch (e) {
        console.log("error", e.message)
    }
})()

function makeSelectCurrency(data) {
    const optionILS = document.createElement("option");
    optionILS.innerText = 'ILS'
    selectCurrency.appendChild(optionILS);
    data.forEach(el => {
        // Create option
        const option = document.createElement("option");
        option.innerText = el
        // Append the option to the selectCurrency element
        selectCurrency.appendChild(option);
    })
}

//user can show or hide password
function showPassword() {
    const togglePassword = document.getElementsByClassName('hidePsw')[0];
    togglePassword.onclick = function () {
      let password = document.getElementById('password');
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye slash icon
      const src= togglePassword.getAttribute('src')==='../assets/img/hideEye.svg'?'../assets/img/showEye.svg':'../assets/img/hideEye.svg';
      togglePassword.setAttribute('src',src);
    };
}
  
  showPassword();

