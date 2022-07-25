import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  // ListItemIcon,
  ListItemText,
  styled
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const CustomisedTabLink = styled(Link)`
  text-decoration: none;
`;

const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#103E3F" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {/* {links.map((link, index) => (
            <ListItemButton onClick={() => setOpen(false)} key={index} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))} */}
          <ListItemButton>
            <CustomisedTabLink to={"/"}>
              <ListItemText label="HOME" sx={{ color: "white", textDecoration: "none" }}>HOME</ListItemText>
            </CustomisedTabLink>
          </ListItemButton>
          <ListItemButton>
            <CustomisedTabLink to={"/stories"} >
              <ListItemText label="ALL STORIES" sx={{ color: "white", textDecoration: "none" }}>ALL STORIES</ListItemText>
            </CustomisedTabLink>
          </ListItemButton>
          <ListItemButton>
            <CustomisedTabLink to={"/about"} >
              <ListItemText label="ABOUT US" sx={{ color: "white", textDecoration: "none" }}>ABOUT US</ListItemText>
            </CustomisedTabLink>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "left", color: "black", fontSize: "large" }}
        onClick={() => setOpen(!open)}
      >
        <MenuRoundedIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
