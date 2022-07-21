import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  // CardMedia,
  CardActions,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";

const CustomisedLinkStory = styled(Link)`
  color: #f2762e;
  text-decoration: none;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: 500;
  :hover {
    color: black;
    font-weight: 700;
    font-size: 1rem;
  }
`;

const ThoughtList = ({ thoughts, showUsername = true }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <Grid
      container
      spacing={3}
      display="flex"
      flexGrow={1}
      flexDirection="row"
      justify="space-between"
      justifyContent="center"
      sx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      {/* {showTitle && <h3>{title}</h3>} */}
      {thoughts &&
        thoughts.map((thought) => (
          <Grid>
            {/* Card */}
            <Card
              sx={{
                maxWidth: 300,
                minHeight: 350,
                maxHeight: 350,
                margin: 3,
                overflowY: "visible",
              }}
            >
              <div key={thought._id}>
                {/* <CardMedia/> TODO */}
                {/* Card Content */}
                <CardContent>
                  <Typography
                    variant="h4Roboto"
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                  >
                    {thought.thoughtTitle}
                  </Typography>
                  <Typography
                    variant="h5Roboto"
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    {showUsername ? (
                      <CustomisedLinkStory
                        className=""
                        to={`/profiles/${thought.thoughtAuthor}`}
                      >
                        {thought.thoughtAuthor} wrote this story on{" "}
                        {thought.createdAt}
                      </CustomisedLinkStory>
                    ) : (
                      <>
                        <Typography
                          variant="h5Roboto"
                          sx={{
                            display: "flex",
                            textAlign: "center",
                            justifyContent: "center",
                            marginBottom: 2,
                          }}
                        >
                          <CustomisedLinkStory
                            className=""
                            to={`/profiles/${thought.thoughtAuthor}`}
                          >
                            <span style={{ fontSize: "1rem" }}>
                              You wrote this story on {thought.createdAt}
                            </span>
                          </CustomisedLinkStory>
                        </Typography>
                      </>
                    )}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {thought.thoughtText}
                  </Typography>
                </CardContent>
                {/* Card actions */}
                <CardActions
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  <CustomisedLinkStory
                    className="btn"
                    to={`/thoughts/${thought._id}`}
                  >
                    Read the whole story
                  </CustomisedLinkStory>
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
