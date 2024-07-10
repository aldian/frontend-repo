"use client";
import React from 'react';
import { useAuth } from '../app/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setEmail, setPassword, setError, resetLoginState } from '@/store/loginSlice';

const Login = () => {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state: RootState) => state.login);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      dispatch(setError(null));
      dispatch(resetLoginState());
    } catch (err) {
      dispatch(setError((err as Error).message));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;