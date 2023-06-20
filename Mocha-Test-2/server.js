// server.js

const express = require('express');
const app = express();

app.use(express.json());

app.post('/items', (req, res) => {
    const { name, price } = req.body;
    if (req.body.name == 'Test Item'){
        res.status(201).json({ message: 'Item created successfully' });
    } else {
        res.status(404).json({ message: 'not found' });
    }
});

module.exports = app;
