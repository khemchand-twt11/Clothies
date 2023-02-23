const emailInput = document.getElementById("Email");
console.log(emailInput);
emailInput.addEventListener("click", () => {
  if (emailInput.placeholder !== "") {
    emailInput.placeholder = "";
  } else {
    emailInput.placeholder = "Email";
  }
});
