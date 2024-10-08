const { Client } = require('pg')

require('dotenv').config()

const configssl = process.env.BD_SSL = 'false' ? false: true
const connectionData = {
    user: process.env.BD_USER,
    host: process.env.BD_HOST,
    database: process.env.BD_DATABASE,
    password: process.env.BD_PASSWORD,
    port: process.env.BD_PORT,
    ssl: configssl
}

const client = new Client(connectionData)

client.connect()

module.exports = client