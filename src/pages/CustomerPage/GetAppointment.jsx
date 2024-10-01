import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import authentication functions
import CalendarComponent from "./CalendarComponent"; // Takvim bileşeni
import moment from "moment";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const GetAppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    time: "",
    department: "",
    doctor: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [userId, setUserId] = useState(null); // Kullanıcı ID'si için durum

  useEffect(() => {
    const auth = getAuth(); // Firebase Authentication'ı al
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Giriş yapan kullanıcının UID'sini ayarla
      } else {
        setUserId(null); // Kullanıcı oturum açmamış
      }
    });

    // Temizlik işlemi
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDoctorsAndDiseases = async () => {
      const userSnapshot = await getDocs(collection(db, "users"));
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const doctorList = userList.filter((user) => user.role === "doctor");
      const diseaseList = [...new Set(userList.map((user) => user.department))];

      setDoctors(doctorList);
      setDiseaseOptions(diseaseList);
    };

    fetchDoctorsAndDiseases();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      if (formValues.doctor && selectedDate) {
        const formattedDate = selectedDate.format("YYYY-MM-DD");

        const availabilityQuery = query(
          collection(db, "availability"),
          where("doctorId", "==", formValues.doctor),
          where("date", "==", formattedDate)
        );

        const availabilitySnapshot = await getDocs(availabilityQuery);
        if (!availabilitySnapshot.empty) {
          const availabilityData = availabilitySnapshot.docs[0].data();
          const slots = availabilityData.slots || [];
          setAvailableTimes(slots);
        } else {
          setAvailableTimes([]);
        }
      }
    };

    fetchAvailability();
  }, [formValues.doctor, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.time) {
      alert("Lütfen bir randevu saati seçin.");
      return;
    }

    try {
      const appointmentData = {
        ...formValues,
        date: selectedDate.format("YYYY-MM-DD"),
        createdAt: Timestamp.now(),
        userId: userId, // Kullanıcının UID'sini randevu verilerine ekle
      };

      await addDoc(collection(db, "appointments"), appointmentData);
      alert("Randevu Oluşturuldu");
      setShowForm(false);
      setFormValues({
        fullName: "",
        email: "",
        time: "",
        department: "",
        doctor: "",
      });
    } catch (error) {
      console.error("Error adding appointment: ", error);
      alert("Randevu oluşturulurken bir hata oluştu.");
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.department === formValues.department
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Randevu Sayfası</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <CalendarComponent onDateClick={handleDateClick} />
        </div>
        <div className="flex-1">
          {showForm && (
            <div className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Randevu Formu</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Randevu Tarihi
                  </label>
                  <input
                    type="text"
                    value={selectedDate.format("YYYY-MM-DD")}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Randevu Saati
                  </label>
                  <div className="space-y-2">
                    {availableTimes.length > 0 ? (
                      availableTimes.map((time) => {
                        const { startTime, endTime } = time; 
                        const currentTime = `${startTime}-${endTime}`; 
                        const isSelected = formValues.time === currentTime;

                        return (
                          <div key={currentTime} className="flex items-center">
                            <input
                              type="radio" 
                              name="appointmentTime"
                              checked={isSelected}
                              onChange={() => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  time: currentTime, 
                                }));
                              }}
                            />
                            <label className="ml-2">{`${startTime} - ${endTime}`}</label>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center">
                        Seçilen tarihte uygun saat bulunmamaktadır.
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tıbbı Birim
                  </label>
                  <select
                    name="department"
                    value={formValues.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Tıbbı Birim Seçin...
                    </option>
                    {diseaseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doktor
                  </label>
                  <select
                    name="doctor"
                    value={formValues.doctor}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Doktor Seçin...
                    </option>
                    {filteredDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                  Randevu Oluştur
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAppointmentPage;
