import React, { useState } from "react";
import {  Box,  Toolbar,  Typography,  Drawer,  List,  ListItem,  ListItemIcon,  ListItemText,  Avatar } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TablePage from "./Component/Table";
import Summary from "./Component/Summary";

const Dashboard = () => {
  const drawerWidth = 250;
  const [selectedTab, setSelectedTab] = useState("Summarize");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSignOut = () => {
    navigate("/");
    console.log("Sign Out");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          {/* Logo Container */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              py: 2, // padding top and bottom
            }}
          >
            <Avatar
              alt="Logo"
              src="https://i.postimg.cc/yNrjWd8h/logo-resto.png"
              sx={{
                width: 64,
                height: 64,
                mb: 1, 
              }}
            />
            
          </Box>

          <List>
            <ListItem button onClick={() => handleTabClick("Summarize")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Summarize" />
            </ListItem>
            <ListItem button onClick={() => handleTabClick("Table")}>
              <ListItemIcon>
                <TableChartIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItem>
            <ListItem button onClick={() => handleTabClick("Menu")}>
              <ListItemIcon>
                <FastfoodIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem button onClick={() => handleTabClick("Payment")}>
              <ListItemIcon>
                <AttachMoneyIcon sx={{ color: "#fff" }} />
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
                <LogoutIcon sx={{ color: "#fff" }} />
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
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 1100,
            backgroundColor: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              color: "#fff",
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              RESTO EZY
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Avatar
                alt="User Profile"
                src="/path-to-avatar.png"
                sx={{ marginRight: "0.5rem" }}
              />
              <Typography variant="body1">Name - Surname</Typography>
            </Box>
          </Toolbar>
        </Box>

        {/* Dynamic Content */}
        <Box sx={{ p: 3 }}>
          {selectedTab === "Summarize" && (
            <Summary />
          )}
          {selectedTab === "Table" && (
           <TablePage />
          )}
          {selectedTab === "Menu" && (
            <Typography variant="h5" sx={{ my: 3 }}>
              Menu Data (coming soon)
            </Typography>
          )}
          {selectedTab === "Payment" && (
            <Typography variant="h5" sx={{ my: 3 }}>
              Payment Data (coming soon)
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;