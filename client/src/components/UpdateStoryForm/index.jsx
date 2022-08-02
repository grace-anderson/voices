import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import StoryForm from "../StoryForm";

import { Grid } from "@mui/material";

import { UPDATE_STORY } from "../../utils/mutations";
import { QUERY_SINGLE_STORY } from "../../utils/queries";

const UpdateStoryForm = () => {
  const { storyId } = useParams();
  console.log(storyId, "storyId");

  const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
    // pass URL parameter
    variables: { storyId: storyId },
  });

  let navigate = useNavigate();

  const [updateStory, { error }] = useMutation(UPDATE_STORY);

  if (loading) return <div>Fetching story</div>;
  if (error) return <div>Error fetching story</div>;

  const handleStoryFormSubmit = async (formValues) => {
    try {
      await updateStory({
        variables: { storyId, ...formValues },
        refetchQueries: [{ query: QUERY_SINGLE_STORY }],
      });
      navigate(`/stories/${storyId}`);
    } catch (err) {
      console.error(err);
    }
  };

  // RETURN FORM to update story
  return (
    <>
      <Grid
        container
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // textAlign: "center",
          // justifyContent: "center",
          marginTop: 10,
          marginBottom: 2
        }}
      >

        {/* form heading row */}
        {/* <Typography variant="h3">Edit your story...</Typography> */}

        <StoryForm
          onSubmit={handleStoryFormSubmit}
          error={error}
          initialStoryTitle={data.story.storyTitle}
          initialStoryIntro={data.story.storyIntro}
          initialMyStory={data.story.myStory}
        />
      </Grid>
    </>
  );
};

export default UpdateStoryForm;
