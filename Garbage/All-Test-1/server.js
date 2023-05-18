const server = require('http');
const fs = require("fs");
const express = require("express");
const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL: 10}); 
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static(__dirname));

//Routes for Homepage:
app.get("/", (req, res) => {
    res.render("homepage", {text: "HELLO!"});
});


//Routes for Adding user data:
app.get("/add-data", (req, res) => {
    if (req.query.added != undefined){
        res.render("add-data", {addedData: "Added: " + req.query.added});
    } else {
        res.render("add-data");
    }
}); 

app.post("/add-data", (req, res) => {
    const newData = req.query.new + " ";
    
    fs.appendFile("database.txt", newData, err => {
        if(err){
            console.err;
            return;
        }
    })
    res.redirect('/add-data/?added=' + newData.slice(0,newData.length-1));
}); 


//Routes for Viewing user data:
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


//Route for Cache stats (testing)
app.get("/cache-stats", (req, res) => {       
    return res.send(myCache.getStats());
});


app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at the homepage: http://localhost:${PORT}`);
    console.log(`or  http://localhost:${PORT}/add-data`);
    console.log(`or  http://localhost:${PORT}/view-data
    `);
});