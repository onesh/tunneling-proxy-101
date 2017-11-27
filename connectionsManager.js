
class connectionManager {
  constructor () {
this.socketPool = [];
};

addConnections(socket) {
  try {
  if (socket && typeof socket === 'object') {
    console.log('new Incomming socket...');
    this.socketPool.push(socket);
    if (this.socketPool.length === 2) {
      this.pipeSockets();
    }
  } else {
    throw new Error('Please provide a socket object to pool')
  }
}
catch (e) {
  console.error(e.message);
 }
}
pipeSockets () {
  if (this.socketPool.length >= 2) {
    this.socketPool[0].pipe(this.socketPool[1]);
    this.socketPool[1].pipe(this.socketPool[0]);
  }
};

closeConnection (socket) {
  console.log('socket connection dropped....');
};

}
const managerInstance = new connectionManager();

module.exports = managerInstance;




























module.export = managerInstance;
