const { fetchAll, fetch } = require('../../utils/postgres')

const ALL_MSGS = `
    SELECT * FROM posts p inner join users u on u.user_id = p.user_id
`

// const USER_BY_ID = `
//     SELECT * FROM users inner join users u on  WHERE user_id = $1
// `


const NEW_MSG = `
    INSERT INTO posts(post_desc, user_id) VALUES($1, $2) RETURNING *
`

const getMsgs = () => fetchAll(ALL_MSGS)
const newMsg = (desc, userId) => fetch(NEW_MSG, desc, userId)

module.exports = {
    getMsgs,
    newMsg
}