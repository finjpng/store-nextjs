import "../styles/globals.css";
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { AuthProvider } from "../lib/auth";
import { Provider } from "react-redux";
// import store from "../redux/index";
import store from "../redux/store";

import LoginForm from "./Login";
import Layout from "../layout/Layout";
// import { AuthProvider } from "../lib/auth";

// function createApolloClient() {
//   const link = new HttpLink({
//     uri: "http://localhost:3000/api/graphql",
//   });
//   return new ApolloClient({
//     link,
//     cache: new InMemoryCache(),
//   });
// }

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }) {
  return (
    // <LoginForm/>

    <AuthProvider>
      <Provider store={store}>
        <Layout>
          {/* <ApolloProvider client={client}> */}
          <Component {...pageProps} />
        </Layout>
        {/* </ApolloProvider> */}
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
