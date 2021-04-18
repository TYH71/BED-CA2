// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

const db = require(`../db/databaseConfig.js`);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user = {
    // #1 - GET /users/
    // Array of all the users in the database, who may be admin or customer type
    // status = !err ? 200 : 500
    all_users: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT *
                    FROM users;
                `;
                conn.query(sql_query, (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: result, status: 200 };
                        console.log(body);
                        return callback(body);
                    } else {
                        console.log('<<Query unsuccessful>>');
                        err.status = 500;
                        err.message = 'Internal Server Error';
                        console.log(err);
                        return callback(err);
                    }
                });
            } else {
                console.log('<<Connection error>>');
                err.status = 500;
                console.log(err);
                return callback(err);
            }
        });
    },
    // #2 - POST /users/
    // Used to add a new user to the database
    // status = !err ? 201 : 500
    insert_user: (req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    INSERT 
                    INTO users (username, email, type, password)
                    VALUES (?, ?, ?, ?);
                    INSERT
                    INTO hash_password (password, user_idx)
                    VALUES (?, (SELECT userid FROM users ORDER BY userid DESC LIMIT 1));
                    SELECT userid
                    FROM users
                    ORDER BY userid DESC
                    LIMIT 1;
                `;
                let { username, email, type, password } = req_body;
                console.log('generating salt');
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    console.log('hashing password');
                    bcrypt.hash(password, salt, (err, hash) => {
                        conn.query(sql_query, [username, email, type, hash, password], (err, result) => {
                            conn.end();
                            console.log('<<Connection ended>>');
                            if (!err) {
                                console.log('<<Query successful>>');
                                let body = { message: result[result.length - 1], status: 201 };
                                console.log(body);
                                return callback(body);
                            } else {
                                console.log('<<Query unsuccessful>>');
                                err.status = 500;
                                err.message = 'Internal Server Error';
                                console.log(err);
                                return callback(err);
                            }
                        });
                    });
                });
            } else {
                console.log('<<Query unsuccessful>>');
                err.status = 500;
                err.message = 'Internal Server Error';
                console.log(err);
                return callback(err);
            }
        });
    },
    // #3 - GET /users/:id
    // Retrieve a single user by their id
    // status = !err ? 200 : 500
    single_user: (userid, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT *
                    FROM users
                    WHERE userid = ?;
                `;
                conn.query(sql_query, [username], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: result, status: 200 };
                        console.log(body);
                        return callback(body);
                    } else {
                        console.log('<<Query unsuccessful>>');
                        err.status = 500;
                        err.message = 'Internal Server Error';
                        console.log(err);
                        return callback(err);
                    }
                });
            } else {
                console.log('<<Connection error>>');
                err.status = 500;
                console.log(err);
                return callback(err);
            }
        });
    },
    verify: (username, password, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT *
                    FROM users
                    WHERE username = ?
                    LIMIT 1;
                `;
                conn.query(sql_query, [username], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (err) {
                        console.log('<<Query unsuccessful>>');
                        err.status = 401;
                        err.message = 'Unauthorised';
                        console.log(err);
                        return callback(err, null);
                    }
                    console.log('Query Successful');
                    const user = result[0];
                    console.log(user.password);
                    console.log(password);
                    console.log('<<bcrypt comparing passwords>>')
                    bcrypt.compare(password, user.password, (error, compareResult) => {
                        console.log(compareResult);
                        if (error) {
                            console.log('<<comparing unsuccessful>>');
                            return callback(error, null);
                        }
                        if (!compareResult) {
                            console.log('<<no results>>');
                            return callback(null, null);
                        }
                        console.log('<comparing successful>');
                        return callback(null, user);
                    });
                });
            } else {
                console.log('<<Connection error>>');
                err.status = 500;
                console.log(err);
                return callback(err, null);
            }
        });
    },
    username: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT userid, username, type
                    FROM users
                    ORDER BY userid;
                `;
                conn.query(sql_query, (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: result, status: 200 };
                        console.log(body);
                        return callback(body);
                    } else {
                        console.log('<<Query unsuccessful>>');
                        err.status = 500;
                        err.message = 'Internal Server Error';
                        console.log(err);
                        return callback(err);
                    }
                });
            } else {
                console.log('<<Connection error>>');
                err.status = 500;
                console.log(err);
                return callback(err);
            }
        });

    },
    updatePermission: (req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    UPDATE users
                    SET type = ?
                    WHERE userid = ?;
                `;

                let userid = req_body.userid;
                let type = req_body.type;

                conn.query(sql_query, [type, userid],(err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: result, status: 204 };
                        console.log(body);
                        return callback(body);
                    } else {
                        console.log('<<Query unsuccessful>>');
                        err.status = 500;
                        err.message = 'Internal Server Error';
                        console.log(err);
                        return callback(err);
                    }
                });
            } else {
                console.log('<<Connection error>>');
                err.status = 500;
                console.log(err);
                return callback(err);
            }
        });

    }

};

module.exports = user;