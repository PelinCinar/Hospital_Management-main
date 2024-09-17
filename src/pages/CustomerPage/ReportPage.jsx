// src/App.js
import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firebase yapılandırmanızı buraya ekleyin

const ReportPage= () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const REPORT_ID = 'uXosfQvd7R0Ws5ROe1s9'; // Belirli ID

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = collection(db, 'rapor');
        const reportSnapshot = await getDocs(reportsCollection);
        const reportList = reportSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(reportList);
        setLoading(false);
      } catch (err) {
        setError('Raporlar alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const fetchReportById = async () => {
      try {
        const docRef = doc(db, 'rapor', REPORT_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSelectedReport({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Rapor bulunamadı.');
        }
      } catch (err) {
        setError('Rapor alınırken bir hata oluştu.');
      }
    };

    fetchReportById();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Hastane Raporları</h1>
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Rapor Listesi</h2>
            <ul className="space-y-2">
              {reports.map(report => (
                <li
                  key={report.id}
                  className="cursor-pointer p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
                  onClick={() => setSelectedReport(report)}
                >
                  {report.reportTitle}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-2">
          <div className="p-4 bg-white rounded-lg shadow-md">
            {selectedReport ? (
              <>
                <h2 className="text-2xl font-bold mb-2">{selectedReport.reportTitle}</h2>
                <p className="mb-2 text-gray-700">{selectedReport.reportContent}</p>
                <p className="text-gray-600">Hasta ID: <span className="font-semibold">{selectedReport.patientId}</span></p>
                <p className="text-gray-600">İsim: <span className="font-semibold">{selectedReport.name}</span></p>
                <p className="text-gray-600">Tarih: <span className="font-semibold">{selectedReport.reportDate}</span></p>
              </>
            ) : (
              <div className="text-gray-500">Bir rapor seçin.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
