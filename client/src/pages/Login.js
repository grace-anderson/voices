import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import Auth from "../utils/auth";

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

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid>
          {/* log in header */}
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
            <Typography variant="h1">Login</Typography>
          </Grid>
          <Grid item xs />
          {/* login form */}
          {data ? (
            // Success message
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
                  back to the homepage.
                </CustomisedLinkMessage>
              </Typography>
            </Grid>
          ) : (
            // form input
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
                    placeholder="Your email"
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ backgroundColor: "white" }}
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <TextField
                    placeholder="******"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    style={{ backgroundColor: "white" }}
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

          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Login;
