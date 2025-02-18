import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
import { ReactElement, memo } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import useCart from "../hooks/useCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDarkMode } from "../context/DarkModeContext";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const { isDarkMode } = useDarkMode();

  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;
  console.log(img);

  const { cart } = useCart();

  const ItemCount = () => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <IconButton
          sx={
            isDarkMode
              ? {
                  bgcolor: "#FFB22C",
                  ":hover": { bgcolor: "#eda11d" },
                  borderRadius: 0,
                  border: "2px solid white",
                  color: "black",
                  height: "25px",
                  width: "25px",
                  transiion: "1s",
                }
              : {
                  bgcolor: "#FFB22C",
                  ":hover": { bgcolor: "#eda11d" },
                  borderRadius: 0,
                  border: "2px solid black",
                  color: "black",
                  height: "25px",
                  width: "25px",
                  transiion: "1s",
                }
          }
          onClick={onDeleteItem}
        >
          <RemoveIcon />
        </IconButton>
        <Typography>
          {cart.find((item) => {
            return item.sku === product.sku;
          })?.qty || 0}
        </Typography>
        <IconButton
          sx={
            isDarkMode
              ? {
                  bgcolor: "#FFB22C",
                  ":hover": { bgcolor: "#eda11d" },
                  borderRadius: 0,
                  border: "2px solid white",
                  color: "black",
                  height: "25px",
                  width: "25px",
                  transition: "1s",
                }
              : {
                  bgcolor: "#FFB22C",
                  ":hover": { bgcolor: "#eda11d" },
                  borderRadius: 0,
                  border: "2px solid black",
                  color: "black",
                  height: "25px",
                  width: "25px",
                  transition: "1s",
                }
          }
          onClick={onAddToCart}
        >
          <AddIcon />
        </IconButton>
      </Box>
    );
  };

  const onDeleteItem = () => {
    if (cart.find((item) => item.sku === product.sku)!.qty > 1)
      dispatch({
        type: REDUCER_ACTIONS.DELETE,
        payload: { ...product, qty: 0 },
      });
    else {
      dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: { ...product, qty: 0 },
      });
    }
  };

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? <ItemCount /> : null;

  const content = (
    <article className="product">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          {product.name}
        </Typography>
        <img
          src={img}
          alt={product.name}
          className={isDarkMode ? "product__img_dark" : "product__img"}
        />
        <Typography sx={{ py: 2 }}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product.price)}
          {itemInCart}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onAddToCart}
        sx={
          isDarkMode
            ? {
                mt: 1,
                bgcolor: "#FFB22C",
                ":hover": { bgcolor: "#eda11d" },
                fontWeight: "bold",
                borderBottom: "4px solid white",
                borderRight: "4px solid white",
                borderRadius: 0,
                color: "black",
                transition: "1s",
              }
            : {
                mt: 1,
                bgcolor: "#FFB22C",
                ":hover": { bgcolor: "#eda11d" },
                fontWeight: "bold",
                borderBottom: "4px solid black",
                borderRight: "4px solid black",
                borderRadius: 0,
                color: "black",
                transition: "1s",
              }
        }
      >
        Add to Cart
      </Button>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
