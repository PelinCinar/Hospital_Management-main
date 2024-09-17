import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firestore'u doğru import ettiğinizden emin olun

const GenerateReports = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reportContent, setReportContent] = useState('');

  // Firestore'dan randevuları çek
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsList = querySnapshot.docs.map((doc) => ({
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

  // Rapor yazma inputunu handle et
  const handleReportInput = (e) => {
    setReportContent(e.target.value);
  };

  // Doktor için rapor oluştur
  const handleGenerateReport = (doctor) => {
    setSelectedDoctor(doctor);
    // İstediğiniz şekilde rapor içeriğini buraya ekleyebilirsiniz
    console.log(`Generating report for ${doctor}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Generate Reports</h1>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Patient Full Name</th>
              <th className="py-3 px-4 text-left">Doctor Full Name</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{appointment.id}</td>
                <td className="py-3 px-4">{appointment.patientFullName}</td> {/* Hastanın tam adı */}
                <td className="py-3 px-4">{appointment.doctorFullName}</td> {/* Doktorun tam adı */}
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleGenerateReport(appointment.doctorFullName)}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rapor yazma inputu */}
      {selectedDoctor && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Generate Report for Dr. {selectedDoctor}
          </h2>
          <textarea
            value={reportContent}
            onChange={handleReportInput}
            rows="5"
            placeholder="Write your report here..."
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
          <button className="bg-green-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-green-600">
            Save Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReports;
