import React, {useState} from "react";
import { Drawer } from "@mui/material";

const DrawerComp = () => {

    const [open, setOpen] = useState(false)

  return (
    <>
      <Drawer open={true}></Drawer>
    </>
  );
};

export default DrawerComp;
