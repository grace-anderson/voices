import React, { useRef } from "react";
// import { validateEmail, validateName, validateMessage } from "../utils/helpers";
import emailjs from "emailjs-com";

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
        result => console.log(result.text),
        error => console.log(error.text)
      );
      e.target.reset()
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default ContactForm;
