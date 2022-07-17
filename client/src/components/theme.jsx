import { createTheme } from "@mui/material";

export const theme = createTheme({  
  palette: {
    background: {default: "#F2ECE8", paper: "rgba(242, 213, 160, 0.5)"},
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
    h2: {
      fontFamily: '"Satisfy", cursive',
      fontSize: "3rem",
      marginTop: "2rem",
      marginBottom: "2rem",
      color: "#F2762E",
      fontWeight: 400,
  },
  h4: {
    fontFamily: '"Satisfy", cursive',
    fontSize: "1.8rem",
    color: "#F2762E",
},
  h5: {
    fontFamily: '"Satisfy", cursive',
    fontSize: "1.4rem",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "black",
},
    subtitle2: {
        fontFamily: '"Satisfy", cursive',
        fontSize: "2.4rem",
        color: "#white",
    }
  }
});
