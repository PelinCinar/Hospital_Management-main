// src/components/AppointmentsEdit.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firestore'ı doğru bir şekilde import edin

const AppointmentsEdit = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    date: '',
    time: '',
    disease: '',
    doctor: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsList);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment: ', error);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setFormValues({
      name: appointment.name,
      date: appointment.date,
      time: appointment.time,
      disease: appointment.disease,
      doctor: appointment.doctor
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const appointmentRef = doc(db, 'appointments', selectedAppointment.id);
      await updateDoc(appointmentRef, formValues);
      alert('Appointment updated successfully!');
      setSelectedAppointment(null);
      setFormValues({
        name: '',
        date: '',
        time: '',
        disease: '',
        doctor: ''
      });
      // Refresh the appointments list
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointmentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsList);
    } catch (error) {
      console.error('Error updating appointment: ', error);
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Appointments</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Patient</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Time</th>
            <th className="border px-4 py-2 text-left">Disease</th>
            <th className="border px-4 py-2 text-left">Doctor</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td className="border px-4 py-2">{appointment.name}</td>
              <td className="border px-4 py-2">{appointment.date}</td>
              <td className="border px-4 py-2">{appointment.time}</td>
              <td className="border px-4 py-2">{appointment.disease}</td>
              <td className="border px-4 py-2">{appointment.doctor}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAppointment && (
        <div className="mt-6 border p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Edit Appointment</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formValues.time}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
              <input
                type="text"
                name="disease"
                value={formValues.disease}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <input
                type="text"
                name="doctor"
                value={formValues.doctor}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Update Appointment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentsEdit;
