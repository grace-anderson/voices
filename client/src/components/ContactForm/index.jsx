import React, { useState } from "react";
import { validateEmail, validateName, validateMessage } from "../utils/helpers";

import { Grid, Typography } from "@mui/material";

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
        <div className="form__field">
          <input
            className="form__input"
            value={name}
            name="name"
            onBlur={handleBlank}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="form__field">
          <input
            className="form__input"
            value={email}
            name="email"
            onBlur={handleBlank}
            onChange={handleInputChange}
            type="email"
            placeholder="Add your email"
          />
        </div>
        <div className="form__field">
          <textarea
            className="form__input"
            value={message}
            name="message"
            onBlur={handleBlank}
            onChange={handleInputChange}
            type="text"
            placeholder="Type your message here"
          />
        </div>
        <div>
          <button
            className="form__submit"
            type="button"
            onClick={handleFormSubmit}
          >
            Send message
          </button>
        </div>
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
