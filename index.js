// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ1BBrAL236dNI1aOx_FOUnrSwI1cHq38",
  authDomain: "manaxat-801b6.firebaseapp.com",
  databaseURL: "https://manaxat-801b6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "manaxat-801b6",
  storageBucket: "manaxat-801b6.appspot.com",
  messagingSenderId: "257333706688",
  appId: "1:257333706688:web:e98805b8661c759c65d225",
  measurementId: "G-Y8EQ4VWDEX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Please Tell Us Your Name");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
