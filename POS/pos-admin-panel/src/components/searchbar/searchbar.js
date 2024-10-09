// Note: Searchbar component...!

import React, { memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = (props) => {
    // console.log("Props of search bar component: ", props);
    const {
        placeholder,
        bgColor,
        width,
        inputValue,
        onChangeHandler
    } = props;

    return (
        <TextField
            variant="standard"
            placeholder={placeholder}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                disableUnderline: true
            }}
            sx={{
                width: width,
                backgroundColor: bgColor ? bgColor : null,
                borderBottom: '1px solid'
            }}
            value={inputValue}
            onChange={e => onChangeHandler(e.target.value)}
        />
    );
};

export default memo(Searchbar);