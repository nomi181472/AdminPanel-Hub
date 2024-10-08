// Note: Main layout file...!

'use client';

// Note: Redux Integration...!
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store/store';

// Note: Material Ui Integration...!
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';

// Note: React activity configuration...!
import "react-activity/dist/library.css"; 

// Note: Global css file...!
import "./globals.css";

import AppLayOut from "@/app/page";

// Note: It  will not work in client side components...!
// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
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