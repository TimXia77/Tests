

const server = require('http');
const fs = require("fs");
const express = require("express");
const path = require("path");
const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL: 10}); 
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
        const newData = (req.body.newData).trim() + " ";

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
        res.render("datapage");
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

app.delete("/view-data", (req, res) => {
    console.log("delete request received!");
    console.log(req.query.target); //whats to be deleted
    let dataArr = [];

    fs.readFile("database.txt", "utf8", (err, data) => {
        if (err){
            console.error(err);
            return;
        }

        dataArr = data.split(" ");

        dataArr.splice(dataArr.indexOf(req.query.target),1);

        let dataString = dataArr.join(' ');
        fs.writeFile("database.txt", dataString, err => {
            if (err){
                console.error(err);
                console.log("error occured when updating database textfile");
                return;
            }
        });
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