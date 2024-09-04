// src/seed.js

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";  // firebase.js dosyanızın doğru yolunu kullanın
import { users } from "./assets/data/users";  // users.js dosyanızı import edin

const seedUsers = async () => {
  try {
    const usersCollection = collection(db, "users");

    for (const user of users) {
      await addDoc(usersCollection, user);
    }

    console.log("Kullanıcı verileri başarıyla Firestore'a eklendi!");
  } catch (error) {
    console.error("Veri ekleme hatası: ", error);
  }
};

seedUsers();
