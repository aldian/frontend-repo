import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDialogState {
  open: boolean;
  userName: string;
  error: string | null;
  isNewUser: boolean;
  userId: string | null;
}

const initialState: UserDialogState = {
  open: false,
  userName: '',
  error: null,
  isNewUser: true,
  userId: null,
};

const userDialogSlice = createSlice({
  name: 'userDialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<{ isNewUser: boolean; userName?: string; userId?: string }>) => {
      state.open = true;
      state.isNewUser = action.payload.isNewUser;
      state.userName = action.payload.userName || '';
      state.userId = action.payload.userId || null;
    },
    closeDialog: (state) => {
      state.open = false;
      state.userName = '';
      state.error = null;
      state.isNewUser = true;
      state.userId = null;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { openDialog, closeDialog, setUserName, setError } = userDialogSlice.actions;

export default userDialogSlice.reducer;