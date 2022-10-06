import React from "react";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart-clice";
import styles from "../styles/CartPage.module.css";
function CartList(props) {
  const getTotalPrice = () => {
    return props.cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };
  return (
    <div>
      <div className={styles.body}>
        <div className={styles.image}>
          {/* <Image src={item.image} height="90" width="65" /> */}
        </div>
        <p>{props.productName}</p>
        <p>$ {props.price}</p>
        <p>{props.quantity}</p>
        <div className={styles.buttons}>
          <button onClick={() => dispatch(incrementQuantity(props.id))}>
            +
          </button>
          <button onClick={() => dispatch(decrementQuantity(props.id))}>
            -
          </button>
          <button onClick={() => dispatch(removeFromCart(props.id))}>x</button>
        </div>
        <p>$ {props.quantity * props.price}</p>
      </div>
      <h2>Grand Total: $ {getTotalPrice()}</h2>
    </div>
  );
}

export default CartList;
