//NOTE: ejs is installed but not used - was testing
const server = require('http');

const fs = require("fs");

const express = require("express");
const path = require("path");

const NodeCache = require("node-cache");

const myCache = new NodeCache({stdTTL: 10}); // no proof via browser

const io = require('socket.io')(server)

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true})); //middleware that lets us get data from pages

app.set("view engine", "ejs");

app.use(express.static(__dirname));

//Homepage
app.get("/", (req, res) => {
    res.render("homepage", {text: "HELLO!"});
});

//Add user data
app.get("/add-data", (req, res) => {
    if (req.query.added != undefined){
        res.render("add-data", {addedData: "Added: " + req.query.added});
    } else {
        res.render("add-data");
    }
}); 

app.post("/add-data", (req, res) => {
    if ((req.body.newData).trim() == ""){
        res.redirect("/add-data");
    } else {
        const newData = (req.body.newData).trim() + ":";

        console.log("Added: " + newData); //FOR TESTING, DELETE LATER
    
        fs.appendFile("database.txt", newData, err => {
            if(err){
                console.err;
                return;
            }
        })
        res.redirect('/add-data/?added=' + newData.slice(0,newData.length-1));
    }
}); 

//show user data and allow deletion
app.get("/view-data", (req, res) => {
    fs.readFile("database.txt", "utf8", (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        res.render("datapage", {data: data});
    });
});

app.post("/view-data", (req, res)=> {
    fs.readFile("database.txt", "utf8", (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        res.json(data);
    });
});

// app.get("/cache-stats", (req, res) => {       //FOR TESTING, DEL LATER
//     return res.send(myCache.getStats());
// });

app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at http://localhost:${PORT}`);
    console.log(`or  http://localhost:${PORT}/add-data`);
    console.log(`or  http://localhost:${PORT}/view-data
    `);
});