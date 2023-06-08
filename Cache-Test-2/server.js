
const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser'); //parse body of post req
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require("fs");
const cache = require("./cache.js");
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname)); //load scripts


app.get("/load", cache(10), (req, res) => {
    const data = fs.readFileSync('./data.txt','utf8');
    res.send(data);
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`);
    console.log("Test this at: ");
    console.log(`http://localhost:${PORT}/load`);
});

