// const server = require('http');
// const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser'); //parse body of post req

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); //load scripts

const loginPage = ["/", "/login"];

//Login Page:
app.get(loginPage, (req, res) => {
    res.sendFile(__dirname + '/login-en.html');
});

app.post(loginPage, (req, res) => {
    console.log("First Name: " + req.body.fname1);
    console.log("Last Name: " + req.body.lname1);

    res.redirect("/completed");
});

app.get("/completed", (req, res) => {
    res.send("Check Server Terminal for result.");
});


app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at the homepage: http://localhost:${PORT}`);

});