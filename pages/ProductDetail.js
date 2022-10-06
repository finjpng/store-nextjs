import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { cartActions } from "../redux/cart-clice";
import c from "../styles/ProductDetail.module.css";
// import { addToCart } from "../redux/cart-clice";
import { addToCart } from "../redux/cart.slice";
import CartPage from "./CartPage";

function ProductDetail(props) {
  const dispatch = useDispatch();

  <CartPage id={props.id} name={props.productName} price={props.price} />;

  const CartPage = () => {
    const cart = useSelector(
      (state) => state.cart,
      () => true
    );
    const dispatch = useDispatch();
    const getTotalPrice = () => {
      return cart.reduce(
        (accumulator, item) => accumulator + item.quantity * item.price,
        0
      );
    };
    return (
      <div>
        <h1>cart page</h1>
        {cart.itemsList?.map((data) => (
          <h1>{data.name}</h1>
        ))}
        {/* {cart.productName} */}
        {/* {renderCart} */}
      </div>
    );
  };
  const [openCart, setOpenCart] = useState(false);
  const openCartHandle = () => {
    setOpenCart(true);
  };
  return (
    <div className={c.wrapper}>
      {/* <h1>Product Detail</h1> */}
      <div className={c.image_container}>
        <img src={props.image} className={c.image} />
      </div>
      <div className={c.details_container}>
        <h1>{props.productName}</h1>
        <p>
          {props.description} <br /> <br /> Quantity: {props.quantity}
        </p>
        <h3>&#8369; {props.price}</h3>
        {/* <button onClick={addCart}>Add to Cart</button> */}
        <button onClick={() => dispatch(addToCart(props))} className={c.btn}>
          Add to Cart
        </button>
      </div>

      {/* {openCart ? <CartPage /> : <div>Cart here</div>} */}
      {/* <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button> */}
    </div>
  );
}

export default ProductDetail;
