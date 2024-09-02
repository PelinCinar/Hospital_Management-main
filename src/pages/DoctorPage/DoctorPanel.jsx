import React from 'react';
import { FiCalendar, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';

const DoctorPanel = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-center py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Doctor Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="appointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCalendar /> Appointments
              </Link>
            </li>
            <li>
              <Link
                to="profile"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiUser /> Profile
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-6 border-t border-gray-700">
          <Link to="/login">
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
              <FiLogOut />
              Logout
            </button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorPanel;
