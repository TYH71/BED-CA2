// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

// import modules
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken')

// import self-made modules
const user = require('../model/user.js');
const cat = require('../model/category.js');
const game = require('../model/game.js');
const review = require('../model/review.js');
const image = require('../model/image.js');
const isLoggedInMiddleware = require('../auth/isLoggedInMiddleware.js');
const adminAuth = require('../auth/isLoggedInAdmin.js');
const isLoggedInAdmin = require('../auth/isLoggedInAdmin.js');
const JWT_SECRET = process.env.JWT_SECRET;

// create express object
const app = express();

// create url encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create image storage and image uploading
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(__dirname);
        callback(null, path.resolve(`${__dirname}/../../client/public/gameimg/`));
    },
    filename: (req, file, callback) => {
        console.log(file.toString());
        let image_path = `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`;
        console.log(`Path: ${image_path}`);
        callback(null, image_path);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        // should only accept jpg images
        if (file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png' && file.mimetype != 'image/jfif') {
            return callback('Error: only can have images with .jpg, .png, .jpeg, or .jfif extension')
        }
        callback(null, true)
    }
}).single('image');

// middlewares
app.use(cors());
app.use(bodyParser.json()); // parse appilcation/json data
app.use(urlencodedParser); // parse urlencoded data


// requests details
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Path: ${req.path}`);
    next();
});

// authenticate admin
app.post('/authAdmin', (req, res) => {
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader == null || authHeader == undefined || !authHeader.startsWith('Bearer ')) {
        console.log('token is empty');
        res.status(403).send();
        return
    }
    let token = authHeader.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, { algorithm: ['HS256'] }, (error, decodedToken) => {
        if (error) {
            res.status(403).send();
            return
        }
        if (decodedToken.type != 'admin') {
            res.status(403).send();
            return
        } else {
            res.status(200).send();
            return
        }
    });
});

// bonus req - image uploading
app.post('/image/:gameid', (req, res) => {
    let gameid = req.params.gameid;

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('Multer error during uploading');
            res.status(500).type('application/json').json({ 'Message': 'Internal Server Error' });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('Something else went wrong');
            res.status(500).type('application/json').json({ 'Message': 'Internal Server Error' });
        }
        // Everything went fine.
        image.upload(req, gameid, (obj) => {
            res.status(obj.status).type('application/json').json(obj.message);
        });
    });
});

// POST /login/
// Login endpoint
app.post("/login", (req, res) => {
    console.log(req.body);
    let { username, password } = req.body;
    user.verify(username, password, (error, user) => {
        console.log(user);
        if (error) {
            next(error);
            return;
        }
        if (user === null) {
            res.status(401).send();
            return;
        }
        const payload = { user_id: user.id, type: user.type };
        jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(401).send();
                return;
            }
            res.status(200).send({
                token: token,
                user_id: user.userid,
                type: user.type
            });
        })
    });
});

// #1 - GET /users/
// Array of all the users in the database, who may be admin or customer type
app.get('/users/', (req, res) => {
    user.all_users((obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #2 - POST /users/
// Used to add a new user to the database
app.post('/users/', (req, res) => {
    user.insert_user(req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #3 - GET /users/:id/
// Retrieve a single user by their id
app.get('/users/:id/', (req, res) => {
    let userid = req.params.id;
    user.single_user(userid, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #4 - POST /category/
// Inserts a new category
app.post('/category/', adminAuth, (req, res) => {
    cat.insert_category(req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #5 - PUT /category/:id/
// Update a category. ID and created
app.put('/category/:id/', (req, res) => {
    let catid = req.params.id;
    cat.update_category(catid, req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// get all category
app.get('/category/', (req, res) => {
    cat.get((obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
})

// #6 - POST /game/
// Used to add a new game to the database
app.post('/game/', adminAuth, (req, res) => {
    game.insert_game(req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #7 - GEt /games/:platform
// Retrieves all games of a certain platform
app.get('/games/:platform', (req, res) => {
    let platform = req.params.platform;
    console.log(req.body);
    let title = req.query.title;
    let price = req.query.price;
    let catid = req.query.category;
    let year = req.query.year;
    game.platform(platform, { title, price, catid, year }, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// GET /games
// Retrieve all games
app.get('/games/', (req, res) => {
    game.all_games((obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #8 - DELETE /game/:id
// Deletes a game given its id. 
// The associated reviews related to the game would also be deleted (cascade delete)
app.delete('/game/:id', (req, res) => {
    let gameid = req.params.id;
    game.delete_game(gameid, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #9 - PUT /game/id
// Updates a game listing
app.put('/game/:id', (req, res) => {
    let gameid = req.params.id;
    game.update_game(gameid, req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #10 - POST /user/:uid/game/:gid/review
// add a new review to the database for a given user and game
app.post('/user/:uid/game/:gid/review', isLoggedInMiddleware, (req, res) => {
    let { uid, gid } = req.params;
    console.log(req.body);
    let content = req.body.content;
    let rating = req.body.rating
    review.insert_review(uid, gid, { content, rating }, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// #11 - GET /game/:id/review
// Retrieve reviews of a particular game,
// including info like the username
app.get('/game/:id/review', (req, res) => {
    let gameid = req.params.id;
    review.game_review(gameid, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

// GET /searchGames/
app.get('/searchGames', (req, res) => {
    let title = req.body.title;
    let platform = req.body.platform;
    let price = req.body.price;
    game.search_games(req.body, (obj) => {

    });
});

// get all the platforms
app.get('/allPlatform', (req, res) => {
    game.all_platform((obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

app.get('/title/', (req, res) => {
    let title = req.query.title;
    game.title_game(title, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
})

app.get('/year/', (req, res) => {
    game.all_year(obj => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

app.get('/username/', (req, res) => {
    user.username(obj => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});

app.put('/editPermission', isLoggedInAdmin, (req, res) => {
    user.updatePermission(req.body, (obj) => {
        res.status(obj.status).type('application/json').send(obj.message);
    });
});


// Shitty programming
app.use((req, res) => {
    res.status(404).type('html').send('<html><body>requests is not recognised<body></html>');
});

module.exports = app;
