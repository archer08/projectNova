const io = require("socket.io")();

// Listen for connections from clients
io.on("connection", (socket: any) => {
  console.log("Client connected:", socket.id);

  // Listen for incoming data from the client
  socket.on("purchase", (data: string) => {
    console.log("Received data:", data);

    // Broadcast the data to all connected clients (excluding the sender)
    socket.broadcast.emit("data", data);
  });
  socket.on("message", (data: string) => {});

  // Listen for disconnections from clients
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start listening for incoming connections on port 3000
io.listen(3000, () => {
  console.log("Socket.io server listening on port 3000");
});
