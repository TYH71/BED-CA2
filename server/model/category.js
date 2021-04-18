// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

const db = require('../db/databaseConfig.js');

const category = {
    // #4 - POST /category/
    // Inserts a new category
    // status 204, 422 if already exists, 500 for everything else
    insert_category: (req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    INSERT 
                    INTO category (catname, description)
                    VALUES (?, ?);
                `;
                let { catname, description } = req_body;
                conn.query(sql_query, [catname, description], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: null, status: 204 };
                        console.log(body);
                        return callback(body);
                    } else if (err.errno === 1062) {
                        console.log('<<SQL Error: Duplicate entry>>');
                        err.status = 422;
                        err.message = 'Unprocessable Entry';
                        console.log(err);
                        return callback(err);
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
    // #5 - PUT /category/:id/
    // Update a category. ID and created
    // status 204, 422 if already exists, 500 for everything else
    update_category: (catid, req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    UPDATE category 
                    SET catname = ?, description = ?
                    WHERE catid = ?;
                `;
                let { catname, description } = req_body;
                conn.query(sql_query, [catname, description, catid], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: null, status: 204 };
                        console.log(body);
                        return callback(body);
                    } else if (err.errno === 1062) {
                        console.log('<<SQL Error: Duplicate entry>>');
                        err.status = 422;
                        err.message = 'Unprocessable Entry';
                        console.log(err);
                        return callback(err);
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
    // Bonus feature - GET /category
    // retrieve all the category
    get: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT *
                    FROM category;
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
    }
};

module.exports = category;