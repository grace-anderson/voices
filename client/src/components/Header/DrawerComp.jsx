import React, { useState } from "react";

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const DrawerComp = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#41591C" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {links.map((link, index) => (
            <ListItemButton onClick={() => setOpen(false)} key={index} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
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
