const { fetchAll, fetch } = require('../../utils/postgres')

const ALL_USERS = `
    SELECT * FROM users
`

const USER_BY_ID = `
    SELECT * FROM users WHERE user_id = $1
`

const USER = `
    SELECT * FROM users WHERE user_username = $1 and user_password = $2
`

const NEW_USER = `
    INSERT INTO users(user_name, user_username, user_password) VALUES($1, $2, $3) RETURNING *
`

const USER_REGISTER = `
    SELECT * FROM users WHERE user_username = $1
`

const getUsers = () => fetchAll(ALL_USERS)
const getUserByID = id => fetch(USER_BY_ID, id)
const newUser = (name,username, password) => fetch(NEW_USER, name, username, password)
const login = (name, password) => fetch(USER, name, password)
const verifyUsername = (username) => fetch(USER_REGISTER, username)

module.exports = {
    getUsers,
    getUserByID,
    newUser,
    login,
    verifyUsername
}