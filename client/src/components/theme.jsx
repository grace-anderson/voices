import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {default: "#F2ECE8", paper: "#BFA08E"},
    primary: {
      main: "#8C7876",
    },
    secondary: {
        main: "#ec732b",
    }
  },
  typography: {
    h1: {
        fontFamily: '"Satisfy", cursive',
        fontSize: "3rem",
        marginTop: "5rem",
        color: "#ec732b",
        fontWeight: 400,
    },
    subtitle2: {
        fontFamily: '"Satisfy", cursive',
        fontSize: "2rem",
        color: "#white",
    }
  },
});
