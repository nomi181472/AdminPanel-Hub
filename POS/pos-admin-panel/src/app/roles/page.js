"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
    Paper,
    Box,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TablePagination,
    Select,
    MenuItem,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTableRow, StyledTableCell } from "../../components/mui-sections/mui-sections";
import PagesNavbar from '@/components/pages-navbar/pages-navbar';
import StatsCard from '@/components/stats-card/stats-card';
import Searchbar from '@/components/searchbar/searchbar';
import { customStyles } from '@/styles/styles';
import { getAllFeatures, getMatrixDataByFeatureName } from '@/redux/store/actions/roles-actions/roles-actions';

const rolesHeaderData = [
    { id: "1", label: "roles" },
    { id: "2", label: "add user" },
    { id: "3", label: "delete user" },
    { id: "4", label: "update user" },
    { id: "5", label: "get user" },
    { id: "6", label: "view user" },
    { id: "7", label: "update password" },
];

const rolesData = [
    {
        id: 1,
        label: "Admin",
        addUserAccess: true,
        deleteUserAccess: true,
        updateUserAccess: true,
        getUserAccess: true,
        viewUserAccess: true,
        updatePasswordAccess: true
    },
    { id: 2, label: "Manager", addUserAccess: true, deleteUserAccess: true, updateUserAccess: true, getUserAccess: true, viewUserAccess: true, updatePasswordAccess: true },
    { id: 3, label: "Editor", addUserAccess: true, deleteUserAccess: false, updateUserAccess: true, getUserAccess: true, viewUserAccess: false, updatePasswordAccess: false },
    { id: 4, label: "Viewer", addUserAccess: true, deleteUserAccess: false, updateUserAccess: true, getUserAccess: true, viewUserAccess: false, updatePasswordAccess: false },
    { id: 5, label: "Basic access", addUserAccess: true, deleteUserAccess: false, updateUserAccess: true, getUserAccess: true, viewUserAccess: true, updatePasswordAccess: true }
];

const Roles = () => {

    const theme = useTheme();

    // Note: Handeling states here...!
    const [searchRoles, setSearchRoles] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedFeature, setSelectedFeature] = useState("");

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { features, matrixDataByFeatureName } = useSelector(({ roleStates }) => { return roleStates });
    // console.log("Features: ", features);
    console.log("Matrix data: ", matrixDataByFeatureName);

    // Note: Function to get the drop down value...!
    const handleChange = (event) => {
        const dropDownValue = event.target.value;
        setSelectedFeature(dropDownValue);
        // console.log("Selected feature:", dropDownValue);
        dropDownValue && dispatch(getMatrixDataByFeatureName(dropDownValue));
    };

    // Note: Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Note: Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Note: Filtered data based on search input
    const filteredRolesData = matrixDataByFeatureName?.allRoles.filter((row) =>
        row?.name?.toLowerCase().includes(searchRoles.toLowerCase())
    );

    // Note: Paginated roles data
    const paginatedRolesData = filteredRolesData?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Note: This hook will run when component mounts...!
    useEffect(() => {
        dispatch(getAllFeatures());
    }, []);

    return (
        <>
            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Note: User stats section */}
            <StatsCard />

            {/* Note: Table section */}
            <TableContainer
                component={Paper}
                sx={{
                    border: "0.5px solid #ccc",
                    marginTop: 5
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: customStyles.alignment.spaceBetween,
                        alignItems: customStyles.alignment.center,
                        padding: '16px',
                        backgroundColor: customStyles.colors.white,
                        borderBottom: "1px solid silver"
                    }}
                >
                    {/* Note: Search bar component */}
                    <Searchbar
                        placeholder="Search Roles"
                        bgColor={customStyles.colors.white}
                        width={300}
                        inputValue={searchRoles}
                        onChangeHandler={(value) => setSearchRoles(value)}
                    />

                    {
                        features && features.length > 0 ?
                            (
                                <Select
                                    value={selectedFeature}
                                    onChange={handleChange}
                                    displayEmpty
                                    sx={{
                                        width: 300,
                                        paddingLeft : 1,
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        borderBottom: "1px solid black",
                                        borderRadius : 0,
                                        '&:before': {
                                            border: 'none',
                                        },
                                        '&:after': {
                                            border: 'none',
                                        },
                                        '&:focus': {
                                            border: 'none',
                                        },
                                        '&:hover': {
                                            border: 'none',
                                            borderBottom: "1px solid black",
                                        },
                                        '& .MuiSelect-select': {
                                            padding: '10px 0',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>Select Feature</MenuItem>
                                    {
                                        features.map((feature) => (
                                            <MenuItem
                                                key={feature}
                                                value={feature}
                                            >
                                                {feature}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            )
                            : null
                    }
                </Box>

                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align={'left'}>
                                roles
                            </StyledTableCell>

                            {
                                matrixDataByFeatureName?.actionsInFeature?.map((item, index) => (
                                    <StyledTableCell
                                        key={item.id}
                                        align={'center'}
                                    >
                                        {
                                            item?.name.slice(item?.name.lastIndexOf("/") + 1)
                                        }
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            paginatedRolesData?.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row" align="left">
                                        {row.name}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                {/* Pagination */}
                <TablePagination
                    component="div"
                    count={filteredRolesData?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </>
    );
};

export default Roles;