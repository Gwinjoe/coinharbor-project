const express = require("express");
const path = require("path");
const App = express();
const port = process.env.PORT || 3000;

App.use(express.urlencoded({extended: false}));

App.use(express.json());


App.use(express.static(path.join(__dirname, "..", "frontend", "assets")));

App.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "index.html"))
})
App.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "auth", "sign-up.html"))
})

App.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "auth", "log-in.html"))
})

App.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "index.html"))
})

App.get("/lock", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "auth", "lock-screen.html"))
})

App.get("/confirm-mail", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "auth", "confirm-mail.html"))
})

App.get("/passwordrecovery", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "app", "auth", "password-recovery.html"))
})

App.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
