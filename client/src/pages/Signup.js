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

const CustomisedLinkMessage = styled(Link)`
  color: #DD4614;
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

const CustomisedSubmitButton = styled(Button)`
  font-size: 1rem;
  color: white;
  font-weight: 500;
  background: #103E3F;
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  :hover {
    color: white;
    font-weight: 700;
    background: #DD4614;
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

  // const [errorText, setErrorText] = useState();

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
      // setErrorText(e);
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
          {/* sign up form */}
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
                <CustomisedLinkMessage to="/">
                  {" "}
                  back to the homepage.
                </CustomisedLinkMessage>
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
                  <TextField
                    placeholder="Enter your username"
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ backgroundColor: "white" }}
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    // helperText={errorText}
                    // error={error}
                  />
                  <TextField
                    placeholder="Your email"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    required
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
                    style={{ backgroundColor: "white" }}
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Box
                    style={{ cursor: "pointer" }}
                    textAlign={"center"}
                    sx={{ marginTop: 2, marginBottom: 2 }}
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
                    color: "#A60303",
                    fontWeight: "700",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    marginBottom: -4,
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
