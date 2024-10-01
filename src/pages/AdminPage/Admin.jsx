import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiUsers, FiCalendar, FiBarChart2, FiLogOut, FiUser, FiMail, FiSettings } from 'react-icons/fi';
import './Admin.css'; // Özel scrollbar stilleri için CSS dosyası

const Admin = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen"> {/* H yüksekliğini ayarla */}
        <div className="text-center py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto"> {/* Overflow ile kaydırma */}
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiUsers /> Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userprofileedit"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiSettings /> Users Edit
              </Link>
            </li>
            <li>
              <Link
                to="/admin/appointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCalendar /> View Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile" // Profile rotası
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiUser /> Add Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reportgeneration" // Rapor oluşturma rotası
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiBarChart2 /> Report Generation
              </Link>
            </li>
            <li>
              <Link
                to="/admin/admincontact" // İletişim rotası
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiMail /> View Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sabit Logout Butonu */}
        <div className="px-4 py-6 border-t border-gray-700 mt-auto">
          <Link
            to="/home" // Ana sayfa rotası
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            <FiLogOut />
            Logout
          </Link>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
