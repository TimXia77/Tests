// const server = require('http');
// const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser'); //parse body of post req

const dataLayer = require("./data.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); //load scripts

const loginPage = ["/", "/login"];

//Login Page:
app.get(loginPage, (req, res) => {
    res.sendFile(__dirname + '/login-en.html');
});

app.post(loginPage, (req, res) => {

    const user = JSON.stringify({email: req.body.email1, username: req.body.username1, password: req.body.password1});
    console.log("user: " + user);

    dataLayer.addData(user);

    res.redirect("/completed");
});

app.get("/completed", (req, res) => {
    res.send("Check Server Terminal for result.");
});


app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at the homepage: http://localhost:${PORT}`);

});