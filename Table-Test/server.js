// const server = require('http');
// const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

// const cache = require("./cache.js");
// const dataLayer = require("./data.js");

// app.use(express.urlencoded({extended: true})); 
// app.set("view engine", "ejs");

app.use(express.static(__dirname)); //load scripts

//Routes for Homepage:
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/tableTest.html');
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at the homepage: http://localhost:${PORT}`);

});