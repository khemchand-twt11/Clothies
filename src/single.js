let baseUrl = "https://test-api-oqvk.onrender.com/";
singleData = JSON.parse(localStorage.getItem("single"));
console.log("singleData");

/**************************** */
let discountPrice = document.getElementById("discountPrice");
let discount = document.getElementById("discount");
let actualPrice = document.getElementById("actualPrice");
let productTitle = document.querySelector(".product-title");
let brand = document.getElementById("brand");
/**************************** */

/***********putting data  */
discountPrice.textContent = "$" + singleData.discountPrice ?? "";
discount.textContent = singleData.discount + " % off";
actualPrice.textContent = "$" + singleData.actualPrice ?? "";
productTitle.textContent = singleData.title ?? "";
brand.textContent = singleData.brand ?? "";
singleData.size = "";

/***********putting data  */
image1 = document.querySelector(".image1");
image2 = document.querySelector(".image2");
image3 = document.querySelector(".image3");
// size buttons
let sizeBtns = document.querySelectorAll(".size-btns button");

delete singleData.id;
// add to cart button
let addToCartBtn = document.querySelector(".add-to-cart");
console.log(sizeBtns);
console.log(image1, image2, image3);
console.log(singleData);

let img1 = document.createElement("img");
img1.setAttribute("src", singleData.image1);
image1.append(img1);

let img2 = document.createElement("img");
img2.setAttribute("src", singleData.image2);
image2.append(img2);

let img3 = document.createElement("img");
img3.setAttribute("src", singleData.image1);
image3.append(img3);

image2.addEventListener("click", () => {
  img3.setAttribute("src", singleData.image2);
  img2.style.borderBottom = "5px solid #00a9e0";
  img2.style.borderRadius = " 0 0 0.2rem 0.2rem";
  img1.style.borderBottom = "1px solid white";
});

image1.addEventListener("click", () => {
  img3.setAttribute("src", singleData.image1);
  img2.style.borderBottom = "1px solid white";
  img1.style.borderBottom = "5px solid #00a9e0";
});

console.log(singleData);
// adding borders to button on click and changing the size
for (let val of sizeBtns) {
  val.addEventListener("click", () => {
    for (let item of sizeBtns) {
      if (item.hasAttribute("id")) {
        item.removeAttribute("id");
      }
    }
    val.setAttribute("id", "size-btn");
    singleData.size = val.textContent;
    console.log(singleData);
  });
}

addToCartBtn.addEventListener("click", () => {
  if (singleData.size !== "") {
    postSingleData();
  } else {
    let timerInterval;
    Swal.fire({
      title: "You Haven't Select The Size!",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }
});

function postSingleData() {
  fetch(`${baseUrl}cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleData),
  }).then((res) => {
    Swal.fire({
      title: "Done!",
      text: "Product Added To Cart!",
      icon: "success",
      customClass: {
        title: "my-title-class",
        content: "my-content-class",
        icon: "icon-success",
        confirmButton: "my-confirm-button-class",
      },
    });
  });
}





window.addEventListener("load", () => {
  
   toggleIcon();
   toggleLoginName();
 });





// toggle sing-in/sing-up ICON function

function toggleIcon() {
  const userIcon = document.getElementById('user-icon');
  const isLoggedIn = true; // replace with your own login check

  if (isLoggedIn) {
    userIcon.innerHTML = '<i class="fa-regular fa-check-circle fa-lg"></i>';
    userIcon.classList.add('logged-in');
  } else {
    userIcon.innerHTML = '<i class="fa-regular fa-user fa-lg"></i>';
    userIcon.classList.remove('logged-in');
  }
}

 // toggle sing-in/sing-up NAME UPDATE function
 function toggleLoginName() {
  const loginLink = document.getElementById('user-loginName');
  const name = JSON.parse(localStorage.getItem('name')); // retrieve name from local storage
  const isLoggedInName = true; // replace with your own login check

  if (isLoggedInName) {
    loginLink.innerText = name || 'Sign in'; // display name or default text
    loginLink.href = '/index.html';
    loginLink.style.width="50%";
    loginLink.style.fontSize="10px";
  } else {
    loginLink.innerText = 'Sign in';
    loginLink.href = '/signin.html';
    loginLink.style.width="16%";
  }
}
