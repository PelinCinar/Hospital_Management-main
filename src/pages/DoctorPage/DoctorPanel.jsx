import React from 'react';
import { Link } from 'react-router-dom';

const DoctorPanel = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/doctor/appointments" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">View Appointments</h2>
          <p>Manage and view your patient appointments.</p>
        </Link>

        <Link to="/doctor/reports" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Generate Reports</h2>
          <p>Create and view various reports related to your patients.</p>
        </Link>

        <Link to="/doctor/profile" className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
          <p>Update your profile and settings.</p>
        </Link>
      </div>
    </div>
  );
};

export default DoctorPanel;
