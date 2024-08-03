import { createSlice } from '@reduxjs/toolkit'

export interface DashBoardState {
  value: string
}

const initialState: DashBoardState = {
  value: 'Dashboard',
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSidebarItem: (state,action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarItem } = DashboardSlice.actions

export default DashboardSlice.reducer