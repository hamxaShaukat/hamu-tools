import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
  value: 'All',
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state,action) => {
      state.value =''
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategory } = CategorySlice.actions

export default CategorySlice.reducer