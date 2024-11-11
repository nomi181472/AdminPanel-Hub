// Note: Main root / configuration file...!

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Note: Redux Integration...!
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store/store';

// Note: Material UI Integration...!
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';

// Note: React activity configuration...!
import "react-activity/dist/library.css";

// Note: Global css file...!
import "./globals.css";

import AppLayOut from "@/app/page";
import ScreenLoader from "@/components/screen-loader/screen-loader";

const RootLayout = ({ children }) => {

  // Note: Handeling states here...!
  const [loading, setLoading] = useState(false);

  // Note: For fetching path names / routes
  const pathname = usePathname();
  // console.log("Current path: ", pathname);

  // Note: This hook will when pathname will change...!
  useEffect(() => {
    setLoading(true);

    // Simulate a delay of 1-2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);

    // Cleanup the timer on component unmount or when pathname changes
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {loading && <ScreenLoader />}
              <AppLayOut>
                {children}
              </AppLayOut>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;