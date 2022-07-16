import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card">
            <Typography variant="h4" className="card-header">
              {showUsername ? (
                <Link className="" to={`/profiles/${thought.thoughtAuthor}`}>
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You wrote this story on {thought.createdAt}
                  </span>
                </>
              )}
            </Typography>
            <div className="card-body">
              <Typography variant="body2">{thought.thoughtText}</Typography>
            </div>
            <Link className="btn" to={`/thoughts/${thought._id}`}>
              Read the story
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
