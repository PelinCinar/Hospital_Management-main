// src/AppointmentsListPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import moment from "moment";

const AppointmentsListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const currentDate = moment();

  // Gelecek ve geçmiş randevular
  const pastAppointments = appointments.filter(
    (appointment) =>
      moment(appointment.date).isBefore(currentDate, "day") &&
      !appointment.cancelled
  );

  const futureAppointments = appointments.filter(
    (appointment) =>
      moment(appointment.date).isSameOrAfter(currentDate, "day") &&
      !appointment.cancelled
  );

  // Randevu iptal etme (Firestore üzerinden)
  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Bu randevuyu iptal etmek istediğinizden emin misiniz?"
    );
    if (!confirmCancel) return;

    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { cancelled: true }); // Firestore'da iptal durumu güncelleniyor
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, cancelled: true }
            : appointment
        )
      );
      alert("Randevu başarıyla iptal edildi.");
    } catch (error) {
      console.error("Error cancelling appointment: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Randevular</h1>

      {/* Gelecek Randevular */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Gelecek Randevular</h2>
        <div className="border p-4 rounded-lg shadow-md">
          {futureAppointments.length === 0 ? (
            <p>Gelecek randevu bulunmuyor.</p>
          ) : (
            <ul className="list-disc list-inside">
              {futureAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="mb-4 p-4 border border-gray-200 rounded-lg bg-green-100 text-green-800"
                >
                  <p>
                    <span className="font-semibold">Ad:</span>{" "}
                    {appointment.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">E-posta:</span>{" "}
                    {appointment.email}
                  </p>
                  <p>
                    <span className="font-semibold">Randevu Tarihi:</span>{" "}
                    {appointment.date}
                  </p>
                  <p>
                    <span className="font-semibold">Randevu Saati:</span>{" "}
                    {appointment.time}
                  </p>
                  <p>
                    <span className="font-semibold">Tıbbı Birim:</span>{" "}
                    {appointment.department}
                  </p>
                  <button
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Randevuyu İptal Et
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Geçmiş Randevular */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Geçmiş Randevular</h2>
        <div className="border p-4 rounded-lg shadow-md">
          {pastAppointments.length === 0 ? (
            <p>Geçmiş randevu bulunmuyor.</p>
          ) : (
            <ul className="list-disc list-inside">
              {pastAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="mb-4 p-4 border border-gray-200 rounded-lg bg-red-100 text-red-800"
                >
                  <p>
                    <span className="font-semibold">Ad:</span>{" "}
                    {appointment.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">E-posta:</span>{" "}
                    {appointment.email}
                  </p>
                  <p>
                    <span className="font-semibold">Randevu Tarihi:</span>{" "}
                    {appointment.date}
                  </p>
                  <p>
                    <span className="font-semibold">Randevu Saati:</span>{" "}
                    {appointment.time}
                  </p>
                  <p>
                    <span className="font-semibold">Tıbbı Birim:</span>{" "}
                    {appointment.department}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsListPage;
