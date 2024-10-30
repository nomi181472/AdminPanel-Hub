// Note: AddActionDialog component...!

import * as React from 'react';
import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Tooltip,
    IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import messages from '@/utils/messages/messages';
import { addAction, getAllActions, getOverAllActions } from '@/redux/store/actions/action-feature-actions/action-feature-actions';
import { customStyles } from '@/styles/styles';

const AddActionDialog = (props) => {
    // console.log("Props of add action dialog: ", props);
    const { open, close, displayMessageHandler } = props;

    // Note: Handeling states here...!
    const [module, setModule] = useState('');
    const [feature, setFeature] = useState('');
    const [action, setAction] = useState('');
    const [allFeatures, setAllFeatures] = useState([]);
    const [filterFeatures, setFilterFeatures] = useState([]);
    const [allActions, setAllActions] = useState([]);

    // Note: Handeling redux here...!
    const dispatch = useDispatch();

    // Note: Fetching data from redux...!
    const { overAllActions } = useSelector(({ actionsStates }) => { return actionsStates });
    // console.log('Over all actions: ', overAllActions);

    // Note: CLear states handler...!
    const clearStates = () => {
        setModule("");
        setFeature("");
        setAction("");
        setAllFeatures([]);
        setFilterFeatures([]);
        setAllActions([]);
    };

    // Note: On change handler for module...!
    const onChangeForModule = (e) => {
        const val = e.target.value;
        setModule(val);
        // console.log('Selected module: ', val);

        setFeature("");
        setAction("");
        setAllFeatures([]);
        setFilterFeatures([]);
        setAllActions([]);

        const findFeaturesAndActions = [...overAllActions].find((item, index) => { return item?.apiName == val })?.routes;
        console.log(findFeaturesAndActions);
        if (findFeaturesAndActions) {
            setAllFeatures(findFeaturesAndActions);
            setAllActions(findFeaturesAndActions);
        };
    };

    // Note: Function to render feature name...!
    const renderFeatureName = (path) => {
        // console.log('Path: ', path);

        const pathClone = path;
        const removeInitChar = pathClone?.slice(1)
        const targetSection = removeInitChar.slice(removeInitChar.indexOf('/') + 1, removeInitChar.lastIndexOf('/'));
        // console.log(targetSection);

        return targetSection;
    };

    // Note: Function to render action name...!
    const renderActionName = (path) => {
        // console.log('Path: ', path);

        const pathClone = path;
        const targetSection = pathClone.slice(pathClone.lastIndexOf('/') + 1);
        return targetSection;
    };

    // Note: Save action api response handler...!
    const resHandler = (res) => {
        if (res && res?.status == 201) {
            console.log('Api res: ', res);
            displayMessageHandler('Action added successfully', messages.success);
            dispatch(getAllActions());
            dispatch(getOverAllActions());
            close();
            clearStates();
        };
    };

    // Note: Save action handler...!
    const handleSave = () => {
        const saveAction = {
            name: `/${module}/${feature}/${action}`,
            tag: "testing"
        };

        saveAction && dispatch(addAction(saveAction, resHandler));
    };

    // Note: This hook will run when all features state will update...!
    useEffect(() => {
        if (allFeatures && allFeatures.length > 0) {

            const featureItems = [];
            for (let item of allFeatures) {
                const eachFeature = renderFeatureName(item);
                // console.log('Feature: ', eachFeature);
                featureItems.push(eachFeature);
            };

            // const uniqueFeatures = new Set([...featureItems]);
            const uniqueFeatures = [...featureItems].filter((item, index) => {
                return featureItems.indexOf(item) === index;
            });
            console.log('Unique features: ', uniqueFeatures);

            if (uniqueFeatures) setFilterFeatures(uniqueFeatures);
        };
    }, [allFeatures]);

    return (
        <div>
            <Dialog
                open={open}
                fullWidth
                disableEscapeKeyDown={false}
                onClose={(event, reason) => {
                    // if (reason !== 'backdropClick') {
                    close();
                    clearStates();
                    // };
                }}
                PaperProps={{
                    style: {
                        borderRadius: 15,
                        padding: "20px",
                        backgroundColor: 'whitesmoke'
                        // background: "linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)"
                    }
                }}
            >
                <DialogTitle style={{ fontWeight: "bold", color: "#333" }}>Select Options</DialogTitle>
                <DialogContent>

                    {/* Module Dropdown */}
                    <Typography variant="subtitle1" sx={{ mt: 2, color: "#555" }}>
                        Select Module
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="module-label">
                            Module
                        </InputLabel>

                        <Select
                            labelId="module-label"
                            id="module"
                            value={module}
                            label="Module"
                            onChange={onChangeForModule}
                            style={{ backgroundColor: "white", borderRadius: 5 }}
                            MenuProps={{
                                PaperProps: {
                                    style: { maxHeight: 300, borderRadius: 10 }
                                }
                            }}
                        >
                            {
                                overAllActions.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={item?.apiName}
                                            value={item?.apiName}
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            {item?.apiName}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>

                    {/* Feature Dropdown */}
                    <Typography variant="subtitle1" sx={{ mt: 2, color: "#555" }}>
                        Select Feature
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="feature-label">
                            Feature
                        </InputLabel>

                        <Select
                            labelId="feature-label"
                            id="feature"
                            value={feature}
                            label="Feature"
                            onChange={(e) => setFeature(e.target.value)}
                            disabled={!module}
                            style={{ backgroundColor: "white", borderRadius: 5 }}
                            MenuProps={{
                                PaperProps: {
                                    style: { maxHeight: 300, borderRadius: 10 }
                                }
                            }}
                        >
                            {
                                (filterFeatures && filterFeatures.length > 0) ?
                                    (
                                        filterFeatures?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={item}
                                                    style={{ display: "flex", alignItems: "center" }}
                                                >
                                                    {item}
                                                </MenuItem>
                                            );
                                        })
                                    )
                                    : (null)
                            }
                        </Select>
                    </FormControl>

                    {/* Action Dropdown */}
                    <Typography variant="subtitle1" sx={{ mt: 2, color: "#555" }}>
                        Select Action
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="action-label">
                            Action
                        </InputLabel>

                        <Select
                            labelId="action-label"
                            id="action"
                            value={action}
                            label="Action"
                            onChange={(e) => setAction(e.target.value)}
                            disabled={!feature}
                            // MenuProps={{
                            //     PaperProps: {
                            //         style: {
                            //             maxHeight: 200, // Note: To controlling the height of Mui drop down...!
                            //         },
                            //     },
                            // }}

                            style={{ backgroundColor: "white", borderRadius: 5 }}
                            MenuProps={{
                                PaperProps: {
                                    style: { maxHeight: 300, borderRadius: 10 }
                                }
                            }}
                        >
                            {
                                allActions?.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={renderActionName(item)}
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            {renderActionName(item)}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </DialogContent>

                {/* Note: Footer icons */}
                <DialogActions>
                    {
                        (module != "" && feature != "" && action != "") ?
                            (
                                <Tooltip title="Success" arrow>
                                    <IconButton
                                        onClick={handleSave}
                                        style={{
                                            backgroundColor: customStyles.colors.primary,
                                            color: "white",
                                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                                        }}
                                    >
                                        <CheckCircleIcon fontSize="medium" sx={{ color: customStyles.colors.black }} />
                                    </IconButton>
                                </Tooltip>
                            )
                            : null
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default memo(AddActionDialog);