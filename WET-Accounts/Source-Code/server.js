
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser'); //parse body of post req
const bcrypt = require("bcrypt");

const dataLayer = require("./data.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); //load scripts

const registerPage = ["/", "/register"];

//Login Page:
app.get(registerPage, (req, res) => {
    res.sendFile(__dirname + '/register-en.html');
});

app.post(registerPage, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password1, 10); //salt is saved with the hashed password automatically
        const user = JSON.stringify({email: req.body.email1, username: req.body.username1, password: hashedPassword});
        console.log("\nRegistry information (w/hashed): " + user);

        dataLayer.addData(user);

        res.status(201).send("Registered!");
    } catch {
        res.status(500).send("Error Registering!");
    }

});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + '/login-en.html');
});

app.post("/login", (req, res) => {
    const dataArr = JSON.parse(`[${dataLayer.readData()}]`); //array with user information
    const targetUser = dataArr.find(user => user.username === req.body.username1); 

    if (targetUser == null) {
        return res.status(400).send('Cannot find username')
    }

    //if user found:
    try {
        if (bcrypt.compareSync(req.body.password1, targetUser.password)){
            res.send("Logged In!");
        } else {
            res.send("Invalid Password.")
        }
    } catch {
        res.status(500).send();
    }

});

app.get("/completed", (req, res) => {
    res.send("Check Server Terminal for result.");
});


app.listen(PORT, () => {
    console.log(`Cache Test #1 is running on port ${PORT}.`);
    console.log(`Test this at the homepage: http://localhost:${PORT}`);

});