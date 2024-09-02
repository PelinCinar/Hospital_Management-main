import React from 'react';

const appointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-09-01', time: '10:00 AM' },
  { id: 2, patient: 'Jane Roe', doctor: 'Dr. Johnson', date: '2024-09-01', time: '11:00 AM' },
  // Diğer randevuları buraya ekleyebilirsiniz
];

const ViewAppointments = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">View Appointments</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Doctor</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{appointment.id}</td>
                <td className="py-3 px-4">{appointment.patient}</td>
                <td className="py-3 px-4">{appointment.doctor}</td>
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAppointments;
