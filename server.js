const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer);

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// SOCKET IO CONNECTION
io.on('connection', (socket) => {
    console.log('Connected....')
    socket.on('message', (msg) => {

        socket.broadcast.emit('message', msg)
    })
})

httpServer.listen(PORT, () => {
    console.log(`Your Server is listening @ ${PORT}`)
});