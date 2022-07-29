import React from "react";
import { Link, Navigate } from "react-router-dom";

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
  background: #103e3f;
  :hover {
    color: white;
    background: #dd4614;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
const CustomisedLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const CustomisedLinkHome = styled(Link)`
  color: #103e3f;
  text-decoration: none;
  :hover {
    color: #dd4614;
  }
`;
const CustomisedTab = styled(Tab)`
  color: #103e3f;
  font-size: 1rem;
`;
const CustomisedTabLink = styled(Link)`
  text-decoration: none;
`;
const CustomisedToProfileButton = styled(Link)`
  font-size: 1rem;
  color: white;
  font-weight: 400;
  background: #103e3f;
  margin-right: 0.8rem;
  padding: 0.6rem 0.5rem 0.5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  border-radius: 4px;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  :hover {
    color: white;
    background: #dd4614;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    //go to home page
    
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
          backgroundColor: "#eeedeb",
          paddingTop: "0.8rem",
          paddingBottom: "0.8rem",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <DrawerComp />
              <Grid sx={{ placeItems: "center" }} container>
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <CustomisedLinkHome className="" to="/">
                    <Typography variant="subtitle2">Voices</Typography>
                  </CustomisedLinkHome>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={4}>
                  <Box display="flex">
                    {Auth.loggedIn() ? (
                      <>
                        <CustomisedToProfileButton className="" to="/me">
                          {Auth.getProfile().data.username}'s profile
                        </CustomisedToProfileButton>
                        <CustomisedButton
                          variant="contained"
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
                          <CustomisedLink className="btn" to="/join">
                            Join Voices
                          </CustomisedLink>
                        </CustomisedButton>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container sx={{ placeItems: "center" }}>
              <Grid item xs={1}>
                <CustomisedLinkHome className="" to="/">
                  <Typography variant="subtitle2" sx={{ textAlign: "left" }}>
                    Voices
                  </Typography>
                </CustomisedLinkHome>
              </Grid>
              <Grid item xs={8}>
                <Tabs
                  indicatorColor="false"
                  fontSize="1.2rem"
                  value={value}
                  sx={{
                    textAlign: "left",
                  }}
                  onChange={(e, val) => setValue(val)}
                >
                  {/* {links.map((link, index) => (
                    <CustomisedTab key={index} label={link}  />
                  ))} */}
                  <CustomisedTabLink to={"/"}>
                    <CustomisedTab label="HOME" />
                  </CustomisedTabLink>
                  <CustomisedTabLink to={"/stories"}>
                    <CustomisedTab label="ALL OUR STORIES" />
                  </CustomisedTabLink>
                  <CustomisedTabLink to={"/about"}>
                    <CustomisedTab label="ABOUT US" />
                  </CustomisedTabLink>
                </Tabs>
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "end",
                  }}
                >
                  {Auth.loggedIn() ? (
                    <>
                      {/* update customised link to button */}
                      <CustomisedToProfileButton className="" to="/me">
                        {Auth.getProfile().data.username}'s profile
                      </CustomisedToProfileButton>
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
                        <CustomisedLink className="btn" to="/join">
                          Join Voices
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
