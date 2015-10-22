var socket = io.connect('http://localhost:8080');

socket.on('message', function (data) {
  console.log(data);
});

function send (message) {
  socket.emit('message', message);
}
