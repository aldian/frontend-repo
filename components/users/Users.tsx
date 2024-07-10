"use client";
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import theme from "../../theme/theme";
import { User, UsersProps, useGetUsersQuery } from "../../store/users/usersApi";
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import { useAuth } from '../../app/AuthContext';
import Login from '../Login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { selectUser, clearSelection } from '@/store/userSelectionSlice';
import { setUsers, setLoading, setError, initializeUsers } from '@/store/users/usersApi';

export const Users: React.FC<UsersProps> = ({ data }) => {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const selectedUser = useSelector((state: RootState) => state.userSelection.selectedUser);
  const usersState = useSelector((state: RootState) => state.users);
  const { data: users, isError, isLoading } = useGetUsersQuery({ id: undefined });

  dispatch(initializeUsers(data));

  if (users && !isLoading && !isError) {
    dispatch(setUsers(users));
  }

  dispatch(setLoading(isLoading));
  dispatch(setError(isError));

  if (!user) {
    return <Login />;
  }

  if (usersState.isLoading && !usersState.users.length) {
    return <CircularProgress />;
  }

  if (usersState.isError) {
    return <Alert severity="error">Failed to load users</Alert>;
  }

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
  };

  const handleCloseEditDialog = () => {
    dispatch(clearSelection());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" component="h1" gutterBottom>
            Users
          </Typography>
          <AddUserDialog />
        </Box>
        <List>
          {usersState.users.map((user: User) => (
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
    </ThemeProvider>
  );
};