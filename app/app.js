var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var nicknames = [];

// Route to
app.use(express.static(__dirname + '/client'));

// Receive message
io.on('connection', function (socket) {
  socket.on('new user', function (data, callback) {
    if (nicknames.indexOf(data) != -1) {
      callback(false); // callback({isValid: false})
    }
    else {
      callback(true);
      socket.nickname = data;                                                     // store each nickname to the socket
      nicknames.push(socket.nickname);
      updateNicknames();
    }
  });

  console.log('a user connected');
  socket.emit('message', 'hello');

  // Send message
  socket.on('message', function (data) {
    console.log('message: ' + data)
    socket.broadcast.emit('message', data);
    // socket.emit('message', {msg: data, nick: socket.nickname})
    // socket.broadcast.emit('message', {msg: data, nick: socket.nickname});
  });

  // Update nicknames
  function updateNicknames() {
    io.sockets.emit('usernames', nicknames);
  }

  // Disconnect
  socket.on('disconnect', function (data) {
    console.log('user disconnected');
    if (!socket.nickname) return;
    nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    updateNicknames();
  });
});


// Server Listen
server.listen(8080, function() {
  console.log('listening on port: 8080');
});
