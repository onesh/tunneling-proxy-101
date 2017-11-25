var http = require('http');
const url = require('url');


  // make a request to a tunneling proxy
  const options = {
    port: 3034,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: '127.0.0.1:3035'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    // make a request over an HTTP tunnel
    console.log('keep alive handler on the socket------', socket.setKeepAlive);
    socket.setKeepAlive(true, 50000);

    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: 127.0.0.1:3035\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      console.log('connection closed');
      });
  });
