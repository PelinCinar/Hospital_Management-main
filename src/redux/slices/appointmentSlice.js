import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Firebase ayarlarınızı buradan içe aktarın

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async (doctorEmail) => {
    try {
      const appointmentsCollection = collection(db, 'appointments');
      const q = query(appointmentsCollection, where('doctor', '==', doctorEmail));
      const querySnapshot = await getDocs(q);
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    upcomingAppointments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcomingAppointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default appointmentsSlice.reducer;
