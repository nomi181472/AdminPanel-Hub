// Note: Loader component...!

import React, { memo, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Spinner } from "react-activity";

const Loader = () => {
  // Note: Handeling staes here...!
  const [dataLoaded, setDataLoaded] = useState(true);

  // Note: Mounted hook...!
  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(false);
    }, 10000);
  }, []);

  return (
    <>
      {dataLoaded ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            position: "fixed",
            top: 80,
            left: 40,
            right: 0,
            bottom: 0,
          }}
        >
          {/* Note: Loader */}
          <Spinner color="black" size={32} />

          {/* Note: Loader text */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Data Not Found
        </h1>
      )}
    </>
  );
};

export default memo(Loader);
