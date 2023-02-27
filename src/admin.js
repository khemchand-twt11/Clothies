// // Sidebar Toggle Codes;

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}

//fecthing js start here

window.addEventListener("load", () => {
  fetchData();
  toggleProductTable();
});

let data;
let viweAllproductsBtn = document.getElementById("viewProduct");
let updateProductBtn = document.getElementById("updateBtn");
let updateProductForm = document.getElementById("updateProduct-form");
let mainContainer = document.getElementById("product-form");
let tablecontainer = document.getElementById("xyz");

function fetchData() {
  fetch("https://test-api-oqvk.onrender.com/cloth_data", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      data = res;
      //sorting the data here only
      data.sort((a, b) => a.id - b.id);
      console.log(data);
    })
    .catch((err) => console.log(err));
}

viweAllproductsBtn.addEventListener("click", () => {
  renderData(data);
  toggleProductTable();
});

// view all products
function renderData(data) {
  tablecontainer.innerHTML = null;
  data.forEach((el, index) => {
    // create the table row element
    const tr = document.createElement("tr");
    tr.setAttribute("scope", "row");

    // create the table data elements and set their content
    const td1 = document.createElement("td");
    td1.textContent = el.id;

    const td2 = document.createElement("td");
    td2.textContent = el.title;

    const td3 = document.createElement("td");
    const img = document.createElement("img");
    img.src = el.image1;
    img.alt = "test";
    td3.appendChild(img);

    const td4 = document.createElement("td");
    td4.textContent = el.actualPrice;

    const td5 = document.createElement("td");
    td5.textContent = el.size;

    const td6 = document.createElement("td");
    td6.textContent = el.category;

    const td7 = document.createElement("td");
    td7.textContent = el.brand;

    const td8 = document.createElement("td");
    td8.textContent = el.type;

    const td9 = document.createElement("td");
    // td9.textContent = "Update"

    //Update button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.setAttribute("id", "updateBtn");
    updateBtn.classList.add("btn", "btn-outline-warning", "btn-sm");
    //adding click evnet to update product
    updateBtn.addEventListener("click", (e) => {
      // console.log(el);
      console.log("clicked");
      // createForm(el);
      toggleProductTable();
      createForm(obj);
    });

    const td10 = document.createElement("td");
    // td10.textContent = "Delete"

    //Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
    // td10.setAttribute("class","btn btn-outline-danger btn-sm")

    td9.appendChild(updateBtn);
    td10.appendChild(deleteBtn);

    // append all the table data elements to the table row element
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);

    // append the table row element to the table body element in your HTML document
    // const tableBody = document.querySelector("tbody"); // replace with the actual selector for your table body element
    tablecontainer.appendChild(tr);
  });
}

function toggleProductTable() {
  var producttable = document.getElementById("product-table");
  if (producttable.style.display === "none") {
    producttable.style.display = "block";
  } else {
    producttable.style.display = "none";
  }
}

function toggleviewProductForm() {
  var productform = document.getElementById("updateProduct-form");
  if (productform.style.display === "none") {
    productform.style.display = "block";
  } else {
    productform.style.display = "none";
  }
}

function updateProduct(id, newData) {
  fetch(`https://test-api-oqvk.onrender.com/cloth_data${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Product with ID ${id} updated successfully!`);
      console.log(data); // the updated product data returned by the server
    })
    .catch((error) =>
      console.error(`Error updating product with ID ${id}: ${error}`)
    );
}

var obj = {
  id: 1,
  title: "Baby 2-Piece Bodysuit Pant Set",
  image1:
    "https://cdn-fsly.yottaa.net/578855e32bb0ac10350004f8/www.carters.com/v~4b.2a5/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dwcb491c06/productimages/1O617610.jpg?sw=354&sh=444&yocs=g_j_",
  image2:
    "https://cdn-fsly.yottaa.net/578855e32bb0ac10350004f8/www.carters.com/v~4b.2a5/dw/image/v2/AAMK_PRD/on/demandware.static/-/Sites-carters_master_catalog/default/dw7f69d909/productimages/1O617610_LV03.jpg?sw=354&sh=444&yocs=g_j_",
  actualPrice: "22.00",
  brand: "clothie's",
};

function createForm(obj) {
  // console.log(obj)
  // Create a form element
  var form = document.createElement("form");

  // Loop through the object keys and create input fields for each key
  for (var key in obj) {
    // console.log(obj[key]+key)
    // Create a div element to hold the input field
    var div = document.createElement("div");
    div.className = "form-group";

    // Create a label element for the input field
    var label = document.createElement("label");
    label.setAttribute("for", "formGroupExampleInput");
    label.textContent = key;

    // Create an input element for the value of the current key
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.className = "form-control";
    input.setAttribute("id", "formGroupExampleInput");
    input.setAttribute("name", key.toUpperCase());
    input.setAttribute("value", obj[key]);

    // Append the label and input elements to the div element
    div.append(label);
    div.append(input);

    // Append the div element to the form element
    form.append(div);
  }

  // Append the form element to the main container element
  updateProductForm.append(form);
}

// function renderForm(obj) {

// console.log(data)

// data.forEach((el, index) => {
//   console.log(el)
//   const form = document.createElement("form");

//   //1st div
//   var div1 = document.createElement("div");
//   div1.className = "form-group";

//   // Create a label element for the ID input
//   var label = document.createElement("label");
//   label.setAttribute("for", "formGroupExampleInput");
//   label.textContent = 'ID';

//   // Create an input element for the ID
//   var input = document.createElement("input");
//   input.setAttribute("type", "text");
//   input.className = "form-control";
//   input.setAttribute("id", "formGroupExampleInput");
//   input.setAttribute("value", `${el.id}`);

//   // Append
//   div1.appendChild(label);
//   div1.appendChild(input);

//   form.append(div1)

//   updateProductForm.append(form);
//   });
// }

// function renderForm(data){

// data.forEach((el,index) => {

// const form = document.createElement("form");

// const idFormGroup = document.createElement("div");
// idFormGroup.classList.add("form-group");

// const idLabel = document.createElement("label");
// idLabel.setAttribute("for", "formGroupExampleInput");
// idLabel.textContent = "ID";

// const idInput = document.createElement("input");
// idInput.setAttribute("type", "text");
// idInput.classList.add("form-control");
// idInput.setAttribute("id", "formGroupExampleInput");
// idInput.setAttribute("placeholder", "empty");

// idFormGroup.appendChild(idLabel);
// idFormGroup.appendChild(idInput);

// const titleFormGroup = document.createElement("div");
// titleFormGroup.classList.add("form-group");

// const titleLabel = document.createElement("label");
// titleLabel.setAttribute("for", "formGroupExampleInput");
// titleLabel.textContent = "Title";

// const titleInput = document.createElement("input");
// titleInput.setAttribute("type", "text");
// titleInput.classList.add("form-control");
// titleInput.setAttribute("id", "formGroupExampleInput");
// titleInput.setAttribute("placeholder", "empty");

// titleFormGroup.appendChild(titleLabel);
// titleFormGroup.appendChild(titleInput);

// const image1FormGroup = document.createElement("div");
// image1FormGroup.classList.add("form-group");

// const image1Label = document.createElement("label");
// image1Label.setAttribute("for", "formGroupExampleInput2");
// image1Label.textContent = "Image-1";

// const image1Input = document.createElement("input");
// image1Input.setAttribute("type", "text");
// image1Input.classList.add("form-control", "form-control-sm");
// image1Input.setAttribute("id", "formGroupExampleInput2");
// image1Input.setAttribute("placeholder", "Another input");

// image1FormGroup.appendChild(image1Label);
// image1FormGroup.appendChild(image1Input);

// const image2FormGroup = document.createElement("div");
// image2FormGroup.classList.add("form-group");

// const image2Label = document.createElement("label");
// image2Label.setAttribute("for", "formGroupExampleInput2");
// image2Label.textContent = "Image-2";

// const image2Input = document.createElement("input");
// image2Input.setAttribute("type", "text");
// image2Input.classList.add("form-control", "form-control-sm");
// image2Input.setAttribute("id", "formGroupExampleInput2");
// image2Input.setAttribute("placeholder", "Another input");

// image2FormGroup.appendChild(image2Label);
// image2FormGroup.appendChild(image2Input);

// const actualPriceFormGroup = document.createElement("div");
// actualPriceFormGroup.classList.add("form-group");

// const actualPriceLabel = document.createElement("label");
// actualPriceLabel.setAttribute("for", "formGroupExampleInput2");
// actualPriceLabel.textContent = "Actual-Price";

// const actualPriceInput = document.createElement("input");
// actualPriceInput.setAttribute("type", "text");
// actualPriceInput.classList.add("form-control", "form-control-sm");
// actualPriceInput.setAttribute("id", "formGroupExampleInput2");
// actualPriceInput.setAttribute("placeholder", "Another input");

// actualPriceFormGroup.appendChild(actualPriceLabel);
// actualPriceFormGroup.appendChild(actualPriceInput);
// });
// }

// function renderallproducts(data){
//   mainContainer.innerHTML=null;
//   data.forEach(el,index => {
//     let carddiv=document.createElement("div");
//     carddiv.setAttribute("class","form-group");

//   });
// }

// function renderallproducts(data){
//   mainContainer.innerHTML = null;
//   data.forEach((el,index) => {
//     let carddiv = document.createElement("div");
//     carddiv.setAttribute("class","form-group");

//     // Title
//     let titleLabel = document.createElement("label");
//     titleLabel.textContent = "Title";
//     let titleInput = document.createElement("input");
//     titleInput.setAttribute("type", "text");
//     titleInput.setAttribute("class", "form-control");
//     titleInput.setAttribute("placeholder", "");
//     titleInput.value = el.title;
//     carddiv.appendChild(titleLabel);
//     carddiv.appendChild(titleInput);

//     // Image-1
//     let image1Label = document.createElement("label");
//     image1Label.textContent = "Image-1";
//     let image1Input = document.createElement("input");
//     image1Input.setAttribute("type", "text");
//     image1Input.setAttribute("class", "form-control form-control-sm");
//     image1Input.setAttribute("placeholder", "Another input");
//     image1Input.value = el.image1;
//     carddiv.appendChild(image1Label);
//     carddiv.appendChild(image1Input);

//     // Image-2
//     let image2Label = document.createElement("label");
//     image2Label.textContent = "Image-2";
//     let image2Input = document.createElement("input");
//     image2Input.setAttribute("type", "text");
//     image2Input.setAttribute("class", "form-control form-control-sm");
//     image2Input.setAttribute("placeholder", "Another input");
//     image2Input.value = el.image2;
//     carddiv.appendChild(image2Label);
//     carddiv.appendChild(image2Input);

//     // Actual-Price
//     let actualPriceLabel = document.createElement("label");
//     actualPriceLabel.textContent = "Actual-Price";
//     let actualPriceInput = document.createElement("input");
//     actualPriceInput.setAttribute("type", "text");
//     actualPriceInput.setAttribute("class", "form-control form-control-sm");
//     actualPriceInput.setAttribute("placeholder", "Another input");
//     actualPriceInput.value = el.actualPrice;
//     carddiv.appendChild(actualPriceLabel);
//     carddiv.appendChild(actualPriceInput);

//     // Discount-Price
//     let discountPriceLabel = document.createElement("label");
//     discountPriceLabel.textContent = "Discount-Price";
//     let discountPriceInput = document.createElement("input");
//     discountPriceInput.setAttribute("type", "text");
//     discountPriceInput.setAttribute("class", "form-control form-control-sm");
//     discountPriceInput.setAttribute("placeholder", "Another input");
//     discountPriceInput.value = el.discountPrice;
//     carddiv.appendChild(discountPriceLabel);
//     carddiv.appendChild(discountPriceInput);

//     // Discount
//     let discountLabel = document.createElement("label");
//     discountLabel.textContent = "Discount";
//     let discountInput = document.createElement("input");
//     discountInput.setAttribute("type", "text");
//     discountInput.setAttribute("class", "form-control form-control-sm");
//     discountInput.setAttribute("placeholder", "Another input");
//     discountInput.value = el.discount;
//     carddiv.appendChild(discountLabel);
//     carddiv.appendChild(discountInput);

//     // Size
//     let sizeLabel = document.createElement("label");
//     sizeLabel.textContent = "Size";
//     let sizeInput = document.createElement("input");
//     sizeInput.setAttribute("type", "text");
//     sizeInput.setAttribute("class", "form-control form-control-sm");
//     sizeInput.setAttribute("placeholder", "Another input");
//     sizeInput.value = el.size;
//     carddiv.appendChild(sizeLabel);
//     carddiv.appendChild(sizeInput);

//   });
// }

// function rendercards(data){
//   products_container.innerHTML=null;
//   data.forEach((el,index)=> {
//       let carddiv=document.createElement("div");

//       let imgdiv=document.createElement("div");
//       let image=document.createElement("img");
//       image.setAttribute("src",el.img)
//       let ratings=document.createElement("h4");
//       let pres=document.createElement("pre");
//       pres.append(ratings)
//       imgdiv.append(image,pres);
//       ratings.innerText=`Rating:${el.rating} ✰    Total Reviews:${el.totalreviews}`
//       ratings.setAttribute("class","ratings_imgs")
//       let pname=document.createElement("h3")
//       pname.innerText=el.name;
//       let detailsdiv=document.createElement("div");

//       let D1div=document.createElement("div");
//       let size=document.createElement("p")
//       size.innerText="Size: ";
//       let sizeN=document.createElement("span")
//       sizeN.innerText=el.size;
//       size.append(sizeN)
//       let price=document.createElement("p")
//       let compname=document.createElement("p")
//       compname.innerText=el.company;
//       let tax=document.createElement("span")
//       price.innerText=`₹ ${el.price} `;
//       tax.innerText="(+tax)";
//       tax.setAttribute("class","tax")
//       price.append(tax);
//       D1div.append(size,compname,price)
//       let D2div=document.createElement("div");
//       let c1=document.createElement("div");
//       let c2=document.createElement("div");
//       let c3=document.createElement("div");
//       D2div.append(c1,c2,c3)
//       detailsdiv.setAttribute("class","detailsparent")
//       detailsdiv.append(D1div,D2div)
//       let offerdiv=document.createElement("div");
//       let offer=document.createElement("p");
//       offer.innerText="40% OFF Use: EYECON";
//       offerdiv.append(offer)
//       carddiv.append(imgdiv,pname,detailsdiv,offerdiv)
//       carddiv.addEventListener("click",()=>{
//           let arr=[];
//           arr.push(el)
//           localStorage.setItem("product",JSON.stringify(arr));
//           location.href = "./SingleProductPage.html";
//       })
//       products_container.append(carddiv)
//   });
//   numberofproducts.innerText=`${data.length}`

// }

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  window.location.href = "index.html";
});
