import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  Button,
  Grid,
  TextareaAutosize,
  styled,
  Typography,
} from "@mui/material";

// add mutations here
import { UPDATE_STORY } from "../../utils/mutations";
// add queries here
import { QUERY_SINGLE_STORY } from "../../utils/queries";

import Auth from "../../utils/auth";

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

const UpdateStoryForm = ({ match }) => {
  //add updateStory function here
  const [storyTitle, setStoryTitle] = useState("");
  const [storyIntro, setStoryIntro] = useState("");
  const [myStory, setMyStory] = useState("");

  const [titleCharacterCount, setTitleCharacterCount] = useState(0);
  const [introCharacterCount, setIntroCharacterCount] = useState(0);

  const { loading, error, data } = useQuery(QUERY_SINGLE_STORY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateStory] = useMutation(UPDATE_STORY);

  if (loading) return <div>Fetching note</div>;
  if (error) return <div>Error fetching note</div>;

  const story = data;

  //handle character count here
  const handleTextChange = (event) => {
    const { name, value } = event.target;

    if (name === "storyTitle" && value.length <= 140) {
      setTitleCharacterCount(value.length);
    }

    if (name === "storyIntro" && value.length <= 280) {
      setIntroCharacterCount(value.length);
    }
  };

  // Update story form
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

        {Auth.loggedIn() ? (
          <>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              // onSubmit={handleFormSubmit}
              onSubmit={(e) => {
                // Stop the form from submitting
                e.preventDefault();
                //pass the variables to the mutation
                updateStory({
                  variables: {
                    _id: story.getStory._id,
                    storyTitle: storyTitle
                      ? storyTitle
                      : story.getStory.storyTitle,
                    storyIntro: storyIntro
                      ? storyIntro
                      : story.getStory.storyIntro,
                    myStory: myStory ? myStory : story.getStory.myStory,
                  },
                });
                // notify.show("Note was edited successfully", "success");
              }}
            >
              <div>
                <TextareaAutosize
                  name="storyTitle"
                  placeholder="My story title (140 characters max)"
                  value={storyTitle}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  multiline="true"
                  defaultValue={story.getStory.storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  onTextChange={handleTextChange}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    height: "2rem",
                    width: "70%",
                    fontFamily: "Roboto', sans-serif",
                    fontSize: "1.2rem",
                  }}
                  noValidate={false}
                  required
                />
              </div>
              <Grid
                container
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    title={`m-0 ${
                      titleCharacterCount === 140 || error ? "text-danger" : ""
                    }`}
                  >
                    Title character count: {titleCharacterCount}/140
                  </Typography>
                </Grid>
                <Grid item xs={1} />
              </Grid>
              <div>
                <TextareaAutosize
                  name="storyIntro"
                  placeholder="Introducing my story (280 characters max)"
                  value={storyIntro}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  multiline="true"
                  defaultValue={story.getStory.storyIntro}
                  onChange={(e) => setStoryIntro(e.target.value)}
                  onTextChange={handleTextChange}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    height: "3rem",
                    width: "70%",
                    fontFamily: "Roboto', sans-serif",
                    fontSize: "1.2rem",
                  }}
                  noValidate={false}
                  required
                />
              </div>
              <Grid
                container
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <Grid item xs={1} />
                <Grid item xs={10} md={4}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    intro={`m-0 ${
                      introCharacterCount === 280 || error ? "text-danger" : ""
                    }`}
                  >
                    Introduction character count: {introCharacterCount}/280
                  </Typography>
                </Grid>
                <Grid item xs={1} />
              </Grid>
              <div>
                <TextareaAutosize
                  name="myStory"
                  placeholder="My story"
                  value={myStory}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  multiline="true"
                  defaultValue={story.getStory.myStory}
                  onChange={(e) => setMyStory(e.target.value)}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    height: "6rem",
                    width: "70%",
                    fontFamily: "Roboto', sans-serif",
                    fontSize: "1.2rem",
                    whiteSpace: "pre-wrap",
                  }}
                  noValidate={false}
                  required
                />
              </div>
              <Grid>
                <CustomisedSubmitButton
                  variant="contained"
                  sx={{ marginTop: 3 }}
                  type="submit"
                >
                  Update Story
                </CustomisedSubmitButton>
              </Grid>
              {error && <div className="">{error.message}</div>}
            </form>
          </>
        ) : (
          <Typography variant="body1">
            You need to be logged in to update your stories. Please{" "}
            <Link to="/login">login</Link> or{" "}
            <Link to="/join">join Voices.</Link>
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default UpdateStoryForm;
