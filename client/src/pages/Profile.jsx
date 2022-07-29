import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import StoryForm from "../components/StoryForm";
import StoryList from "../components/StoryList";
import ProfileForm from "../components/ProfileForm";

import { Grid, Typography } from "@mui/material";

import { ADD_STORY } from "../utils/mutations";
import { QUERY_USER, QUERY_ME, QUERY_STORIES } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  // identify username and load user data
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // for adding a story from the profile page
  const [addStory, { error }] = useMutation(ADD_STORY, {
    update(cache, { data: { addStory } }) {
      try {
        const { stories } = cache.readQuery({ query: QUERY_STORIES });

        cache.writeQuery({
          query: QUERY_STORIES,
          data: { stories: [addStory, ...stories] },
        });
      } catch (e) {
        console.error(e);
      }

      // update (user's) me object's cache with stories
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, stories: [...me.stories, addStory] } },
      });
    },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is auth user
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        log in or join Voices!
      </h4>
    );
  }

  //handle form submit for adding story
  const handleStoryFormSubmit = async (formValues) => {
    try {
      const { data } = await addStory({
        variables: formValues,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container>
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
          marginBottom: 2,
        }}
      >
        <Typography variant="h1">{user.username}</Typography>
      </Grid>
      <Grid item xs={1} />
      {/* Profile form */}
      <Grid item xs={2} />
      <Grid item xs={8}>
        {/* display profile form to the logged in user with identified username */}
        {!userParam && <ProfileForm />}
      </Grid>
      <Grid item xs={2} />
      {/* Display saved profile */}
      {/* Profile heading */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {userParam ? `${user.username}'s` : "Your"} Profile
        </Typography>
      </Grid>
      <Grid item xs={1} />
      {/* Profile Text */}
      <Grid item xs={1} md={4} />
      <Grid item xs={10} md={4} sx={{ marginBottom: 8 }}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            backgroundColor: "#eeedeb",
            padding: "1rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {user.myProfile ? `${user.myProfile}` : "No profile added yet..."}
          {/* {user.myProfile} */}
        </Typography>
      </Grid>
      <Grid item xs={1} md={4} />
      {/* Story form row */}
      <Grid item xs={2} />
      <Grid item xs={8}>
        {!userParam && (
          <StoryForm onSubmit={handleStoryFormSubmit} error={error} />
        )}
      </Grid>
      <Grid item xs={2} />
      {/* your stories heading */}
      <Grid item xs={1} />
      <Grid
        item
        xs={10}
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">
          {userParam ? `${user.username}'s` : "Your"} stories
        </Typography>
      </Grid>
      <Grid item xs={1} />
      {/* Display the logged in user's stories (where user === username)  */}
      <Grid item xs={12}>
        <StoryList
          stories={user.stories}
          title={`${user.username}'s stories...`}
          showTitle={false}
          showUsername={false}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
