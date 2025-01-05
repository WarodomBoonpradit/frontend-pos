import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DashBoardCook() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const orders = [
        { id: 1, name: 'Spaghetti', status: 'Pending' },
        { id: 2, name: 'Pizza', status: 'In Progress' },
        { id: 3, name: 'Salad', status: 'Completed' },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Notifications" {...a11yProps(0)} />
                    <Tab label="Orders" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant="h6">New Orders</Typography>
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>{order.name} - {order.status}</li>
                    ))}
                </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell align="right">{order.name}</TableCell>
                                    <TableCell align="right">{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Box>
    );
}