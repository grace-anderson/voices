import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="">
        <div className="">
          {location.pathname !== "/" && (
            <Button variant="text" sx={{margin:3}} onClick={() => navigate(-1)}>
              &larr; Go Back
            </Button>
          )}
                <Typography variant="h4">
            Copyright 2022 {" "}
            <span
              className="emoji"
              role="img"
              aria-label="heart"
              aria-hidden="false"
            >
              ❤️
            </span>{" "}
            Helen Anderson
          </Typography>
        </div>
    </footer>
  );
};

export default Footer;
