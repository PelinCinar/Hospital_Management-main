import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/AdminPage/Admin";
import ViewAppointments from "../pages/AdminPage/ViewAppointments";
import GenerateReports from "../pages/AdminPage/GenerateReports";
import ManageUsers from "../pages/AdminPage/ManageUsers";
import DoctorPanel from "../pages/DoctorPage/DoctorPanel";


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
      </Route>

      <Route path="/doctor" element={<DoctorPanel />} />

    </Routes>
  );
};

export default Routers;
