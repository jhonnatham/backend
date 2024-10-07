const { Client } = require('pg')

require('dotenv').config()

const connectionData = {
    user: process.env.BD_USER,
    host: process.env.BD_HOST,
    database: process.env.BD_DATABASE,
    password: process.env.BD_PASSWORD,
    port: process.env.BD_PORT,
    ssl: process.env.BD_SSL
}
const client = new Client(connectionData)

client.connect()

module.exports = client