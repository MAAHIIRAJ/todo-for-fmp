// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Your web app's Firebase configuration
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


const loginForm = document.querySelector('.login-form');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const email = loginForm.querySelector('#email').value;
    const password = loginForm.querySelector('#password').value;

    try {
      
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User logged in successfully");

        
        window.location.href = "index.html"; 
    } catch (error) {
        console.error("Error logging in: ", error.message);
        
    }
});
