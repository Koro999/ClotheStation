
const { ApolloServer } = require('apollo-server-express'); //Imports the Apollo Server to create GraphQL a server with Express
const express = require('express');
const path = require('path'); //imports the path module, which is a node.js module to work with directories and files
const db = require('./config/connection'); //imports the database connection string from the config file

const { authMiddleware } = require('./utils/auth');   //imports the authentication from the utility files
const { resolvers, typeDefs } = require('./schemas'); //imports the GraphQL resolver and type definition functions

const app = express(); //creates an express server instance
const PORT = process.env.PORT || 3001; //stores the port number from the .env file. if dne, set the port as 3000

const server = new ApolloServer({   //initializes a new Apollo Server with the typeDefs, resolver functions and the auth context 
    typeDefs,
    resolvers,
    context: authMiddleware   //before a request is processed by resolvers, it wil pass through this middleware. it checks if the request has a valid jwt, if so, attach it to the request's context.
})


app.use(express.urlencoded({ extended: true }));  //middleware to parse incoming url-encoded data(form submissions)
app.use(express.json());  //middleware to parse incoming JSON data (API requests)

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));   //serves static files from the "build" directory inside the cliend folder
}

app.get('/', (req, res) => {  //defines a router for the "/" endpoint
    res.sendFile(path.join(__dirname, '../client/build/index.html'));   //acts as an entry point. Once hit, send back the "index.html" from the build directopry
});
