import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

const TableSelectionPage = () => {
    const [tables, setTables] = useState(
        Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            isOccupied: false,
        }))
    );

    const toggleTableStatus = (id) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === id ? { ...table, isOccupied: !table.isOccupied } : table
            )
        );
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Select table for Customer
            </Typography>
            <Grid container spacing={3}>
                {tables.map((table) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={table.id}>
                        <Card
                            sx={{
                                backgroundColor: table.isOccupied ? "#f8d7da" : "#d4edda",
                                color: table.isOccupied ? "#721c24" : "#155724",
                                textAlign: "center",
                                boxShadow: 3,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5">
                                    Table {table.id}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {table.isOccupied ? "ไม่ว่าง" : "ว่าง"}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color={table.isOccupied ? "error" : "success"}
                                    onClick={() => toggleTableStatus(table.id)}
                                >
                                    {table.isOccupied ? "ปลดล็อก" : "จองโต๊ะ"}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TableSelectionPage;
