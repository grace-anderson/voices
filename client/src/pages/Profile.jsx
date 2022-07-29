import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { HashLink } from "react-router-hash-link";

import StoryForm from "../components/StoryForm";
import StoryList from "../components/StoryList";
import ProfileForm from "../components/ProfileForm";

import { Button, Grid, styled, Typography } from "@mui/material";

import { ADD_STORY } from "../utils/mutations";
import { QUERY_USER, QUERY_ME, QUERY_STORIES } from "../utils/queries";

import Auth from "../utils/auth";

const CustomisedProfileButton = styled(Button)`
  font-size: 1rem;
  font-weight: 500;
  background: #eeedeb;
  color: "#103e3f";
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  :hover {
    color: white;
    font-weight: 700;
    background: #103e3f;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const CustomisedProfileHashLink = styled(HashLink)`
  text-decoration: "none";
  fontweight: 500;
  :hover {
    color: white;
    font-weight: 700;
  }
`;

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

  if (loading) return <div>Fetching profile</div>;
  if (error) return <div>Error fetching profile</div>;

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
        }}
      >
        <Typography variant="h1">{user.username}</Typography>
      </Grid>
      <Grid item xs={1} />
      {/* Links to profile sections */}

      <Grid
        container
        style={{ width: "100%" }}
        sx={{
          display: "flex",
          // flexDirection: 'row',
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
          p: 1,
          m: 1,
        }}
      >
        <Grid item xs={12} md={6} lg={3}>
          <CustomisedProfileButton variant="outlined">
            <CustomisedProfileHashLink smooth to={"/me#profile-form"}>
              Update your profile
            </CustomisedProfileHashLink>
          </CustomisedProfileButton>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomisedProfileButton variant="outlined">
            <CustomisedProfileHashLink smooth to={"/me#profile"}>
              View your profile
            </CustomisedProfileHashLink>
          </CustomisedProfileButton>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomisedProfileButton variant="outlined">
            <CustomisedProfileHashLink smooth to={"/me#write-story"}>
              Write a story
            </CustomisedProfileHashLink>
          </CustomisedProfileButton>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <CustomisedProfileButton variant="outlined">
            <CustomisedProfileHashLink smooth to={"/me#stories"}>
              View your stories
            </CustomisedProfileHashLink>
          </CustomisedProfileButton>
        </Grid>
      </Grid>

      {/* Profile form */}
      <Grid item xs={2} />
      <Grid item xs={8} id="profile-form">
        {/* display profile form to the logged in user with identified username */}
        {!userParam && <ProfileForm />}
      </Grid>
      <Grid item xs={2} />
      {/* Display saved profile */}
      {/* Profile heading */}
      <Grid item xs={1} />
      <Grid item xs={10} id="profile">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {userParam ? `${user.username}'s` : "Your"} Profile
        </Typography>
      </Grid>
      <Grid item xs={1} />
      {/* User profile text */}
      <Grid item xs={1} md={4} />
      <Grid
        item
        xs={10}
        md={4}
        sx={{ marginTop: 3, marginBottom: 8 }}
        id="profile"
      >
        <Typography
          variant="body1"
          id="profile-text"
          sx={{
            textAlign: "left",
            backgroundColor: "#eeedeb",
            padding: "1rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {user.myProfile ? `${user.myProfile}` : "No profile added yet..."}
        </Typography>
      </Grid>
      <Grid item xs={1} md={4} />
      {/* Story form row */}
      <Grid item xs={2} />
      <Grid item xs={8} id="write-story" sx={{ marginTop: 1 }}>
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
        <Typography variant="h4" id="stories">
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
