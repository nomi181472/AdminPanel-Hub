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
            >
                <DialogTitle>Select Options</DialogTitle>
                <DialogContent>

                    {/* Module Dropdown */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
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
                        >
                            {
                                overAllActions.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={item?.apiName}
                                            value={item?.apiName}
                                        >
                                            {item?.apiName}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>

                    {/* Feature Dropdown */}
                    <Typography variant="subtitle1" sx={{ mt: 3 }}>
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
                        >
                            {
                                (filterFeatures && filterFeatures.length > 0) ?
                                    (
                                        filterFeatures?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={item}
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
                    <Typography variant="subtitle1" sx={{ mt: 3 }}>
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
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200, // Note: To controlling the height of Mui drop down...!
                                    },
                                },
                            }}
                        >
                            {
                                allActions?.map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={renderActionName(item)}
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
                                    <IconButton onClick={handleSave}>
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