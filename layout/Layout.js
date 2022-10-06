import React, { useState } from "react";
import CartPage from "../pages/CartPage";
import c from "../layout/Layout.module.css";
import MainNavigation from "./MainNavigation";

function Layout(props) {
  //   const [openCart, setOpenCart] = useState(false);
  //   const openCartHandle = () => {
  //     setOpenCart(true);

  return (
    <div>
      <MainNavigation />
      <main className={c.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
