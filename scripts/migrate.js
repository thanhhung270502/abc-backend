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
            uni_id          varchar     NOT NULL,
            CONSTRAINT users_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableProject = async () => {
    try {
        await pool.query('drop table if exists project');

        const query = `CREATE TABLE project (
            id serial NOT NULL,
            name varchar NULL,
            description varchar NULL,
            "location" varchar NULL,
            user_id int NULL,
            start_date date NULL,
            end_date date NULL,
            quantity int NULL,
            CONSTRAINT project_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableUniversity = async () => {
    try {
        await pool.query('drop table if exists university');

        const query = `CREATE TABLE university (
                id serial NOT NULL,
                "name" varchar NULL,
                CONSTRAINT university_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableProjectUni = async () => {
    try {
        await pool.query('drop table if exists project_uni');

        const query = `CREATE TABLE project_uni (
                id serial NOT NULL,
                project_id int NOT NULL,
                uni_id int NOT NULL,
                is_checked boolean NULL,
                CONSTRAINT project_uni_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableProjectUser = async () => {
    try {
        await pool.query('drop table if exists project_user');

        const query = `CREATE TABLE project_user (
                id serial NOT NULL,
                project_id int NOT NULL,
                user_id int NOT NULL,
                is_checked boolean NULL,
                CONSTRAINT project_user_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableAbility = async () => {
    try {
        await pool.query('drop table if exists ability');

        const query = `CREATE TABLE ability (
                id serial NOT NULL,
                name varchar NULL,
                CONSTRAINT ability_pk PRIMARY KEY (id)
        )`;
        await pool.query(query);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createTableUserAbility = async () => {
    try {
        await pool.query('drop table if exists user_ability');

        const query = `CREATE TABLE user_ability (
                id serial NOT NULL,
                ability_id int NOT NULL,
                user_id int NOT NULL,
                CONSTRAINT user_ability_pk PRIMARY KEY (id)
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
        await createTableUniversity();
        await createTableUsers();
        await createTableProject();
        await createTableAbility();
        await createTableProjectUni();
        await createTableUserAbility();
        await createTableProjectUser();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
