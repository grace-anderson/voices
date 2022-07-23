import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  styled,
  Typography,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material";

import { ADD_STORY } from "../../utils/mutations";
import { QUERY_STORIES, QUERY_ME } from "../../utils/queries";

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

const StoryForm = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyIntro, setStoryIntro] = useState("");
  const [myStory, setMyStory] = useState("");

  const [titleCharacterCount, setTitleCharacterCount] = useState(0);
  const [introCharacterCount, setIntroCharacterCount] = useState(0);

  // Publishing checkbox - not complete
  // const [publish, setPublish] = useState(false);

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

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, stories: [...me.stories, addStory] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addStory({
        variables: {
          storyTitle,
          storyIntro,
          myStory,
          storyAuthor: Auth.getProfile().data.username,
          // publish,
        },
      });

      setStoryTitle("");
      setStoryIntro("");
      setMyStory("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "storyTitle" && value.length <= 140) {
      setStoryTitle(value);
      setTitleCharacterCount(value.length);
    }

    if (name === "storyIntro" && value.length <= 280) {
      setStoryIntro(value);
      setIntroCharacterCount(value.length);
    }

    if (name === "myStory") {
      setMyStory(value);
    }

    // if (setPublish(true)) {
    //   console.log("publish is true");
    //   setPublish(false);
    // }
  };

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
        <Typography variant="h5">
          Take some time to write your story...
        </Typography>

        {Auth.loggedIn() ? (
          <>
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
                <Typography variant="subtitle1" color="secondary"
                  title={`m-0 ${
                    titleCharacterCount === 140 || error ? "text-danger" : ""
                  }`}
                >
                  Title character count: {titleCharacterCount}/140
                </Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} />
              <Grid item xs={10} md={4}>
                <Typography variant="subtitle1" color="secondary"
                  intro={`m-0 ${
                    introCharacterCount === 280 || error ? "text-danger" : ""
                  }`}
                >
                  Introduction character count: {introCharacterCount}/280
                </Typography>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleFormSubmit}
            >
              <div>
                <TextField
                  name="storyTitle"
                  placeholder="My story title (140 characters max)"
                  value={storyTitle}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  multiline
                  minRows={2}
                  onChange={handleChange}
                  sx={{ margin: 3 }}
                  style={{ height: "2rem", width: "70%" }}
                  noValidate={false}
                  required
                />
              </div>
              <div>
                <TextField
                  name="storyIntro"
                  placeholder="Introducing my story (280 characters max)"
                  value={storyIntro}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  multiline
                  minRows={2}
                  onChange={handleChange}
                  sx={{ margin: 3 }}
                  style={{ paddingTop: "1rem", height: "4rem", width: "70%" }}
                  required
                />
              </div>
              <div>
                <TextareaAutosize
                  name="myStory"
                  placeholder="My story"
                  value={myStory}
                  variant="outlined"
                  className="form-input"
                  type={"text"}
                  fontFamily="'Roboto', sans-serif"
                  multiline
                  onChange={handleChange}
                  sx={{ margin: 3 }}
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    height: "6rem",
                    width: "68%",
                    fontFamily: "Roboto', sans-serif",
                    fontSize: "1rem",
                  }}
                  required
                />
              </div>
              {/* adding a test checkbox */}
              {/* <FormGroup>
                <FormControlLabel
                  // control={<Checkbox defaultChecked />}
                  control={
                    <Checkbox
                      onChange={() =>
                        setPublish((prev) => ({
                          ...prev,
                          publish: !publish.publish,
                        }))
                      }
                    />
                  }
                  label="Publish this story"
                />
              </FormGroup> */}

              <Grid>
                <CustomisedSubmitButton
                  variant="contained"
                  sx={{ margin: 3 }}
                  type="submit"
                >
                  Add Story
                </CustomisedSubmitButton>
              </Grid>
              {error && <div className="">{error.message}</div>}
            </form>
          </>
        ) : (
          <Typography variant="body1">
            You need to be logged in to share your stories. Please{" "}
            <Link to="/login">login</Link> or{" "}
            <Link to="/join">join Voices.</Link>
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default StoryForm;
