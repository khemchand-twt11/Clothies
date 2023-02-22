let mainSection = document.querySelector(".product-container");

window.addEventListener("load", () => {
  fun();
});
async function fun() {
  let res = await fetch("https://test-api-oqvk.onrender.com/cloth_data/");
  let data = await res.json();
  console.log(data);
  renderCardList(data);
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

    // add the i element to your HTML document

    let priceAndFavourite = document.createElement("div");
    // actual price
    let actualPriceSpan = document.createElement("span");
    actualPriceSpan.textContent = "$" + element.actualPrice;

    // favouriteProductSpan.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   console.log("clicked by span");
    // });
    //discount
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
