import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'; // addDoc'u ekledik
import { db, auth } from '../../firebaseConfig'; // Firestore ve Auth'u doğru bir şekilde import edin
import { onAuthStateChanged } from 'firebase/auth'; // Auth'dan oturum kontrolü için onAuthStateChanged kullanıyoruz

const GenerateReports = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Seçili randevuyu takip et

  // Giriş yapan doktorun verisini al
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoctorId(user.uid); // Giriş yapan doktorun uid'sini alıyoruz
      } else {
        console.log('No user is signed in');
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore'dan sadece giriş yapan doktora ait randevuları çek
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorId) return; // Eğer doktorId henüz gelmediyse bekle

      try {
        const q = query(collection(db, 'appointments'), where('doctorId', '==', doctorId)); // Sadece giriş yapan doktorun randevularını al
        const querySnapshot = await getDocs(q);
        const appointmentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Appointments: ", appointmentsList); // Randevuları kontrol et
        setAppointments(appointmentsList);
      } catch (error) {
        console.error('Error fetching appointments: ', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  // Rapor yazma inputunu handle et
  const handleReportInput = (e) => {
    setReportContent(e.target.value);
  };

  // Rapor oluşturma ve Firestore'a kaydetme işlemi
  const handleGenerateReport = async (appointment) => {
    if (!appointment) {
      console.error('Appointment data is undefined');
      return;
    }

    try {
      // appointments koleksiyonu içindeki ilgili randevuya rapor ekle
      const reportRef = await addDoc(collection(db, `appointments/${appointment.id}/reports`), {
        content: reportContent,
        createdAt: new Date(),
        doctorId: doctorId,
        patientId: appointment.patientId, // Hasta ID'si
        patientFullName: appointment.patientFullName,
      });

      console.log('Report successfully saved with ID: ', reportRef.id);
      setReportContent(''); // Formu temizle
    } catch (error) {
      console.error('Error saving report: ', error);
    }
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
                <td className="py-3 px-4">{appointment.patientFullName}</td>
                <td className="py-3 px-4">{appointment.doctorFullName}</td> {/* Doktor adı */}
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.time}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => setSelectedAppointment(appointment)} // Seçili randevuyu ayarla
                  >
                    Write Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rapor yazma inputu */}
      {selectedAppointment && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Write your report for {selectedAppointment.patientFullName}
          </h2>
          <textarea
            value={reportContent}
            onChange={handleReportInput}
            rows="5"
            placeholder="Write your report here..."
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md mt-2 hover:bg-green-600"
            onClick={() => handleGenerateReport(selectedAppointment)} // Seçilen randevuya rapor ekle
          >
            Save Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReports;
