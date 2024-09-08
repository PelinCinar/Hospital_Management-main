import React, { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import { db, auth, doc, getDoc } from '../../firebaseConfig';

const Profile = () => {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    departmentName: '', // Yeni alan: departman ismi
    profileImage: '',
    personalName: '', // Yeni alan: kendi ismi
  });

  // Kullanıcı profilini Firestore'dan alma
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser; // Oturum açmış kullanıcıyı al
      if (user) {
        const userDoc = doc(db, 'profiles', user.uid); // Kullanıcı UID'si ile Firestore belgesini al
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setProfile(docSnap.data()); // Firestore'daki veriyi state'e aktar
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is logged in');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Settings</h2>

      <div className="flex items-center mb-4">
        <FiUser className="text-2xl text-primaryColor mr-3" />
        <div className="flex-1">
          <p className="text-lg font-medium text-gray-700">{profile.personalName}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Email</p>
        <p className="text-gray-600">{profile.email}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Department Name</p>
        <p className="text-gray-600">{profile.departmentName}</p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium text-gray-700 mb-2">Profile Image</p>
        <img
          src={profile.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>
    </div>
  );
};

export default Profile;
