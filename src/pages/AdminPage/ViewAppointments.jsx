// src/pages/Admin/ViewAppointments.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firestore'ı doğru bir şekilde import edin

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

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

  const getListData = (value) => {
    const date = value.format('YYYY-MM-DD');
    return appointments
      .filter(appointment => appointment.date === date)
      .map(appointment => ({
        id: appointment.id,
        patient: appointment.fullName,
        time: appointment.time,
        doctor: appointment.doctor|| "Unknown", // Eğer doktor adı eksikse 'Unknown' yaz
      }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="list-none p-0 m-0">
        {listData.map(item => (
          <li key={item.id} className="mb-1">
            <Badge
              status="processing"
              text={`${item.patient} with Dr. ${item.doctor} at ${item.time}`}
              className="block text-sm"
            />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div className="appointments-calendar p-4 bg-white rounded-lg shadow-md">
      <Calendar
        dateCellRender={dateCellRender}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default ViewAppointments;
