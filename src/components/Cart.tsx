import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "./CartLineItem";
import { Box, Button, Typography } from "@mui/material";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <Typography
      variant="h4"
      sx={{
        py: 4,
      }}
    >
      Thank you for your order.
    </Typography>
  ) : (
    <Box
      sx={{
        py: 4,
      }}
    >
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography fontWeight={"bold"}>Total Items: {totalItems}</Typography>
        <Typography fontWeight={"bold"}>Total Price: {totalPrice}</Typography>
        <Button
          disabled={!totalItems}
          onClick={onSubmitOrder}
          variant="contained"
          sx={
            totalItems
              ? {
                  backgroundColor: "#FFB22C",
                  color: "black",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#eda11d" },
                  width: {
                    xs: 180,
                    md: 350,
                  },
                  borderRight: "4px solid black",
                  borderBottom: "4px solid black",
                }
              : {
                  backgroundColor: "#FFB22C",
                  color: "black",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#eda11d" },
                  width: {
                    xs: 180,
                    md: 350,
                  },
                }
          }
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};

export default Cart;
