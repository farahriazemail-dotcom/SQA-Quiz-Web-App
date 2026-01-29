console.log("auth.js connected");

// ================= SHOW LOGIN / SIGNUP =================
function showLogin(){
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

function showSignup(){
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}

// ================= SIGNUP =================
function signup(){
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let remember = document.getElementById("rememberMeSignup").checked;

  if(name === "" || email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  // Password requirements
  let length = password.length >= 8;
  let upper = /[A-Z]/.test(password);
  let lower = /[a-z]/.test(password);
  let number = /[0-9]/.test(password);
  let symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if(!(length && upper && lower && number && symbol)){
    alert("Please meet all password requirements!");
    return;
  }

  // Get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if(users.some(u => u.email === email)){
    alert("This email is already registered. Please login.");
    showLogin();
    return;
  }

  // Add new user
  users.push({name, email, password});
  localStorage.setItem("users", JSON.stringify(users));

  // Save credentials for login if "Remember Me" checked
  if(remember){
    localStorage.setItem("rememberedEmail", email);
    localStorage.setItem("rememberedPassword", password);
  }


  window.location.href = "categories.html";
}

// ================= EMAIL & PASSWORD CHECK =================
function checkEmail(){
  let email = document.getElementById("email").value;
  let msg = document.getElementById("emailMsg");
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email === ""){
    msg.innerText = "";
  } else if(!pattern.test(email)){
    msg.innerText = "Invalid email address";
  } else {
    msg.innerText = "";
  }
}

function checkPassword(){
  let password = document.getElementById("password").value;
  let msg = document.getElementById("passMsg");

  let length = password.length >= 8;
  let upper = /[A-Z]/.test(password);
  let lower = /[a-z]/.test(password);
  let number = /[0-9]/.test(password);
  let symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  msg.innerHTML = `
    ${length ? '✔' : '❌'} At least 8 characters<br>
    ${upper ? '✔' : '❌'} One uppercase letter<br>
    ${lower ? '✔' : '❌'} One lowercase letter<br>
    ${number ? '✔' : '❌'} One number<br>
    ${symbol ? '✔' : '❌'} One symbol (e.g., !@#$%^&*)<br>
  `;
}

// ================= TOGGLE PASSWORD =================
function togglePassword(){
  let pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function toggleLoginPassword(){
  let pass = document.getElementById("loginPassword");
  pass.type = pass.type === "password" ? "text" : "password";
}

// ================= LOGIN =================
function checkLoginPassword(){
  let password = document.getElementById("loginPassword").value;
  let msg = document.getElementById("loginPassMsg");

  let length = password.length >= 8;
  let upper = /[A-Z]/.test(password);
  let lower = /[a-z]/.test(password);
  let number = /[0-9]/.test(password);
  let symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  msg.innerHTML = `
    ${length ? '✔' : '❌'} At least 8 characters<br>
    ${upper ? '✔' : '❌'} One uppercase letter<br>
    ${lower ? '✔' : '❌'} One lowercase letter<br>
    ${number ? '✔' : '❌'} One number<br>
    ${symbol ? '✔' : '❌'} One symbol (e.g., !@#$%^&*)<br>
  `;
}

function login(){
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let remember = document.getElementById("rememberMeLogin").checked;

  let emailMsg = document.getElementById("loginEmailMsg");
  let passMsg = document.getElementById("loginPassMsg");

  emailMsg.innerText = "";

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(email === ""){
    emailMsg.innerText = "Email is required";
    return;
  }
  if(!emailPattern.test(email)){
    emailMsg.innerText = "Invalid email format";
    return;
  }
  if(password === ""){
    passMsg.innerText = "Password is required";
    return;
  }

  // Get users
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  if(!user){
    emailMsg.innerText = "Email not registered";
    return;
  }

  if(password !== user.password){
    passMsg.innerHTML = "Incorrect password.";
    return;
  }

  // Save credentials if login "Remember Me" checked
  if(remember){
    localStorage.setItem("rememberedEmail", email);
    localStorage.setItem("rememberedPassword", password);
  } else {
    localStorage.removeItem("rememberedPassword");
  }

 
  window.location.href = "categories.html";
}

// ================= FORGOT PASSWORD =================
function forgotPassword(){
  let email = prompt("Enter your registered email");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email);

  if(user){
    alert("Your password is: " + user.password);
  } else {
    alert("Email not found. Please signup first.");
  }
}

// ================= PRE-FILL LOGIN =================
window.onload = function(){
  let rememberedEmail = localStorage.getItem("rememberedEmail");
  let rememberedPassword = localStorage.getItem("rememberedPassword");

  if(rememberedEmail){
    document.getElementById("loginEmail").value = rememberedEmail;
  }
  if(rememberedPassword){
    document.getElementById("loginPassword").value = rememberedPassword;
  }
}
