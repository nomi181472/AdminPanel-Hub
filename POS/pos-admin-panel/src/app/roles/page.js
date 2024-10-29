// Note: Roles page/screen...!

"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper,
    Box,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TablePagination,
    Select,
    MenuItem,
    Typography,
    Button
} from '@mui/material';
import { StyledTableRow, StyledTableCell } from "../../components/mui-sections/mui-sections";
import PagesNavbar from '@/components/pages-navbar/pages-navbar';
import StatsCard from '@/components/stats-card/stats-card';
import Searchbar from '@/components/searchbar/searchbar';
import ShowMessage from '@/components/toast-message/toast-message';
import ScreenLoader from '@/components/screen-loader/screen-loader';
import RoleDialog from '@/components/role-dialog/role-dialog';
import ConfirmActionDialog from '@/components/confirm-action-dialog/confirm-action-dialog';
import messages from '@/utils/messages/messages';
import { getAllFeatures, getMatrixDataByFeatureName } from '@/redux/store/actions/roles-actions/roles-actions';
import { customStyles } from '@/styles/styles';

const Roles = () => {

    // Note: Handeling states here...!
    const [searchRoles, setSearchRoles] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selectedFeature, setSelectedFeature] = useState("");
    const [roleDialog, setRoleDialog] = useState(false);
    const [actionDialog, setActionDialog] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");
    const [selectRow, setSelectRow] = useState(null);
    const [loadData, setLoadData] = useState(false);

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { features, matrixDataByFeatureName } = useSelector(({ roleStates }) => { return roleStates });
    // console.log("Features: ", features);
    // console.log("Matrix data: ", matrixDataByFeatureName);

    // Note: Function to close show message component...!
    const closeShowMessage = () => {
        setShowToast(false);
        setMessage("");
        setMessageStatus("");
    };

    // Note: Handler to show role has been added successfully...!
    const roleAddedSuccess = () => {
        setSelectedFeature("");
        setShowToast(true);
        setMessage("Role added successfully");
        setMessageStatus(messages.success);
    };

    // Note: Handler to show role has been deleted / updated successfully...!
    const roleSuccess = (statusCode, message) => {
        if (statusCode == 200) {
            console.log(statusCode, message);
            setSelectedFeature("");
            setShowToast(true);
            setMessage(message);
            setMessageStatus(messages.success);
        }

        else if (statusCode == 400) {
            console.log(statusCode, message);
            setShowToast(true);
            setMessage(message);
            setMessageStatus(messages.warning);
        }
    };

    // Note: Function to get the drop down value...!
    const handleChange = (event) => {
        const dropDownValue = event.target.value;
        setSelectedFeature(dropDownValue);
        setLoadData(true);
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

    // Note: Tis hook will run when matrixDataByFeatureName state will update...!
    useEffect(() => {
        if (matrixDataByFeatureName && matrixDataByFeatureName?.hasOwnProperty("actionsInFeature")) {
            // console.log("matrixDataByFeatureName: ", matrixDataByFeatureName);
            setLoadData(false);
        };
    }, [matrixDataByFeatureName]);

    return (
        <>
            {/* Note: Component to show message */}
            <ShowMessage
                show={showToast}
                message={message}
                status={messageStatus}
                close={closeShowMessage}
            />

            {/* Note: Add new user dialog box component */}
            <RoleDialog
                open={roleDialog}
                close={() => setRoleDialog(false)}
                roleSuccessHandler={roleAddedSuccess}
            />

            {/* Note: Select action dialog box component */}
            <ConfirmActionDialog
                open={actionDialog}
                close={() => {
                    setActionDialog(false)
                    setSelectRow(null);
                }}
                rowData={selectRow}
                roleSuccess={roleSuccess}
            />

            {/* Heading Section */}
            <Box mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    Roles
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                    Roles Management
                </Typography>
            </Box>

            {/* Note: Pages navbar component */}
            <PagesNavbar />

            {/* Note: User stats section */}
            <StatsCard
                statsOf={'roles'}
                handler={() => setRoleDialog(true)}
            />

            {/* Note: Table section */}
            <TableContainer
                component={Paper}
                sx={{
                    border: "0.5px solid #ccc",
                    marginTop: 2
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
                                        paddingLeft: 1,
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        borderBottom: "1px solid black",
                                        borderRadius: 0,
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

                {
                    (loadData) ? (<ScreenLoader />) :
                        (
                            <>
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
                                                    {/* Note: Role Name */}
                                                    <StyledTableCell
                                                        component="th"
                                                        scope="row"
                                                        align="left"
                                                        sx={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => {
                                                            setActionDialog(true);
                                                            setSelectRow(row);
                                                        }}
                                                    >
                                                        {row.name}
                                                    </StyledTableCell>

                                                    {/* Note: Actions Mapping */}
                                                    {
                                                        matrixDataByFeatureName?.actionsInFeature?.map((action) => {
                                                            // Note: Check if the action is associated with the role
                                                            const isActionAssociated = matrixDataByFeatureName?.actionsAssociatedWithRole.some(
                                                                (assoc) => assoc.actionId === action.id && assoc.roleId === row.id
                                                            );

                                                            return (
                                                                <StyledTableCell
                                                                    key={action.id}
                                                                    align="center"
                                                                >
                                                                    <Button
                                                                        variant="contained"
                                                                        sx={{
                                                                            backgroundColor: isActionAssociated ? "green" : "red"
                                                                        }}
                                                                    >
                                                                        {isActionAssociated ? "Yes" : "No"}
                                                                    </Button>
                                                                </StyledTableCell>
                                                            );
                                                        })
                                                    }
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
                            </>
                        )
                }
            </TableContainer>
        </>
    );
};

export default Roles;