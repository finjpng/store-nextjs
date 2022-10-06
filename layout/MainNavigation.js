import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { cartActions } from "../redux/cart-clice";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
import CartPage from "../pages/CartPage";
import Link from "next/link";
import c from "../layout/MainNavigation.module.css";

function MainNavigation(props) {
  // const cartItems = useSelector((state) => state.cart.itemsList);
  // console.log(cartItems);
  const cart = useSelector((state) => state.cart);

  const getItemsCount = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  };
  const { id, name, price } = props;
  const [openCart, setOpenCart] = useState(false);
  const openCartHandle = () => {
    // setOpenCart
    // setOpenCart(true);
    setOpenCart((prevState) => !prevState);
  };

  const CartPage = () => {
    // const cart = useSelector(
    //   (state) => state.cart,
    //   () => true
    // );
    // console.log(cart);
    // const { name, id, price } = cart.itemsList;
    // const cartItems = cart.itemsList;

    // console.log(cart.itemsList.name);
    const dispatch = useDispatch();
    // const decrementCartItems = () => {
    //   dispatch(cartActions.removeFromCart(cartItems.id));
    // };
    // const incrementCartItem = () => {
    //   dispatch(
    //     cartActions.addToCart({
    //       id,
    //       name,
    //       price,
    //     })
    //   );
    // };
    const getTotalPrice = () => {
      return cart.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      );
    };

    return (
      <div>
        <h1>cart page</h1>
        {cart.map((data) => (
          <div>
            <h2 className="name">{data.name}</h2>
            <h2 className="qty">{data.quantity}</h2>

            <h2 className="price">{data.price}</h2>
            <h3 className="total">{data.totalPrice}</h3>
            <button onClick={() => dispatch(incrementQuantity(data.id))}>
              +
            </button>
            <button onClick={() => dispatch(decrementQuantity(data.id))}>
              -
            </button>
            <button onClick={() => dispatch(removeFromCart(data.id))}>x</button>
          </div>
        ))}
        <h2>Grand Total: $ {getTotalPrice()}</h2>
        {/* <button onClick={decrementCartItems} className="cart-actions">
          -
        </button>
        <button onClick={incrementCartItem} className="cart-actions">
          +
        </button> */}
      </div>
    );
  };
  return (
    <Fragment>
      <header className={c.header}>
        <div className={c.logo}>
          <Link href="/"> Online Store</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              {/* <button onClick={openCartHandle}>Cart</button> */}
              {/* <a onClick={openCartHandle}>Cart ({getItemsCount()})</a> */}
              <Link href="/CartPage">
                <a>Cart ({getItemsCount()})</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{openCart ? <CartPage /> : <div></div>}</div>
    </Fragment>
  );
}

export default MainNavigation;
