import React, { useState } from "react";
import { validateEmail, validateName, validateMessage } from "../utils/helpers";

import {
  Box,
  Button,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

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
  }
`;

//placeholder contact form
//future enhancement: add heroku email addon
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleBlank = (e) => {
    //handle when field exited without entering anything
    e.preventDefault();
    if (
      e.target.name === "name" ||
      e.target.name === "message" ||
      e.target.name === "email"
    ) {
      if (e.target.value.length === 0) {
        setErrorMessage(`${e.target.name} is required`);
        setSuccessMessage("");
      }
    }
  };

  const handleInputChange = (e) => {
    //get field that triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    setSuccessMessage("");
    // Set the input field state to the value of the input
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "name") {
      setName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateName(name)) {
      setErrorMessage("name must be at least four (4) characters");
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage("email is invalid");
      return;
    } else if (validateMessage(message)) {
      setErrorMessage("message is empty");
      return;
    }
    setSuccessMessage(
      `Thank you, ${name}. Contact form submitted successfully.`
    );

    // Clear input and error message after successful submission
    setName("");
    setEmail("");
    setMessage("");
    setErrorMessage("");
  };

  return (
    <>
      {/* contact form */}
      {/* form container */}
      <Box sx={{ flexGrow: 1 }}>
        {/* form container details */}
        <form>
          {/* form title */}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography variant="h4">Hello {name}!</Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* name field */}
            <TextField
              value={name}
              name="name"
              onBlur={handleBlank}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your name"
              variant="outlined"
              style={{
                backgroundColor: "white",
                fontFamily: "Roboto', sans-serif",
              }}
              required
            />
            {/* email field */}
            <TextField
              value={email}
              name="email"
              onBlur={handleBlank}
              onChange={handleInputChange}
              type="email"
              placeholder="Add your email"
              variant="outlined"
              style={{
                backgroundColor: "white",
                fontFamily: "Roboto', sans-serif",
              }}
              sx={{ marginTop: 2, marginBottom: 2 }}
              required
            />
            {/* message field */}
            <TextareaAutosize
              value={message}
              name="message"
              onBlur={handleBlank}
              onChange={handleInputChange}
              type="text"
              placeholder="Type your message here"
              variant="outlined"
              style={{
                backgroundColor: "white",
                padding: "1rem",
                height: "6rem",
                width: "70%",
                fontFamily: "Roboto', sans-serif",
                fontSize: "1rem",
                whiteSpace: "pre-wrap",
              }}
              required
            />
            <Box
              style={{ cursor: "pointer" }}
              textAlign={"center"}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <CustomisedSubmitButton type="button" onClick={handleFormSubmit}>
                SEND MESSAGE
              </CustomisedSubmitButton>
            </Box>
          </Box>
        </form>
        <Box textAlign={"center"} sx={{ marginTop: 2, marginBottom: 2 }}>
          {errorMessage && (
            <div>
              <Typography variant="body1" sx={{color: "#A61A14", fontWeight: 600}}>{errorMessage}</Typography>
            </div>
          )}
          {successMessage && (
            <div>
              <Typography variant="body1" sx={{fontWeight: 500}}>{successMessage}</Typography>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ContactForm;
