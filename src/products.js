let mainSection = document.querySelector(".product-container");
let sort_btn = document.getElementById("sort-btn");
let sort_btn_li = document.querySelectorAll("#sort-btn ul li");
let paginationWrapper = document.querySelector("#pagination-wrapper div");
let favouriteData = JSON.parse(localStorage.getItem("favourite")) || [];
let singleData = JSON.parse(localStorage.getItem("single"));
let forUseData = [];
//sorting low to high
sort_btn_li[0].addEventListener("click", (e) => {
  sortLowToHigh();
});
function sortLowToHigh() {
  forUseData.sort((a, b) => Number(a.discountPrice) - Number(b.discountPrice));
  renderCardList(forUseData);
}
//sorting high to low
sort_btn_li[1].addEventListener("click", (e) => {
  sortHighToLow();
});

//default
sort_btn_li[2].addEventListener("click", (e) => {
  fun();
});
function sortHighToLow() {
  forUseData.sort((a, b) => Number(b.discountPrice) - Number(a.discountPrice));
  renderCardList(forUseData);
}
const element = document.querySelector(".sort_arrow");
sort_btn.addEventListener("click", function () {
  const ul = document.querySelector("#sort-btn ul");
  element.classList.toggle("active");
  if (ul.style.display == "none") {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
});

window.addEventListener("load", () => {
  fun();
});
async function fun(limit = 1) {
  let res = await fetch(
    `https://test-api-oqvk.onrender.com/cloth_data?_limit=28&_page=${limit}`
  );
  const totalCount = res.headers.get("x-total-count");
  let data = await res.json();
  console.log(data);
  renderCardList(data);

  createButtons(totalCount, 24);
  eventToButtons();
  forUseData = [...data];
}
function createButtons(totalCount, limit) {
  const totalPages = Math.ceil(totalCount / limit);
  //   const totalPages = Math.ceil(totalCount / 24);
  paginationWrapper.innerHTML = paginationButtons(totalPages);
}

function paginationButtons(totalPages) {
  let collectionOfButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    collectionOfButtons.push(
      `<button class="pagination-button" data-page-number="${i}">${i}</button>`
    );
  }
  return collectionOfButtons.join("");
}

// click event of buttons
function eventToButtons() {
  let buttons = document.getElementsByClassName("pagination-button");

  for (let val of buttons) {
    val.addEventListener("click", (e) => {
      fun(e.target.dataset.pageNumber);
    });
  }
}

function renderCardList(cardData) {
  mainSection.innerHTML = null;

  let cardList = document.createElement("div");
  cardList.setAttribute("class", "card-list");

  //looping over data
  cardData.forEach((element) => {
    mainSection.innerHTML = null;

    //main card
    let mainCard = document.createElement("div");
    mainCard.setAttribute("data-id", element.id);
    mainCard.className = "main-card";

    //redirecting to the single card page
    mainCard.addEventListener("click", () => {
      window.location.href = "single.html";
      singleData = element;
      localStorage.setItem("single", JSON.stringify(singleData));
    });

    // top anchor for image
    let topAnchor = document.createElement("a");
    topAnchor.setAttribute("href", "#");
    topAnchor.className = "top-anchor";

    //bottom anchor for other data
    let bottomAnchor = document.createElement("a");
    bottomAnchor.setAttribute("href", "#");
    bottomAnchor.className = "bottom-anchor";

    // card
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    //image
    let img = document.createElement("img");
    img.setAttribute("src", element.image1);
    img.setAttribute("onmouseover", `this.src='${element.image2}'`);

    img.setAttribute("onmouseout", `this.src='${element.image1}'`);

    // discount price
    let discountPriceSpan = document.createElement("span");
    discountPriceSpan.textContent = "$" + element.discountPrice;

    // favourite icon
    let favouriteProductSpan = document.createElement("span");
    // create a new i element
    let icon = document.createElement("i");
    icon.className = "far fa-heart";

    //add event listerner to heart icon
    icon.addEventListener("click", () => {
      console.log(element);
      favouriteData.push(element);
      localStorage.setItem("favourite", JSON.stringify(favouriteData));
    });

    // add the i element to your HTML document

    let priceAndFavourite = document.createElement("div");
    // actual price
    let actualPriceSpan = document.createElement("span");
    actualPriceSpan.textContent = "$" + element.actualPrice;

    let discount = document.createElement("span");
    discount.textContent = element.discount + "% off";

    // title of product
    let productTitle = document.createElement("h2");
    productTitle.textContent = element.title;

    // brand
    let productTitleBrand = document.createElement("p");
    productTitleBrand.textContent = `${element.brand} | ${element.type}`;

    favouriteProductSpan.appendChild(icon);
    priceAndFavourite.append(discountPriceSpan, favouriteProductSpan);

    topAnchor.append(img);
    bottomAnchor.append(
      actualPriceSpan,
      discount,
      productTitle,
      productTitleBrand
    );
    card.append(topAnchor, priceAndFavourite, bottomAnchor);

    mainCard.append(card);
    cardList.append(mainCard);
    mainSection.appendChild(cardList);
  });

  //   {
  //     "title": "Baby 3-Piece Quilted Little Cardigan Set",
  //     "image1": "https://cdn-fsly.yottaa.net/578855e22bb0ac10350002d6/www.carters.com/v~4b.293/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dwb031fcc1/productimages/2O886610.jpg?sw=354&sh=444&yocs=4E_4G_",
  //     "image2": "https://cdn-fsly.yottaa.net/578855e22bb0ac10350002d6/www.carters.com/v~4b.293/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dw47277739/productimages/2O886610_LV03.jpg?sw=354&sh=444&yocs=4E_4G_",
  //     "actualPrice": "22.00",
  //     "discountPrice": "14.00",
  //     "discount": "36",
  //     "size": "s",
  //     "ocassion": "",
  //     "deals": "shopsale",
  //     "category": "sets",
  //     "brand": "clothie's",
  //     "type": "toddler",
  //     "subType": "toddler-girl",
  //     "id": 100
  //   }
  //   mainSection.innerHTML = `
  //      <div class="card-list">
  //       ${cardData
  //         .map((item) =>
  //           getCard(item.id, item.image1, item.title, item.actualPrice)
  //         )
  //         .join("")}
  //      </div>
  //     `;
}

//
