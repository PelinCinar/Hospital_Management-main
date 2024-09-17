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
import GenerateReports from "../pages/AdminPage/GenerateReports";
import ManageUsers from "../pages/AdminPage/ManageUsers";
import AddProfile from "../pages/AdminPage/AddProfile";
import ContactView from "../pages/AdminPage/ContactView";
import DoctorPanel from "../pages/DoctorPage/DoctorPanel";
import Appointments from "../pages/DoctorPage/Appointments";
import Profile from "../pages/DoctorPage/Profile";
import CustomerPanel from "../pages/CustomerPage/CustomerPanel";
import GetAppointment from "../pages/CustomerPage/GetAppointment";
import AppointmentsListPage from "../pages/CustomerPage/AppointmentsListPage.jsx";
import ReportPage from "../pages/CustomerPage/ReportPage.jsx";
import CustomerProfile from "../pages/CustomerPage/CustomerProfile.jsx";
import ReportView from "../pages/DoctorPage/ReportView.jsx";
import AppointmentsEdit from "../pages/DoctorPage/AppointmentsEdit.jsx";
import AppointmentsCalendar from "../pages/DoctorPage/AppointmentsCalendar.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />

      {/* Admin Panel Rotaları */}
      <Route path="/admin" element={<Admin />}>
        <Route path="users" element={<ManageUsers />} />
        <Route path="appointments" element={<ViewAppointments />} />
        <Route path="reports" element={<GenerateReports />} />
        <Route path="profile" element={<AddProfile />} />
        <Route path="admincontact" element={<ContactView />} />
      </Route>

      {/* Doktor Panel Rotaları */}
      <Route path="/doctor-panel" element={<DoctorPanel />}>
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointmentsedit" element={<AppointmentsEdit />} />
        <Route path="appointmentcalendar" element={<AppointmentsCalendar/>} />


        <Route path="profile" element={<Profile />} />
        <Route path="reportview" element={<ReportView/>} />

      </Route>

      {/* Müşteri Panel Rotaları */}
      <Route path="/customer-panel" element={<CustomerPanel />}>
        <Route path="appointments" element={<GetAppointment />} />
        <Route path="customerprofile" element={<CustomerProfile />} />
        <Route path="myappointments" element={<AppointmentsListPage />} />
        <Route path="reportpage" element={<ReportPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
