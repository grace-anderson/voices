import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import {
  Box,
  Button,
  Grid,
  TextareaAutosize,
  styled,
  Typography,
} from "@mui/material";

import { ADD_PROFILE } from "../../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";

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

const ProfileForm = () => {
  // identify username and load user data
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // use state of myProfile if user has entered profile, otherwise add placeholder text
  const [myProfile, setMyProfile] = useState(
    user.myProfile ? `${user.myProfile}` : "Add your profile here"
  );

  console.log(`${user.myProfile}`);

  const [addProfile, { error }] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data:
            { me: { ...me, myProfile: addProfile.myProfile } } ||
            `No profile added yet`,
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProfile({
        variables: {
          myProfile,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "myProfile") {
      setMyProfile(value);
      // console.log("myProfile", value);
    }
  };

  if (loading) return <div>Fetching profile</div>;
  if (error) return <div>Error fetching profile</div>;

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        {/* form heading row */}
        <Typography variant="h3">Update your profile</Typography>

        {Auth.loggedIn() ? (
          <>
            <form onSubmit={handleFormSubmit}>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Grid item xs={12}>
                  <TextareaAutosize
                    name="myProfile"
                    // placeholder="All about me..."
                    // myProfile={myProfile}
                    value={myProfile}
                    variant="outlined"
                    className="form-input"
                    type={"text"}
                    // fullWidth
                    onChange={handleChange}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomisedSubmitButton
                    variant="contained"
                    sx={{ margin: 3 }}
                    type="submit"
                  >
                      Update Profile
                  </CustomisedSubmitButton>
                  <Typography
                    variant="body1"
                    style={{ color: "#A61A14", fontWeight: 700 }}
                  >
                    {error && <div>{error.message}</div>}
                  </Typography>
                </Grid>
              </Box>
            </form>
          </>
        ) : (
          <Typography variant="body1">
            You need to be logged in to update your profile. Please{" "}
            <Link to="/login">login</Link> or{" "}
            <Link to="/join">join Voices.</Link>
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default ProfileForm;
