
let loginBtn = document.getElementsByClassName("login-btn")[0];

loginBtn.addEventListener('click', logIn);


let stupid = false;
async function logIn(){
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("incorrctMsg");

    if(email == "" || password ==""){
        message.textContent = "Please fill empty fields";
        message.setAttribute('style','display: block;');   
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/auth/login", {
            "method": "post",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({"email":email,"password":password})
        })
        if(response.status == 200){
            let res = await response.json()
            localStorage.setItem("token", JSON.stringify(res.token))
            window.location.href='../home/home.html';  
        }
        if(response.status == 401 || response.status == 422){
            message.textContent = "Incorrect email or password";
            message.setAttribute('style','display: block;');  
        }
        
    } catch (e) {
        console.log("error", e.message)
    }
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
