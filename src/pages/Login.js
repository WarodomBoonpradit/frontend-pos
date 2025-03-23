import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Login() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const response = await fetch('http://192.168.1.22:3333/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                E_email: data.get('email'),
                E_password: data.get('password'),
            }),
        });
    
        const result = await response.json();
    
        if (result.status === 'success') {
            localStorage.setItem('token', result.token);
            localStorage.setItem('role', result.role);
    
            if (result.role === 'admin') {
                window.location.href = '/dashboard';
            } else if (result.role === 'cashier' || result.role === 'waiter') {
                window.location.href = '/employee';
            } else if (result.role === 'cook') {
                window.location.href = '/cook';
            }
        } else {
            alert('Login failed: ' + result.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        src="https://i.postimg.cc/yNrjWd8h/logo-resto.png"
                        sx={{
                            width: 350,
                            height: 350,
                            border: 3
                        }}
                    >
                        <LockOutlinedIcon />
                    </Avatar>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <TextField

                            InputProps={{ sx: { borderRadius: 3 } }}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            InputProps={{ sx: { borderRadius: 3 } }}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                borderRadius: 5,
                                mt: 2, mb: 2, bgcolor: 'black',
                                '&:hover': { bgcolor: 'white', color: 'black' }
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            href="/register"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                borderRadius: 5,
                                bgcolor: 'black',
                                '&:hover': { bgcolor: 'white', color: 'black' }
                            }}
                        >
                            Register
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}