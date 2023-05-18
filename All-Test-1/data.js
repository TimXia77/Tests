
const fs = require("fs");

function addData(newData){
    fs.appendFile("database.txt", newData, err => {
        if(err){
            console.err;
            return;
        }
    });
}

function readData(){
    return fs.readFileSync('database.txt','utf8');
}

function writeData(dataString){
    fs.writeFile("database.txt", dataString, err => {
        if (err){
            console.error(err);
            console.log("error occured when updating database textfile");
            return;
        }
    });
}

module.exports = {
    addData,
    readData,
    writeData
};