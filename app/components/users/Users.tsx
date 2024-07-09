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
} from "@mui/material";
import AddUserDialog from './AddUserDialog';

export const Users: React.FC<UsersProps> = ({ data }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const { data: users, isError, isLoading, isSuccess } = useGetUsersQuery({ id: userId });

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
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};