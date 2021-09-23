const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

const httpServer = http.createServer(app)

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));



httpServer.listen(PORT, () => {
    console.log(`Your Server is listening @ ${PORT}`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// socket io

const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
    console.log('Connected....')


    socket.on('message', (msg) => {

        socket.broadcast.emit('message', msg)

    })


})