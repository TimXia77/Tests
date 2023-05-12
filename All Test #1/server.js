//NOTE: ejs is installed but not used - was testing

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
    //res.sendFile(__dirname + "/views/homepage.html", {text: "hi"});
    res.render("homepage", {text: "HELLO!"});
});

//Add user data
app.get("/add-data", (req, res) => {

}); 

//show user data and allow deletion
app.get("/user-data", (req, res) => {

});

app.get("/cache-stats", (req, res) => {       //FOR TESTING, DEL LATER
    return res.send(myCache.getStats());
});

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at http://localhost:${PORT}`);
    console.log(`or  http://localhost:${PORT}/add-data`);
    console.log(`or  http://localhost:${PORT}/user-data`);
});