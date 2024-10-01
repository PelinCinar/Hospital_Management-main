import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore configuration

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const doctorsData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.role === "doctor"); // Only fetch doctors
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mevcut Doktorlar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 ? (
          <p>Henüz doktor bulunmuyor.</p>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.email}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-6"
            >
              {/* Display Profile Image */}
              <img
                src={doctor.profileImage || "default-profile.png"} // Use a default image if not available
                alt={doctor.fullName}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{doctor.fullName}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">E-posta:</span> {doctor.email}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Tıbbi Birim:</span>{" "}
                {doctor.department}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
