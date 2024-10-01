import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiUsers, FiCalendar, FiLogOut, FiFileText } from "react-icons/fi";
import './CustomerPanel.css'; // İsteğe bağlı olarak özel stiller için CSS dosyası

const CustomerPanel = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen"> {/* Yüksekliği ayarlama */}
        <div className="text-center py-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Customer Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto"> {/* Kaydırma için overflow */}
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
                to="/customer-panel/doctorlist"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiUsers /> Mevcut Doktorlar
              </Link>
            </li>
            <li>
              <Link
                to="/customer-panel/myappointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCalendar /> Randevularım
              </Link>
            </li>
            <li>
              <Link
                to="/customer-panel/appointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCalendar /> Randevu Al
              </Link>
            </li>
            <li>
              <Link
                to="/customer-panel/reportpage"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiFileText /> Raporlarım
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

export default CustomerPanel;
