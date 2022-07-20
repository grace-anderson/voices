import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Grid,
  styled,
  Toolbar,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Auth from "../../utils/auth";
import DrawerComp from "./DrawerComp";

const CustomisedButton = styled(Button)`
  font-size: 1rem;
  color: white;
  background: #f2762e;
  :hover {
    color: white;
  }
`;
const CustomisedLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const CustomisedLinkHome = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: white;
  }
`;
const CustomisedTab = styled(Tab)`
  font-size: 1.2rem;
`;

const Header = ({ links }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const theme = useTheme();
  console.log(theme);

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const [value, setValue] = React.useState(0);

  return (
    <React.Fragment>
      const theme = useTheme(); console.log(theme);
      <AppBar
        sx={{
          backgroundColor: "#D9B589",
          paddingTop: "0.8rem",
          paddingBottom: "0.8rem",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp links={links} />
              <Grid sx={{ placeItems: "center" }} container>
                <Grid item xs="1" />
                <Grid item xs="2">
                  <CustomisedLinkHome className="" to="/">
                    <Typography variant="subtitle2">Voices</Typography>
                  </CustomisedLinkHome>
                </Grid>
                <Grid item xs="3" />
                <Grid item xs="4">
                  <Box display="flex">
                    {Auth.loggedIn() ? (
                      <>
                        <CustomisedLink className="" to="/me">
                          {Auth.getProfile().data.username}'s profile
                        </CustomisedLink>
                        <CustomisedButton
                          variant="contained"
                          // background=""
                          sx={{
                            marginLeft: "auto",
                          }}
                          onClick={logout}
                        >
                          Logout
                        </CustomisedButton>
                      </>
                    ) : (
                      <>
                        <CustomisedButton
                          sx={{
                            marginLeft: "auto",
                          }}
                          variant="contained"
                        >
                          <CustomisedLink className="" to="/login">
                            Login
                          </CustomisedLink>
                        </CustomisedButton>
                        <CustomisedButton
                          sx={{
                            marginLeft: 1,
                          }}
                          variant="contained"
                        >
                          <CustomisedLink className="btn" to="/signup">
                            Signup
                          </CustomisedLink>
                        </CustomisedButton>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid sx={{ placeItems: "center" }} container>
              <Grid item xs={4}>
                <CustomisedLinkHome className="" to="/">
                  <Typography variant="subtitle2">Voices</Typography>
                </CustomisedLinkHome>
              </Grid>
              <Grid item xs={6}>
                <Tabs
                  indicatorColor="secondary"
                  textColor="inherit"
                  fontSize="1.2rem"
                  value={value}
                  sx={{
                    marginLeft: "auto",
                  }}
                  onChange={(e, val) => setValue(val)}
                >
                  {links.map((link, index) => (
                    <CustomisedTab key={index} label={link} />
                  ))}
                </Tabs>
              </Grid>
              {/* <Grid item xs="1" /> */}
              <Grid item xs={2}>
                <Box display="flex">
                  {Auth.loggedIn() ? (
                    <>
                      <CustomisedLink className="" to="/me">
                        {Auth.getProfile().data.username}'s profile
                      </CustomisedLink>
                      <CustomisedButton variant="contained" onClick={logout}>
                        Logout
                      </CustomisedButton>
                    </>
                  ) : (
                    <>
                      <CustomisedButton
                        sx={{
                          marginLeft: "auto",
                        }}
                        variant="contained"
                      >
                        <CustomisedLink className="" to="/login">
                          Login
                        </CustomisedLink>
                      </CustomisedButton>
                      <CustomisedButton
                        sx={{
                          marginLeft: 1,
                        }}
                        variant="contained"
                      >
                        <CustomisedLink className="btn" to="/signup">
                          Signup
                        </CustomisedLink>
                      </CustomisedButton>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
