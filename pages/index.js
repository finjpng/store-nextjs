import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../db/queries";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import jwt_decode from "jwt-decode";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import Products from "./Products";

const SignIn = () => {
  let router = useRouter();
  let greeting =
    router.locale === "en-US"
      ? "Welcome to Online Store"
      : router.locale === "fr"
      ? "Bienvenue dans la boutique en ligne"
      : router.locale === "de"
      ? "Welkom bij Online Winkel"
      : "Welcome to Online Store";
  let loginText =
    router.locale === "en-US"
      ? "Log In"
      : router.locale === "fr"
      ? "Connexion"
      : router.locale === "de"
      ? "Log In"
      : "Log In";
  let usernameText =
    router.locale === "en-US"
      ? "Username"
      : router.locale === "fr"
      ? "Nom d'utilisateur"
      : router.locale === "de"
      ? "gebruikersnaam"
      : "Username";
  let pwText =
    router.locale === "en-US"
      ? "Password"
      : router.locale === "fr"
      ? "Mot de passe"
      : router.locale === "de"
      ? "Wachtwoord"
      : "Password";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signOut } = useAuth();

  function onSubmit(e) {
    e.preventDefault();
    signIn({ username, password });
  }
  const onSelectChange = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false,
    });
  };
  return (
    <div>
      <select name="languages" id="language-select" onChange={onSelectChange}>
        {router.locales.map((language) => (
          <option value={language}>
            {language === "en-US"
              ? "EN-US"
              : language === "de"
              ? "DE"
              : language === "fr"
              ? "FR"
              : null}
          </option>
        ))}
      </select>
      <h1>{greeting}</h1>

      <h1>{loginText}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={usernameText}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder={pwText}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loginText}</button>
      </form>
    </div>
  );
};
const ProductsFeed = () => {
  const { data } = useQuery(GET_PRODUCTS);
  const { signOut } = useAuth();
  const { authToken } = useAuth();
  const decode = jwt_decode(authToken);
  // console.log(decode);
  console.log(data);
  const handleSignOut = () => {
    signOut();
    window.location.reload();
  };
  return (
    <div>
      <h4>Hello {decode.username}</h4>
      <button onClick={handleSignOut}>Sign Out</button>
      <h1>Products</h1>

      {data?.products.map((p) => (
        <Products
          productName={p.productName}
          price={p.price}
          image={p.image}
          // quantity={p.quantity}
          id={p.id}
        />
      ))}
    </div>
  );
};
function Home() {
  const { isSignedIn } = useAuth();

  // console.log(props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && <ProductsFeed />}
      {/* <SignIn />
      <ProductsFeed /> */}
    </div>
  );
}
const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      products: data.products.slice(),
    },
    revalidate: 1,
  };
}
export default Home;
