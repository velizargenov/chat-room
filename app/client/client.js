require('./styles.less')
var io = require('socket.io-client');
var $ = require('jquery');

var socket = io.connect('http://localhost:8000');
var $message = $('#msg');
var $messages = $('#messages');
var $nickForm = $("#set-username");
var $nickError = $(".error");
var $nickBox = $("#nickname");
var $users = $(".users");

alert("asdsad");


// User Typing
$("#msg").on("keyup", function (event) {
  console.log("1 here")
  socket.emit("sender", {
      name: name
  });
});

socket.on("sender", function (data) {
  console.log("2 here")
  $("#status").html(data + " is typing");

  setTimeout(function () {
      $("#status").html('');
  }, 5000);
});
socket.on('message', function (data, username) {
  console.log(data);
  console.log("username: ", username)
});


// Set username
$("#submit-name").on("click", function () {
  // Validation
  $nickBox.focus(function () {
    if ($nickBox.hasClass("error")) {
      $nickBox.removeClass("error");
      $nickBox.val("");
    }
  });
  if (!$nickBox.val().match(/\S+@\S+\.\S+/)) {
    $nickError.text("Please enter a nickname").addClass("error");
  }
  console.log("val: ", $nickBox.val())
  if ($nickBox.val() !== "") {
    var nameObject = { 'name' : $nickBox.val() };
    localStorage.setItem('nameObject', JSON.stringify(nameObject)); // store name in localStorage
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
  }
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

  // Store nickname locally in order to display
});


// Send message
socket.on('message', appendMessage);
function appendMessage(data) {
  var nickObject = localStorage.getItem('nameObject');
  console.log('nick: ', nickObject);
  console.log('msg: ', data.msg);
  $messages.append($('<li>').html('<b>' + nickObject + ': </b>' + data.msg));
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
