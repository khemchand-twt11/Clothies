window.addEventListener("load", () => {
   console.log("check")
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
      loginLink.innerText = name || 'My Account'; // display name or default text
      loginLink.href = '/index.html';
      loginLink.style.width="40%";
    } else {
      loginLink.innerText = 'Sign in';
      loginLink.href = '/signin.html';
      loginLink.style.width="16%";
    }
  }