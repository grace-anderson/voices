import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { Button, Grid, styled, Typography } from "@mui/material";

import { QUERY_SINGLE_STORY } from "../utils/queries";
import { QUERY_ME } from "../utils/queries";

import { REMOVE_STORY } from "../utils/mutations";
// import { UpdateStoryForm } from "../components/UpdateStoryForm";

import Auth from "../utils/auth";

const CustomisedSubmitButton = styled(Button)`
  font-size: 1rem;
  color: white;
  font-weight: 500;
  background: #103e3f;
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  :hover {
    color: white;
    font-weight: 700;
    background: #dd4614;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

const SingleStory = () => {
  //STORY
  // Use `useParams()` to retrieve value of the route parameter `:storyId`
  const { storyId } = useParams();
  // load the story data / load user data here?
  const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
    // pass URL parameter
    variables: { storyId: storyId },
  });
  let navigate = useNavigate();
  const [removeStory, { error }] = useMutation(REMOVE_STORY);

  const story = data?.story || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  // IDENTIFY USER
  //1. identify if story author === logged in user
  //IDENTIFY IF
  //a.user is logged in AND
  //b.user is story author
  //2. => if so, show EDIT STORY and DELETE STORY buttons

  console.log(
    "Is author logged in?",
    Auth.loggedIn() && Auth.getProfile()?.data?.username === story.storyAuthor
  );

  const username = Auth.loggedIn() ? Auth.getProfile()?.data?.username : null;

  const isAuthor = username === story.storyAuthor;

  // DELETE STORY
  // 3. handle delete
  // const stories = data?.stories || [];

  const handleDelete = async (storyId) => {
    try {
      await removeStory({
        variables: { storyId },
        refetchQueries: [{ query: QUERY_ME }],
      });
      // navigate("/profile/:" + username);
      navigate("/me");
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT STORY
  //handleEdit
  const handleUpdate = async (storyId) => {
    try {
      navigate(`/stories/${storyId}/update`);
    } catch (err) {
      console.error(err);
    }
  };

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
        <Typography
          variant="h6"
          sx={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          {story.storyAuthor} wrote this story on {story.createdAt}
        </Typography>
      </Grid>
      <Grid item xs={1} md={3} />
      {isAuthor && (
        <Grid item xs={12}>
          <CustomisedSubmitButton
            // TODO: add handleUdate
            //handleEdit links to EditStoryForm
            onClick={() => handleUpdate(story._id)}
            variant="contained"
            sx={{ margin: 3 }}
            type="submit"
          >
            EDIT STORY
          </CustomisedSubmitButton>
          <CustomisedSubmitButton
            onClick={() => handleDelete(story._id)}
            variant="contained"
            sx={{ margin: 3 }}
            type="submit"
          >
            DELETE STORY
          </CustomisedSubmitButton>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleStory;
