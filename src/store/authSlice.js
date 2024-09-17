import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    userRole: null,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload.user;
      state.userRole = action.payload.role;
    },
    clearUser(state) {
      state.currentUser = null;
      state.userRole = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
