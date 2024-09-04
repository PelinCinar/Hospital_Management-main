import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireBaseConfig"; // Adjust the path as needed
import { users } from "../../assets/data/users";

const AddUsers = () => {
  useEffect(() => {
    const addUsersToFirebase = async () => {
      try {
        for (const user of users) {
          await addDoc(collection(db, "users"), {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            role: user.role,
            gender: user.gender,
            profileImage: user.profileImage || null,
          });
        }
        console.log("All users added successfully!");
      } catch (error) {
        console.error("Error adding users: ", error);
      }
    };

    addUsersToFirebase();
  }, []);

  return <div>Adding users to Firebase...</div>;
};

export default AddUsers;
