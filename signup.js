import { set, remove, ref } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"; 
import { app, db, auth, loggedIn } from "/module.js";

function register(){
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    if (password2 == password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; 
        set(ref(db, "Users/" + user.uid), {
          email: email, 
          password: password,
          watchlist: "", 
          bookmarks : "",
          ratedMovies : ""
        })
        .then (()=>{
          alert("User Created");
          window.location.href = "login.html";
        })
        .catch((error)=>{
          alert(error);
        }) 
    })
    .catch(function(error){
        alert(error.message); 
    })
  } else {
    alert("Passwords do not match!"); 
  }
}

document.getElementById("signup").onclick = function() {
      register(); 
    };
