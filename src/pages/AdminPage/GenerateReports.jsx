import React from 'react';

const reports = [
  { id: 1, title: 'Monthly Appointments', date: '2024-09-01', type: 'Appointments' },
  { id: 2, title: 'User Activity Report', date: '2024-08-01', type: 'Activity' },
  // Diğer raporları buraya ekleyebilirsiniz
];

const GenerateReports = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Generate Reports</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{report.id}</td>
                <td className="py-3 px-4">{report.title}</td>
                <td className="py-3 px-4">{report.date}</td>
                <td className="py-3 px-4">{report.type}</td>
                <td className="py-3 px-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    View
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 ml-2">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateReports;
