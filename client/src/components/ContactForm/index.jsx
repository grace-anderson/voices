import React, { useRef } from "react";
import emailjs from "emailjs-com";

import {
  Box,
  Button,
  styled,
  TextareaAutosize,
  TextField,
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

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_il3hfvi",
        "template_wgpl7rr",
        form.current,
        "qN8AKYtpmiXqcVjJg"
      )
      .then(
        // (result) => console.log(result.text),
        // (error) => console.log(error.text)
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("SUCCESS! Your email has been sent.");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("FAILED. Sorry your email did not send.", error);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <form ref={form} onSubmit={sendEmail}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* <label>Name</label> */}
            {/* <input type="text" name="user_name" /> */}
            <TextField
              placeholder="Enter your name"
              label="Name"
              name="user_name"
              variant="outlined"
              style={{
                backgroundColor: "white",
                fontFamily: "Roboto', sans-serif",
              }}
              type="text"
              required
            />
            {/* <label>Email</label> */}
            {/* <input type="email" name="user_email" /> */}
            <TextField
              placeholder="Enter your email"
              label="Email"
              name="user_email"
              variant="outlined"
              style={{
                backgroundColor: "white",
                fontFamily: "Roboto', sans-serif",
              }}
              type="email"
              required
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            {/* <label>Message</label> */}
            {/* <textarea name="message" /> */}
            <TextareaAutosize
              placeholder="Add your message"
              label="Message"
              name="message"
              variant="outlined"
              type="text"
              required
              style={{
                backgroundColor: "white",
                padding: "1rem",
                height: "6rem",
                width: "70%",
                fontFamily: "Roboto', sans-serif",
                fontSize: "1rem",
                whiteSpace: "pre-wrap",
              }}
            />
            {/* <input type="submit" value="Send" /> */}
            <Box
              style={{ cursor: "pointer" }}
              textAlign={"center"}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <CustomisedSubmitButton type="submit" value="Send">
                SEND MESSAGE
              </CustomisedSubmitButton>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default ContactForm;
