import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiUsers, FiCalendar, FiBarChart2, FiLogOut,FiFileText } from 'react-icons/fi';

const CustomerPanel = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-center py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Customer Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
          <li>
              <Link
                to="/customer-panel/customerprofile"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiUsers /> Profile
              </Link>
            </li> 
            
            <li>
          <Link
            to="/customer-panel/myappointments" // Sayfa rotasına uygun olarak burayı güncelleyin
            className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            <FiCalendar /> Randevularım
          </Link>
        </li>
        <li>
          <Link
            to="/customer-panel/appointments" // Sayfa rotasına uygun olarak burayı güncelleyin
            className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            <FiCalendar /> Randevu Al
          </Link>
        </li>
        <li>
          <Link
            to="/customer-panel/reportpage" // Sayfa rotasına uygun olarak burayı güncelleyin
            className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
          >
            <FiFileText /> Raporlarım
          </Link>
        </li>
          </ul>
        </nav>
        <div className="px-4 py-6 border-t border-gray-700">
          <Link
            to="/home"  // Anasayfa yolunu belirtin
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

export default CustomerPanel;
