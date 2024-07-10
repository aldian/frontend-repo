'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/store/users/usersApi';
import { openDialog } from '@/store/userDialogSlice';
import UserDialog from './UserDialog';

interface EditUserDialogProps {
  user: User | null;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if (user) {
      dispatch(openDialog({ isNewUser: false, userName: user.name, userId: user.id }));
    }
  };

  return <>{user && <UserDialog />}</>;
};

export default EditUserDialog;