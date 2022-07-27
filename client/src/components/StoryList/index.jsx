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
  color: #103e3f;
  text-decoration: none;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  :hover {
    color: #dd4614;
    font-weight: 700;
    font-size: 1rem;
  }
`;

const CustomisedLinkStoryOrange = styled(Link)`
  color: #dd4614;
  text-decoration: none;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: 500;
  :hover {
    color: #103e3f;
    font-weight: 700;
    font-size: 1rem;
  }
`;

const StoryList = ({ stories, showUsername = true }) => {
  if (!stories.length) {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        <Typography variant="h5">No stories yet...</Typography>
      </Grid>
    );
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
      // sx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      {stories &&
        stories.map((story) => (
          <Grid key={story._id}>
            {/* Card */}
            <Card
              sx={{
                maxWidth: 300,
                minWidth: 300,
                minHeight: 350,
                maxHeight: 350,
                margin: 3,
                overflowY: "visible",
              }}
            >
              <div>
                {/* <CardMedia/>*/}
                {/* Card Content */}
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                  >
                    {story.storyTitle}
                  </Typography>
                  <Grid container>
                    {showUsername ? (
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
                          to={`/profiles/${story.storyAuthor}`}
                        >
                          {story.storyAuthor} wrote this story on{" "}
                          {story.createdAt}
                        </CustomisedLinkStory>
                      </Typography>
                    ) : (
                      <>{/* hide profile link when on user's profile */}</>
                    )}
                  </Grid>
                  {/* story introduction */}
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {story.storyIntro}
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
                  <CustomisedLinkStoryOrange
                    className="btn"
                    to={`/stories/${story._id}`}
                  >
                    Read the whole story
                  </CustomisedLinkStoryOrange>
                </CardActions>
              </div>
            </Card>
            {/* end of card */}
          </Grid>
        ))}
    </Grid>
  );
};

export default StoryList;
