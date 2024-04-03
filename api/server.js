const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("../graphql/schemas");
const resolvers = require("../graphql/resolvers");
const context = require("../graphql/context");

// Creamos la instancia de Express
const app = express();

// Habilitamos CORS
app.use(cors());

// Creamos el servidor Apollo
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: {
        settings: {
            "schema.polling.enable": false,
        },
    },
});

// Aplicamos el middleware de Apollo después de que el servidor Apollo se haya iniciado completamente
async function startApolloServer() {
    // Iniciamos el servidor Apollo
    await apolloServer.start();

    // Aplicamos el middleware de ApolloServer a Express
    apolloServer.applyMiddleware({ app, path: "/api" });
}

// Llamamos a la función que inicia el servidor Apollo
startApolloServer();

// Creamos el servidor HTTP
const server = createServer(app);

module.exports = server;
