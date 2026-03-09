// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD37M5EIgDM_WLV5BipTI3nIjDNaY0xE7A",
  authDomain: "movie-f928e.firebaseapp.com",
  databaseURL: "https://movie-f928e-default-rtdb.firebaseio.com",
  projectId: "movie-f928e",
  storageBucket: "movie-f928e.firebasestorage.app",
  messagingSenderId: "1165477318",
  appId: "1:1165477318:web:2a45894b605776cc715ec7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", function() {
  const registerBtn = document.getElementById("register-btn");
  const loginBtn = document.getElementById("login-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function() {
      const user_name = document.getElementById("user-name").value;
      const email = document.getElementById("user-email").value;
      const password = document.getElementById("user-password").value;

      localStorage.setItem("user_name", user_name);
      localStorage.setItem("email", email);

   auth.createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    alert("Registration successful! Welcome " + userCredential.user.email);
    window.location.href = "event_selection.html"; // Redirect to next page
  })
  .catch(error => {
    alert(error.message);
  });
});
  }

if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    const user_name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    localStorage.setItem("user_name", user_name);
    localStorage.setItem("email", email);

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert("Login successful! Welcome back " + userCredential.user.email);
        window.location.href = "event_selection.html"; // Redirect to next page
      })
      .catch(error => {
        alert(error.message);
      });
  });
}
});