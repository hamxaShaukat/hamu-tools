import { createSlice } from '@reduxjs/toolkit'

export interface TitleState {
  value: string
}

const initialState: TitleState = {
  value: '',
}

export const TitleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state,action) => {
      state.value =''
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTitle } = TitleSlice.actions

export default TitleSlice.reducer