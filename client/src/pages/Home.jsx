import React, {useState} from "react";
import { useQuery } from "@apollo/client";

// import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Grid, Typography } from "@mui/material";

import StoryList from "../components/StoryList";

import { QUERY_STORIES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

  //set up for pagination
  //to hold the data
  const [pageData, setData] = useState([])
  const [pageDataLoading, setLoading] = useState(true)

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
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          You&#8217;re invited to join the Voices community. By being willing to share your experiences with others and being open to exploring new places and people, you are contributing to a world where we can learn from each other and move forward as a community.
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
          <Typography variant="h2" sx={{ marginTop: "2rem" }}>
            Recent stories ...
          </Typography>
        </Grid>
        <Grid item xs={1} />
        {/*Recent Stories list */}
        <Grid item xs={12}>
        {loading ? <div>Loading...</div> : <StoryList stories={stories.slice(0, 6)} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
