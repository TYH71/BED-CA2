// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

const express = require("express");
const app = express();

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/login/", (req, res) => {
  res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/games/", (req, res) => {
  res.sendFile("/public/games.html", { root: __dirname });
});

app.get("/signup/", (req, res) => {
  res.sendFile("/public/signup.html", { root: __dirname });
});

app.get("/game/", (req, res) => {
  res.sendFile("/public/game.html", { root: __dirname });
});

app.get('/admin/', (req, res) => {
  res.sendFile("/public/admin.html", { root: __dirname });
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});