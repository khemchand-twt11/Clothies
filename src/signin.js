
let loginUserEmail = document.getElementById("Email");

let loginUserPassword = document.getElementById("password");

let loginUser=document.getElementById("LoginUser")

let api=`https://test-api-oqvk.onrender.com/user`;
// let uniquemail=[];

let count=0;

loginUser.addEventListener("submit",(e)=>{
   e.preventDefault();
   fetchdata()

})
async function fetchdata(){
   
try {
    let res=await fetch(api);
    let data=await res.json();
    // console.log(data);
    let isValidUser = false;
    data.forEach((ele)=>{
       

        if (ele.Email===loginUserEmail.value){
          
            if (ele.Password===loginUserPassword.value){
                isValidUser = true
                
                return alert("login succeeded")
            }
            else{
                alert("password is wrong")
            }
        }
        
    })
    if (!isValidUser){
        alert("wrong Email")
    }
} catch (error) {
    
}
}
// console.log(uniquemail)

let CreateUser=document.getElementById("CreateAccount");

CreateUser.addEventListener("click",()=>{
    window.location.href="createaccount.html"
})
