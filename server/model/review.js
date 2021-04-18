// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

const db = require('../db/databaseConfig.js');

const review = {
    // #10 - POST /user/:uid/game/:gid/review
    // add a new review to the database for a given user and game
    insert_review: (userid, gameid, req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    INSERT INTO review (userid, gameid, content, rating)
                    VALUES (?, ?, ?, ?);
                    SELECT reviewid
                    FROM review
                    ORDER BY reviewid DESC
                    LIMIT 1;
                `;
                let { content, rating } = req_body;
                conn.query(sql_query, [userid, gameid, content, rating], (err, result) => {
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
            } else {
                console.log('<<Query unsuccessful>>');
                err.status = 500;
                err.message = 'Internal Server Error';
                console.log(err);
                return callback(err);
            }
        });
    },
    // #11 - GET /game/:id/review
    // Retrieve reviews of a particular game,
    // including info like the username
    game_review: (gameid, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT gameid, content, rating, username, r.created_at
                    FROM review r
                    INNER JOIN users u
                    ON r.userid = u.userid
                    WHERE gameid = ?;
                `;
                conn.query(sql_query, [gameid], (err, result) => {
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
    // 
    top3: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT *
                    FROM review
                    ORDER BY rating DESC
                    LIMIT 3;
                `;
                conn.query(sql_query, (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        console.log(result);
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
    }
}

module.exports = review;