const http = require('http');
const net = require('net');
const url = require('url');
const socketContainer = [];

// Create an HTTP tunneling proxy
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
});
server.on('request', (req, res) => {
  console.log('incomming request from a tunneling proxy');
  if (req.socket) {
    socketContainer.push(req.socket);
  }
  if (socketContainer.length) {
    initpinging();
  }
});

function initpinging () {
  setInterval(()=>{socketContainer[0].write('incomming data')}, 1000);
}
server.listen(3035, '127.0.0.1');
