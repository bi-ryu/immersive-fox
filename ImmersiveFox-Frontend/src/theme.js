import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  overrides: {
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "white"
        },
        color: "white",
      }
    }
  },
  palette: {
    primary: {
      main: '#3e5880',
    },
    secondary: {
      main: '#3e60b7',
    },
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
  },
});

export default theme;
