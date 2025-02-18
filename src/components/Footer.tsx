import React from "react";
import useCart from "../hooks/useCart";
import { Box, Typography } from "@mui/material";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        minHeight: "63vh",
        pb: 2,
      }}
    >
      <Typography>Dani Permana &copy; {year}</Typography>
    </Box>
  ) : (
    <>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Total Items: {totalItems}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Total Price: {totalPrice}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          minHeight: "45vh",
        }}
      >
        <Typography sx={{ pb: 2 }}>Dani Permana &copy; {year}</Typography>
      </Box>
    </>
  );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
};

export default Footer;
