// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

const db = require('../db/databaseConfig.js');
const path = require('path');

const image = {
    upload: (req, gameid, callback) => {
        let image = `/gameimg/${path.basename(req.file.path)}`;
        console.log(image, gameid);
        let conn = db.getConnection();
        conn.connect((err) => {
            if (!err) {
                console.log('<<Connection Established>>');
                let sql_query = `
                    INSERT INTO image(imgpath, game_id)
                    VALUES (?, ?);
                    SELECT imgid
                    FROM image
                    ORDER BY imgid DESC
                    LIMIT 1;
                `;
                conn.query(sql_query, [image, gameid], (err, result) => {
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
                console.log('<<Connection error>>');
                err.status(500);
                console.log(err.message);
                return callback(err);
            }
        });
    }
};

module.exports = image;