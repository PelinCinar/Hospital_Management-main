import React, { useState, useEffect } from "react";
import { DatePicker, Button, Table } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AvailabilitySettings = () => {
  const [availability, setAvailability] = useState({
    date: null,
    timeSlots: [],
    selectedSlots: [],
  });
  const [doctorId, setDoctorId] = useState("");

  // Tarih değiştiğinde çağrılır
  const handleDateChange = (date, dateString) => {
    setAvailability((prev) => ({
      ...prev,
      date: dateString,
      selectedSlots: [], // Tarih değiştiğinde seçimleri sıfırla
    }));
    generateTimeSlots(); // Seçilen tarihe göre saat dilimlerini oluştur
  };

  // Zaman dilimlerini oluştur
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9; // 09:00
    const endTime = 15; // 15:00 (15:00 dahil değil)

    for (let hour = startTime; hour <= endTime; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    setAvailability((prev) => ({
      ...prev,
      timeSlots: slots,
    }));
  };

  // Zaman dilimlerini seçme işlemi
  const handleSelectSlot = (slot) => {
    setAvailability((prev) => {
      const selectedSlots = prev.selectedSlots.includes(slot)
        ? prev.selectedSlots.filter((s) => s !== slot) // Seçiliyse çıkar
        : [...prev.selectedSlots, slot]; // Değilse ekle
      return { ...prev, selectedSlots };
    });
  };

  // Verileri Firestore'a kaydet
  const handleSubmit = async () => {
    if (!doctorId) {
      alert("Lütfen önce giriş yapın.");
      return;
    }

    try {
      await addDoc(collection(db, "availability"), {
        date: availability.date,
        slots: availability.selectedSlots,
        doctorId: doctorId,
      });
      alert("Uygunluk Ayarları Kaydedildi");
      setAvailability((prev) => ({ ...prev, selectedSlots: [] })); // Kaydettikten sonra seçimleri sıfırla
    } catch (error) {
      console.error("Uygunluk ayarlarını kaydederken hata: ", error);
    }
  };

  // Doktor kimliğini al
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoctorId(user.uid); // Assuming the logged-in user is a doctor
      }
    });
  
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  
  // Ant Design Tablo için sütunlar
  const columns = [
    {
      title: 'Saat',
      dataIndex: 'time',
      key: 'time',
      render: (text) => (
        <Button
          type={availability.selectedSlots.includes(text) ? "primary" : "default"}
          onClick={() => handleSelectSlot(text)}
        >
          {text}
        </Button>
      ),
    },
  ];

  const data = availability.timeSlots.map((slot, index) => ({
    key: index,
    time: slot,
  }));

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Uygunluk Ayarları</h1>
      <DatePicker onChange={handleDateChange} className="mb-4" />
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button onClick={handleSubmit} type="primary" className="mt-4">
        Uygunluk Ayarlarını Kaydet
      </Button>
    </div>
  );
};

export default AvailabilitySettings;
