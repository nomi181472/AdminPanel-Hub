// Note: Actions page/screen...!

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
    Typography,
    Tooltip
} from '@mui/material';
import { Search as SearchIcon, Visibility, Edit, Delete, Add } from '@mui/icons-material';
import PagesNavbar from '@/components/pages-navbar/pages-navbar';
import Searchbar from '@/components/searchbar/searchbar';
import ShowMessage from '@/components/toast-message/toast-message';
import ScreenLoader from '@/components/screen-loader/screen-loader';
import { customStyles } from '@/styles/styles';
import {
    getAllActions,
    getOverAllActions
} from '@/redux/store/actions/action-feature-actions/action-feature-actions';
import ActionFeatureDialog from '@/components/action-feature-dialog/action-feature-dialog';
import AddActionDialog from '@/components/add-action-dialog/add-action-dialog';

// Note: Table head data...!
const tableHead = [
    { id: 1, label: 'no.' },
    { id: 2, label: 'id' },
    { id: 3, label: 'action' },
    { id: 4, label: 'view' },
    { id: 5, label: 'edit' },
    { id: 6, label: 'delete' },
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

const Actions = () => {

    // Note: Handeling states here...!
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showDialog, setShowDialog] = useState(false);
    const [selectRow, setSelectRow] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    const [showAddActionDialog, setShowAddActionDialog] = useState(false);

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { actions } = useSelector(({ actionsStates }) => { return actionsStates });
    // console.log('Actions: ', actions);
    // console.log('Over all actions: ', overAllActions);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Note: Filtering data handler...!
    const filteredRows = actions?.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Note: Function to close show message component...!
    const closeShowMessage = () => {
        setShowToast(false);
        setMessage("");
        setMessageStatus("");
    };

    // Note: Handler to show message on toast component...!
    const messageDisplayOnToast = (resMessage, resMessageStatus) => {
        setShowToast(true);
        setMessage(resMessage);
        setMessageStatus(resMessageStatus);
    };

    // Note: Icons handler...!
    const iconHandler = (iconData, rowData) => {
        console.log("Data: ", iconData, rowData);
        if (iconData?.id != 1) {
            setSelectRow(rowData);
            setShowDialog(true);
        };
    };

    // Note: Mounted hook...!
    useEffect(() => {
        dispatch(getAllActions());
        dispatch(getOverAllActions());
    }, []);

    return (
        <Box sx={{ padding: 0 }}>

            {/* Note: Show message component */}
            <ShowMessage
                show={showToast}
                message={message}
                status={messageStatus}
                close={closeShowMessage}
            />

            {/* Note: Dialog box component for delete and update action */}
            <ActionFeatureDialog
                open={showDialog}
                close={() => {
                    setShowDialog(false)
                    setSelectRow(null)
                }}
                rowData={selectRow}
                displayMessageHandler={messageDisplayOnToast}
            />

            {/* Note: Dialog box component add action */}
            <AddActionDialog
                open={showAddActionDialog}
                close={() => setShowAddActionDialog(false)}
                displayMessageHandler={messageDisplayOnToast}
            />

            {/* Heading Section */}
            <Box mb={2}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Actions
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                    Actions Management
                </Typography>
            </Box>

            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Table section */}
            {
                (actions && actions?.length) ?
                    (
                        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Box display="flex" justifyContent="space-between" sx={{ padding: 2 }}>
                                <Searchbar
                                    placeholder="Search Action"
                                    bgColor={null}
                                    width={300}
                                    inputValue={searchText}
                                    onChangeHandler={(value) => setSearchText(value)}
                                />

                                <Tooltip title="Add New Action">
                                    <IconButton
                                        aria-label="add action"
                                        onClick={() => setShowAddActionDialog(true)}
                                    >
                                        <Add sx={{ color: customStyles.colors.black }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableRow>
                                            {
                                                tableHead?.map((item, index) => {
                                                    return (
                                                        <TableCell
                                                            key={item?.id}
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
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#f9f9f9',
                                                                transition: 'background-color 0.3s ease',
                                                            }
                                                        }}
                                                    >
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row?.id.slice(0, 5)}</TableCell>
                                                        <TableCell>{row?.name.slice(row?.name.lastIndexOf("/") + 1)}</TableCell>
                                                        {
                                                            renderIcons?.map((item, index) => {
                                                                return (
                                                                    <TableCell key={item.id}>
                                                                        <IconButton
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
                                                                    </TableCell>
                                                                );
                                                            })
                                                        }
                                                    </TableRow>
                                                ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component="div"
                                count={filteredRows.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Actions per page"
                                sx={{
                                    borderTop: '1px solid #e0e0e0',
                                    boxShadow: '0 -2px 6px rgba(0,0,0,0.05)',
                                }}
                            />
                        </Paper>
                    )
                    :
                    (<ScreenLoader />)
            }
        </Box>
    );
};

export default Actions;