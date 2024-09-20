import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomerProfile = () => {
  const userData = useSelector((state) => state.user)
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendirin
          navigate('/login');
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPatient(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false); // Veri çekme işlemi tamamlandığında loading durumunu güncelle
      }
    };

    fetchPatient();
  }, [auth.currentUser, navigate]);

  if (loading) {
    return <p>Loading...</p>; // Veri yüklenirken bir yükleniyor mesajı gösterebilirsiniz
  }

  if (!patient) {
    return <p>No user data found!</p>; // Eğer veri yoksa bir mesaj gösterebilirsiniz
  }

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Hasta Profili</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="mb-2"><span className="font-semibold">Ad:</span> {patient.fullName}</p>
        <p className="mb-2"><span className="font-semibold">E-posta:</span> {patient.email}</p>
        <p className="mb-2"><span className="font-semibold">Cinsiyet:</span> {patient.gender}</p>
        <p className="mb-2"><span className="font-semibold">Doğum Tarihi:</span> {patient.profileImage}</p>
        <p><span className="font-semibold">Adres:</span> {patient.address}</p>
      </div>
    </div>
  );
};

export default CustomerProfile;
