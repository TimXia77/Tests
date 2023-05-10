const express = require("express");
const fetch = require("node-fetch");

const NodeCache = require("node-cache");

const myCache = new NodeCache({stdTTL: 5}); //cache is cleared after 5 seconds

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/textfile", (req, res) => {
    // if (myCache.has("textfile")){
    //     console.log("getting from cache");
    //     return res.send(myCache.get("textfile"));
    // } else {
    //     console.log("getting from server");
    //     let filePath = __dirname + "/index.html";
    //     myCache.set("textfile", __dirname + "/index.html");
    //     res.sendFile(filePath);
    // }

    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at ${"http://localhost:3000"}`);
});