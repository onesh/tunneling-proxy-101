const HASHES = require('jshashes');

 class headersHelper {

  constructor() {
    this._headers = 'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +  'Upgrade: WebSocket\r\n' +  'Connection: Upgrade\n';
    this._magicKeyHash = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    console.log(this);
  }
  addMoreHeaders (header, value) {
    if (!value) {
      this._headers += header + '\r\n';
    } else {
      this._headers += header + ': ' + value + '\r\n';
    }
  }

  getMagicHash () {
    return this._magicKeyHash;
  }
  setSecretKey(req) {
    var wsKey = req.headers['sec-websocket-key'];

    return this._headers +   "sec-websocket-Accept: " + new HASHES.SHA1().b64( wsKey + this.getMagicHash()) + '\r\n' + '\r\n';
  }
};


module.exports = new headersHelper();
