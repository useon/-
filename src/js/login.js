// 버튼활성화
const btnLogin = document.querySelector("#btn_login")
const formLogin = document.querySelector('.form_login');
const email = document.querySelector('#inp_loginEmail');
const pwd = document.querySelector('#inp_loginPw');

formLogin.addEventListener('input', () => {
  btnAttrChange(); 
});

function btnAttrChange() {
  if (email.value && pwd.value) {
    btnLogin.disabled = false;
  } else {
    btnLogin.disabled = true;
  }
}
// 로그인
async function login() {
  const url = "http://146.56.183.55:5050";
  const loginData = {
            "user":{
                    "email": email.value,
                    "password": pwd.value
                    }
            }

  const res = await fetch(url+'/user/login',{
      method:"POST",
      headers:{
          "Content-type" : "application/json"
      },
      body:JSON.stringify(loginData)
  });
  const json = await res.json();
  if (json.message) {
    const loginWarn = document.querySelector('.txt_loginWarn');
    loginWarn.style.display = 'inline'
  }
  localStorage.setItem("Token",json.user.token);
  localStorage.setItem("Accountname",json.user.accountname);
  location.href = "home.html";
}
const $loginBtn = document.querySelector('#btn_login')
$loginBtn.addEventListener("click",login)