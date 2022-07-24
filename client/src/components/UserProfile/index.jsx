import React from "react";

import { Grid, Typography } from "@mui/material";

const UserProfile = ({ user, myProfile, showUsername = true }) => {
  if (!myProfile.length) {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="h5Roboto">
          {user} has not added their profile yet...
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 1,
      }}
    >
      <Typography variant="h2">{user}'s Profile</Typography>,
      <Typography variant="body1">{myProfile}</Typography>
      console.log("myProfile-is this displaying?");
    </Grid>
  );
};

export default UserProfile;
