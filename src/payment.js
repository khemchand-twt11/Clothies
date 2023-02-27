window.addEventListener("load", () => {
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
let placeOrderBtn = document.getElementById("place-order");
console.log(placeOrderBtn);
placeOrderBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Payment Successful!",
    text: "Product will be delivered soon",
    icon: "success",
    customClass: {
      title: "my-title-class",
      content: "my-content-class",
      icon: "icon-success",
      confirmButton: "my-confirm-button-class",
    },
  });
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});

let paymentData = JSON.parse(localStorage.getItem("payment")) || [];
let sub_total = document.getElementById("sub_total");
let shipping_cost = document.getElementById("Shipping_cost");
let order_total = document.getElementById("Order_total");
if (paymentData.length) {
  sub_total.innerText = "$ " + paymentData[0];
  shipping_cost.innerText = "$ " + paymentData[1];
  order_total.innerText = "$ " + paymentData[2];
  localStorage.setItem("payment", "");
}
