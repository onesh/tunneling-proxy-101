const http = require('http');
const net = require('net');
const url = require('url');
const frame = require('./frame');
const headersHelper = require('./appendHeaders');
console.log(headersHelper);


const socketContainer = [];
// TODO tunneling proxy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
});

server.on('request', (req, res) => {
  console.log('incomming request from a tunneling proxy');
});



server.on('upgrade', (req, socket, head) => {

  socket.write(headersHelper.setSecretKey(req));
  socket.on('data', (data) => {
    var buffer = Buffer.from('hello client!');
    setTimeout(()=>{socket.write(frame(1, [0, 0, 0], 0x01, 0, buffer), 'UTF-8')}, 3000);
  });

});

server.listen(3035, '127.0.0.1');
