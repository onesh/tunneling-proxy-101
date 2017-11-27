const http = require('http');
const net = require('net');
const url = require('url');
const frame = require('./frame');
const headersHelper = require('./appendHeaders');
const connectionManager = require('./connectionsManager');
console.log(connectionManager);


const socketContainer = [];
// TODO tunneling proxy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
});

server.on('request', (req, res) => {
  console.log('incomming request from a tunneling proxy');
});

server.on('connection', (req, res) => {
  console.log('connected a socket to the server...');
  connectionManager.addConnections(socket);
});

server.on('upgrade', (req, socket, head) => {
  console.log(new Date());
  socket.write(headersHelper.setSecretKey(req));

  socket.on('data', (data) => {
    var buffer = Buffer.from('hello client!');
    setTimeout(()=>{socket.write(frame(1, [0, 0, 0], 0x01, 0, buffer), 'UTF-8')}, 3000);
  });

  socket.on('end', function () {
    connectionManager.closeConnection(socket);
  });
});

server.listen(3035, '127.0.0.1');
