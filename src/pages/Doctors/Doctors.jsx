import { useState, useEffect } from "react";
import { db } from "../../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, Input, Button, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ant Design varsayılan stil dosyalarını unutmayın
import { Link } from "react-router-dom";

const { Meta } = Card;

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [noDoctorFound, setNoDoctorFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const doctorsList = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.role === 'doctor');

        setDoctors(doctorsList);
        setFilteredDoctors(doctorsList);
        setNoDoctorFound(doctorsList.length === 0);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError("Doktorları yüklerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = doctors.filter((doctor) =>
      doctor.fullName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setNoDoctorFound(filtered.length === 0);
  };

  return (
    <div className="container" style={{ padding: "20px", fontSize: "25px" }}>
      <h2 style={{ textAlign: "center", fontSize: "25px" }}>Find a Doctor</h2>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", fontSize: "25px" }}>
        <Input
          placeholder="Search Doctor"
          value={searchTerm}
          onChange={handleSearch}
          style={{ margin: "10px", padding: "2px", width: "400px", marginRight: "10px", fontSize: "25px" }}
        />
        <Button type="primary" style={{ fontSize: "25px", margin: "10px", padding: "20px" }} icon={<SearchOutlined />}>
          Search
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          {error}
        </div>
      ) : noDoctorFound ? (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          Böyle bir doktor mevcut değildir.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 244fr))", // Kart boyutunu artır
            gap: "10px",
            marginTop: "30px",
          }}
        >
          {filteredDoctors.map((doctor) => (
            <Link to={`/doctors/${doctor.id}`} key={doctor.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={doctor.fullName}
                    src={doctor.profileImage}
                    style={{ height: "250px", objectFit: "cover" }} // Resim boyutunu artır
                  />
                }
                style={{ width: 320, height: "350px" }} // Kart boyutunu artır
              >
                <Meta title={doctor.fullName} description={doctor.department} />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
