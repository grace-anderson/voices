import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import StoryForm from "../StoryForm";

import { Button, Grid, styled, Typography } from "@mui/material";

// add mutations here
import { UPDATE_STORY } from "../../utils/mutations";
// add queries here
import { QUERY_SINGLE_STORY } from "../../utils/queries";

// import Auth from "../../utils/auth";

const UpdateStoryForm = () => {
  const { storyId } = useParams();
  console.log(storyId, "storyId");

  const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
    // pass URL parameter
    variables: { storyId: storyId },
  });

  const story = data;
  console.log(story, "story");

  //how to get story values?
  // const [storyTitle, setStoryTitle] = useState(QUERY_SINGLE_STORY.storyTitle);
  // console.log("single story title: ", QUERY_SINGLE_STORY.storyTitle);
  // const [storyIntro, setStoryIntro] = useState(QUERY_SINGLE_STORY.storyIntro);
  // const [myStory, setMyStory] = useState(QUERY_SINGLE_STORY.myStory);

  // const [titleCharacterCount, setTitleCharacterCount] = useState(0);
  // const [introCharacterCount, setIntroCharacterCount] = useState(0);

  let navigate = useNavigate();

  const [updateStory, { error }] = useMutation(UPDATE_STORY);

  if (loading) return <div>Fetching story</div>;
  if (error) return <div>Error fetching story</div>;

  // const story =

  //handle character count here
  const handleStoryFormSubmit = async (formValues) => {
    try {
      await updateStory({
        variables: { storyId, ...formValues },
        refetchQueries: [{ query: QUERY_SINGLE_STORY }],
      });
      // navigate("/profile/:" + username);
      navigate(`/stories/${storyId}`);
    } catch (err) {
      console.error(err);
    }
    // if (name === "storyTitle" && value.length <= 140) {
    //   setTitleCharacterCount(value.length);
    // }

    // if (name === "storyIntro" && value.length <= 280) {
    //   setIntroCharacterCount(value.length);
    // }
  };

  // RETURN FORM to update story
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 1,
          marginBottom: 2,
        }}
      >
        {/* form heading row */}
        <Typography variant="h2">Edit your story...</Typography>

        <StoryForm
          onSubmit={handleStoryFormSubmit}
          error={error}
          initialStoryTitle={data.story.storyTitle}
          initialStoryInto={data.story.storyIntro}
          initialMyStory={data.story.myStory}
        />
      </Grid>
    </>
  );
};

export default UpdateStoryForm;
