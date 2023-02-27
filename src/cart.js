let meets = JSON.parse(localStorage.getItem("meets"));

//append card div
let mainDiv = document.getElementById("item-cards");

// console.log(quantity);

let cartApi = `https://test-api-oqvk.onrender.com/cart`;
window.addEventListener("load", () => {
  fetchdata();
  toggleIcon();
  toggleLoginName();
});
//fetching data from cart api
async function fetchdata() {
  try {
    let res = await fetch(cartApi);
    let data = await res.json();
    // sending data to display inside dom
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  mainDiv.innerHTML = null;

  let total = 0;

  data.forEach((ele) => {
    // cart individual card
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("outerDiv");
    // add image here
    let img = document.createElement("img");
    img.src = ele.image1;
    outerDiv.append(img);
    //image end here
    //..........................||||||........................|||||||...............................................
    //innerDiv for produnct information
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("innerDiv");

    let brand = document.createElement("h3");
    brand.innerText = "Brand: " + ele.brand;

    let title = document.createElement("p");
    title.innerText = ele.title;

    let size = document.createElement("p");
    size.innerText = `Size: ${ele.size}`;

    let type = document.createElement("p");
    type.innerText = `Type: ${ele.type}`;

    //innerDiv end here
    //..........................||||||........................|||||||...............................................
    // add select tag for qty

    let select = document.createElement("select");
    select.setAttribute("id", "quantity");
    select.setAttribute("data-price", ele.discountPrice);
    // select.innerText="Qty:"

    let i = 1;
    while (i <= 5) {
      let option = document.createElement("option");
      option.setAttribute("data-value", i);
      option.value = i;
      option.innerText = `Qty:${i}`;
      select.appendChild(option);
      i++;
    }

    innerDiv.append(brand, title, size, type);

    // add select tag for qty end here

    //..........................||||||........................|||||||...............................................
    //price div which is in right side
    let rightDiv = document.createElement("div");
    rightDiv.classList.add("rightDiv");

    let price = document.createElement("p");
    price.innerText = `$${ele.discountPrice}`;

    let button = document.createElement("button");
    button.innerText = "Remove";

    button.addEventListener("click", () => {
      deletecard(ele.id);
      outerDiv.remove();
      selectOptions();
    });

    rightDiv.append(price, button);
    //price div which is in right side end here

    outerDiv.append(innerDiv, select, rightDiv); // rightDiv -> price/remove
    mainDiv.append(outerDiv);
  });

  selectOptions();
  removeButtons();
}

// Removing cart product
async function deletecard(id) {
  console.log(id);
  try {
    let res = await fetch(`${cartApi}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// cart payment infor
let subtotal = document.getElementById("subtotal");
let sub_total;
let EstimatedShipping = document.getElementById("estimated-shipping");
let est = 0;
let quantity = document.getElementById("order-total");
let qnt = 0;

function selectOptions() {
  sub_total = 0;
  let selectArray = document.querySelectorAll(".outerDiv select");
  console.log(selectArray);
  for (select of selectArray) {
    sub_total += +select.value * +select.dataset.price;
    select.addEventListener("change", (e) => {
      calculateSubTotal(selectArray);
      console.log(e.target.value);
      console.log(e.target.dataset.price);
    });
  }
  subtotal.textContent = " " + sub_total;
  if (sub_total >= 40) {
    EstimatedShipping.innerHTML = "";
    EstimatedShipping.textContent = "Free Delivery 🟢";
    est = "Free Delivery 🟢";

    quantity.innerText = `$ ${sub_total}`;
    qnt = sub_total;
  } else if (sub_total == 0) {
    quantity.innerText = 0;
    EstimatedShipping.textContent = "$ " + 0;
    est = 0;
    quantity.innerText = "$ " + 0;
    qnt = 0;
  } else {
    EstimatedShipping.textContent = "$ " + 5;
    est = 5;
    quantity.innerText = `$ ${sub_total} + $ 5 = $ ${sub_total + 5}`;
    qnt = sub_total + 5;
  }
}

function calculateSubTotal(selectArray) {
  sub_total = 0;
  for (select of selectArray) {
    sub_total += +select.value * +select.dataset.price;
  }
  subtotal.textContent = " " + sub_total;
  if (sub_total >= 40) {
    EstimatedShipping.innerHTML = "";
    EstimatedShipping.textContent = "Free Delivery 🟢";
    est = "Free Delivery 🟢";
    quantity.innerText = `$ ${sub_total}`;
    qnt = sub_total;
  } else if (sub_total == 0) {
    quantity.innerText = 0;
    EstimatedShipping.textContent = "$ " + 0;
    est = 0;
    quantity.innerText = "$ " + 0;
    qnt = 0;
  } else {
    EstimatedShipping.textContent = "$ " + 5;
    est = 5;
    quantity.innerText = `${sub_total} + 5 = ${sub_total + 5}`;
    qnt = sub_total + 5;
  }
}

function removeButtons() {
  let remove_btn = document.querySelectorAll(".rightDiv button");
  for (let val of remove_btn) {
    val.addEventListener("click", () => {
      sub_total = 0;
      selectOptions();
    });
  }
}

// toggle sing-in/sing-up ICON function

function toggleIcon() {
  const userIcon = document.getElementById("user-icon");
  const isLoggedIn = true;

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
    loginLink.innerText = name || "Sing in"; // display name or default text
    loginLink.href = "/index.html";
    loginLink.style.width = "40%";
  } else {
    loginLink.innerText = "Sign in";
    loginLink.href = "/signin.html";
    loginLink.style.width = "16%";
  }
}

let checkoutBtn = document.getElementById("checkout-button");

checkoutBtn.addEventListener("click", () => {
  localStorage.setItem("payment", JSON.stringify([sub_total, est, qnt]));
  window.location.href = "payment.html";
});
