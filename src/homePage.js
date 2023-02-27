let search = document.querySelector(".sourch_bar");
let baseUrl = "https://test-api-oqvk.onrender.com/";
let midnav = document.querySelector("#midSection");
let products = document.querySelector("#product_container");
let mid = document.querySelector("#midSection");

search.addEventListener("submit", (e) => {
  e.preventDefault();
  fun();
});
async function fun() {
  let res = await fetch(`https://test-api-oqvk.onrender.com/cloth_data`);
  const totalCount = res.headers.get("x-total-count");
  // console.log(res.json());
  let data = await res.json();
  console.log(data);
  let value = document.querySelector(".form-control").value;
  if (value === "") {
    products.innerHTML = null;
    document.querySelector("#midSection").classList.remove("displayNone");
  } else {
    let tada = data.filter(function (elem) {
      return elem.title.toLowerCase().includes(value.toLowerCase());
    });
    renderCardList(tada);
  }
}

function renderCardList(cardData) {
  products.innerHTML = null;
  document.querySelector("#midSection").classList.add("displayNone");

  let cardList = document.createElement("div");
  cardList.setAttribute("class", "card-list");

  //looping over data
  cardData.forEach((element) => {
    products.innerHTML = null;

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
      // console.log(element);
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
    products.appendChild(cardList);
  });
}
