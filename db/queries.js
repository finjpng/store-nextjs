// import { gql } from "@apollo/client";
import { gql } from "apollo-server-micro";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      productName
      quantity
      description
      image
      price
    }
  }
`;

export const GET_PRODUCT_ID = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      productName
      image
      quantity
      price
      description
    }
  }
`;
// export const CREATE_USER = gql`
//   mutation ($createUserInput2: CreateUserInput!) {
//     createUser(input: $createUserInput2) {
//       name
//       username
//       email
//       password
//     }
//   }
// `;
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      email
      password
    }
  }
`;

export const DEDUCT_QTY = gql`
  query ($deductQtyId: String, $quantity: Int) {
    deductQty(id: $deductQtyId, quantity: $quantity) {
      productName
      quantity
      image
      id
      description
      price
    }
  }
`;
