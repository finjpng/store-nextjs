// import {  gql } from "apollo-server-micro";
// const {ApolloServer} = require("apollo-server")
import { ApolloServer, gql } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
// import {  gql } from "@apollo/client";
import {
  UserList,
  MovieList,
  ProductsList,
  RegisteredUsers,
} from "../../db/FakeData";
import { SECRET_KEY } from "../../db/config";
const _ = require("lodash");
const jwt = require("jsonwebtoken");
import { UserInputError } from "apollo-server-core";
import { find } from "lodash";
import checkAuth from "../../context/check-auth";

const typeDefs = gql`
  type Query {
    login2(username: String!): User
    products: [Product!]!
    product(id: ID!): Product
    deductQty(id: String, quantity: Int): [Product]
    users: [User!]!
    user(id: ID!): User
    search(name: String): User!
    movies: [Movie]
    movie(id: ID!): Movie
    movieSearch(name: String!): Movie!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    login(username: String!, password: String!): User
    addMovie(input: AddMovieInput!): Movie
    deleteMovie(id: ID!): Movie
    # deductQty(input: QuantityInput!): Product
    # updateUsername(input: UpdateUsernameInput!) : User
    deleteUser(id: ID!): User
  }

  type Product {
    id: String!
    productName: String!
    image: String!
    quantity: Int
    price: Float!
    description: String!
  }
  type UserLogin {
    id: String
    username: String!
  }

  type User {
    id: String
    name: String!
    username: String!
    email: String!
    password: String!
    token: String
  }
  type Movie {
    id: String
    name: String!
    image: String!
    release: String!
    director: String!
    synopsis: String!
  }
  input AddMovieInput {
    id: String
    name: String!
    image: String!
    release: String!
    director: String!
    synopsis: String!
  }
  input LoginInput {
    username: String!
    password: String!
    # age: Int!
    # nationality: Nationality
  }
  input QuantityInput {
    id: String!
    quantity: Int!
    # age: Int!
    # nationality: Nationality
  }
  input CreateUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
    # age: Int!
    # nationality: Nationality
  }
  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    PHILIPPINES
  }
  # type Mutation {
  #     addBlogPost(title: String, author: String, text:String): BlogPost
  #     editBlogPost(id: String,title:String,author:String,text:String):BlogPost
  #     deleteBlogPost(id:String):BlogPost
  # }
`;
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}
const resolvers = {
  Query: {
    products: (_, { body }, context) => {
      // const user = checkAuth(context);
      // if (!user) {
      //   return "";
      // }
      return ProductsList;
    },
    product: (parent, args, context) => {
      const id = args.id;
      const productId = parseInt(id);
      // console.log(id)
      const product = ProductsList.find((p) => p.id === productId);
      // console.log(user)
      return product;
    },
    users: () => {
      return RegisteredUsers;
    },
    user: (parent, args, context) => {
      const id = args.id;
      const userId = parseInt(id);
      // console.log(id)
      const user = UserList.find((u) => u.id === userId);
      // console.log(user)
      return user;
    },
    search: (parent, { name }) => {
      return UserList.find((users) => users.name === name);
    },
    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args, context) => {
      const id = args.id;
      const movieId = parseInt(id);
      // console.log(id)
      const movie = MovieList.find((m) => m.id === movieId);
      // console.log(user)
      return movie;
    },
    movieSearch: (parent, { name }) => {
      const test = MovieList.find((movie) => movie.name === name);
      console.log(test);
      return test;
    },
    login2: (parent, { username }) => {
      return RegisteredUsers.find((user) => user.username === username);
      // return RegisteredUsers.find((user) => user.username === username);
      // console.log(findUser);
      // return findUser;
    },
    deductQty: (parent, args) => {
      const id = args.id;
      const prodId = parseInt(id);
      const prodQty = args.quantity;
      const test = ProductsList.find((product) => product.id === prodId);
      test.quantity = prodQty;
      // console.log(prodId);
      console.log(test);
      // test.quantity = quantity;
      return test;
    },
  },
  Mutation: {
    // deductQty: (parent, args) => {
    //   const prodId = args.id;
    //   const prodQty = args.quantity;
    //   // const test = ProductsList.find((product) => product.id === id);
    //   console.log(prodId);
    //   console.log(prodQty);

    //   // test.quantity = quantity;
    //   return null;
    // },
    login: (parent, { username, password }, context) => {
      const findUser = RegisteredUsers.find(
        (user) => user.username === username
      );
      // console.log(username);
      if (findUser.password !== password) {
        throw new UserInputError("Wrong password!", {
          errors: {
            password: "Wrong Password",
          },
        });
      }
      const token = generateToken(findUser);
      findUser.token = token;
      const showToken = findUser.token;
      // console.log(findUser.token);
      // const findPass = RegisteredUsers.find(
      //   (user) => user.password === password
      // );

      // return RegisteredUsers.find((user) => user.username === username);

      return findUser;
    },
    createUser: (parent, args, context) => {
      const user = args.input;
      const lastId = RegisteredUsers[RegisteredUsers.length - 1].id;
      user.id = lastId + 1;
      // let exists = Object.values(RegisteredUsers).includes(user.username);
      // if (exists) {
      //   throw new UserInputError("Username already taken!", {
      //     errors: {
      //       username: "This username is taken",
      //     },
      //   });
      // }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;
      //   console.log(user.RegisteredUsers);
      RegisteredUsers.push(user);
      return user;
    },
    addMovie: (parent, args, context) => {
      const movie = args.input;
      const lastId = MovieList[MovieList.length - 1].id;
      movie.id = lastId + 1;
      MovieList.push(movie);
      return movie;
    },
    deleteMovie: (parent, args, context) => {
      const id = args.id;
      _.remove(MovieList, (movie) => movie.id === Number(id));
      //    UserList.filter(user => user.id !== Number(id))
      // console.log(UserList)
      return null;
    },
    deleteUser: (parent, args, context) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      //    UserList.filter(user => user.id !== Number(id))
      // console.log(UserList)
      return null;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  // plugins: [ApolloServerPluginLandingPageLocalDefaultOptions({})],
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: "plaid-gufzoj@current",
        })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
// // const apolloServer = new ApolloServer({ typeDefs, resolvers });

// // const handler = apolloServer.createHandler({ path: "/api/graphql" });

// // export const config = { api: { bodyParser: false } };

// // export default handler;

// const apolloServer = new ApolloServer({ typeDefs, resolvers });
// module.exports = apolloServer.start().then(() => {
//   return apolloServer.createHandler({ path: '/api/graphql' });
// });
