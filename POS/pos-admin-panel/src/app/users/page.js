// Note: Users page/screen...!

"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography
} from '@mui/material';
import { Search as SearchIcon, Visibility, Edit, Delete } from '@mui/icons-material';
import PagesNavbar from '@/components/pages-navbar/pages-navbar';
import StatsCard from '@/components/stats-card/stats-card';
import Searchbar from '@/components/searchbar/searchbar';
import { getTotalUsersCount } from '@/redux/store/actions/user-actions/user-actions';
import { customStyles } from '@/styles/styles';

// Note: Table head data...!
const tableHead = [
    { id: 1, label: 'no.' },
    { id: 2, label: 'id' },
    { id: 3, label: 'name' },
    { id: 4, label: 'email' },
    { id: 5, label: 'type' },
    { id: 6, label: 'role' },
    { id: 7, label: 'actions' }
];

// Note: This is the sample data for table. It will coming from an api in future...!
const rowsSampleData = [
    {
        id: 1,
        name: 'John Smith',
        email: 'j.smith@gmail.com',
        type: 'User',
        role: 'Admin'
    },

    {
        id: 2,
        name: 'Adam Mark',
        email: 'a.mark@gmail.com',
        type: 'User',
        role: 'Admin'
    },

    {
        id: 3,
        name: 'Nick Jones',
        email: 'n.jones@gmail.com',
        type: 'User',
        role: 'Admin'
    },

    {
        id: 4,
        name: 'Trish Stratus',
        email: 't.stratus@gmail.com',
        type: 'User',
        role: 'Admin'
    },

    {
        id: 5,
        name: 'Tom Jerry',
        email: 't.jerry@gmail.com',
        type: 'User',
        role: 'Admin'
    },
];

// Note: Icons data for view, delete and edit.
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

const Users = () => {

    // Note: Handeling states here...!
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { authenticatedUser } = useSelector(({ authStates }) => { return authStates });
    // console.log("User: ", authenticatedUser);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Note: Filtering data handler...!
    const filteredRows = rowsSampleData.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Note: Icons handler...!
    const iconHandler = (iconData) => {
        console.log("Icon Data: ", iconData);
    };

    // Note: This hook will run when component mounts...!
    useEffect(() => {
        if (authenticatedUser) dispatch(getTotalUsersCount());
    }, []);

    return (
        <Box sx={{ padding: 0 }}>

            {/* Heading Section */}
            <Box mb={2}>
                <Typography variant="h4" fontWeight="bold">Users</Typography>
                
                <Typography variant="subtitle2" color="textSecondary">
                    Users Management
                </Typography>
            </Box>

            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Note: User stats section */}
            <StatsCard statsOf={'users'} />

            {/* Table section */}
            <Paper>
                {/* Note: Search field section */}
                <Box display="flex" justifyContent="flex-end" sx={{ padding: 2 }}>
                    <Searchbar
                        placeholder="Search User"
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
                                            <TableCell
                                                key={item.id}
                                                sx={{ textTransform: customStyles.textTransformation.capitalize }}
                                            >
                                                {item.label}
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.role}</TableCell>
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
                    labelRowsPerPage="Users per page"
                />
            </Paper>
        </Box>
    );
};

export default Users;