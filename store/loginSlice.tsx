import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  email: string;
  password: string;
  error: string | null;
}

const initialState: LoginState = {
  email: '',
  password: '',
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetLoginState: (state) => {
      state.email = '';
      state.password = '';
      state.error = null;
    },
  },
});

export const { setEmail, setPassword, setError, resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;