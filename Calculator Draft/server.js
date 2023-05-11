const express = require('express')
const http = require('http')
const PORT = process.env.PORT || 3000
const app = express()

//Some middleware to aid finding static files
app.use(express.static(__dirname))

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/calculator.html')
})

app.get('/history', (request, response) => {
  response.sendFile(__dirname + '/views/history.html')
})

//starting the server, 
app.listen(PORT, function(err){
    if (err) console.log("An error has occured: Error when setting up the server.")
    
    console.log("Server listening on Port", PORT)
    console.log(`Test the calculator on: http://localhost:${PORT}`) //delete the test me logs later
    console.log(`You can see the history on: http://localhost:${PORT}/history`)
})

