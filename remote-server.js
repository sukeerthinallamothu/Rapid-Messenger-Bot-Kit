// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const VALIDATION_TOKEN = process.env.VALIDATION_TOKEN;

app.use(bodyParser.json());

// Handle webhook verification from Facebook
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

// Handle incoming Messenger events
app.post('/webhook', (req, res) => {
    let event = req.body;
    console.log("Received event:", event);
    res.sendStatus(200); // Acknowledge the event
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log("Server running"));
