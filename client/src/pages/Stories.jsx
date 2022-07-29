import React from "react";
import { useQuery } from "@apollo/client";

import { Grid, Typography } from "@mui/material";

import StoryList from "../components/StoryList";

import { QUERY_STORIES } from "../utils/queries";

const Stories = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

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
            marginTop: 4,
          }}
        >
          <Typography variant="h1" sx={{marginBottom: "2rem"}}>All our stories</Typography>
        </Grid>
        <Grid item xs={1} />
        {/* All stories list */}
        <Grid item xs={12}>
          {loading ? <div>Loading...</div> : <StoryList stories={stories} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Stories;
