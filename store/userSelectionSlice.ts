import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './users/usersApi';

interface UserSelectionState {
  selectedUser: User | null;
}

const initialState: UserSelectionState = {
  selectedUser: null,
};

const userSelectionSlice = createSlice({
  name: 'userSelection',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearSelection: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { selectUser, clearSelection } = userSelectionSlice.actions;
export default userSelectionSlice.reducer;