import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Paper } from '@mui/material';

const MenuPage = () => {
    return (
        <div>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Menu Page
                    </Typography>
                </Toolbar>
            <Container style={{ marginTop: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h5">Menu Item 1</Typography>
                            <Typography variant="body1">Description of menu item 1</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h5">Menu Item 2</Typography>
                            <Typography variant="body1">Description of menu item 2</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h5">Menu Item 3</Typography>
                            <Typography variant="body1">Description of menu item 3</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default MenuPage;