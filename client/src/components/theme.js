import { createTheme } from "@mui/material";

export const theme = createTheme ({
  palette: {
    type: 'light',
    primary: {
      main: '#103E3F',
    },
    secondary: {
      main: '#DD4614',
    },
    background: {
      paper: '#eeedeb',
      default: '#fcfbfb',
    },
    divider: '#A61A14',
    text: {
      primary: '#181517',
      secondary: '#2f2c2e',
      disabled: '#464445',
      hint: '#5d5b5d',
    },
    error: {
      main: '#A61A14',
    },
  },
  typography: {
    h1: {
      fontFamily: 'IBM Plex Mono',
      fontSize: '4rem',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'IBM Plex Mono',
      fontSize: '3rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2.6rem',
      fontWeight: 500,
      fontFamily: 'IBM Plex Mono',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: 'IBM Plex Mono',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.8rem',
      fontFamily: 'IBM Plex Mono',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.4rem',
      fontFamily: 'IBM Plex Mono',
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 800,
      fontFamily: 'IBM Plex Mono',
    },
    caption: {
      fontWeight: 700,
      fontFamily: 'IBM Plex Mono',
    },
    overline: {
      fontWeight: 600,
      fontFamily: 'IBM Plex Mono',
    },
    body2: {
      fontFamily: 'Cardo',
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.52,
    },
    body1: {
      fontFamily: 'Cardo',
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    fontFamily: 'IBM Plex Mono',
  },
});