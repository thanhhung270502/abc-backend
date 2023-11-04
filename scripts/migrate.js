const pool = require('../src/config/db');

const createTableUsers = async () => {
    try {
        await pool.query('drop table if exists users cascade');

        const query = `
        CREATE TABLE users (
            id              SERIAL      NOT NULL,
            email           varchar     NOT NULL,
            "password"      varchar     NOT NULL,
            name            varchar     NULL,
            avatar          varchar     NULL,
            provider        varchar     NULL,
            "role"          int         NULL,
            CONSTRAINT users_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// const create = async () => {
//     try {
//         await pool.query('drop table if exists users');

//         const query = `CREATE TABLE users (
//             id SERIAL NOT NULL,
//             email varchar NOT NULL,
//             "password" varchar NOT NULL,
//             name varchar null,
//             avatar varchar null,
//             provider varchar NULL,
//             "role" int NULL,
//             CONSTRAINT users_pk PRIMARY KEY (id)
//         )`;
//         await pool.query(query);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// };

(async () => {
    try {
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
        await createTableUsers();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
