import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireBaseConfig"; // Firestore yapılandırmanız
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "doctor",
    gender: "",
    profileImage: "",
    department: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doctorRef = collection(db, "users"); // Firestore'da "users" koleksiyonu
      await addDoc(doctorRef, formData); // Tüm form verisini kaydediyoruz
      toast.success("Doctor added successfully"); // Başarı mesajı
      // Formu temizleme
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "doctor",
        gender: "",
        profileImage: "",
        department: ""
      });
    } catch (error) {
      console.error("Error adding doctor: ", error);
      toast.error("Error adding doctor: " + error.message); // Hata mesajı
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Doctor Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter department"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-lg font-medium mb-2">Profile Image URL</label>
          <input
            type="text"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className="w-full h-12 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            placeholder="Enter profile image URL"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 transition duration-300 ease-in-out"
          >
            Add Doctor
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddProfile;
