let api=`https://test-api-oqvk.onrender.com/user`;
let uniquemail=[];

async function fetchdata(){
   
try {
    let res=await fetch(api);
    let data=await res.json();
    console.log(data);
    data.forEach((ele)=>{
        uniquemail.push(ele.Email)
    })
} catch (error) {
    
}
}
// console.log(uniquemail)
fetchdata()

let signup_btn=document.getElementById("user-signup");

let registerUserEmail = document.getElementById("Email");
let registerUserFullName = document.getElementById("FullName");
let registerUserPassword = document.getElementById("Password");
let registerUserConfirmPassword = document.getElementById("ConfirmPassword");

// signup_btn.addEventListener("click",  function (e) {
//     e.preventDefault();
//     signinUser();
//   });
//   async function signinUser(){
//      try {
//       let obj={
//         username : loginUserUsername.value,
//         password : loginUserPassword.value
//       };
//   let response= await fetch(`${userLoginURL}`,{
//     method:"POST",
//     headers: {
//        "Content-Type" : 'application/json'
//     },
//     body: JSON.stringify(obj)
//   })
//   let data= await response.json();
//   console.log(data)
//   localStorage.setItem("loginuser",data.accessToken);
//   localStorage.setItem("userid",data.user.id)
  
//      } catch (error) {
//       console.log(error)
//      }
  
//   }

let formdata=document.getElementById("submit_details");
formdata.addEventListener("submit",async function (e) {
    e.preventDefault();
     Signup_User();
     
   });


   async function Signup_User(){
    try {
     let obj={
       Email:registerUserEmail.value,
       FullName:registerUserFullName.value,
       Password:registerUserPassword.value,
       ConfirmPassword:registerUserConfirmPassword.value,
     }
     for (let i=0;i<uniquemail.length;i++){
        if (uniquemail[i]===obj.Email){
            
            alert("Error: Email ID already exists");
               return;
          }
          
      }
     if (obj.Password===obj.ConfirmPassword){
        let response= await fetch(api,{
       
            method:"POST",
            headers:{
              "Content-Type" : 'application/json'
            },
            body:JSON.stringify({Email:obj.Email,FullName:obj.FullName,Password:obj.Password})
          })
        //   console.log(response);
        let data=await response.json();
        console.log(data)
        if (response.ok) { 
            alert("Account has been created succefully")
            window.location.href = 'sign in.html'; 
             
           }
     }
     else{
        alert("password doesn't match")
     }
    
    } catch (error) {
     console.log(error)
    }
   
   } 