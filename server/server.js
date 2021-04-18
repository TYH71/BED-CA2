// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

// setting path to .env
if (process.env.NODE_ENV === "development") {
    require('dotenv').config({ path: ".env.development" });
}

const app = require('./controller/app.js');

const hostname = 'localhost';
const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log("App hosted at localhost:" + port);
});