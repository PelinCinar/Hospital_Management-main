import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Spin, message, Upload, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig"; // storage eklendi
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Firebase Storage işlemleri

const { Title, Text } = Typography;

const CustomerProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // Resim yükleme durumu
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login");
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPatient(docSnap.data());
        } else {
          message.error("Kullanıcı bilgileri bulunamadı.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        message.error("Profil bilgileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [auth.currentUser, navigate]);

  // Resim yükleme işlemi
  const handleImageUpload = async (file) => {
    setUploading(true);
    const user = auth.currentUser;

    if (!user) {
      message.error("Öncelikle giriş yapmalısınız.");
      return;
    }

    const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Yükleme ilerlemesini izlemek için (isteğe bağlı)
      },
      (error) => {
        console.error("Error uploading image: ", error);
        message.error("Resim yüklenirken bir hata oluştu.");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Kullanıcı dokümanını güncelle
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            profileImage: downloadURL,
          });

          // Yeni resmi state'e set et
          setPatient((prev) => ({
            ...prev,
            profileImage: downloadURL,
          }));

          message.success("Profil fotoğrafı başarıyla yüklendi!");
        } catch (error) {
          console.error("Error updating document: ", error);
          message.error("Profil fotoğrafı güncellenirken bir hata oluştu.");
        } finally {
          setUploading(false);
        }
      }
    );
  };

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Veri bulunamadı</p>
      </div>
    );
  }

  const uploadProps = {
    beforeUpload: (file) => {
      handleImageUpload(file);
      return false; // Resmi anında yüklemek için
    },
    showUploadList: false, // Listeyi gizleriz
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        bordered={false}
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Hasta Profili
        </Title>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            size={120}
            src={patient.profileImage || "https://via.placeholder.com/150"} // Varsayılan bir görsel URL'si
          />
        </div>

        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={uploading} block>
            {uploading ? "Yükleniyor..." : "Profil Fotoğrafı Yükle"}
          </Button>
        </Upload>

        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <Text strong>Ad: </Text>
            <Text>{patient.fullName || "Bilinmiyor"}</Text>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text strong>E-posta: </Text>
            <Text>{patient.email || "Bilinmiyor"}</Text>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text strong>Cinsiyet: </Text>
            <Text>{patient.gender || "Bilinmiyor"}</Text>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text strong>Adres: </Text>
            <Text>{patient.address || "Bilinmiyor"}</Text>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleEdit}
          style={{ width: "100%", borderRadius: "8px", marginTop: "20px" }}
        >
          Profili Düzenle
        </Button>
      </Card>
    </div>
  );
};

export default CustomerProfile;