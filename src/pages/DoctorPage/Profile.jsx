import React, { useState } from 'react';
import { FiEdit, FiSave, FiUser } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Pelin Çınar',
    email: 'dr.pelin@example.com',
    specialty: 'Cardiologist',
  });

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

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
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : (
            <p className="text-lg font-medium text-gray-700">{profile.name}</p>
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
          />
        ) : (
          <p className="text-gray-600">{profile.email}</p>
        )}
      </div>
      <div>
        <p className="text-lg font-medium text-gray-700 mb-2">Specialty</p>
        {isEditing ? (
          <input
            type="text"
            name="specialty"
            value={profile.specialty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <p className="text-gray-600">{profile.specialty}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
