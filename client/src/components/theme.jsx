import { createTheme } from "@mui/material";

export const theme = createTheme({  
  palette: {
    background: {default: "#F2ECE8", paper: "#BFA08E"},
    primary: {
      main: "#D9B589",
    },
    secondary: {
        main: "#F2762E",
    }
  },
  typography: {
    h1: {
        fontFamily: '"Satisfy", cursive',
        fontSize: "4rem",
        marginTop: "8rem",
        marginBottom: "1rem",
        color: "#F2762E",
        fontWeight: 400,
    },
    subtitle2: {
        fontFamily: '"Satisfy", cursive',
        fontSize: "2.4rem",
        color: "#white",
    }
  }
});
