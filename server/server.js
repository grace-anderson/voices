const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  //custom errors to present to user
  formatError: (error) => {
    // Don't give the specific errors to the client.
    if (error.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    if (error.message.startsWith("User validation failed: username: Path `username` is required")) {
      return new Error("Your username is required");
    }
    if (error.message.startsWith("User validation failed: email: Path `email` is required")) {
      return new Error("Please add a valid email");
    }
    if (error.message.startsWith("User validation failed: password")) {
      return new Error("Your password must be at least 5 characters long");
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return error;
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
