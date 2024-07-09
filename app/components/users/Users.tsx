//"use client";
import { useGetUsersQuery } from "@/lib/features/users/usersApi";
import { useState } from "react";
import { User, UsersProps } from "@/lib/features/users/usersApi";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";


export const Users: React.FC<UsersProps> = ({data}) => {
  //const [userId, setUserId] = useState<string | undefined>(undefined);
  //const { data, isError, isLoading, isSuccess } = useGetUsersQuery({ id: userId });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      {/*
      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error fetching users.</Alert>}
      {isSuccess && Array.isArray(data) && (
      */}
        <List>
          {data.map((user: User) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
        {/*
      )}
      {isSuccess && !Array.isArray(data) && (
        <Alert severity="info">{data.name}</Alert>
      )}
        */}
    </Container>
  );
};