import React, { useState } from "react";
import { validateEmail, validateName, validateMessage } from "../utils/helpers";

import {
  Button,
  Grid,
  styled,
  TextareaAutosize,
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
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

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
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      {/* welcome row */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Typography variant="h4Roboto">Welcome {name}!</Typography>
      </Grid>
      <Grid item xs={1} />
      <form style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <TextareaAutosize
            name="name"
            placeholder="Your name (required)"
            value={name}
            variant="outlined"
            type="text"
            onBlur={handleBlank}
            onChange={handleInputChange}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              height: "1rem",
              width: "70%",
              fontFamily: "Roboto', sans-serif",
              fontSize: "1.2rem",
            }}
            noValidate={false}
            required
          />
        </div>
        <div>
          <TextareaAutosize
            name="email"
            placeholder="Add your email (required)"
            value={email}
            variant="outlined"
            type="email"
            onBlur={handleBlank}
            onChange={handleInputChange}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              height: "1rem",
              width: "70%",
              fontFamily: "Roboto', sans-serif",
              fontSize: "1.2rem",
            }}
            noValidate={false}
            required
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Type your message here (required)"
            value={message}
            variant="outlined"
            type="text"
            onBlur={handleBlank}
            onChange={handleInputChange}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              height: "4rem",
              width: "70%",
              fontFamily: "Roboto', sans-serif",
              fontSize: "1.2rem",
            }}
            noValidate={false}
            required
          />
        </div>
        <Grid>
          <CustomisedSubmitButton
            variant="contained"
            sx={{ marginTop: 3 }}
            type="submit"
            onClick={handleFormSubmit}
          >
            Send message
          </CustomisedSubmitButton>
        </Grid>
      </form>
      {errorMessage && (
        <div>
          <p className="message-text error-text">{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div>
          <p className="message-text success-text">{successMessage}</p>
        </div>
      )}
    </Grid>
  );
}

export default ContactForm;
