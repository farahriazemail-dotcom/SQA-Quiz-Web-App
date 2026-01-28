console.log("auth.js connected");

// SHOW LOGIN
function showLogin(){
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// SHOW SIGNUP
function showSignup(){
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}
function signup(){
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

 let strongPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 localStorage.setItem("email", email);

  if(name === "" || email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }
let savedEmail = localStorage.getItem("email");

if(savedEmail === email){
  alert("This email is already registered. Please login.");
  showLogin();
  return;
}


  if(!strongPassword.test(password)){
  document.getElementById("passMsg").innerText =
    "Password must be 8+ chars with upper, lower, number & special char";
  return;
}


  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Signup successful! Please login.");
  showLogin();
}

function checkEmail(){
  let email = document.getElementById("email").value;
  let msg = document.getElementById("emailMsg");

  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email === ""){
    msg.innerText = "";
  }
  else if(!pattern.test(email)){
    msg.innerText = "Invalid email address";
  } else {
    msg.innerText = "";
  }
}

function checkPassword(){
  let password = document.getElementById("password").value;
  let msg = document.getElementById("passMsg");

  if(password.length === 0){
    msg.innerText = "";
  }
  else if(password.length < 6){
    msg.innerText = "Password must be at least 6 characters";
  }
  else{
    msg.innerText = "";
  }
}

function togglePassword(){
  let pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}


// LOGIN FUNCTION
function login(){
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  let emailMsg = document.getElementById("loginEmailMsg");
  let passMsg = document.getElementById("loginPassMsg");

  // clear previous messages
  emailMsg.innerText = "";
  passMsg.innerText = "";

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

  let savedEmail = localStorage.getItem("email");
  let savedPassword = localStorage.getItem("password");

  if(email !== savedEmail){
    emailMsg.innerText = "Email not registered";
    return;
  }

  if(password !== savedPassword){
    passMsg.innerText = "Incorrect password";
    return;
  }

  // success
  window.location.href = "categories.html";
}


function forgotPassword(){
  let email = prompt("Enter your registered email");

  let savedEmail = localStorage.getItem("email");
  let savedPassword = localStorage.getItem("password");

  if(email === savedEmail){
    alert("Your password is: " + savedPassword);
  } else {
    alert("Email not found. Please signup first.");
  }
}
