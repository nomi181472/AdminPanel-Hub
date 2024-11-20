// Note: ErrorMessage (Server) component...!

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { customStyles } from '@/styles/styles';

const ErrorMessage = () => {

    // Note: Fetching error states data from redux...!
    const { errorMessage } = useSelector(({ errorStates }) => { return errorStates });
    // console.log("Error states: ", errorMessage);

    return (
        <div
            style={{
                height: '30vh',
                display: 'flex',
                justifyContent: customStyles.alignment.center || "center",
                alignItems: customStyles.alignment.center || "center",
            }}
        >
            <h2>
                {errorMessage}
            </h2>
        </div>
    );
};

export default memo(ErrorMessage);