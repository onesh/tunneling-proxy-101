window.onload = (function () {
    var messageContainer = document.querySelector('.message-container');
    var socket = new WebSocket('ws://127.0.0.1:3035');
    var message = '';
    console.log(socket);
    socket.onopen =  function (e){
      console.log('socket connected to the server....', e);
      socket.send('connected...')
    };
    socket.onclose = function () {
      console.log('socket connection closed');
    };
    socket.onmessage = function (event) {
      console.log('message recieved:', event.data);
      messageContainer.innerHTML += '<div class="message-view">' + event.data + '</div>';
      setTimeout(()=>{socket.send('hello server!')}, 3000);
    };
    socket.ondata = function (data) {
    }
    socket.onerror = function (err) {
      console.log(err);
    };
}).bind(window);
