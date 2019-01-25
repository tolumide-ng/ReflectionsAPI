const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//connect ot the specific database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//once connection consol.log this
pool.on('connect', () => {
    console.log('connected to the db');
});


//Create Tables when called
const createTables = () => {
    const queryText =
    `CREATE TABLE IF NOT EXISTS
    reflections(
        id UUID PRIMARY KEY,
        success character varying,
        low_point character varying,
        take_away character varying,
        modified_date TIMESTAMP,
        created_date TIMESTAMP
    )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

//Drop Tables when called
const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS reflections';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};

require('make-runnable');
