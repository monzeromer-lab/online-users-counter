const express = require("express");
const {
  createServer
} = require("http");
const {
  Server
} = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let count = 0;

io.on("connection", (socket) => {
  count++;
  io.emit("counter", count);

  socket.on("disconnect", () => {
    count--;
    io.emit("counter", count);

  });
});
httpServer.listen(process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));
