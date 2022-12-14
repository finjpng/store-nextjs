const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../db/config");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    // throw new Error("Authentication token must be 'Bearer [token]");
    console.log("Authentication token must be Bearer [token]");
  }
  //   throw new Error("Authorization header must be provided");
  console.log("Authorization header must be provided");
};
