"use client";
import React from 'react';
import { User, UsersProps, useGetUsersQuery } from "@/store/users/usersApi";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import { useAuth } from '../../app/AuthContext';
import Login from '../Login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { selectUser, clearSelection } from '@/store/userSelectionSlice';

export const Users: React.FC<UsersProps> = ({ data }) => {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const selectedUser = useSelector((state: RootState) => state.userSelection.selectedUser);
  const { data: users, isError, isLoading } = useGetUsersQuery({ id: undefined });

  if (!user) {
    return <Login />;
  }

  if (isLoading && !users) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load users</Alert>;
  }

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
  };

  const handleCloseEditDialog = () => {
    dispatch(clearSelection());
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1" gutterBottom>
          Users
        </Typography>
        <AddUserDialog />
      </Box>
      <List>
        {(users || data).map((user: User) => (
          <ListItem
            key={user.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleUserClick(user)}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
      {selectedUser && (
        <EditUserDialog user={selectedUser} onClose={handleCloseEditDialog} />
      )}
    </Container>
  );
};