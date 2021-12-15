// Import the functions you need from the SDKs you need
import firebase from "firebase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ1Omuv_omR5wvnQ0h2FO61W3dCsgYX6A",
  authDomain: "geotalk-e9805.firebaseapp.com",
  projectId: "geotalk-e9805",
  storageBucket: "geotalk-e9805.appspot.com",
  messagingSenderId: "623024648698",
  appId: "1:623024648698:web:2f2de63d8788cb57fb3443"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth()

export {auth}; 