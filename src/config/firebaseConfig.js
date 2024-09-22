import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDxUjmPEWmGIjJm4o-jK9G9QF0xhme1WYk",
  authDomain: "react-bloging-app.firebaseapp.com",
  projectId: "react-bloging-app",
  storageBucket: "react-bloging-app.appspot.com",
  messagingSenderId: "338560638290",
  appId: "1:338560638290:web:60a3dc9605a5e465b8ae8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app