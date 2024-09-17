import React, { useState, useEffect } from "react";
import CalendarComponent from "./CalendarComponent";
import moment from "moment";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Firestore'ı doğru şekilde import edin

const GetAppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    time: "",
    department:"",
    doctor: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);

  useEffect(() => {
    const fetchDoctorsAndDiseases = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const userList = userSnapshot.docs.map((doc) => doc.data());

        const doctorList = userList.filter((user) => user.role === "doctor");
        const diseaseList = [
          ...new Set(userList.map((user) => user.department)),
        ];
        const filteredDoctors = doctors.filter(
          (doctor) => doctor.department === formValues.disease
        );

        console.log("Filtered Doctors:", filteredDoctors);

        setDoctors(doctorList);
        setDiseaseOptions(diseaseList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const appointmentData = {
        ...formValues,
        date: selectedDate.format("YYYY-MM-DD"),
        createdAt: Timestamp.now(), // Firestore timestamp kullanarak zaman damgası ekliyoruz
      };

      await addDoc(collection(db, "appointments"), appointmentData);

      alert("Randevu Oluşturuldu");
      setShowForm(false);
      setFormValues({
        fullName: "",
        email: "",
        time: "",
        department:"",
        doctor: "",
      });
    } catch (error) {
      console.error("Error adding appointment: ", error);
      alert("Randevu oluşturulurken bir hata oluştu.");
    }
  };

  // Doktorları seçilen departmana göre filtrele
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.department === formValues.disease
  );

  console.log("Form Values:", formValues);
  console.log("Doctors List:", doctors);
  console.log("Filtered Doctors:", filteredDoctors);

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
                    Ad
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
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
                  <input
                    type="time"
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tıbbı Birim
                  </label>
                  <select
                    name="disease"
                    value={formValues.disease}
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
                      <option key={doctor.email} value={doctor.email}>
                        {doctor.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
