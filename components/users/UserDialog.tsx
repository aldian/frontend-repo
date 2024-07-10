'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import { useUpdateUserMutation } from '@/store/users/usersApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { closeDialog, setUserName, setError } from '@/store/userDialogSlice';

const UserDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { open, userName, error, isNewUser, userId } = useSelector((state: RootState) => state.userDialog);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const handleSaveUser = async () => {
    dispatch(setError(null));

    try {
      if (isNewUser) {
        await updateUser({ name: userName }).unwrap();
      } else {
        await updateUser({ id: userId!, name: userName }).unwrap();
      }
      handleClose();
    } catch (err) {
      const errorMessage = (err as Error).message;
      dispatch(setError(errorMessage));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isNewUser ? 'Add New User' : 'Edit User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => dispatch(setUserName(e.target.value))}
          disabled={isLoading}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSaveUser} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : isNewUser ? 'Add' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;