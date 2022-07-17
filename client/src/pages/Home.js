import React from "react";
import { useQuery } from "@apollo/client";

import { Grid, Typography } from "@mui/material";

import ThoughtList from "../components/ThoughtList";

import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    // <main>
    <Grid sx={{ placeItems: "center" }} container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="h1">Welcome to Voices</Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="subtitle1">Tell your story.</Typography>
      </Grid>
      <Grid item xs={1} />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Recent stories..." />
        )}
      </div>
    </Grid>
    // </main>
  );
};

export default Home;
