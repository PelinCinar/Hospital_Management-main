import React from 'react';
import { FiCalendar } from 'react-icons/fi';

const appointments = [
  { id: 1, patient: 'John Doe', date: '2024-09-10', time: '10:00 AM' },
  { id: 2, patient: 'Jane Smith', date: '2024-09-12', time: '2:00 PM' },
  // Add more appointments as needed
];

const Appointments = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Patient</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border px-4 py-2">{appointment.patient}</td>
              <td className="border px-4 py-2">{appointment.date}</td>
              <td className="border px-4 py-2">{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
