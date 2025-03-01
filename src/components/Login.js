import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/admin/login', { username, password });
      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>Admin Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;