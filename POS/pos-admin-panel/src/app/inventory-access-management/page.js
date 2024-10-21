// Note: InventoryAccessManagement page/screen...!

"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
} from '@mui/material';
import { Search as SearchIcon, Visibility, Edit, Delete } from '@mui/icons-material';
import { customStyles } from '@/styles/styles';
import Searchbar from '@/components/searchbar/searchbar';
import StatsCard from '@/components/stats-card/stats-card';
import PagesNavbar from '@/components/pages-navbar/pages-navbar';

// Note: Table heading data...!
const tableHead = [
    { id: 1, label: 'No.' },
    { id: 2, label: 'Product' },
    { id: 3, label: 'Product_ID' },
    { id: 4, label: 'Category' },
    { id: 5, label: 'Location' },
    { id: 6, label: 'Available' },
    { id: 7, label: 'Reserved' },
    { id: 8, label: 'On Hold' },
    { id: 9, label: 'Actions' }
];

// Note: This is the sample data it will coming from an api in future...!
const rowsSampleData = [
    { id: 1, product: 'Mac Book', productId: '#070618', category: 'Laptop', location: 'Warehouse 1', available: 120, reserved: 200, onHold: 50 },
    { id: 2, product: 'Hp', productId: '#070619', category: 'Laptop', location: 'Warehouse 2', available: 120, reserved: 200, onHold: 50 },
    { id: 3, product: 'Lenovo', productId: '#070620', category: 'Laptop', location: 'Warehouse 3', available: 120, reserved: 200, onHold: 50 },
    { id: 4, product: 'Computer', productId: '#070621', category: 'Computer', location: 'Warehouse 4', available: 120, reserved: 200, onHold: 50 },
    { id: 5, product: 'Keyboard', productId: '#070622', category: 'Computer', location: 'Warehouse 5', available: 120, reserved: 200, onHold: 50 },
];

const renderIcons = [
    {
        id: 1,
        iconName: Visibility,
        bgColor: customStyles.colors._84E6C3,
        padding: '5px',
        borderRadius: 1,
        color: customStyles.colors.black
    },

    {
        id: 2,
        iconName: Edit,
        bgColor: customStyles.colors._B9C7FB,
        padding: '5px',
        borderRadius: 1,
        color: customStyles.colors.black
    },

    {
        id: 3,
        iconName: Delete,
        bgColor: customStyles.colors._FFF987,
        padding: '5px',
        borderRadius: 1,
        color: customStyles.colors.black
    }
];

const InventoryAccessManagement = () => {

    // Note: Handeling states here...!
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    // Note: Form onChange handler...!
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Note: Filtering data handler...!
    const filteredRows = rowsSampleData.filter((row) =>
        row.product.toLowerCase().includes(searchText.toLowerCase())
    );

    // Note: Icons handler...!
    const iconHandler = (iconData) => {
        console.log("Icon Data: ", iconData);
    };

    return (
        <Box sx={{ padding: 0 }}>

            {/* Heading Section */}
            <Box mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    Inventory
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                    Inventory Access Management
                </Typography>
            </Box>

            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Note: User stats section */}
            <StatsCard statsOf={'iam'} />

            {/* Buttons */}
            {/* <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                        marginRight: 2,
                        color: customStyles.colors.black,
                        backgroundColor: customStyles.colors.white,
                        border: '1px solid black',
                        minWidth: '150px',
                    }}
                >
                    Export
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        marginRight: 2,
                        color: customStyles.colors.white,
                        backgroundColor: customStyles.colors.black,
                        minWidth: '150px',
                    }}
                >
                    Add Inventory
                </Button>
            </Box> */}

            <Paper>

                {/* Note: Search field section */}
                <Box display="flex" justifyContent="flex-end" sx={{ padding: 2 }}>
                    <Searchbar
                        placeholder="Search Item"
                        bgColor={null}
                        width={300}
                        inputValue={searchText}
                        onChangeHandler={(value) => setSearchText(value)}
                    />
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHead?.map((item, index) => {
                                        return (
                                            <TableCell key={item.id}> {item.label} </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.product}</TableCell>
                                    <TableCell>{row.productId}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.available}</TableCell>
                                    <TableCell>{row.reserved}</TableCell>
                                    <TableCell>{row.onHold}</TableCell>
                                    <TableCell>

                                        {
                                            renderIcons?.map((item, index) => {
                                                return (
                                                    <IconButton
                                                        key={item.id}
                                                        onClick={() => iconHandler(item)}
                                                    >
                                                        <item.iconName
                                                            sx={{
                                                                backgroundColor: item.bgColor,
                                                                padding: item.padding,
                                                                borderRadius: item.borderRadius,
                                                                color: item.color
                                                            }}
                                                        />
                                                    </IconButton>
                                                );
                                            })
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Note: Pagination section */}
                <TablePagination
                    component="div"
                    count={filteredRows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Rows per page"
                />
            </Paper>
        </Box>
    );
};

export default InventoryAccessManagement;