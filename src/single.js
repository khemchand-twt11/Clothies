singleData = JSON.parse(localStorage.getItem("single"));
image1 = document.querySelector(".image1");
image2 = document.querySelector(".image2");
image3 = document.querySelector(".image3");
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
