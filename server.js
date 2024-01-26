const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer();
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const messages = [];

io.on("connection", (socket) => {
  // Emit existing messages to the new connection
  messages.forEach((message) => socket.emit("chat", message));

  // Listen for incoming chat messages
  socket.on("chat", (message) => {
    // Broadcast the message to all connected clients
    socket.broadcast.emit("chat", message);
    
    // Store the message in the server's message list
    messages.push(message);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
