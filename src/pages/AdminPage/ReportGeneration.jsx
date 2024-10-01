import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Firebase ayarlarının olduğu dosya
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Card, Modal, Button } from 'antd';
import 'antd/dist/antd'; //
import '../../index.css'; // Tailwind CSS stillerini ekle

const ReportGeneration = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [open, setOpen] = useState(false); // 'visible' yerine 'open' kullandık
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const today = new Date();

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsCollection = collection(db, "appointments");
      const appointmentSnapshot = await getDocs(appointmentsCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentList);
    };
    const fetchCancelledAppointments = async () => {
      const cancelledCollection = collection(db, "cancelledAppointments");
      const cancelledSnapshot = await getDocs(cancelledCollection);
      const cancelledList = cancelledSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCancelledAppointments(cancelledList);
    };

    fetchAppointments();
    fetchCancelledAppointments();
  }, []);

  const showModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true); // 'setVisible' yerine 'setOpen' kullandık
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedAppointment(null);
  };

  const cancelAppointment = async () => {
    if (selectedAppointment && !cancelledAppointments.some(app => app.id === selectedAppointment.id)) {
      // İptal edilen randevuyu Firestore'a ekle
      await addDoc(collection(db, "cancelledAppointments"), {
        fullName: selectedAppointment.fullName, // patientName yerine fullName kullanıyoruz
        date: selectedAppointment.date,
        department: selectedAppointment.department,
        originalId: selectedAppointment.id,
      });
  
      setCancelledAppointments([...cancelledAppointments, selectedAppointment]);
      setAppointments(appointments.filter(app => app.id !== selectedAppointment.id)); // Randevuyu mevcut listeden çıkar
      setOpen(false); 
      setSelectedAppointment(null);
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Randevu Raporu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const isPast = appointmentDate < today;

          return (
            <Card
              key={appointment.id}
              className={`shadow-lg transition-transform transform ${
                isPast ? 'bg-red-200' : 'bg-green-200'
              }`}
              title={`Hasta Adı: ${appointment.fullName}`}
              onClick={() => showModal(appointment)}
              hoverable
            >
              <p>Randevu Tarihi: {appointment.date}</p>
            </Card>
          );
        })}
      </div>

      {selectedAppointment && (
        <Modal
          title="Randevu Detayları"
          open={open} // 'visible' yerine 'open' kullandık
          onCancel={handleCancel}
          footer={null}
        >
          <p><strong>Hasta Adı:</strong> {selectedAppointment.fullName}</p>
          <p><strong>Randevu Tarihi:</strong> {selectedAppointment.date}</p>
          <p><strong>Departman:</strong> {selectedAppointment.department}</p>
          <Button
            type="primary"
            danger
            onClick={cancelAppointment}
            className="w-full bg-red-500 hover:bg-red-700"
          >
            Randevuyu İptal Et
          </Button>
        </Modal>
      )}

      <h2 className="text-xl mt-6">İptal Edilen Randevular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cancelledAppointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="shadow-lg bg-gray-200"
            title={`İptal Edilen Hasta: ${appointment.fullName}`}
          >
            <p>Randevu Tarihi: {appointment.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportGeneration;
