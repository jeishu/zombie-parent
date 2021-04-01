import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDeC6Uqa1f75Cy8gfBT2WPG-scuGSs1rC8",
    authDomain: "zombieparent-development.firebaseapp.com",
    projectId: "zombieparent-development",
    storageBucket: "zombieparent-development.appspot.com",
    messagingSenderId: "287760992941",
    appId: "1:287760992941:web:395259b3a426ab251a1424"
};

try {
    firebase.initializeApp (firebaseConfig);
} catch (err) {
    if(!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}

const Fire = firebase;
export default Fire;