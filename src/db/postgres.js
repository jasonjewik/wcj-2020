require('dotenv').config();

const {Pool} = require('pg');

const PostgresDB = () => {
    // Sets our connection settings
    // Note: This makes the assumption that the specified user, password, 
    // and database already exist!
    const pool = new Pool({
        user: 'postgres',
        password: 'postgres',
        database: 'wcj-2020'
    });
    return pool;
}

module.exports = {
    PostgresDB
};