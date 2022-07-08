// requires
const cors = require('cors');

// Port used by express server
const port = process.env.PORT || 5000;

// use cors
app.use(cors);

// Create express server app
const express = require('express');
const app = express();

// Create http server
const httpServer = require('http').createServer(app);
// Web Socket called on the server with cors
const { ioServer } = require('socket.io');
const io = new ioServer(httpServer, {
  //CORS is needed because HTTP requests sent by the frontend are allowed to reach the server.
  cors: {
    origin: 'http://localhost:3000', // This will communicate with the client
  },
});

// route that is used to send data to a file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// IO websocket connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Server is listening on that port
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
