import React from "react";
import ContactForm from "../components/ContactForm";

import { Grid, Typography } from "@mui/material";

const About = () => {
  return (
    <Grid container spacing={3}>
      <Grid container sx={{ placeItems: "center" }}>
        {/* heading row */}
        <Grid item xs={1} />
        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Typography variant="h1" sx={{ marginBottom: "2rem" }}>
            About us
          </Typography>
        </Grid>
        <Grid item xs={1} />
        {/* paragraph row */}
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Voices is a community where you can safely share your stories and
            experiences. Here you can share your stories in safety without
            receiving comments. If you do wish to gain feedback on your story,
            you're welcome to use Voices and then share your story on social
            media as you wish. While you may add a profile, there is no
            obligation to. You don't even need to use your own name. We&#8217;re
            most interested in your personal journey, your story. By being
            willing to share your experiences with others and being open to
            exploring new places and people, you are contributing to a world
            where we can learn from each other and move forward as a community.
          </Typography>
        </Grid>
        <Grid item xs={1} md={2} />
        {/* form heading  */}
        <Grid item xs={1} />
        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 1,
          }}
        >
          <Typography
            variant="h2"
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={1} />
        {/* Contact form heading*/}
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Please feel free to reach out by completing the contact form. If you
            require a response, I'll contact you within a few days.
          </Typography>
        </Grid>
        <Grid item xs={1} md={2} />
        {/* Contact form*/}
        <Grid item xs={2} />
        <Grid item xs={8}>
          <ContactForm />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Grid>
  );
};

export default About;
