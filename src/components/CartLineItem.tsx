/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";
import {
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
} from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const { isDarkMode } = useDarkMode();

  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.qty + item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const onChangeQty = (e: SelectChangeEvent<number>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} />
      <div aria-label="Item Name">{item.name}</div>
      <div aria-label="Price per Item">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.price)}
      </div>

      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>

      <Select
        name="itemQty"
        id="itemQty"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
        sx={
          isDarkMode
            ? {
                width: "4.3rem",
                height: "3rem",
                border: "2px solid white",
                borderRadius: 0,
                bgcolor: "#FFB22C",
              }
            : {
                width: "4.3rem",
                height: "3rem",
                border: "2px solid black",
                borderRadius: 0,
                bgcolor: "#FFB22C",
              }
        }
      >
        {optionValues.map((val) => {
          return (
            <MenuItem
              sx={{
                fontSize: "1rem",
                bgcolor: "#FFB22C",
                "&:hover": { bgcolor: "#eda11d" },
                "&:focus": { bgcolor: "black", color: "white" },
              }}
              key={`opt${val}`}
              value={val}
            >
              {val}
            </MenuItem>
          );
        })}
      </Select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(lineTotal)}
      </div>

      <Button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
        variant="contained"
        sx={
          isDarkMode
            ? {
                border: "#FFB22C",
                fontWeight: "bold",
                borderRadius: 0,
                bgcolor: "#FFB22C",
                color: "black",
                borderRight: "4px solid white",
                borderBottom: "4px solid white",
                maxHeight: 50,
              }
            : {
                border: "#FFB22C",
                fontWeight: "bold",
                borderRadius: 0,
                bgcolor: "#FFB22C",
                color: "black",
                borderRight: "4px solid black",
                borderBottom: "4px solid black",
                maxHeight: 50,
              }
        }
      >
        X
      </Button>
    </li>
  );

  return content;
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem);

export default CartLineItem;
