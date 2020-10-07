var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({});

app.use("/", (req, res) => {
  proxy.web(req, res, { target: "http://localhost:3000" });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("received chat message:", msg);
    io.emit("chat message", msg);
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
