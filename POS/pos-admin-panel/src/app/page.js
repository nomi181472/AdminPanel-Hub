// Note: AppLayOut (Client component)...!

'use client';

import * as React from 'react';
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

// Note: Importing required MUI components...!
import { Container, Box } from '@mui/material';

// Note: Importing required components...!
import { DrawerHeader, Main } from '@/components/mui-sections/mui-sections';
import AppDrawer from '@/components/drawer/drawer';
import AppNavBar from "@/components/appbar/appbar";
import { customStyles } from "../styles/styles";

const AppLayOut = (props) => {
  // console.log("Props of app loyout component: ", props);

  // Note: Handeling states here...!
  const [openDrawer, setOpenDrawer] = useState(false);

  // Note: Handeling navigation here...!
  const router = useRouter();
  const pathName = usePathname();
  // console.log('Pathname: ', pathName);

  // Note: Drawer handelers...!
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  // Note: This hook will run when pathname state update...!
  useEffect(() => {
    if (pathName == "/") router.push("/dashboard");
  }, [pathName]);

  return (
    <Box sx={{ display: 'flex' }}>

      {/* Note: App nav bar component */}
      <AppNavBar
        openDrawer={openDrawer}
        openDrawerHandler={handleDrawerOpen}
      />

      {/* Note: App sidebar, drawer component */}
      <AppDrawer
        openDrawer={openDrawer}
        closeDrawer={handleDrawerClose}
      />

      {/* Note: Content section */}
      <Main
        open={openDrawer}
        sx={{
          flexGrow: 1,
          marginLeft: openDrawer ? 0 : 0,
          transition: 'margin 0.3s ease',
          padding: { xs: '16px', sm: '24px', md: '32px' },
          display: 'flex',
          justifyContent: customStyles.alignment.center,
          marginTop: '2%',
        }}
      >
        <DrawerHeader />

        <Container
          maxWidth="xl"
          sx={{
            width: customStyles.sizeInPercent.size_100,
            padding: { xs: '8px', sm: '16px', md: '24px' },
            display: 'flex',
            flexDirection: customStyles.direction.column
          }}
        >
          {props?.children}
        </Container>
      </Main>
    </Box>
  );
};

const RenderAppLayOut = (props) => {

  // Note: Fetching user authorization token from local storage state...!
  const isUserAuthenticated = localStorage.getItem("AuthToken");
  // console.log("isUserAuthenticated: ", isUserAuthenticated);


  return (
    (isUserAuthenticated)
      ?
      (<AppLayOut {...props} />)
      :
      (
        <div>
          {props?.children}
        </div>
      )
  );
};

export default RenderAppLayOut;