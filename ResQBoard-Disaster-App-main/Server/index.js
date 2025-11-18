// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);

  // This is the same as before
  socket.on('newPost', (post) => {
    console.log('Got a new post, broadcasting it...');
    socket.broadcast.emit('receivePost', post);
  });

  // --- NEW FEATURE: Syncing old posts ---
  // This listens for a user who has just reconnected
  socket.on('syncMyPosts', (postsFromClient) => {
    console.log(`Receiving ${postsFromClient.length} posts to sync...`);
    // It takes the list of posts and sends them out to everyone else
    postsFromClient.forEach(post => {
      socket.broadcast.emit('receivePost', post);
    });
  });

});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});