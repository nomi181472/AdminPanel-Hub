// Note: AppLayOut component...!

'use client';

import * as React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container'
import Box from '@mui/material/Box';

// Note: Importing required components...!
import { DrawerHeader, Main } from '@/components/mui-sections/mui-ections';
import AppDrawer from '@/components/drawer/drawer';
import AppNavBar from "@/components/appbar/appbar";

const AppLayOut = (props) => {
  // console.log("Props: ", props);

  // Note: Handeling states here...!
  const [openDrawer, setOpenDrawer] = useState(false);

  // Note: Handeling navigation here...!
  const router = useRouter();

  // Note: Drawer handelers...!
  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  // Note: When this component mounted then this hook will run...!
  useEffect(() => {
    router.push("/dashboard");
  }, []);

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
      <Main open={openDrawer}>
        <DrawerHeader />

        <Container maxWidth="xl">
          {props?.children}
        </Container>
      </Main>
    </Box>
  );
};

export default AppLayOut;