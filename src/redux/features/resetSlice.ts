// appSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const resetSlice = createSlice({
  name: 'resetSliceData',
  initialState,
  reducers: {
    resetRedux: () => initialState,
  },
})

export const { resetRedux } = resetSlice.actions
export default resetSlice.reducer
