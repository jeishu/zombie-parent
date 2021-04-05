import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCx4Mf1W2XwtvnKGC4uMdGhUmjt-xIlpMw",
  authDomain: "zombie-parent.firebaseapp.com",
  projectId: "zombie-parent",
  storageBucket: "zombie-parent.appspot.com",
  messagingSenderId: "173514123874",
  appId: "1:173514123874:web:448ff3f2e92527abf17f3b",
  measurementId: "G-VQNPB9QYVR",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const Fire = firebase;
export default Fire;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyCx4Mf1W2XwtvnKGC4uMdGhUmjt-xIlpMw",
//     authDomain: "zombie-parent.firebaseapp.com",
//     projectId: "zombie-parent",
//     storageBucket: "zombie-parent.appspot.com",
//     messagingSenderId: "173514123874",
//     appId: "1:173514123874:web:448ff3f2e92527abf17f3b",
//     measurementId: "G-VQNPB9QYVR"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
