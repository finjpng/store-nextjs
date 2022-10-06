import React from "react";
import {
  GET_ALL_USERS,
  GET_MOVIES,
  GET_MOVIE_ID,
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  GET_USER,
} from "../../db/queries";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { checkout } from "../../redux/checkout.slice";

import ProductDetail from "../ProductDetail";
import { useAuth } from "../../lib/auth";
import Home from "..";
import { useSelector } from "react-redux";
function ProductId(props) {
  const { isSignedIn } = useAuth();
  const productDb = useSelector((state) => state.checkout);
  console.log(productDb);
  return (
    <>
      {!isSignedIn() && <Home />}
      {isSignedIn() && (
        <ProductDetail
          id={props.product.id}
          productName={props.product.productName}
          image={props.product.image}
          quantity={props.product.quantity}
          price={props.product.price}
          description={props.product.description}
        />
      )}
    </>
  );
  // <UserDetails id={props.user.id} name={props.user.name} />;
}

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
// get static path is important for dynamic pages to tell nextjs for whic dynamic parameter values this page should be pregenerated
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });

  return {
    fallback: false,
    paths: data.products.map((dt) => ({
      params: { productId: dt.id },
    })),
  };
}
export async function getStaticProps(context) {
  const productId = context.params.productId;

  const { data } = await client.query({
    query: GET_PRODUCT_ID,
    variables: { id: context.params.productId },
  });
  return {
    props: {
      product: {
        id: data.product.id,
        productName: data.product.productName,
        image: data.product.image,
        quantity: data.product.quantity,
        price: data.product.price,
        description: data.product.description,
      },
    },
    revalidate: 1,
  };
}
export default ProductId;
