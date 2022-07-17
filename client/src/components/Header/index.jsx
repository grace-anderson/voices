import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Auth from "../../utils/auth";
import DrawerComp from "./DrawerComp";

const Header = ({ links }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isMatch);

  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      const theme = useTheme(); console.log(theme);
      <AppBar
        sx={{
          backgroundColor: "#8c7876",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp links={links} />
              <Grid sx={{ placeItems: "center" }} container>
                <Grid item xs="1" />
                <Grid item xs="2">
                  <Typography variant="subtitle2">Voices</Typography>
                </Grid>
                <Grid item xs="3" />
                <Grid item xs="4">
                  <Box display="flex">
                    {Auth.loggedIn() ? (
                      <>
                        <Link className="" to="/me">
                          {Auth.getProfile().data.username}'s profile
                        </Link>
                        <Button
                          variant="contained"
                          background="#ec732b"
                          sx={{
                            marginLeft: "auto",
                            background: "rgba(191,185,174,0.9556197478991597)",
                          }}
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          sx={{
                            marginLeft: "auto",
                            background: "rgba(191,185,174,0.9556197478991597)",
                          }}
                          variant="contained"
                        >
                          <Link className="" to="/login">
                            Login
                          </Link>
                        </Button>
                        <Button
                          sx={{
                            marginLeft: 1,
                            background: "rgba(191,185,174,0.9556197478991597)",
                          }}
                          variant="contained"
                        >
                          <Link className="btn" to="/signup">
                            Signup
                          </Link>
                        </Button>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container>
              <Grid item xs="2">
                <Typography variant="subtitle2">Voices</Typography>
              </Grid>
              <Grid item xs="6">
                <Tabs
                  indicatorColor="secondary"
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  {links.map((link, index) => (
                    <Tab key={index} label={link} />
                  ))}
                </Tabs>
              </Grid>
              <Grid item xs="1" />
              <Grid item xs="3">
                <Box display="flex">
                  {Auth.loggedIn() ? (
                    <>
                      <Link className="" to="/me">
                        {Auth.getProfile().data.username}'s profile
                      </Link>
                      <Button
                        variant="contained"
                        sx={{
                          marginLeft: "auto",
                          background: "rgba(191,185,174,0.9556197478991597)",
                        }}
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{
                          marginLeft: "auto",
                          background: "rgba(191,185,174,0.9556197478991597)",
                        }}
                        variant="contained"
                      >
                        <Link className="" to="/login">
                          Login
                        </Link>
                      </Button>
                      <Button
                        sx={{
                          marginLeft: 1,
                          background: "rgba(191,185,174,0.9556197478991597)",
                        }}
                        variant="contained"
                      >
                        <Link className="btn" to="/signup">
                          Signup
                        </Link>
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Link className="" to="/">
          <Typography variant="h1">Welcome to Voices</Typography>
        </Link>
        <Typography variant="subtitle1">Tell your story.</Typography>
      </div>
    </React.Fragment>
  );
};

export default Header;
