import React, { useEffect, useState } from "react";
import {  Box,  Toolbar,  Typography,  Drawer,  List,  ListItem,  ListItemIcon,  ListItemText,  Avatar } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TablePage from "./Component/Table";
import Summary from "./Component/Summary";
import MenuPage from "./Component/MenuPage";
import PaymentPage from "./Component/PaymentPage";
import EmployeeList from "./Component/EmployeeList";

const Dashboard = () => {
  const drawerWidth = 250;
  const [selectedTab, setSelectedTab] = useState("Summarize");
  const [user, setUser] = useState({ name: "", surname: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    } 
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      
      const role = decoded.E_role;
  
      if (role !== "admin") {
        navigate("/");
        alert("You are not authorized to access this page");
      } else {
        if (decoded.E_name && decoded.E_surname) {
          setUser({
            name: decoded.E_name,
            surname: decoded.E_surname
          });
        }
      }
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }, [navigate]);
  
  

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
              py: 2,
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
            <ListItem button onClick={() => handleTabClick("Employee")}>
              <ListItemIcon>
                <AssignmentIndIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Employee" />
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
              <Typography variant="body1">{user.name}  {user.surname}</Typography>
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
            <MenuPage/>
          )}
          {selectedTab === "Payment" && (
            <PaymentPage/>
          )}
          {selectedTab === "Employee" && (
            <EmployeeList/>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;