import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";

import { Grid, Typography } from "@mui/material";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
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
        sign up or log in!
      </h4>
    );
  }

  return (
    <Grid>
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
        <Typography variant="h1">{user.username}'s Profile</Typography>
      </Grid>
      <Grid item xs={1} />
      {/* form row */}
      <Grid xs={2} />
      <Grid xs={8}
      >{!userParam && <ThoughtForm />}</Grid>
      <Grid item xs={2} />
      {/* your profile heading */}
      <Grid xs={1} />
      <Grid
        xs={10}
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h2>Viewing {userParam ? `${user.username}'s` : "your"} profile.</h2>
      </Grid>
      <Grid item xs={1} />
      {/* your stories heading */}
      <Grid xs={1} />
      <Grid
        item
        xs={10}
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2">Your stories</Typography>
      </Grid>
      <Grid item xs={1} />
      {/* thoughts displayed */}
      <Grid item xs={12}>
        <ThoughtList
          thoughts={user.thoughts}
          title={`${user.username}'s thoughts...`}
          showTitle={false}
          showUsername={false}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
