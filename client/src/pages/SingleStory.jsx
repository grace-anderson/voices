import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Grid, Typography } from "@mui/material";

import { QUERY_SINGLE_STORY } from "../utils/queries";
import { QUERY_STORIES } from "../utils/queries";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const SingleStory = () => {
  //STORY
  // Use `useParams()` to retrieve value of the route parameter `:storyId`
  const { storyId } = useParams();
  // load the story data / load user data here?
  const { loading, data } = useQuery(QUERY_SINGLE_STORY, 
    // QUERY_ME, 
    {
    // pass URL parameter
    variables: { storyId: storyId },
  });

  const story = data?.story || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // IDENTIFY USER
  //1. identify if story author is logged in user
  //IDENTIFY IF 
  //a.user is logged in AND 
  //b.user is story author 
  // let user = data?.me || {};
  // console.log(user);

  // 2. if logged in user is story author, show delete button
  // if (Auth.loggedIn() && data.username === story.author) {
  //   <p>show this text</p>
  // }

  // DELETE STORY
  // 3. handle delete
  // const handleDeleteStory = async (storyId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null; //need this if have already identified user=story.author?

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const removeStoryId = (removeStoryId) => {
  //       //get all the stories from QUERY_STORIES
  //       const allStories = getItem('stories'); //?correct
  //     }
  //       //if no stories = return false
  //       if (!allStories) {
  //         return false;
  //       }
      
  //       const updateAllStories = allStories?.filter((storyId) => removeStoryId !== storyId);

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //RETURN STORY
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
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="h2" sx={{ marginTop: "3rem" }}>
          {story.storyTitle}
        </Typography>
      </Grid>
      <Grid item xs={1} />
      {/* story intro */}
      <Grid item xs={1} md={3} />
      <Grid item xs={10} md={6}>
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
      <Grid item xs={1} md={3} />
      {/* story */}
      <Grid item xs={1} md={3} />
      <Grid item xs={10} md={6}>
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
      <Grid item xs={1} md={3} />
      {/* story author and publish date */}
      <Grid item xs={1} md={3} />
      <Grid item xs={10} md={6}>
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          {story.storyAuthor} wrote this story on {story.createdAt}
        </Typography>
      </Grid>
      <Grid item xs={1} md={3} />
    </Grid>
  );
};

export default SingleStory;
