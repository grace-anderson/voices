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
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
                  noValidate={false} 
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
                    style={{ backgroundColor: "white" }}
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    placeholder="******"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    style={{ backgroundColor: "white" }}
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                  <Box
                    style={{ cursor: "pointer" }}
                    textAlign={"center"}
                    sx={{ marginTop: 2, marginBottom: 2 }}
                  >
                    <CustomisedSubmitButton type="submit">
                      LOGIN
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

export default Login;
