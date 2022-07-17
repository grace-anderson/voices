import React from "react";
import { useQuery } from "@apollo/client";

// import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Grid, Typography } from "@mui/material";

import ThoughtList from "../components/ThoughtList";

import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  // const theme = useTheme();
  // const isMatch = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    // <main>
    // {isMatch ? (  ) : (   )}
    <Grid container sx={{ placeItems: "center" }}>
      {/* heading row */}
      <Grid xs={1} />
      <Grid xs={10}>
          <Typography variant="h1">Welcome to Voices</Typography>
      </Grid>
      <Grid xs={1} />
      {/* paragraph row */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="subtitle1">
          Tell your story with Voices. Introduction paragraph ... Lemon drops cookie
          marzipan candy cupcake. Dragée chocolate bar cotton candy bonbon
          bonbon. Cupcake jelly-o chocolate cake soufflé jelly shortbread
          chocolate cake marshmallow.
        </Typography>
      </Grid>
      <Grid item xs={1} />
      {/* recent stories heading */}
      <Grid xs={1} />
      <Grid xs={10}>
          <Typography variant="h2">Recent stories ...</Typography>
      </Grid>
      <Grid xs={1} />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} />
        )}
      </div>
    </Grid>
    // </main>
  );
};

export default Home;
