import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Grid, Typography } from "@mui/material";

import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid
      container
      sx={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {/* story heading */}
      <Grid xs={1} />
      <Grid xs={10}>
        <Typography variant="h2">{thought.storyTitle}</Typography>
      </Grid>
      <Grid xs={1} />
      {/* story intro */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography
          variant="subtitle1"
          sx={{ marginBottom: "2rem", backgroundColor: "#eeedeb" }}
        >
          {thought.storyIntro}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
      {/* story */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          {thought.myStory}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
      {/* story author and publish date */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          {thought.thoughtAuthor} wrote this story on {thought.createdAt}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
    </Grid>
  );
};

export default SingleThought;
