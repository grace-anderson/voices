import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";

const CustomisedButton = styled(Button)`
  font-size: 1rem;
  color: white;
  background: #DD4614;
  :hover {
    color: white;
  }
`;

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} sx={{ placeItems: "center" }} >
            <Grid item xs={12}>
              <Box textAlign={"center"}>
              {location.pathname !== "/" && (
                <CustomisedButton
                  variant="contained"
                  sx={{ margin: 3 }}
                  onClick={() => navigate(-1)}
                >
                  &larr; Go Back
                </CustomisedButton>
              )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign={"center"}>
                <Typography variant="h5">&copy; 2022 Voices</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
