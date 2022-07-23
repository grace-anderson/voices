import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      // main: "#D9B589",
      main: "#103E3F",
    },
    secondary: {
      main: "#DD4614",
    },
    background: {
          paper: '#eeedeb',
          default: '#fcfbfb',
        },
    error: {
      main: "#A61A14",
      fontWeight: "700",
    }
  },
  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#DD4614',
  //   },
  //   secondary: {
  //     main: '#103E3F',
  //   },
  //   background: {
  //     paper: '#eeedeb',
  //     default: '#fcfbfb',
  //   },
  //   divider: '#A61A14',
  //   text: {
  //     primary: '#181517',
  //     secondary: '#2f2c2e',
  //     disabled: '#464445',
  //     hint: '#5d5b5d',
  //   },
  //   error: {
  //     main: '#A61A14',
  //   },
  // },
  typography: {
    h1: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "4rem",
      marginTop: "8rem",
      marginBottom: "1rem",
      // color: "#F2762E",
      color: "#DD4614",
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "3.2rem",
      marginTop: "2rem",
      marginBottom: "2rem",
      color: "#103E3F",
      fontWeight: 400,
    },
    h4: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "2.8rem",
      color: "#DD4614",
    },
    h4Roboto: {
      fontFamily: "Roboto",
      fontSize: "1.6rem",
      marginBottom: "1rem",
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "#103E3F"
    },
    h5Roboto: {
      fontFamily: "Roboto",
      fontSize: "1rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "2.4rem",
      color: "#white",
    },
  },
  // components: {
  //   MuiButton: {}
  // }
});
