import React from 'react';
import { Box, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Dashboard = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const data = [
    { name: '1/12', uv: 120 },
    { name: '2/12', uv: 100 },
    { name: '3/12', uv: 150 },
    { name: '4/12', uv: 200 },
    { name: '5/12', uv: 250 },
    { name: '6/12', uv: 460 },
    { name: '7/12', uv: 320 },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box>
          {/* Logo Container */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column',
            py: 2  // padding top and bottom
          }}>
            <Avatar
              alt="Logo"
              src="/path-to-logo.png"
              sx={{ 
                width: 64,  // ปรับขนาด logo ให้ใหญ่ขึ้น
                height: 64,
                mb: 1  // margin bottom
              }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              RESTO EZY
            </Typography>
          </Box>

          <List>
            <ListItem button>            
              <ListItemIcon>
                <BarChartIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Summarize" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <TableChartIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AttachMoneyIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Payment" />
            </ListItem>
          </List>
        </Box>

        {/* Sign Out Button */}
        <Box>
          <List>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            backgroundColor: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              color: '#fff',
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Dashboard
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Avatar
                alt="User Profile"
                src="/path-to-avatar.png"
                sx={{ marginRight: '0.5rem' }}
              />
              <Typography variant="body1">Name - Surname</Typography>
            </Box>
          </Toolbar>
        </Box>

        {/* Charts Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ my: 3 }}>
            Year: 2023
          </Typography>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>

          <Typography variant="h5" sx={{ my: 3 }}>
            Month: 3
          </Typography>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;