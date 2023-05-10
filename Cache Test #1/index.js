const express = require("express");
const fetch = require("node-fetch");

const NodeCache = require("node-cache");

const myCache = new NodeCache({stdTTL: 5}); //cache is 

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`)
    console.log(`Test this at ${"http://localhost:3000"}`)
});