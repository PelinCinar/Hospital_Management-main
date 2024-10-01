import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { db } from '../../firebaseConfig'; // Firebase konfigürasyonu
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Firebase Auth'dan getirme

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Firebase Auth

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = auth.currentUser; // Giriş yapan kullanıcıyı al
      if (user) {
        const userId = user.uid; // Kullanıcının UID'sini al
        console.log("Giriş yapan kullanıcı ID'si:", userId); // Hata ayıklama

        try {
          // Kullanıcı ID'sine göre randevuları almak için sorgu oluştur
          const appointmentQuery = query(
            collection(db, 'appointments')
          );
          const appointmentSnapshot = await getDocs(appointmentQuery);
          const appointmentData = appointmentSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          
          console.log("Tüm randevu verileri:", appointmentData); // Tüm randevuları kontrol et
          

          console.log("Randevu verileri:", appointmentData); // Hata ayıklama
          setAppointments(appointmentData); // Randevu verilerini state'e ayarla
        } catch (error) {
          console.error('Randevular alınırken hata oluştu:', error);
        } finally {
          setLoading(false); // Veri çekme işlemi tamamlandığında loading durumunu kapat
        }
      } else {
        console.log("Giriş yapılmamış."); // Hata ayıklama
        setLoading(false); // Giriş yapılmadığında da loading durumunu kapat
      }
    };

    fetchAppointments();
  }, [auth]);

  const columns = [
    {
      title: 'Ad Soyad',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'E-posta',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Saat',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'onaylı' ? 'green' : 'volcano';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>; // Yüklenme durumu
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gelecek Randevular</h1>
      {appointments.length > 0 ? (
        <Table dataSource={appointments} columns={columns} rowKey="id" />
      ) : (
        <div className="text-center">Henüz randevu bulunmuyor.</div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
