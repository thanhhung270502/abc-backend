const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'abcTeam',
    password: 'password',
    database: 'abcDatabase',
    port: 5433,
});

module.exports = pool;
