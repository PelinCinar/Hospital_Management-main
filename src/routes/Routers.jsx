import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";

import Admin from "../pages/AdminPage/Admin";
import ViewAppointments from "../pages/AdminPage/ViewAppointments";
import ManageUsers from "../pages/AdminPage/ManageUsers";
import AddProfile from "../pages/AdminPage/AddProfile";
import ContactView from "../pages/AdminPage/ContactView";
import ReportGeneration from "../pages/AdminPage/ReportGeneration.jsx";
import UserProfileEdit from "../pages/AdminPage/UserProfileEdit.jsx";

import DoctorPanel from "../pages/DoctorPage/DoctorPanel";
import Appointments from "../pages/DoctorPage/Appointments";
import Profile from "../pages/DoctorPage/Profile";
import CustomerPanel from "../pages/CustomerPage/CustomerPanel";
import GetAppointment from "../pages/CustomerPage/GetAppointment";
import AppointmentsListPage from "../pages/CustomerPage/AppointmentsListPage.jsx";
import ReportPage from "../pages/CustomerPage/ReportPage.jsx";
import CustomerProfile from "../pages/CustomerPage/CustomerProfile.jsx";

import AppointmentsCalendar from "../pages/DoctorPage/AppointmentsCalendar.jsx";
import AppointmentRequests from "../pages/DoctorPage/AppointmentRequests.jsx";
import AvilabilitySettings from "../pages/DoctorPage/AvailabilitySettings.jsx";
import PastAppointments from "../pages/DoctorPage/PastAppointments.jsx";
import UpcomingAppointments from "../pages/DoctorPage/UpcomingAppointments.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import DoctorList from "../pages/CustomerPage/DoctorList.jsx";

import MainLayout from "../layout/MainLayout";  // Header ve Footer ile genel layout
import PanelLayout from "../layout/PanelLayout";  // Admin/Doktor panelleri için layout (Header/Footer yok)


const Routers = () => {
  const [loggedInDoctorUID, setLoggedInDoctorUID] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInDoctorUID(user.uid);
      } else {
        setLoggedInDoctorUID(null); // Kullanıcı oturum açmamışsa
      }
    });

    return () => unsubscribe(); // Auth değişikliklerini dinlemeyi bırak
  }, []);

  return (
    <Routes>
      {/* MainLayout kullanarak genel sayfalar */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/doctors" element={<MainLayout><Doctors /></MainLayout>} />
      <Route path="/doctors/:id" element={<MainLayout><DoctorDetails /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />

      {/* PanelLayout kullanarak Admin Paneli */}
      <Route path="/admin" element={<PanelLayout><Admin /></PanelLayout>}>
        <Route path="users" element={<ManageUsers />} />
        <Route path="userprofileedit" element={<UserProfileEdit />} />
        <Route path="appointments" element={<ViewAppointments />} />
        <Route path="reportgeneration" element={<ReportGeneration />} />
        <Route path="profile" element={<AddProfile />} />
        <Route path="admincontact" element={<ContactView />} />
      </Route>

      {/* PanelLayout kullanarak Doktor Paneli */}
      <Route path="/doctor-panel" element={<PanelLayout><DoctorPanel /></PanelLayout>}>
        <Route path="appointments" element={<Appointments loggedInDoctorUID={loggedInDoctorUID || ''} />} />
        <Route path="appointmentcalendar" element={<AppointmentsCalendar />} />
        <Route path="appointmentrequests" element={<AppointmentRequests />} />
        <Route path="availabilitySettings" element={<AvilabilitySettings  />} />
        <Route path="upcomingappointments" element={<UpcomingAppointments />} />
        <Route path="pastappointments" element={<PastAppointments />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* PanelLayout kullanarak Müşteri Paneli */}
      <Route path="/customer-panel" element={<PanelLayout><CustomerPanel /></PanelLayout>}>
        <Route path="appointments" element={<GetAppointment />} />
        <Route path="customerprofile" element={<CustomerProfile />} />
        <Route path="myappointments" element={<AppointmentsListPage />} />
        <Route path="doctorlist" element={<DoctorList />} />
        <Route path="reportpage" element={<ReportPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
