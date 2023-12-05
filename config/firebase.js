import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDvvUPRDKiHaSU6Oindzt14i3FJiC7BF-Y",
  authDomain: "fir-ex-ae042.firebaseapp.com",
  projectId: "fir-ex-ae042",
  storageBucket: "fir-ex-ae042.appspot.com",
  messagingSenderId: "310511428370",
  appId: "1:310511428370:web:0d9d5365e769a64a2a89cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();