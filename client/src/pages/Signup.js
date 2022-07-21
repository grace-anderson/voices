import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import {
  Box,
  Button,
  Grid,
  TextField,
  styled,
  Typography,
} from "@mui/material";

import Auth from "../utils/auth";

const CustomisedSubmitButton = styled(Button)`
  font-size: 1rem;
  color: white;
  font-weight: 500;
  background: #41591c;
  :hover {
    color: white;
    font-weight: 700;
    background: #f2762e;
  }
`;

const CustomisedLinkMessage = styled(Link)`
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

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid>
          {/* sign up header */}
          <Grid item xs />
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant="h1">Sign Up</Typography>
          </Grid>
          <Grid item xs />
          {/* <div className="card-body"> */}
          {data ? (
            // Sign up success message
            <Grid
              container
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  alignSelf: "center",
                }}
              >
                Success! You may now head{" "}
                <CustomisedLinkMessage to="/"> back to the homepage.</CustomisedLinkMessage>
              </Typography>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30ch" },
                  }}
                  autoComplete="off"
                  noValidate
                  onSubmit={handleFormSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {/* <input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  /> */}
                  <TextField
                    placeholder="Enter your username"
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    required
                    // className="form-input"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <TextField
                    placeholder="Your email"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    required
                    // className="form-input"
                    style={{ backgroundColor: "white" }}
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <TextField
                    placeholder="******"
                    label="Password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    required
                    // className="form-input"
                    style={{ backgroundColor: "white" }}
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Box
                    style={{ cursor: "pointer" }}
                    textAlign={"center"}
                    sx={{ marginTop: 2 }}
                  >
                    <CustomisedSubmitButton type="submit">
                      Submit
                    </CustomisedSubmitButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )}
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              {error && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  {error.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Signup;
