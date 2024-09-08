import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ContactView = () => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const mailCollection = collection(db, 'contactMails');
        const mailSnapshot = await getDocs(mailCollection);
        const mailList = mailSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMails(mailList);
      } catch (error) {
        console.error('Mails fetch error:', error);
      }
    };

    fetchMails();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Mails</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {mails.length > 0 ? (
              mails.map((mail) => (
                <tr key={mail.id} className="border-b">
                  <td className="py-3 px-4 text-gray-700">{mail.name}</td>
                  <td className="py-3 px-4 text-gray-700">{mail.email}</td>
                  <td className="py-3 px-4 text-gray-700">{mail.message}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(mail.date.seconds * 1000).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-3 px-4 text-center text-gray-500"
                >
                  No mails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactView;
