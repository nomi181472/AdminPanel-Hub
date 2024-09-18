// Note: Roles Page/Screen...!

"use client";

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from "./roles.module.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: "#9E9A9A",
        textTransform: "capitalize",
        fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#9E9A9A",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Note: Roles header data...!
const rolesHeaderData = [
    {
        id: "1",
        label: "roles"
    },

    {
        id: "2",
        label: "add user"
    },

    {
        id: "3",
        label: "delete user"
    },

    {
        id: "4",
        label: "update user"
    },

    {
        id: "5",
        label: "get user"
    },

    {
        id: "6",
        label: "view user"
    },

    {
        id: "7",
        label: "update password"
    },
];

// Note: Roles data...!
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

    {
        id: 2,
        label: "Manager",
        addUserAccess: true,
        deleteUserAccess: true,
        updateUserAccess: true,
        getUserAccess: true,
        viewUserAccess: true,
        updatePasswordAccess: true
    },

    {
        id: 3,
        label: "Editor",
        addUserAccess: true,
        deleteUserAccess: false,
        updateUserAccess: true,
        getUserAccess: true,
        viewUserAccess: false,
        updatePasswordAccess: false
    },

    {
        id: 4,
        label: "Viewer",
        addUserAccess: true,
        deleteUserAccess: false,
        updateUserAccess: true,
        getUserAccess: true,
        viewUserAccess: false,
        updatePasswordAccess: false
    },

    {
        id: 5,
        label: "Basic access",
        addUserAccess: true,
        deleteUserAccess: false,
        updateUserAccess: true,
        getUserAccess: true,
        viewUserAccess: true,
        updatePasswordAccess: true
    }
];

const Roles = () => {

    // Note: Handeling Mui theme...!
    const theme = useTheme();

    return (
        <TableContainer
            component={Paper}
            sx={{
                border: "0.5px solid #ccc",
            }}
        >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            colSpan={1}
                            className={styles.topRow}
                        >
                            Roles
                        </StyledTableCell>
                        <StyledTableCell
                            align='center'
                            colSpan={6}
                            className={styles.topRow}
                        >
                            Features
                        </StyledTableCell>
                    </TableRow>

                    <TableRow>
                        {
                            rolesHeaderData?.map((item, index) => {
                                return (
                                    <StyledTableCell
                                        key={item?.id}
                                        align={item?.id == 1 ? "left" : "center"}
                                    >
                                        {item?.label}
                                    </StyledTableCell>
                                );
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rolesData.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row" align="left">{row.label}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.addUserAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.deleteUserAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.updateUserAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.getUserAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.viewUserAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.customColors._09CD87 }}
                                    disableElevation
                                >
                                    {(row.updatePasswordAccess) ? ('Yes') : ('No')}
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Roles;