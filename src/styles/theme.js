// Note: Material UI theme.js...!

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        customColors: {
            _1976d2: "#1976d2",
            white: "white",
            black: "black",
            red: '#ff0000',
            yellow: '#ffff00',
            _fff: "#fff",
            _ffffff30: "#ffffff30",
            _09CD87: "#09CD87"
        },
    },

    typography: {
        fontFamily: 'sans-serif',
        h1: {
            textTransform: 'uppercase', // Custom styles for h1
        },
        h2: {
            textTransform: 'uppercase', // Custom styles for h2
        },
        // You can extend this to other variants like h3, body1, etc.
        button: {
            textTransform: 'uppercase', // Custom style for buttons
        },
    },
});

export default theme;