
const fs = require("fs");

function addData(newData){
    fs.appendFile("../login.txt", newData, err => {
        if(err){
            console.err;
            return;
        }
    });
}

function readData(){
    return fs.readFileSync('../login.txt','utf8');
}

function writeData(dataString){
    fs.writeFile("../login.txt", dataString, err => {
        if (err){
            console.error(err);
            console.log("error occured when updating login textfile");
            return;
        }
    });
}

module.exports = {
    addData,
    readData,
    writeData
};