/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import { useDarkMode } from "./context/DarkModeContext";

function App() {
  const { isDarkMode } = useDarkMode();

  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <Box
        sx={
          isDarkMode
            ? { bgcolor: "black", color: "white", transition: "1s" }
            : { transition: "1s" }
        }
      >
        <Container>
          {pageContent}
          <Footer viewCart={viewCart} />
        </Container>
      </Box>
    </>
  );

  return (
    <>
      <div className="app">{content}</div>
    </>
  );
}

export default App;
