/* eslint-disable @typescript-eslint/no-unused-vars */
import Nav from "./Nav";
import useCart from "../hooks/useCart";
import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const { totalItems, totalPrice } = useCart();

  const ToggleDarkMode = () => {
    return (
      <IconButton
        sx={{ pl: 1 }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        color="inherit"
      >
        {isDarkMode ? (
          <LightModeIcon
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 10,
              p: 1,
              boxSizing: "content-box",
            }}
          />
        ) : (
          <DarkModeIcon
            sx={{
              bgcolor: "white",
              color: "black",
              borderRadius: 10,
              p: 1,
              boxSizing: "content-box",
            }}
          />
        )}
      </IconButton>
    );
  };

  const content = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      py={2}
      bgcolor={"#FFB22C"}
      sx={
        isDarkMode
          ? {
              borderBottom: "4px solid white",
              transition: "1s",
            }
          : {
              borderBottom: "4px solid black",
              transition: "1s",
            }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pr: 3,
          pb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            pl: 4,
          }}
        >
          Acme Co.
        </Typography>
        <ToggleDarkMode />
      </Box>

      <Box
        sx={{
          ml: "auto",
          pr: 4,
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            padding: "5px 8px",
            border: "3px solid black",
            fontWeight: "bold",
            bgcolor: "#F7F7F7",
          }}
        >
          Total Item: {totalItems}
        </Typography>
        <Typography
          sx={{
            padding: "5px 8px",
            border: "3px solid black",
            fontWeight: "bold",
            bgcolor: "#F7F7F7",
          }}
        >
          Total Price: {totalPrice}
        </Typography>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </Box>
    </Box>
  );

  return content;
};

export default Header;
