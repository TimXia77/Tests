const server = require('http');
var path = require('path');
const express = require("express");
const app = express();
const PORT = 3000;

const cache = require("./server/cache.js");
const dataLayer = require("./server/data.js");

app.use(express.urlencoded({extended: true})); 
app.set("view engine", "ejs");
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'views')));

//Routes for Homepage:
app.get("/", cache(5), (req, res) => {
    res.render("homepage");
});


//Routes for Adding user data:
app.get("/add-data", cache(5), (req, res) => {
    if (req.query.added != undefined){
        res.render("add-data", {addedData: "Added: " + req.query.added});
    } else {
        res.render("add-data");
    }
}); 

app.post("/add-data", (req, res) => {
    const newData = req.query.new + " ";
    dataLayer.addData(newData);
    res.redirect('/add-data/?added=' + newData.slice(0,newData.length-1));
}); 


//Routes for Viewing user data:
app.get("/view-data", cache(5), (req, res) => {
    res.render("datapage");
});

app.post("/view-data", (req, res)=> {
    let data = dataLayer.readData();
    res.json(data);
});

app.delete("/view-data", (req, res) => {
    let dataArr = dataLayer.readData().split(" ");

    //removing target out of the data
    dataArr.splice(dataArr.indexOf(req.query.target),1);
    let dataString = dataArr.join(' ');

    dataLayer.writeData(dataString);
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