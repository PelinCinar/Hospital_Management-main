import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig.js"; // Firestore yapılandırmanızı içe aktarın

const AddUsers = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // Yeni state: Kullanıcıları bir kez alıp işleme için

  useEffect(() => {
    const fetchUsersFromFirebase = async () => {
      if (isFetched) return; // Eğer kullanıcılar zaten işlendi ise tekrar çalıştırma
      setLoading(true); // İşlem başladığında loading'i true yapıyoruz
      
      try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(userRef);
        
        // Firestore'dan gelen kullanıcı verilerini kontrol et ve kullanıcı ekleme işlemini yap
        querySnapshot.forEach(async (doc) => {
          const user = doc.data(); // Firestore'dan gelen her kullanıcının verisi

          const q = query(userRef, where("email", "==", user.email));
          const userCheckSnapshot = await getDocs(q);

          if (userCheckSnapshot.empty) {
            await addDoc(userRef, {
              fullName: user.fullName,
              email: user.email,
              password: user.password, // Şifrelerin hashlenmesi daha güvenli olur
              role: user.role,
              gender: user.gender,
              profileImage: user.profileImage || null,
            });
            console.log(`User ${user.email} added successfully!`);
          } else {
            console.log(`User ${user.email} already exists, skipping.`);
          }
        });

        setIsFetched(true); // Kullanıcılar işlendi, tekrar çalışmayacak
        setLoading(false); // İşlem bitince loading'i false yapıyoruz
      } catch (error) {
        console.error("Error fetching or adding users: ", error);
        setLoading(false);
      }
    };

    fetchUsersFromFirebase();
  }, [isFetched]); // Kullanıcıların bir defa işlendiğini kontrol et

  return (
    <div>
      {loading ? "Adding users to Firebase..." : "Users fetched and added!"}
    </div>
  );
};

export default AddUsers;
