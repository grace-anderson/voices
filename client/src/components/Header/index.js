import React from "react";
import { Link } from "react-router-dom";

import { Typography, Button} from "@mui/material";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div>
        <Link className="" to="/">
          <Typography variant="h1" sx={{color: "red"}}>Tech Thoughts</Typography>
        </Link>
        <Typography variant="subtitle1">
          Get into the mind of a programmer.
        </Typography>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <Link className="" to="/me">
              {Auth.getProfile().data.username}'s profile
            </Link>
            <Button variant="contained" sx={{margin:3}} onClick={logout}>
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
      </div>
    </header>
  );
};

export default Header;
