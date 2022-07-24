import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Grid, Link, Typography } from "@mui/material";

import { QUERY_SINGLE_STORY } from "../utils/queries";

const SingleStory = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { storyId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
    // pass URL parameter
    variables: { storyId: storyId },
  });

  const story = data?.story || {};

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
        <Typography variant="h2">{story.storyTitle}</Typography>
      </Grid>
      <Grid xs={1} />
      {/* story intro */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            marginBottom: "2rem",
            backgroundColor: "#eeedeb",
          }}
        >
          {story.storyIntro}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
      {/* story */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            backgroundColor: "#eeedeb",
            padding: "1rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {story.myStory}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
      {/* story author and publish date */}
      <Grid xs={1} md={3} />
      <Grid xs={10} md={6}>
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          {story.storyAuthor} wrote this story on {story.createdAt}
        </Typography>
      </Grid>
      <Grid xs={1} md={3} />
    </Grid>
  );
};

export default SingleStory;
