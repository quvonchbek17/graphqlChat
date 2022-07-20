const { gql } = require('apollo-server-express')

module.exports = gql`
    type Msg {
        id: ID!
        desc: String!
        userId: ID!
        nameSurname: String
        username: String
    }

    extend type Query {
        msgs: [ Msg! ]
        msg: Msg
    }

    extend type Mutation {
        newMsg(desc: String! userId: String! ): Msg!
    }

    extend type Subscription {
        msgs: [ Msg !]!
    }
`