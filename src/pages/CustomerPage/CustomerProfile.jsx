import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

const CustomerProfile = () => {
  const [patient, setPatient] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in!");
          return;
        }

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPatient(docSnap.data());
          setFormValues(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchPatient();
  }, [auth.currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in!");
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, formValues, { merge: true });
      setPatient(formValues);
      setIsEditing(false);
      alert("Bilgiler güncellendi!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (!patient) {
    return <p>Loading...</p>;
  }


  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Hasta Profili</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kişisel Bilgiler */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Kişisel Bilgiler</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="mb-2"><span className="font-semibold">Ad:</span> {patient.name}</p>
            <p className="mb-2"><span className="font-semibold">E-posta:</span> {patient.email}</p>
            <p className="mb-2"><span className="font-semibold">Telefon:</span> {patient.phone}</p>
            <p className="mb-2"><span className="font-semibold">Doğum Tarihi:</span> {patient.dateofbirth}</p>
            <p><span className="font-semibold">Adres:</span> {patient.address}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Bilgileri Düzenle
            </button>
          </div>
        </div>

        {/* Düzenleme Formu */}
        {isEditing && (
          <div className="fixed top-16 right-0 md:w-1/3 p-6 bg-white rounded-lg shadow-lg z-10">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-2">Düzenle</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  type="text"
                  name="fullName"
                  value={formValues.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input
                  type="text"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                <input
                  type="text"
                  name="dateofbirth"
                  value={formValues.dateofbirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <input
                  type="text"
                  name="address"
                  value={formValues.address || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Bilgileri Güncelle
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mt-2 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                İptal Et
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
