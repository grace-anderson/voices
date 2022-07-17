import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  Typography,
  Button,
  TextField,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
} from "@mui/material";

import { ADD_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = () => {
  const [thoughtTitle, setThoughtTitle] = useState("");

  const [thoughtText, setThoughtText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  // Publishing checkbox - not complete
  // const [publish, setPublish] = useState(false);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtTitle,
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
          // publish,
        },
      });

      setThoughtTitle("");
      setThoughtText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }

    if (name === "thoughtTitle" && value.length <= 140) {
      setThoughtTitle(value);
    }

    // if (setPublish(true)) {
    //   console.log("publish is true");
    //   setPublish(false);
    // }
  };

  return (
    <div>
      <Typography variant="h3">Write your story...</Typography>
      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleFormSubmit}
          >
            <div>
              <TextField
                name="thoughtTitle"
                placeholder="My story title"
                value={thoughtTitle}
                variant="outlined"
                className="form-input"
                type={"text"}
                multiline
                onChange={handleChange}
                sx={{ margin: 3 }}
              ></TextField>
            </div>
            <div>
              <TextField
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                variant="outlined"
                className="form-input"
                type={"text"}
                multiline
                onChange={handleChange}
                sx={{ margin: 3 }}
              ></TextField>
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
            </div>

            <div className="">
              <Button variant="contained" sx={{ margin: 3 }} type="submit">
                Add Thought
              </Button>
            </div>
            {error && <div className="">{error.message}</div>}
          </form>
        </>
      ) : (
        <Typography variant="body1">
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </Typography>
      )}
    </div>
  );
};

export default ThoughtForm;
