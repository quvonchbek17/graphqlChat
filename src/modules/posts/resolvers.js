const model = require('./model')
const pubsub = require('../../pubsub')
const jwt = require('jsonwebtoken')

const MSG = 'MESSAGE'

module.exports = {
    Query: {
        msgs: async() => {
            pubsub.publish(MSG)
            return await model.getMsgs()
        }
    },
    Mutation: {
        newMsg: async(_, { desc, userId }) => {
            const createdMsg = await model.newMsg(desc, jwt.verify(userId, 'SECRET_KEY')?.id)
            pubsub.publish(MSG)
            return createdMsg
        }
    },
    Msg: {
        id: g => g.post_id,
        desc: g => g.post_desc,
        userId: g => g.user_id,
        nameSurname: g => g.user_name,
        username: g => g.user_username
    },
    Subscription: {
        msgs: {
            resolve: async() => await model.getMsgs(),
            subscribe: () => pubsub.asyncIterator([MSG])
        }
    }
}