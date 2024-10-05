import React, { useState, useEffect } from "react";
import CalendarComponent from "./CalendarComponent";
import moment from "moment";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const GetAppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctorsAndDiseases = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, "users"));
        const userList = userSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const doctorList = userList.filter((user) => user.role === "doctor");
        const diseaseList = [
          ...new Set(userList.map((user) => user.department)),
        ];

        setDoctors(doctorList);
        setDiseaseOptions(diseaseList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Doktor ve bölüm bilgileri yüklenirken bir hata oluştu.");
      }
    };

    fetchDoctorsAndDiseases();
  }, []);

  const handleDateClick = (date) => {
    const today = moment().startOf("day");

    if (date.isBefore(today, "day")) {
      setError(
        "Geçmiş bir tarihe randevu alınamaz. Lütfen bugünden sonraki bir tarih seçin."
      );
      setShowForm(false);
      setSelectedDate(null);
      return;
    }

    setError("");
    setSelectedDate(date);
    setShowForm(true);
    if (formValues.doctor) {
      fetchAvailableTimes(formValues.doctor, date.format("YYYY-MM-DD"));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "doctor" && selectedDate) {
      await fetchAvailableTimes(value, selectedDate.format("YYYY-MM-DD"));
    }

    if (name === "department") {
      setFormValues((prev) => ({
        ...prev,
        doctor: "",
        time: "",
      }));
      setAvailableTimes([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const appointmentData = {
        ...formValues,
        date: selectedDate.format("YYYY-MM-DD"),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "appointments"), appointmentData);

      alert("Randevu başarıyla oluşturuldu!");
      setShowForm(false);
      setFormValues({
        fullName: "",
        email: "",
        time: "",
        department: "",
        doctor: "",
      });
      setSelectedDate(null);
    } catch (error) {
      console.error("Error adding appointment: ", error);
      setError(
        "Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableTimes = async (doctorEmail, selectedDate) => {
    setIsLoading(true);
    setError("");
    try {
      const q = query(
        collection(db, "appointments"),
        where("doctor", "==", doctorEmail),
        where("date", "==", selectedDate)
      );
      const querySnapshot = await getDocs(q);
      const bookedTimes = querySnapshot.docs.map((doc) => doc.data().time);

      const doctorRef = doc(db, "users", doctorEmail);
      const doctorSnap = await getDoc(doctorRef);

      if (doctorSnap.exists()) {
        const doctorData = doctorSnap.data();
        const doctorAvailability = doctorData.availability || [];

        if (doctorAvailability.length === 0) {
          setError("Bu doktor için müsait saat bulunmamaktadır.");
          setAvailableTimes([]);
          return;
        }

        const filteredTimes = doctorAvailability.filter(
          (time) => !bookedTimes.includes(time)
        );

        if (filteredTimes.length === 0) {
          setError("Bu tarih için müsait randevu saati bulunmamaktadır.");
        }

        setAvailableTimes(filteredTimes);
      } else {
        setError("Doktor bilgileri bulunamadı.");
      }
    } catch (error) {
      setError("Müsait saatler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
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
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {showForm && (
            <div className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Randevu Formu</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İsim
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.fullName}
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
                    Bölüm
                  </label>
                  <select
                    name="department"
                    value={formValues.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled>
                      Bölüm Seçin...
                    </option>
                    {diseaseOptions.map((department) => (
                      <option key={department} value={department}>
                        {department}
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
                    disabled={!formValues.department}
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Randevu Saati
                  </label>
                  <select
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                    disabled={
                      !formValues.doctor ||
                      !selectedDate ||
                      availableTimes.length === 0
                    }
                  >
                    <option value="" disabled>
                      Randevu Saati Seçin...
                    </option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                  disabled={isLoading || !selectedDate || !formValues.time}
                >
                  {isLoading ? "İşleniyor..." : "Randevu Oluştur"}
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
