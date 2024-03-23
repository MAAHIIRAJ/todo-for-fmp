 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
 import {getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
 import {getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";



 const firebaseConfig = {
   apiKey: "AIzaSyC7ghsDHo4Tt7XoCDDXt0dHVXx2afqDy9o",
   authDomain: "todo-app-for-fmp-c1f06.firebaseapp.com",
   projectId: "todo-app-for-fmp-c1f06",
   storageBucket: "todo-app-for-fmp-c1f06.appspot.com",
   messagingSenderId: "335476020641",
   appId: "1:335476020641:web:43fab1207116f38070e7e0",
   measurementId: "G-DKEWWNVR78"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
  const db = getDatabase();
 const auth = getAuth(app);


const signupForm = document.querySelector('.signup-form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();


    const username = signupForm.querySelector('#username').value;
    const email = signupForm.querySelector('#email').value;
    const password = signupForm.querySelector('#password').value;

    try {
     
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

       
        await set(ref(db, 'users/' + user.uid), {
            username: username,
            email: email
        });

        console.log("User signed up successfully");

     
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error signing up: ", error.message);

    }
});

