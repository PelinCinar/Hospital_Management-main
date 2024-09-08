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
import DoctorPanel from "../pages/DoctorPage/DoctorPanel";
import Appointments from "../pages/DoctorPage/Appointments";
import Profile from "../pages/DoctorPage/Profile";
import ClientAppointment from "../pages/ClientPage/ClientAppointment"; // Client Appointment eklendi
import AddProfile from "../pages/AdminPage/AddProfile";
import ContactView from "../pages/AdminPage/ContactView";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />

      {/* Admin Panel Rotaları */}
      <Route path="/admin" element={<Admin />}>
        <Route path="users" element={<ManageUsers />} />
        <Route path="appointments" element={<ViewAppointments />} />
        <Route path="reports" element={<GenerateReports />} />
        <Route path="profile" element={<AddProfile/>} />
        <Route path="admincontact" element={<ContactView />} />


      </Route>

      {/* Doktor Panel Rotaları */}
      <Route path="/doctor-panel" element={<DoctorPanel />}>
        <Route path="appointments" element={<Appointments />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Client Panel Rotaları */}
      <Route path="/client" element={<ClientAppointment />} /> {/* Client appointment */}
    </Routes>
  );
};

export default Routers;
