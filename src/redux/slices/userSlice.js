import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    fullName: '',
    department: '',
    profileImage: '',
    status: 'idle',
    error: null,
  }
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state,action) => {
      
        state= action.payload
      },
     
    },
  })

  export const { setUser} = userSlice.actions

  export default userSlice.reducer