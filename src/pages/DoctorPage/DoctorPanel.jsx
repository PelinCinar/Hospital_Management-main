import React from "react";
import {
  FiCalendar,
  FiUser,
  FiLogOut,
  FiList,
  FiSettings,
  FiClock,
  FiCheckCircle,
  FiInbox,
} from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import GetAppointment from "../CustomerPage/GetAppointment"; // Import the appointment page
import "./DoctorPanel.css"; // Import the CSS file for custom scrollbar styles

const DoctorPanel = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col fixed h-full overflow-y-auto">
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
                to="appointmentrequests"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiInbox /> Appointment Requests
              </Link>
            </li>
            <li>
              <Link
                to="upcomingappointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiClock /> Upcoming Appointments
              </Link>
            </li>
            <li>
              <Link
                to="pastappointments"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCheckCircle /> Past Appointments
              </Link>
            </li>
            <li>
              <Link
                to="appointmentcalendar"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiCalendar /> Appointments Calendar
              </Link>
            </li>
            <li>
              <Link
                to="availabilitySettings"
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiSettings /> Availability Settings
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
            {/* Link to the GetAppointmentPage */}
            <li>
              <Link
                to="get-appointment" // Use a unique route
                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md"
              >
                <FiList /> Randevu Al
              </Link>
            </li>
          </ul>
        </nav>

        {/* Fixed Logout Button */}
        <div className="px-4 py-6 border-t border-gray-700 mt-auto">
          <Link to="/login">
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
              <FiLogOut />
              Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorPanel;
