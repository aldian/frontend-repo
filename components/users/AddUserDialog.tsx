"use client";
import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useUpdateUserMutation } from "@/store//users/usersApi";

const AddUserDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUserName('');
    setError(null);
  };

  const handleAddUser = async () => {
    setError(null);

    try {
      await updateUser({ name: newUserName }).unwrap();
      // Close the dialog after adding the user
      handleClose();
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    }
  };

  return (
    <>
      <Tooltip title="Add new user">
        <IconButton color="primary" aria-label="add user" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            disabled={isLoading}
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUserDialog;