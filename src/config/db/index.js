require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.CONN

console.log(connectionString)

const pool = new Pool({
    connectionString,
})

module.exports = pool;