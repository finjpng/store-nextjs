import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavigation from "../layout/MainNavigation";
import { addToCart } from "../redux/cart-clice";
import c from "../styles/Products.module.css";
function Products(props) {
  const router = useRouter();
  function showDetailHandler() {
    router.push("/" + props.id);
  }
  // console.log(props.image);
  const dispatch = useDispatch();
  // const testing = dispatch(addToCart(props));
  // console.log(testing);
  return (
    <div className={c.body}>
      <div className={c.main}>
        <ul className={c.cards}>
          <li className={c.cards_item} key={props.id}>
            <div className={c.card}>
              <div className={c.card_image}>
                <img src={props.image} className={c.imageTag} />
              </div>
              <div className={c.card_content}>
                <h2 className={c.card_title}>{props.productName}</h2>
                <p className={c.card_text}>Price: PHP {props.price}</p>
                <button className={c.btn} onClick={showDetailHandler}>
                  View Details
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Products;
