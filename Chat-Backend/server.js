const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');


const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5175",
        methods: ["GET", "POST"]
    }
});

// In-memory message storage
let messages = [
    { id: 1, user: 'Alice', text: 'Hello!', timestamp: new Date() },
    { id: 2, user: 'Bob', text: 'Hey there!', timestamp: new Date() }
];

app.get('/', (req, res) => {
    res.send("hey there welcome to the chat app");
});


app.get('/messages', (req, res) => {
    try {
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', (data) => {
    try {
      // Add timestamp and ID to the message
      const message = {
        id: messages.length + 1,
        user: data.user || 'Anonymous',
        text: data.text,
        timestamp: new Date()
      };

      // Store the message
      messages.push(message);

      // Broadcast message to ALL connected clients
      io.emit('receive_message', message);
    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
    console.log("server is running on port 3001");
});