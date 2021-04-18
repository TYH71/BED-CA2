// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

// import modules
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const dbConnect = {
    getConnection: () => {
        let conn = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            multipleStatements: true,
            dateStrings: true
        });
        return conn;
    }
};

module.exports = dbConnect;