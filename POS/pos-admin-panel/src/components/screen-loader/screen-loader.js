// Note: ScreenLoader component...!

import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { Levels } from 'react-activity';
import { customStyles } from '@/styles/styles';

const ScreenLoader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: customStyles.direction.column,
      alignItems: customStyles.alignment.center,
      justifyContent: customStyles.alignment.center,
      position: 'fixed',
      top: 0,
      left: 0,
      width: customStyles.sizeInPercent.size_100,
      height: '100%',
      backgroundColor: customStyles.colors.whiteSmoke,
      zIndex: 9999,
    }}
  >
    <Levels
      color={customStyles.colors.black}
      size={30}
    />

    <Typography variant="h6" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </Box>
);

export default memo(ScreenLoader);