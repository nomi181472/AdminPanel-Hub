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
import AddUserDialog from '@/components/add-user-dialog/add-user-dialog';
import UpdateUserDialog from "@/components/update-user-dialog/update-user-dialog";
import ShowMessage from '@/components/toast-message/toast-message';
import ScreenLoader from '@/components/screen-loader/screen-loader';
import messages from '@/utils/messages/messages';
import { getAllRoles } from '@/redux/store/actions/roles-actions/roles-actions';
import {
    getTotalUsersCount,
    fetchAllUsers,
    deleteUser,
    getNewUsersByMonth
}
    from '@/redux/store/actions/user-actions/user-actions';
import { customStyles } from '@/styles/styles';

// Note: Table head data...!
const tableHead = [
    { id: 1, label: 'no.' },
    { id: 2, label: 'id' },
    { id: 3, label: 'name' },
    { id: 4, label: 'email' },
    { id: 5, label: 'status' },
    { id: 6, label: 'created at' },
    { id: 7, label: 'actions' }
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
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
    const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { authenticatedUser } = useSelector(({ authStates }) => { return authStates });
    const { usersList } = useSelector(({ userStates }) => { return userStates });
    // console.log("User: ", authenticatedUser);
    // console.log("Users: ", usersList);

    // Note: Function to close show message component...!
    const closeShowMessage = () => {
        setShowToast(false);
        setMessage("");
        setMessageStatus("");
    };

    // Note: Function to open add new user dialog box...!
    const openAddNewUserDialog = () => {
        setOpenNewUserDialog(true);
    };

    // Note: Handler to show user has been created successfully...!
    const userCreationSuccess = () => {
        setShowToast(true);
        setMessage("User created successfully");
        setMessageStatus(messages.success);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Note: Filtering data handler...!
    const filteredRows = usersList?.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Note: Delete and update user api response handler...!
    const resHandler = (res, message) => {
        if (res && res?.status != 200) {
            setShowToast(true);
            setMessage(res?.data?.message);
            setMessageStatus(messages.warning);
        }

        else if (res && res?.status == 200) {
            setShowToast(true);
            setMessage(message);
            setMessageStatus(messages.success);
            dispatch(fetchAllUsers()); // Note: For updating data in real time...!
            dispatch(getTotalUsersCount()); // Note: For updating data in real time...!
        };
    };

    // Note: Icons handler...!
    const iconHandler = (iconData, rowData) => {
        // console.log("Data: ", iconData, rowData);
        if (iconData?.id == 3) dispatch(deleteUser(rowData?.userId, resHandler));

        else if (iconData?.id == 2) {
            setSelectedRow(rowData);
            setShowUpdateUserDialog(true);
        }
    };

    // Note: This hook will run when component mounts...!
    useEffect(() => {
        if (authenticatedUser) {
            dispatch(getTotalUsersCount());
            dispatch(fetchAllUsers());
            dispatch(getAllRoles());

            const currentMonth = new Date().getMonth();
            dispatch(getNewUsersByMonth(currentMonth + 1));
        };
    }, []);

    return (
        <Box sx={{ padding: 0 }}>

            {/* Note: Component to show message */}
            <ShowMessage
                show={showToast}
                message={message}
                status={messageStatus}
                close={closeShowMessage}
            />

            {/* Note: Add new user dialog box component */}
            <AddUserDialog
                open={openNewUserDialog}
                close={() => setOpenNewUserDialog(false)}
                userSuccessHandler={userCreationSuccess}
            />

            {/* Note: Update user dialog box component */}
            <UpdateUserDialog
                open={showUpdateUserDialog}
                close={() => setShowUpdateUserDialog(false)}
                rowData={selectedRow}
                apiResHandler={resHandler}
            />

            {/* Heading Section */}
            <Box mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    Users
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                    Users Management
                </Typography>
            </Box>

            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Note: User stats section */}
            <StatsCard
                statsOf={'users'}
                handler={openAddNewUserDialog}
            />

            {/* Table section */}
            {
                (usersList && usersList.length) ?
                    (
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
                                        {
                                            filteredRows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => (
                                                    // row?.name == "SuperAdmin" ? null :
                                                    <TableRow key={row.id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row?.userId.slice(0, 5)}</TableCell>
                                                        <TableCell>{row?.name}</TableCell>
                                                        <TableCell>{row?.email}</TableCell>
                                                        <TableCell>{row?.isActive ? 'Active' : 'Not Active'}</TableCell>
                                                        <TableCell>{new Date(row?.createdDate).toDateString()}</TableCell>
                                                        <TableCell>

                                                            {
                                                                renderIcons?.map((item, index) => {
                                                                    return (
                                                                        <IconButton
                                                                            key={item.id}
                                                                            onClick={() => iconHandler(item, row)}
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
                                                ))
                                        }
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
                    )
                    :
                    (<ScreenLoader />)
            }
        </Box>
    );
};

export default Users;