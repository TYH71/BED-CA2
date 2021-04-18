// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

const db = require('../db/databaseConfig.js');

const game = {
    // #6 - POST /game/
    // Used to add a new game to the database
    insert_game: (req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    INSERT INTO game (title, description, price, platform, categoryid, year)
                    VALUES (?, ?, ?, ?, ?, ?);
                    SELECT gameid
                    FROM game
                    ORDER BY gameid desc
                    LIMIT 1;
                `;
                let { title, description, price, platform, categoryid, year } = req_body;
                conn.query(sql_query, [title, description, price, platform, categoryid, year], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        let body = { message: result[result.length - 1], status: 201 };
                        return callback(body);
                    } else {
                        console.log('<<Query unsuccessful>>');
                        err.status = 500;
                        err.message = 'Internal Server Error';
                        console.log(err.message);
                        return callback(err);
                    }
                });
            } else {
                console.log('<<Query unsuccessful>>');
                err.status = 500;
                err.message = 'Internal Server Error';
                console.log(err.message);
                return callback(err);
            }
        });
    },
    // #7 - GET /games/:platform
    // Retrieves all games of a certain platform
    platform: (platform, req_body, callback) => {
        let { title, price, catid, year } = req_body;
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT gameid, title, g.description, price, platform, catid, catname, year, g.created_at, i.imgpath
                    FROM game g
                    INNER JOIN category c
                    ON g.categoryid = c.catid
                    LEFT JOIN image i
                    ON g.gameid = i.game_id
                    ${platform != 'all' && platform != null ? `WHERE platform = '${platform}'` : 'WHERE platform LIKE \'%%\''}
                    ${catid != 'all' && catid != null ? `AND catid = ${catid}` : ''}
                    ${year != 'all' && year != null ? `AND year = ${year}` : ''}
                    ${title == "" || title == null ? '' : `AND title LIKE '%${title}%'`}
                    ${price == "" || price == null ? '' : `AND price <= '${price}'`}
                    ORDER BY gameid ASC;
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
    // #8 - DELETE /game/:id
    // Deletes a game given its id. 
    // The associated reviews related to the game would also be deleted (cascade delete)
    delete_game: (gameid, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    DELETE
                    FROM game
                    WHERE gameid = ?;
                    DELETE
                    FROM review
                    WHERE gameid = ?;
                `;
                conn.query(sql_query, [gameid, gameid], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        console.log(result);
                        let body = { message: null, status: 204 };
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
    // #9 - PUT /game/id
    // Updates a game listing
    update_game: (gameid, req_body, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    UPDATE game
                    SET title = ?, 
                    description = ?, 
                    price = ?, 
                    platform = ?, 
                    categoryid = ?,
                    year = ?
                    WHERE gameid = ?;
                `;
                const { title, description, price, platform, categoryid, year } = req_body;
                conn.query(sql_query, [title, description, price, platform, categoryid, year, gameid], (err, result) => {
                    conn.end();
                    console.log('<<Connection ended>>');
                    if (!err) {
                        console.log('<<Query successful>>');
                        console.log(result);
                        let body = { message: null, status: 204 };
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
    all_games: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT gameid, title, g.description, price, platform, c.catname, year, i.imgpath
                    FROM game g
                    INNER JOIN category c
                    ON g.categoryid = c.catid
                    LEFT JOIN image i
                    ON g.gameid = i.game_id
                    ORDER BY RAND();
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
    all_platform: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT platform
                    FROM game;
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
    // search games by title
    title_game: (title, callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT gameid, title, g.description, price, platform, catid, catname, year, g.created_at, i.imgpath
                    FROM game g
                    INNER JOIN category c
                    ON g.categoryid = c.catid
                    LEFT JOIN image i
                    ON g.gameid = i.game_id
                    WHERE title = ?
                    ORDER BY gameid ASC;
                    SELECT AVG(rating), COUNT(rating)
                    FROM review r
                    INNER JOIN game g
                    WHERE g.title = ? AND 
                    g.gameid = r.gameid;
                `;
                conn.query(sql_query, [title, title], (err, result) => {
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
    all_year: (callback) => {
        const conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection established>>');
                let sql_query = `
                    SELECT year
                    FROM game
                    ORDER BY year;
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

module.exports = game;