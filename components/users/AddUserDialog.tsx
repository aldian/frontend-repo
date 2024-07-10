'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/userDialogSlice';
import UserDialog from './UserDialog';

const AddUserDialog: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(openDialog({ isNewUser: true }));
  };

  return (
    <>
      <Tooltip title="Add new user">
        <IconButton color="primary" aria-label="add user" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <UserDialog />
    </>
  );
};

export default AddUserDialog;