// Create express server app
const express = require('express');
const app = express();

// Create http server
const http = require('http');
const server = http.createServer(app);

// IO websocket creation
const { Server } = require('socket.io');
const io = new Server(server);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
