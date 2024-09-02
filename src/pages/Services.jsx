import React from "react";
import ServiceList from "../components/Services/ServiceList"; // ServiceList bileşeninin doğru yolu

const Services = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <ServiceList />
    </div>
  );
};

export default Services;

