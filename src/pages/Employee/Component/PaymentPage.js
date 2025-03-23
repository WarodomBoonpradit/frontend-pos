import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const PaymentPage = () => {
  const [alignment, setAlignment] = React.useState("Cash");
  const [tableSelect, setTableSelect] = React.useState("");
  const handleToggleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleTableSelectChange = (event) => {
    setTableSelect(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Payment Page
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* Payment Method Toggle */}
          <Grid item xs={12} align="center">
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleToggleChange}
              aria-label="Payment Method"
            >
              <ToggleButton value="Cash">Cash</ToggleButton>
              <ToggleButton value="QR Payment">QR Payment</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* Table Selection */}
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel id="table-select-required-label">
                Select Table
              </InputLabel>
              <Select
                labelId="table-select-required-label"
                id="table-select"
                value={tableSelect}
                onChange={handleTableSelectChange}
                borderRadius={3}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...Array(10)].map((_, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    Table {index + 1}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select a table</FormHelperText>
            </FormControl>
            <TextField
              InputProps={{ sx: { borderRadius: 3 } }}
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              autoComplete="amount"
              autoFocus
              inputProps={{
                inputMode: "numeric",
                onInput: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9-]/g, "");
                },
              }}
            />
          </Grid>

          {/* Expiry Date and CVV */}
          {alignment === "Cash" && (
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Amount Paid"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField required fullWidth label="Amount" variant="outlined" />
              </Grid>
            </Grid>
          )}

          {/* QR Code Display */}
          {alignment === "QR Payment" && (
            <Grid item xs={12} align="center">
              <img
                src="https://i.postimg.cc/9fsNymbx/QR.jpg"
                alt="QR Code Payment"
                style={{ width: "400px", height: "400px", marginTop: "5px" }}
              />
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                Scan this QR code to complete your payment.
              </Typography>
            </Grid>
          )}

          {/* Pay Now Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="success" fullWidth>
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PaymentPage;
