import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, Box, IconButton, InputAdornment,
  Typography, Container, Grid, Card, CardContent, Chip, Collapse,
  useMediaQuery, useTheme, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  
  // รายการตำแหน่งสำหรับ dropdown menu
  const positionOptions = ["Admin", "Waiter", "Cook", "Cashier"];
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // ฟังก์ชันแปลงวันที่
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // แปลงเป็น YYYY-MM-DD
  };

  // ดึงข้อมูลพนักงาน
  useEffect(() => {
    fetch("http://192.168.1.22:3333/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // เมื่อคลิกเพื่อแก้ไขข้อมูล
  const handleRowClick = (employee) => {
    setEditingEmployee(employee.E_ID);
    setEditedData({ ...employee });
    setNewPassword(""); // รีเซ็ตรหัสผ่าน
    setConfirmPassword(""); // รีเซ็ตคอนเฟิร์มรหัสผ่าน
    
    // ถ้าเป็นโมบายล์ ให้เปิดการแสดงรายละเอียดพนักงาน
    if (isMobile) {
      setExpandedEmployee(employee.E_ID);
    }
  };

  // อัปเดตข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชัน Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ฟังก์ชัน Toggle confirm password visibility
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ยกเลิกการแก้ไข
  const handleCancel = () => {
    setEditingEmployee(null);
    setEditedData({});
    setNewPassword("");
    setConfirmPassword("");
  };

  // เปิด/ปิดการแสดงรายละเอียดพนักงานในมุมมองโมบายล์
  const toggleExpandEmployee = (id) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน!");
      return;
    }
  
    const updatedData = { ...editedData };
  
    if (newPassword) {
      updatedData.E_password = newPassword;
    } else {
      delete updatedData.E_password;
    }
  
    fetch(`http://192.168.1.22:3333/employees/${editedData.E_ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("อัปเดตข้อมูลสำเร็จ!");
        setEmployees(employees.map(emp => emp.E_ID === editedData.E_ID ? updatedData : emp));
        setEditingEmployee(null); // ปิดฟอร์มแก้ไข
      })
      .catch((error) => console.error("Update Error:", error));
  };

  // กด Delete → ลบพนักงาน
  const handleDelete = (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบพนักงานคนนี้?")) {
      fetch(`http://192.168.1.22:3333/employees/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("ลบข้อมูลพนักงานสำเร็จ!");
          setEmployees(employees.filter(emp => emp.E_ID !== id));
          setEditingEmployee(null); // ปิดฟอร์มหากพนักงานถูกลบ
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  // เรนเดอร์ตารางในมุมมองเดสก์ท็อป
  const renderDesktopView = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
      <Table size={isTablet ? "small" : "medium"}>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            {!isTablet && <TableCell>Phone</TableCell>}
            {!isTablet && <TableCell>Address</TableCell>}
            <TableCell>Birth Date</TableCell>
            <TableCell>Position</TableCell>
            {!isTablet && <TableCell>E-mail</TableCell>}
            <TableCell>Hire Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow 
              key={emp.E_ID} 
              hover 
              sx={{
                cursor: "pointer",
                backgroundColor: editingEmployee === emp.E_ID ? "#e3f2fd" : "inherit",
                "&:hover": { backgroundColor: "#f5f5f5" }
              }}
            >
              <TableCell>{emp.E_name}</TableCell>
              <TableCell>{emp.E_surname}</TableCell>
              {!isTablet && <TableCell>{emp.E_phone}</TableCell>}
              {!isTablet && <TableCell>{emp.E_address}</TableCell>}
              <TableCell>{formatDate(emp.E_birthDate)}</TableCell>
              <TableCell>
                <Chip 
                  label={emp.E_role} 
                  color={emp.E_role === "admin" ? "primary" : "default"}
                  size="small"
                />
              </TableCell>
              {!isTablet && <TableCell>{emp.E_email}</TableCell>}
              <TableCell>{formatDate(emp.E_hireDate)}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => handleRowClick(emp)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleDelete(emp.E_ID); 
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // เรนเดอร์การ์ดในมุมมองโมบายล์
  const renderMobileView = () => (
    <Box sx={{ mb: 4 }}>
      {employees.map((emp) => (
        <Card 
          key={emp.E_ID} 
          sx={{ 
            mb: 2, 
            boxShadow: 2, 
            borderLeft: expandedEmployee === emp.E_ID ? "4px solid #1976d2" : "none",
            transition: "all 0.3s"
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" component="div">
                  {emp.E_name} {emp.E_surname}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {emp.E_role === "admin" ? 
                    <Chip size="small" label="Admin" color="primary" /> : 
                    <Chip size="small" label={emp.E_role} />
                  }
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: "flex" }}>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleExpandEmployee(emp.E_ID)}
                  >
                    {expandedEmployee === emp.E_ID ? <CloseIcon /> : <Visibility />}
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => handleDelete(emp.E_ID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Collapse in={expandedEmployee === emp.E_ID}>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">{emp.E_phone}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">E-mail</Typography>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>{emp.E_email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Address</Typography>
                    <Typography variant="body1">{emp.E_address}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Birth Date</Typography>
                    <Typography variant="body1">{formatDate(emp.E_birthDate)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Hire Date</Typography>
                    <Typography variant="body1">{formatDate(emp.E_hireDate)}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      onClick={() => handleRowClick(emp)}
                      startIcon={<EditIcon />}
                    >
                      EDIT
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // เรนเดอร์ฟอร์มแก้ไข
  const renderEditForm = () => {
    if (editingEmployee === null) return null;

    return (
      <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h3">EDIT INFOMATION</Typography>
            <IconButton size="small" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="SSN" name="E_ssn" value={editedData.E_ssn || ''} onChange={handleInputChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" name="E_name" value={editedData.E_name || ''} onChange={handleInputChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Surname" name="E_surname" value={editedData.E_surname || ''} onChange={handleInputChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" name="E_phone" value={editedData.E_phone || ''} onChange={handleInputChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="E_email" value={editedData.E_email || ''} onChange={handleInputChange} fullWidth size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* เปลี่ยนจาก TextField เป็น FormControl และ Select สำหรับ dropdown */}
              <FormControl fullWidth size="small">
                <InputLabel id="position-label">Position</InputLabel>
                <Select
                  labelId="position-label"
                  id="position-select"
                  name="E_role"
                  value={editedData.E_role || ''}
                  label="Position"
                  onChange={handleInputChange}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="cook">Cook</MenuItem>
                                        <MenuItem value="cashier">Cashier</MenuItem>
                                        <MenuItem value="waiter">Waiter</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" name="E_address" value={editedData.E_address || ''} onChange={handleInputChange} fullWidth size="small" multiline rows={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Birth Date" 
                name="E_birthDate" 
                type="date" 
                value={formatDate(editedData.E_birthDate) || ''} 
                onChange={handleInputChange} 
                fullWidth 
                size="small"
                InputLabelProps={{ shrink: true }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Hire Date" 
                name="E_hireDate" 
                type="date" 
                value={formatDate(editedData.E_hireDate) || ''} 
                onChange={handleInputChange} 
                fullWidth 
                size="small"
                InputLabelProps={{ shrink: true }} 
              />
            </Grid>

            {/* ตั้งรหัสผ่านใหม่ */}
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                fullWidth 
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* ยืนยันรหัสผ่าน */}
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Confirm Password" 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                fullWidth 
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleConfirmPassword} edge="end" size="small">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSave}
                  startIcon={<SaveIcon />}
                >
                  SAVE
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleCancel}
                >
                  CANCEL
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        EMPLOYEE LIST
      </Typography>

      {renderEditForm()}
      {isMobile ? renderMobileView() : renderDesktopView()}
    </Container>
  );
};

export default EmployeeList;