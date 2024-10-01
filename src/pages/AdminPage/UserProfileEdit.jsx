import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Seçili kullanıcı ID'si
  const [editedUserData, setEditedUserData] = useState({});

  // Firebase'den kullanıcıları çek
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // Kullanıcıyı seçip, formu doldurmak için (Toggle mantığıyla)
  const selectUser = (user) => {
    if (selectedUserId === user.id) {
      // Eğer aynı kullanıcıya tekrar tıklandıysa, kapat (selectedUserId'yi null yap)
      setSelectedUserId(null);
    } else {
      // Farklı bir kullanıcıya tıklandıysa, o kullanıcıyı seç
      setSelectedUserId(user.id);
      setEditedUserData(user); // Seçilen kullanıcı verisini düzenlemek için formda kullanıyoruz
    }
  };

  // Input alanlarında değişiklikleri yakala
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Kullanıcıyı güncelle
  const updateUser = async () => {
    try {
      const userDoc = doc(db, 'users', selectedUserId);
      await updateDoc(userDoc, editedUserData);
      alert('User updated successfully');
      
      // Güncel kullanıcı listesi
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
      setSelectedUserId(null); // Güncelleme sonrası formu kapat
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr
                  key={user.id}
                  className={`border-b border-gray-200 cursor-pointer
                    ${selectedUserId === user.id ? 'bg-blue-100' : ''}
                    ${!user.isActive ? 'bg-red-100' : ''}
                    hover:bg-blue-300 transition duration-300`}
                  onClick={() => selectUser(user)} // Tıklanınca kullanıcıyı seç veya kapat
                >
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.fullName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">{user.isActive ? 'Active' : 'Inactive'}</td>
                </tr>

                {/* Eğer bu kullanıcı seçiliyse, input alanlarını göster */}
                {selectedUserId === user.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700">Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={editedUserData.fullName || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editedUserData.email || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">Role</label>
                          <input
                            type="text"
                            name="role"
                            value={editedUserData.role || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">Status</label>
                          <select
                            name="isActive"
                            value={editedUserData.isActive ? 'Active' : 'Inactive'}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </div>
                        <button
                          onClick={updateUser}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Update User
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
