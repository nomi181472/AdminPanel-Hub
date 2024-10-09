// Note: ShowMessage component...!

import * as React from 'react';
import { memo } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { customStyles } from '@/styles/styles';

const ShowMessage = (props) => {
    // console.log("Props: ", props);
    const { show, message, status, close } = props;

    return (
        <div>
            <Snackbar
                open={show}
                autoHideDuration={3000}
                onClose={close}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={close}
                    severity={status}
                    variant="filled"
                    sx={{
                        width: '100%',
                        backgroundColor: customStyles.colors.black,
                        color: customStyles.colors.white
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default memo(ShowMessage);