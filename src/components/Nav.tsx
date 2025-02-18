/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@mui/material";
import React from "react";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const button = viewCart ? (
    <Button
      onClick={() => setViewCart(false)}
      variant="contained"
      sx={{
        borderRadius: 0,
        borderRight: "4px solid black",
        borderBottom: "4px solid black",
        bgcolor: "#F7F7F7",
        color: "black",
        fontWeight: "bold",
      }}
    >
      View Cart
    </Button>
  ) : (
    <Button
      onClick={() => setViewCart(true)}
      variant="contained"
      sx={{
        borderRadius: 0,
        borderRight: "4px solid black",
        borderBottom: "4px solid black",
        bgcolor: "#F7F7F7",
        color: "black",
        fontWeight: "bold",
      }}
    >
      View Products
    </Button>
  );

  const content = <nav className="nav">{button}</nav>;

  return content;
};

export default Nav;
