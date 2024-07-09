"use client";
import React, { useState, useEffect } from 'react';
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
import { User, useUpdateUserMutation } from "@/store/users/usersApi";

interface EditUserDialogProps {
  user: User | null;
  onClose: () => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user, onClose }) => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setOpen(true);
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
    setUserName('');
    setError(null);
    onClose();
  };

  const handleUpdateUser = async () => {
    setError(null);

    try {
      await updateUser({ id: user!.id, name: userName }).unwrap();
      handleClose();
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isLoading}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleUpdateUser} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;