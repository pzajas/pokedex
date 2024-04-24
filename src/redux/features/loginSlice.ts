import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'loginSliceData',
  initialState: {
    isEmailVerified: false,
  },
  reducers: {
    setIsEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload
    },
  },
})

export const { setIsEmailVerified } = loginSlice.actions
export default loginSlice.reducer
