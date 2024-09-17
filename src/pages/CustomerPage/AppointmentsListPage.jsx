// src/AppointmentsListPage.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

const AppointmentsListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentsData = querySnapshot.docs.map(doc => ({
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Randevular</h1>
      <div className="border p-4 rounded-lg shadow-md">
        {appointments.length === 0 ? (
          <p>Henüz randevu bulunmuyor.</p>
        ) : (
          <ul className="list-disc list-inside">
            {appointments.map(appointment => (
              <li key={appointment.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <p><span className="font-semibold">Ad:</span> {appointment.name}</p>
                <p><span className="font-semibold">E-posta:</span> {appointment.email}</p>
                <p><span className="font-semibold">Randevu Tarihi:</span> {appointment.date}</p>
                <p><span className="font-semibold">Randevu Saati:</span> {appointment.time}</p>
                <p><span className="font-semibold">Tıbbı Birim:</span> {appointment.disease}</p>
                <p><span className="font-semibold">Oluşturulma Tarihi:</span> {appointment.createdAt.toDate().toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsListPage;
