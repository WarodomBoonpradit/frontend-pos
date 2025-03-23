import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const defaultTheme = createTheme();

export default function Register() {
  const [hireDate, setHireDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      E_ssn: data.get('ssn').replace(/[^0-9]/g, ''),
      E_name: data.get('firstName'),
      E_surname: data.get('lastName'),
      E_phone: data.get('phone').replace(/[^0-9]/g, ''),
      E_address: data.get('address'),
      E_birthDate: data.get('birthDate'),
      E_role: data.get('job'),
      E_email: data.get('email'),
      E_password: data.get('password'),
      E_hireDate: data.get('hireDate'),
    };
  
    console.log('Data to be sent:', formData);

    const response = await fetch('http://192.168.1.22:3333/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        E_ssn: data.get('ssn'),
        E_name: data.get('firstName'),
        E_surname: data.get('lastName'),
        E_phone: data.get('phone'),
        E_address: data.get('address'),
        E_birthDate: data.get('birthDate'),
        E_role: data.get('job'),
        E_email: data.get('email'),
        E_password: data.get('password'),
        E_hireDate: data.get('hireDate'),
      }),
    });

    const result = await response.json();
    console.log('Result:', result);

    if (result.status === 'success') {
      alert('Registration successful!');
      if (result.role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      alert('Registration failed: ' + result.message);
    }
  }


  const inputStyle = {
    height: '50px',
    padding: '10px 12px',
  };

  const labelStyle = {
    fontSize: '0.8rem',
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
            padding: 2,
            boxShadow: 3,
          }}
        >
          <Avatar
            src="https://i.postimg.cc/yNrjWd8h/logo-resto.png"
            sx={{
              width: { xs: 100, sm: 150, md: 200 },
              height: { xs: 100, sm: 150, md: 200 },
              border: 3,
            }}
          />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputMask
                  mask="9-9999-99999-99-9"
                  maskChar={null}
                >
                  {() => (
                    <TextField
                      required
                      fullWidth
                      id="ssn"
                      label="SSN"
                      name="ssn"
                      autoFocus
                      autoComplete="ssn"
                      InputProps={{
                        style: inputStyle,
                      }}
                      InputLabelProps={{
                        style: labelStyle,
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        onInput: (e) => {
                          e.target.value = e.target.value.replace(/[^0-9-]/g, '');
                        }
                      }}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First name"                  
                  InputProps={{
                    style: inputStyle,
                  }}
                  InputLabelProps={{
                    style: labelStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{
                    style: inputStyle,
                  }}
                  InputLabelProps={{
                    style: labelStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <InputMask
                  mask="999-999-9999"
                  maskChar={null}
                >
                  {() => (
                    <TextField
                      require
                      fullWidth
                      id="phone"
                      label="Phone number"
                      name="phone"
                      autoComplete="phone"
                      InputProps={{
                        style: inputStyle,
                      }}
                      InputLabelProps={{
                        style: labelStyle,
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        onInput: (e) => {
                          e.target.value = e.target.value.replace(/[^0-9-]/g, '');
                        }
                      }}
                    />
                  )}
                </InputMask>     
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  multiline
                  rows={2}
                  InputProps={{
                    style: { ...inputStyle, height: 'auto' },
                  }}
                  InputLabelProps={{
                    style: labelStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="job-label" style={labelStyle}>Job position</InputLabel>
                  <Select
                    labelId="job-label"
                    id="job"
                    name="job"
                    label="Job position"
                    autoComplete="job"
                    defaultValue=""
                    InputProps={{
                      style: inputStyle,
                    }}
                    InputLabelProps={{
                      style: labelStyle,
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="cook">Cook</MenuItem>
                    <MenuItem value="cashier">Cashier</MenuItem>
                    <MenuItem value="waiter">Waiter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  InputProps={{
                    style: inputStyle,
                  }}
                  InputLabelProps={{
                    style: labelStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    style: inputStyle,
                  }}
                  InputLabelProps={{
                    style: labelStyle,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="birthDate"
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="hireDate"
                  label="Hire Date"
                  name="hireDate"
                  type="date"
                  value={hireDate}
                  onChange={(e) => setHireDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 5,
                mt: 2,
                mb: 1,
                bgcolor: 'black',
                '&:hover': { bgcolor: 'white', color: 'black' }
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
