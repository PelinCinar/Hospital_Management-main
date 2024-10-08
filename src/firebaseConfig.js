import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfspQBn8sBjDMVvzxMm59dQOHXCAWZQRs",
  authDomain: "hospital-2c2cc.firebaseapp.com",
  projectId: "hospital-2c2cc",
  storageBucket: "hospital-2c2cc.appspot.com",
  messagingSenderId: "917400250973",
  appId: "1:917400250973:web:33078e2caf9cb7127abbb4",
  measurementId: "G-LZ8LJZR2JR"
};

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);


const db = getFirestore(app);
console.log("Firestore initialized:", db);

const auth = getAuth(app);
console.log("Auth initialized:", auth);
const storage = getAuth(app);


export { db, doc, getDoc, setDoc,auth,storage };
