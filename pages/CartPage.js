import { useLazyQuery, useQuery } from "@apollo/client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { DEDUCT_QTY, GET_PRODUCTS, GET_PRODUCT_ID } from "../db/queries";
import { useAuth } from "../lib/auth";

import { gql } from "@apollo/client";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart.slice";
import styles from "../styles/CartPage.module.css";

import { checkout } from "../redux/checkout.slice";
import { Router, useRouter } from "next/router";
const ErrorShow = () => {
  return <div>Insufficient Product Stock!</div>;
};

const CartPage = () => {
  const { isSignedIn } = useAuth();
  const cart = useSelector((state) => state.cart);
  const productDb = useSelector((state) => state.checkout);

  const dispatch = useDispatch();
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };
  const DEDUCT_QTY_1 = gql`
    query {
      deductQty(id: 1, quantity: 1) {
        productName
        quantity
      }
    }
  `;
  const { data: productData, loading } = useQuery(GET_PRODUCTS);
  const [fetchData, { data: dataById, error: dataError }] =
    useLazyQuery(DEDUCT_QTY);
  const [qtyState, setQtystate] = useState(false);
  const prodData = productData?.products;
  console.log(dataById);

  const deduct = (quantityFromDb, quantityFromStore) => {
    const deductQty = quantityFromDb - quantityFromStore;

    return deductQty;
  };
  const router = useRouter();
  console.log(cart);
  // console.log(productData?.products);
  const handleClick = () => {
    // cart.map((item) => {
    //   productData?.products.map((prod) => {
    //     dispatch(checkout({ item, prod }));
    //   });
    // });'

    dispatch(checkout({ cart, prodData }));
    console.log("From useSelector: ", productDb);
    console.log("get id and qty : ", productDb);

    router.push("/Checkout");
  };

  // const handleCheckout = () => {
  //   productData?.products.map((prod) => {
  //     prod.id === cart.id ? (
  //       fetchData({
  //         variables: {
  //           id: prod.id,
  //           quantity: 3,
  //         },
  //       })
  //     ) : (
  //       <div>waley</div>
  //     );
  //     console.log(dataById);
  //     // console.log(dataById);
  //   });
  // };
  // fetchData({
  //   variables: {
  //     id: productData.id,
  //     quantity: deduct(productData.quantity, cart.quantity),
  //   },
  // });
  // console.log(cart.quantity);
  // console.log(dataById);
  // console.log(dataById);
  console.log("From useSelector: ", productDb);
  return (
    <>
      <div>
        {cart.length === 0 ? (
          <h1>No items in your cart.</h1>
        ) : (
          <>
            <h1>Cart</h1>
            {cart.map((data) => (
              <div key={data.id}>
                <h2 className="name">{data.productName}</h2>
                <h3 className="name">{data.description}</h3>

                <p className="qty">Quantity: {data.quantity}</p>

                <p className="price">&#8369; {data.price}</p>
                <h3 className="total">{data.totalPrice}</h3>
                <button onClick={() => dispatch(incrementQuantity(data.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(data.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(data.id))}>
                  x
                </button>
                {/* {productData?.products.map((prod) => {
                prod.id === data.id ? (
                  // fetchData({
                  //   variables: {
                  //     id: prod.id,
                  //     quantity: prod.quantity - data.quantity,
                  //   },
                  // })
                  <button
                    onClick={() => {
                      fetchData({
                        variables: {
                          deductQtyId: prod.id.toString(),
                          quantity: prod.quantity - data.quantity,
                        },
                      });
                    }}
                  >
                    checkout
                  </button>
                ) : (
                  <div>waley</div>
                );
              })} */}

                {/* {productData?.products.map((prod) => {
                prod.id === data.id ? (
                  <button
                    onClick={() => {
                      fetchData({
                        variables: {
                          deductQtyId: prod.id.toString(),
                          quantity: prod.quantity - data.quantity,
                        },
                      });
                    }}
                  >
                    Checkout
                  </button>
                ) : (
                  <div>waley</div>
                );
              })} */}
                {/* {productData.products.id === data.id
                ? deduct(productData.quantity, data.quantity)
                : null} */}
              </div>
            ))}
            <h2>Total: &#8369; {getTotalPrice()}</h2>
            <button onClick={handleClick}>checkout</button>
            {/* <button onClick={handleCheckout}>Checkout</button> */}
            {/* {cartFetch?.map((data) => (
        <h1>{data.productName}</h1>
      ))} */}
            {/* {cart.productName} */}
            {/* {renderCart} */}
          </>
        )}
        {/* <button
        onClick={() => {
          fetchData({
            variables: {
              deductQtyId: "1",
              quantity: 2,
            },
          });
        }}
      >
        checkout
      </button> */}
        {qtyState ? <ErrorShow /> : <div></div>}
      </div>
    </>
  );
};

export default CartPage;
