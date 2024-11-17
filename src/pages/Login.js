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
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                            href="/dashboard"
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