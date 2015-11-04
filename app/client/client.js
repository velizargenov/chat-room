var socket = io.connect('http://localhost:8080');
var $message = $('#msg');
var $messages = $('#messages');
var $nickForm = $("#set-username");
var $nickError = $(".error");
var $nickBox = $("#nickname");
var $users = $(".users");


socket.on('message', function (data, username) {
  console.log(data);
  console.log("username: ", username)
});

// Set username
$("#submit-name").on("click", function () {
  socket.emit('new user', $nickBox.val(), function (data) {
    if (data) {
      $('.details-wrapper').hide();
      $(".content-wrapper, .user-summery").addClass("content-show");
    }
    else {
      $nickError.html('The username is already taken, please try again');
    }
  });
  $nickBox.val("");
});


// Display online users
socket.on('usernames', function (data) {
  var names = '';
  for (var i = 0; i < data.length; i++) {
    names += data[i] + '<br/>';
  }
  $users.html(names);
});


// Submit message
$('.chat-wrapper').find('form').submit(function () {
  var val = $message.val();
  socket.emit('message', val);
  appendMessage(val);
  $message.val('');
  return false;
});


// Send message
socket.on('message', appendMessage);
function appendMessage(data) {
  $messages.append($('<li>').text(data));
  console.log('nick: ', data.nick);
  console.log('msg: ', data.msg);
  // $messages.append('<b>' + data.nick + ': </b>' + data.msg);
}


// Minimize chat box
$(document).on("click", ".chat-close", function() {
  $(".chat-wrapper").hide();
});

var $height = $(".chat-wrapper").height();

if ($height > 50) {
  $(document).on("click", ".chat-minimize", function() {
    console.log('1', $height)
    $("form").css('position', 'relative');
    $(".chat-wrapper").animate({height:30}, 100);
  });
}

if ($height < 50) {
  $(document).on("click", ".chat-minimize", function() {
    console.log('2', $height)
    $(".chat-wrapper").hide()
  });
}
