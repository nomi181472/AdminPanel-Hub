// Note: AppLayOut component...!

'use client';

import * as React from 'react';
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box';

// Note: Importing required components...!
import { DrawerHeader, Main } from '@/components/mui-sections/mui-sections';
import AppDrawer from '@/components/drawer/drawer';
import AppNavBar from "@/components/appbar/appbar";

const AppLayOut = (props) => {
  // console.log("Props: ", props);

  // Note: Handeling states here...!
  const [openDrawer, setOpenDrawer] = useState(false);

  // Note: Handeling navigation here...!
  const router = useRouter();
  const pathName = usePathname();
  // console.log('Pathname: ', pathName);

  // Note: Drawer handelers...!
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  // Note: This hook will run when pathname update...!
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
          marginLeft: openDrawer ? '0px' : '0px',
          transition: 'margin 0.3s ease',
          padding: { xs: '16px', sm: '24px', md: '32px' },
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2%',
        }}
      >
        <DrawerHeader />

        <Container
          maxWidth="xl"
          sx={{
            width: '100%',
            padding: { xs: '8px', sm: '16px', md: '24px' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {props?.children}
        </Container>
      </Main>
    </Box>
  );
};

const RenderAppLayOut = (props) => {

  // Note: Verifying user authentication...!
  // const isUserAuthenticated = getCookie("UserAuthenticated");
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