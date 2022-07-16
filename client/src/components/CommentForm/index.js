import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Typography, Button, TextField } from "@mui/material";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <Typography variant="h4">
        What are your thoughts on this thought?
      </Typography>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form className="" onSubmit={handleFormSubmit}>
            <div className="">
              <TextField
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                variant="outlined"
                className="form-input"
                type={"text"}
                multiline
                onChange={handleChange}
                sx={{margin:3}}
              ></TextField>
            </div>
            <div className="">
              <Button variant="contained" sx={{ margin: 3 }} type="submit">
                Add Comment
              </Button>
            </div>
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

export default CommentForm;
