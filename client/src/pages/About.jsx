import React from "react";

import { Grid, Typography } from "@mui/material";

const About = () => {
  return (
    <Grid container spacing={3}>
      <Grid container sx={{ placeItems: "center" }}>
        {/* heading row */}
        <Grid item xs={1} />
        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Typography variant="h1" sx={{ marginBottom: "2rem" }}>
            About us
          </Typography>
        </Grid>
        <Grid item xs={1} />
        {/* About us paragraph */}
        <Grid item xs={1} />
        <Grid item xs={12}>
          <Typography variant="body1">About us text goes here</Typography>
        </Grid>
        <Grid item xs={1} />
        {/* form heading  */}
        <Grid item xs={1} />
        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={1} />
        {/* Contact form */}
        <Grid item xs={1} />
        <Grid item xs={12}>
          <Typography variant="body1">Contact form goes here</Typography>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Grid>
  );
};

export default About;
