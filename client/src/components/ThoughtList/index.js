import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

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
    <Grid container spacing={3}
    display="flex"
    flexGrow={1}
    flexDirection="row"
    justify="space-between"
    justifyContent="center"
    sx={{marginLeft: "auto", marginRight: "auto"}}
    >
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <Grid>
            {/* Card */}
            <Card sx={{ maxWidth: 300, minHeight: 300, margin: 3}}>
              <div key={thought._id}>
                {/* Card Content */}
                <CardContent>
                  <Typography variant="h4">
                    {showUsername ? (
                      <Link
                        className=""
                        to={`/profiles/${thought.thoughtAuthor}`}
                      >
                        {thought.thoughtAuthor} <br />
                        <Typography variant="caption">
                            wrote this story on {thought.createdAt}
                        </Typography>
                      </Link>
                    ) : (
                      <>
                        <Typography variant="caption">
                          <span style={{ fontSize: "1rem" }}>
                            You wrote this story on {thought.createdAt}
                          </span>
                        </Typography>
                      </>
                    )}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {thought.thoughtText}
                  </Typography>
                </CardContent>
                {/* Card actions */}
                <CardActions sx={{ marginLeft: 1 }}>
                  <Link className="btn" to={`/thoughts/${thought._id}`}>
                    Read the whole story
                  </Link>
                </CardActions>
              </div>
            </Card>
            {/* end of card */}
          </Grid>
        ))}
    </Grid>
  );
};

export default ThoughtList;
