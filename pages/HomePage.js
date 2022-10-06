import React from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCTS } from "../db/queries";
import { useAuth } from "../lib/auth";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

// const GET_PRODUCTS = gql`
//   query {
//     products {
//       id
//       productName
//       quantity
//       description
//       price
//     }
//   }
// `;

function HomePage() {
  return <div>asdasd</div>;
}

export default HomePage;
