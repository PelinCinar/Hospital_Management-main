import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Import your Firebase config
import { collection, getDocs, query, where } from "firebase/firestore";
import { Card } from 'antd';
import PropTypes from "prop-types"; 
import "antd/dist/antd"; // Ensure proper Ant Design styles are loaded
import '../../index.css'; // Tailwind CSS styles

const Appointments = ({ loggedInDoctorUID }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!loggedInDoctorUID) {
        setLoading(false);
        return; // Exit if loggedInDoctorUID is not defined
      }
  
      setLoading(true);
      try {
        const appointmentsCollection = collection(db, "appointments");
        const q = query(appointmentsCollection, where("doctorUID", "==", loggedInDoctorUID));
        const appointmentSnapshot = await getDocs(q);
  
        // Convert Firebase data to a usable format
        const appointmentList = appointmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(), // Convert Firebase Timestamp to JavaScript Date
        }));
  
        setAppointments(appointmentList);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, [loggedInDoctorUID]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!loggedInDoctorUID) {
    return <div>No doctor information available.</div>; // Handle case where UID is not provided
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Doctor's Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id} // Use unique ID for each appointment
              className="shadow-lg bg-white"
              title={`Patient: ${appointment.fullName}`}
            >
              <p>Appointment Date: {appointment.date}</p>
              <p>Department: {appointment.department}</p>
              <p>Time: {appointment.time}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

Appointments.propTypes = {
  loggedInDoctorUID: PropTypes.string.isRequired, // loggedInDoctorUID should be a required string
};

export default Appointments;
