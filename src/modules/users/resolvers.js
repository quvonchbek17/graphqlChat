const model = require('./model')
const jwt = require('jsonwebtoken')
const pubsub = require('../../pubsub')


const USER = 'user'

module.exports = {
    Query: {
        users: async() => {
            return await model.getUsers()
        },
        user: async(_, {}, { authorization }) => {
            const { id } = jwt.verify(authorization, 'SECRET_KEY')
            pubsub.publish(USER)
            return await model.getUserByID(id)
        },
    },
    Mutation: {
        newUser: async(_, { name, username, password }) => {
            const createdUser = await model.newUser(name, username, password)
            pubsub.publish(USER)
            return createdUser
        },
        login: async(_, { username, password }) => {
            const foundUser = await model.login(username, password)
            if(!foundUser) {
                return "notuser"
            }
            return jwt.sign({ id: foundUser.user_id }, 'SECRET_KEY')
        },
    },
    User: {
        id: g => g.user_id,
        name: g => g.user_name,
        username: g => g.user_username,
        password: g => g.user_password
    },
    Subscription: {
        users: {
            resolve: () => model.getUsers(),
            subscribe: () => pubsub.asyncIterator([USER])
        }
    }
}