import React, { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProfileImage, setNewProfileImage] = useState('');
  const [file, setFile] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [auth.currentUser, navigate]);

  // Resim URL'sini güncelle
  const handleImageUrlChange = async () => {
    if (newProfileImage) {
      try {
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { profileImage: newProfileImage });
        setDoctor((prevDoctor) => ({ ...prevDoctor, profileImage: newProfileImage }));
        setNewProfileImage('');
        alert('Profil resmi başarıyla güncellendi!');
      } catch (error) {
        console.error('Profil resmi güncellenirken bir hata oluştu:', error);
      }
    }
  };

  // Bilgisayardan dosya yükleyip resim güncelleme
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setDoctor((prevDoctor) => ({ ...prevDoctor, profileImage: imageUrl }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doctor) {
    return <p>No doctor data found!</p>;
  }

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center mb-8">Doktor Profili</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        {/* Profil Resmi */}
        <div className="relative group mx-auto w-40 h-40 mb-6">
          {doctor.profileImage ? (
            <img
              src={doctor.profileImage}
              alt={`${doctor.fullName} Profil Resmi`}
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              Profil Fotoğrafı Yok
            </div>
          )}
          {/* Resmi Değiştir Butonu */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
            <label className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-2 rounded cursor-pointer">
              Resmi Değiştir
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Kullanıcı Bilgileri */}
        <div className="text-left mb-4">
          <p className="mb-2"><span className="font-semibold">Ad:</span> {doctor.fullName}</p>
          <p className="mb-2"><span className="font-semibold">E-posta:</span> {doctor.email}</p>
          <p className="mb-2"><span className="font-semibold">Bölüm:</span> {doctor.department}</p>
          <p className="mb-2"><span className="font-semibold">Cinsiyet:</span> {doctor.gender}</p>
        </div>

        {/* URL ile Resim Değiştir */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Resmi URL ile Güncelle</h2>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Resim URL'sini girin"
            value={newProfileImage}
            onChange={(e) => setNewProfileImage(e.target.value)}
          />
          <button
            onClick={handleImageUrlChange}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            URL ile Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
