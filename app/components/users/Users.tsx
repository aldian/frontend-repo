"use client";
import React, { useState } from 'react';
import { User, UsersProps, useGetUsersQuery } from "@/lib/features/users/usersApi";
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

export const Users: React.FC<UsersProps> = ({ data }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: users, isError, isLoading } = useGetUsersQuery({ id: undefined });

  if (isLoading && !users) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load users</Alert>;
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseEditDialog = () => {
    setSelectedUser(null);
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