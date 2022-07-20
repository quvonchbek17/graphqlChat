const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4040
const modules = require('./modules')

const server = new ApolloServer({
    modules,
    context: ({ req, connection }) => {
        if(connection) {
            const { token } = connection.context
            console.log(token)
            return token
        }
        return req.headers
    }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
    console.log(`http://localhost:${PORT}` + server.graphqlPath)
    console.log(`ws://localhost:${PORT}` + server.graphqlPath)
})