import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'error' | 'info' | 'warning' | 'success' | null;

const initialState = {
  notification: {
    isOpen: false,
    text: '',
    type: null as NotificationType,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openNotification: (state, action: PayloadAction<{ text: string; type: NotificationType }>) => {
      state.notification.isOpen = true;
      state.notification.text = action.payload.text;
      state.notification.type = action.payload.type;
    },
    closeNotification: (state) => {
      state.notification.isOpen = false;
    },
  },
});

export default uiSlice.reducer;

export const { openNotification, closeNotification } = uiSlice.actions;
