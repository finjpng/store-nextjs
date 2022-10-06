import { useMutation, gql, useQuery } from "@apollo/client";
// import { gql } from "apollo-server-core";
import React, { useState } from "react";
import { CREATE_USER, CREATE_USER_MUTATION } from "../db/queries";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });

  //   const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button
        onClick={() => {
          createUser({
            variables: {
              input: { name, username, email, password },
            },
          });
          //   refetch();
        }}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
