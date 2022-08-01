import React, { useRef } from "react";
import emailjs from "emailjs-com";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  IconButton,
  Snackbar,
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

  const [open, setOpen] = React.useState(false);

  console.log(process.env)

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        // "service_il3hfvi",
        process.env.REACT_APP_SERVICE_ID,
        // "template_wgpl7rr",
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        // "qN8AKYtpmiXqcVjJg",
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => console.log(result.status, result.text),
        setOpen(true),
        (error) => console.log(error.text)
      );
    e.target.reset();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
            <Box
              style={{ cursor: "pointer" }}
              textAlign={"center"}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <CustomisedSubmitButton type="submit" value="Send">
                SEND MESSAGE
              </CustomisedSubmitButton>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                action={action}
                severity="success"
                message="Email sent successfully!"
              />
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default ContactForm;
