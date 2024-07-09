"use client";
import { User, UsersProps, useGetUsersQuery } from "@/lib/features/users/usersApi";
import { useState } from "react";
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

export const Users: React.FC<UsersProps> = ({ data }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: users, isError, isLoading, isSuccess } = useGetUsersQuery({ id: userId });

  if (isLoading && !users) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load users</Alert>;
  }

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
            onClick={() => { /* Add your click handler logic here */ }}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};