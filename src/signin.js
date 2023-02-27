let loginUserEmail = document.getElementById("Email");

let loginUserPassword = document.getElementById("password");

let loginUser = document.getElementById("LoginUser");

let api = `https://test-api-oqvk.onrender.com/user`;
// let uniquemail=[];

let count = 0;

loginUser.addEventListener("submit", (e) => {
  if (
    loginUserEmail.value === "admin@gmail.com" &&
    loginUserPassword.value === "123456"
  ) {
    Swal.fire({
      title: "Welcome Admin!",
      text: "Login Successful",
      icon: "success",
      customClass: {
        title: "my-title-class",
        content: "my-content-class",
        icon: "icon-success",
        confirmButton: "my-confirm-button-class",
      },
    });
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1500);
  } else {
    if (loginUserEmail.value == "admin@gmail.com") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
      });
    }

    setTimeout(() => {
      window.location.href = "signin.html";
    }, 3000);
  }
  e.preventDefault();
  fetchdata();
});
async function fetchdata() {
  try {
    let res = await fetch(api);
    let data = await res.json();
    // console.log(data);
    let isValidUser = false;

    data.forEach((ele) => {
      if (ele.Email === loginUserEmail.value) {
        if (ele.Password === loginUserPassword.value) {
          isValidUser = true;
          toggleIcon();
          toggleLoginName();
          window.location.href = "index.html";
          return alert("login succeeded");
        } else {
          alert("password is wrong");
        }
      }
    });
    // if (!isValidUser) {
    //   alert("wrong Email");
    // }
  } catch (error) {}
}
// console.log(uniquemail)

let CreateUser = document.getElementById("CreateAccount");

CreateUser.addEventListener("click", () => {
  window.location.href = "signup.html";
  toggleIcon();
  toggleLoginName();
});

// toggle sing-in/sing-up ICON function

function toggleIcon() {
  const userIcon = document.getElementById("user-icon");
  const isLoggedIn = true; // replace with your own login check

  if (isLoggedIn) {
    userIcon.innerHTML = '<i class="fa-regular fa-check-circle fa-lg"></i>';
    userIcon.classList.add("logged-in");
  } else {
    userIcon.innerHTML = '<i class="fa-regular fa-user fa-lg"></i>';
    userIcon.classList.remove("logged-in");
  }
}

// toggle sing-in/sing-up NAME UPDATE function
function toggleLoginName() {
  const loginLink = document.getElementById("user-loginName");
  const name = JSON.parse(localStorage.getItem("name")); // retrieve name from local storage
  const isLoggedInName = true; // replace with your own login check

  if (isLoggedInName) {
    loginLink.innerText = name || "My Account"; // display name or default text
    loginLink.href = "/index.html";
    loginLink.style.width = "35%";
  } else {
    loginLink.innerText = "Sign in";
    loginLink.href = "/signin.html";
    loginLink.style.width = "16%";
  }
}
