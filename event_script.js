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
const db = firebase.database();
 
 const seatContainer = document.getElementById("seat-container");

const totalSeats = 20;

let selectedSeats = [];

const pricePerSeat = 20;
 
const movieSelect = document.getElementById("movie");

const timeSelect = document.getElementById("time");

const dateSelect=document.getElementById("date");
 
   

    // Create seats

    function createSeats() {

      seatContainer.innerHTML = "";

      selectedSeats = [];

      for (let i = 1; i <= totalSeats; i++) {

        const seat = document.createElement("button");

        seat.id = `seat-${i}`;

        seat.innerText = i;

        seat.classList.add("seat");

        seat.addEventListener("click", handleSeatClick);

        seatContainer.appendChild(seat);

      }

    }
 
    // Check booked seats for movie & time

    function loadBookedSeats() {

      const path = `bookings/${movieSelect.value}/${timeSelect.value}/${dateSelect.value}`;

      db.ref(path).once("value", snapshot => {

        const booked = snapshot.val();

        if (booked) {

          Object.keys(booked).forEach(seatId => {

            const seat = document.getElementById(seatId);

            if (seat) {

              seat.classList.add("booked");

              seat.disabled = true;

              seat.removeEventListener("click", handleSeatClick);

            }

          });

        }

      });

    }
 
    function handleSeatClick(e) {

      const seat = e.target;

      const seatId = seat.id;

      if (seat.classList.contains("booked")) return;
 
      if (seat.classList.contains("selected")) {

        seat.classList.remove("selected");

        selectedSeats = selectedSeats.filter(id => id !== seatId);

      } else {

        seat.classList.add("selected");

        selectedSeats.push(seatId);

      }

    }
 
    function showBill() {

      if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;

      }
 
      const total = selectedSeats.length * pricePerSeat;

      const movie = movieSelect.value;

      const time = timeSelect.value;

      const date=dateSelect.value;
 
      document.getElementById("bill-details").innerHTML = `
<strong>Movie:</strong> ${movie}<br>
<strong>Show Time:</strong> ${time}<br>
<strong>Show Date:</strong> ${date}<br>
<strong>Seats:</strong> ${selectedSeats.join(", ")}<br>
<strong>Price per seat:</strong> USD${pricePerSeat}<br>
<strong>Total:</strong> USD${total}

      `;
 
      document.getElementById("overlay").style.display = "block";

      document.getElementById("bill-popup").style.display = "block";

    }
 
    function closePopup() {

      document.getElementById("overlay").style.display = "none";

      document.getElementById("bill-popup").style.display = "none";

    }
 
    function makePayment() { //Complete this method in class 21

      closePopup();

      setTimeout(() => {

        alert("✅ Payment successful!");

        const userEmail = localStorage.getItem("email");

        const userName = localStorage.getItem("user_name");

        const total=selectedSeats.length * pricePerSeat;

      const emailParams = {

      user_name: userName,

      email: userEmail,

      movie_name: movieSelect.value,

      show_date:dateSelect.value,

      show_time: timeSelect.value,      

      seat_list: selectedSeats.join(", "),

      amount: total

    };

    console.log("Sending with:", emailParams);

    emailjs.send("service_y4x912e", "template_w621erj", emailParams)

      .then(() => {

        alert("✅ Booking email sent");

        window.location.href ="thankyou.html"; //Additional activity

      })

      .catch((error) => {

        alert("❌ Failed to send email:", error);

      });

      const bookingId = Date.now();

      db.ref("bookings/" + bookingId).set({

        ...emailParams,

        status: "confirmed"

      });
 
        const movie = movieSelect.value;

        const time = timeSelect.value;

        const date=dateSelect.value;

        const path = `bookings/${movie}/${time}/${date}`;
 
        selectedSeats.forEach(seatId => {

          db.ref(`${path}/${seatId}`).set(true);

          const seat = document.getElementById(seatId);

          seat.classList.remove("selected");

          seat.classList.add("booked");

          seat.disabled = true;

          seat.removeEventListener("click", handleSeatClick);

        });
 
        selectedSeats = [];

      }, 1000);

    }
 
    // Reload on movie/time change

    movieSelect.addEventListener("change", () => {

      createSeats();

      loadBookedSeats();

    });
 
    timeSelect.addEventListener("change", () => {

      createSeats();

      loadBookedSeats();

    });
 
    // Initial Load

    createSeats();

    loadBookedSeats();