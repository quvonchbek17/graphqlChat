const { gql } = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
    }

    extend type Query {
        users: [ User! ]
        user: User
    }

    extend type Mutation {
        newUser(name: String! username: String! password: String!): User!
        login(username: String! password: String!): String
    }

    extend type Subscription {
        users: [ User !]!
    }
`