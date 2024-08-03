import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoadingState {
  value: boolean
}

const initialState: LoadingState = {
  value: false,
}

export const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload;
      },
    },
  });

export const { setLoading } = LoadingSlice.actions

export default LoadingSlice.reducer