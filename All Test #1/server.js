const express = require("express");
//const fetch = require("node-fetch");

const NodeCache = require("node-cache");

const myCache = new NodeCache({stdTTL: 10}); // no proof via browser

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    // res.send("Hello World");
});

app.get("/textfile", (req, res) => {
    if (myCache.has("textfile")){
        console.log("getting from cache");
        return res.sendFile(myCache.get("textfile"));
    } else {
        console.log("getting from server");
        let filePath = __dirname + "/textfile.txt";
        myCache.set("textfile", __dirname + "/textfile.txt");
        res.sendFile(filePath);
    }
});

app.get("/stats", (req, res) => {       //FOR TESTING, DEL LATER
    return res.send(myCache.getStats());
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at ${"http://localhost:3000"}`);
    console.log(`or  ${"http://localhost:3000/textfile"}`);
    console.log(`or  ${"http://localhost:3000/stats"}`);
});