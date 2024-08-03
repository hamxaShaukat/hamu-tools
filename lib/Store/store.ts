import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CategorySliceReducer from '@/lib/feature/Category/Category';
import NameSliceReducer from '../feature/Name/NameSlice';
import TitleSliceReducer from '../feature/Title/TitleSlice';
import LoadingSliceReducer from '@/lib/feature/Loading/LoadingSlice';
import DashboardSliceReducer from '@/lib/feature/Dashboard/sideBarSlice';


// Combine your reducers
const rootReducer = combineReducers({
  category: CategorySliceReducer,
  name: NameSliceReducer,
  title: TitleSliceReducer,
  loading: LoadingSliceReducer,
  dashboard: DashboardSliceReducer,
});

// Create a persisted reducer
export type RootState = ReturnType<typeof rootReducer>;

// Configure the store without persistence
export const store = configureStore({reducer: rootReducer,});


// Export RootState and AppDispatch types for use in components
export type AppDispatch = typeof store.dispatch;