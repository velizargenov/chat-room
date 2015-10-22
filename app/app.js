var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use(express.static(__dirname + '/client'));

io.on('connection', function (socket) {
  console.log('connected');
  socket.emit('message', 'hello');
  socket.on('message', function (message) {
    console.log(message)
    socket.broadcast.emit('message', message);
  });
});
