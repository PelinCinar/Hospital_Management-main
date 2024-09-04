import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiUser } from 'react-icons/fi';
import { db, doc, getDoc, setDoc } from '../../firebaseConfig'; // Doğru dosya yolunu kullanın

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    password: '', // Şifreyi genellikle göstermemek daha iyi olabilir
    profileImage: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      // Kullanıcı ID'sini dinamik olarak almanız gerekir
      const userDoc = doc(db, 'profiles', 'user-id'); // 'user-id' kullanıcı ID'nizi temsil eder
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = async () => {
    const userDoc = doc(db, 'profiles', 'user-id');
    await setDoc(userDoc, profile, { merge: true }); // Profil verilerini güncelle
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Settings</h2>
      <div className="flex items-center mb-4">
        <FiUser className="text-2xl text-primaryColor mr-3" />
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full Name"
            />
          ) : (
            <p className="text-lg font-medium text-gray-700">{profile.fullName}</p>
          )}
        </div>
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="ml-4 bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-primaryColor-dark"
          >
            <FiSave className="inline mr-2" /> Save
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            <FiEdit className="inline mr-2" /> Edit
          </button>
        )}
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Email</p>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
          />
        ) : (
          <p className="text-gray-600">{profile.email}</p>
        )}
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Password</p>
        {isEditing ? (
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Password"
          />
        ) : (
          <p className="text-gray-600">********</p> // Şifreyi gizleyin
        )}
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Profile Image URL</p>
        {isEditing ? (
          <input
            type="text"
            name="profileImage"
            value={profile.profileImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Profile Image URL"
          />
        ) : (
          <img
            src={profile.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
