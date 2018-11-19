const express = require('express');
const app = express();

app.get('/eventstream', (req, res, next) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    app.on('message', data => {
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
});

app.post('/message', (req, res, next) => {
    const message = req.body.message;
    // ...
    // Some code here to handle the message, 
        // by saving it in a database for instance
    // ...
    app.emit('message', { 
        title: 'New message!',
                message,
                timestamp: new Date() 
        });
})