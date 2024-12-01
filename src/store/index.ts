import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchTyped,
  useSelector as useSelectorTyped,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import uiSlice from './slices/ui';

const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useDispatch: () => AppDispatch = useDispatchTyped;
const useSelector: TypedUseSelectorHook<RootState> = useSelectorTyped;

export { useDispatch, useSelector, type RootState, type AppDispatch };
