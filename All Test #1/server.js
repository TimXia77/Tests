//NOTE: ejs is installed but not used - was testing

const fs = require("fs");

const express = require("express");
const path = require("path");

const NodeCache = require("node-cache");

const myCache = new NodeCache({stdTTL: 10}); // no proof via browser

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true})); //middleware that lets us get data from pages

app.set("view engine", "ejs");

//Homepage
app.get("/", (req, res) => {
    res.render("homepage", {text: "HELLO!"});
});

//Add user data
app.get("/add-data", (req, res) => {
    res.render("add-data");
}); 

app.post("/add-data", (req, res) => {
    const newData = req.body.newData + "\n";

    console.log("Added: " + newData); //FOR TESTING, DELETE LATER

    fs.appendFile("database.txt", newData, err => {
        if(err){
            console.err;
            return;
        }
    })
    //res.redirect('/view-data');
    //res.end("post req ended!");
    res.render("add-data", {text: "Added: " + newData});
}); 

//show user data and allow deletion
app.get("/view-data", (req, res) => {
    fs.readFile("database.txt", "utf8", (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        //res.send(data);
        res.render("datapage", {data: data});
    });
});

app.get("/cache-stats", (req, res) => {       //FOR TESTING, DEL LATER
    return res.send(myCache.getStats());
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at http://localhost:${PORT}`);
    console.log(`or  http://localhost:${PORT}/add-data`);
    console.log(`or  http://localhost:${PORT}/view-data
    `);
});