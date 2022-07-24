import React from "react";
import { useQuery } from "@apollo/client";

// import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Grid, Typography } from "@mui/material";

import StoryList from "../components/StoryList";

import { QUERY_STORIES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

  // const theme = useTheme();
  // const isMatch = useMediaQuery(theme.breakpoints.down("xs"));

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
          <Typography variant="h1">Welcome to Voices</Typography>
        </Grid>
        <Grid item xs={1} />
        {/* paragraph row */}
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Typography variant="subtitle1" sx={{fontWeight: 500}}>
            Tell your story with Voices. Introduction paragraph ... Lemon drops
            cookie marzipan candy cupcake. Dragée chocolate bar cotton candy
            bonbon bonbon. Cupcake jelly-o chocolate cake soufflé jelly
            shortbread chocolate cake marshmallow.
          </Typography>
        </Grid>
        <Grid item xs={1} md={2} />
        {/* recent stories heading */}
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
          <Typography variant="h2">Recent stories ...</Typography>
        </Grid>
        <Grid item xs={1} />
        {/* Stories list */}
        <Grid item xs={12}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <StoryList stories={stories} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
