import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#103E3F",
    },
    secondary: {
      main: "#DD4614",
    },
    background: {
      paper: "#eeedeb",
      default: "#fcfbfb",
    },
    error: {
      main: "#A61A14",
      fontWeight: "700",
    },
  },
  typography: {
    h1: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "4rem",
      marginTop: "8rem",
      marginBottom: "1rem",
      color: "#DD4614",
      fontWeight: 400,
    },
    h2: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "3.2rem",
      marginBottom: "2rem",
      color: "#103E3F",
      fontWeight: 400,
    },
    h3: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "3rem",
      color: "#103E3F",
    },
    h4: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: "1.6rem",
      marginBottom: "1rem",
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: "1.2rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "2.4rem",
      color: "#white",
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
    }
  },
});
