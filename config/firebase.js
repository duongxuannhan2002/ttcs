import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkdk6UIwEAvSI1kHFqkCKyrfv5IPAhEMw",
  authDomain: "ttcs-7bc51.firebaseapp.com",
  projectId: "ttcs-7bc51",
  storageBucket: "ttcs-7bc51.appspot.com",
  messagingSenderId: "703848880332",
  appId: "1:703848880332:web:3516e5141d3154fd038a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();