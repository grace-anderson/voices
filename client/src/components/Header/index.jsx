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
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

import Auth from "../../utils/auth";

const Header = ({ links }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [value, setValue] = React.useState(0);

  return (
    <header>
      <AppBar
        sx={{
          backgroundImage:
            "linear-gradient(90deg, rgba(191,185,174,0.9556197478991597) 0%, rgba(140,130,125,1) 48%, rgba(115,107,101,1) 100%)",
        }}
      >
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <PublicIcon />
              </Typography>
            </Grid>
            <Grid item xs={6}>
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
        </Toolbar>
      </AppBar>
      <div>
        <Link className="" to="/">
          <Typography variant="h1" sx={{ color: "red" }}>
            Voices
          </Typography>
        </Link>
        <Typography variant="subtitle1">Tell your story.</Typography>
      </div>
      {/* <div>
        {Auth.loggedIn() ? (
          <>
            <Link className="" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>
            <Button variant="contained" sx={{ margin: 3 }} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link className="" to="/login">
              Login
            </Link>
            <Link className="btn" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div> */}
    </header>
  );
};

export default Header;
