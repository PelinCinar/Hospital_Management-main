import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()); 
      return docSnap.data();
    } else {
      console.error("No such document!");
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    email: '',
    fullName: '',
    department: '',
    profileImage: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.department = action.payload.department;
        state.profileImage = action.payload.profileImage;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
