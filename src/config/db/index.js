require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.CONN

const pool = new Pool({
    connectionString,
})

module.exports = pool;
