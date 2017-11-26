module.exports = frame;

function frame(fin, ext, opcode, mask, payload) {
  var arr = [];
  var push = Array.prototype.push;
  push.apply(arr, _1st(fin, ext, opcode));
  push.apply(arr, _length(mask, payload));
  arr = arr.concat(_payload(mask, payload));

  return new Buffer(arr);
};


function _1st(fin, ext, opcode) {
  return [(fin << 7) | (ext[0] << 6) | (ext[1] << 5) | (ext[2] << 4) | opcode];
}

function _length(mask, payload) {
  var length = payload.length, len = length, extlen = [];
  if(length <= 125)
    ;
  else if(length <= 0xFFFF) {
    len = 126;
    extlen.push(length >>> 8);
    extlen.push(length & 0xFF);
  } else {
    len = 127;
    // var zerofill =
    // '0000000000000000000000000000000000000000000000000000000000000000';
    var zerofill = '000000000000000000000000000000000000000000000000';
    var bin = (zerofill + length.toString(2)).slice(-64);
    extlen.push(parseInt(bin.substr(0, 8), 2));
    extlen.push(parseInt(bin.substr(8, 8), 2));
    extlen.push(parseInt(bin.substr(16, 8), 2));
    extlen.push(parseInt(bin.substr(24, 8), 2));
    extlen.push(parseInt(bin.substr(32, 8), 2));
    extlen.push(parseInt(bin.substr(40, 8), 2));
    extlen.push(parseInt(bin.substr(48, 8), 2));
    extlen.push(parseInt(bin.substr(56, 8), 2));
  }
  extlen.unshift((mask << 7) | len);
  return extlen;
}

function _payload(maskbit, payload) {
  var i, mask, ret, length;
  if(maskbit) {
    mask = makeMask(), ret = mask.slice(-4), length = payload.length;
    for(i = 0; i < length; i++)
      ret.push(payload[i] ^ mask[i % 4]);
  } else
    ret = Array.prototype.slice.call(payload);

  return ret;

  function makeMask() {
    var i, ret = [];
    for(i = 4; i--;)
      ret.push(~~(Math.random() * 256));
    return ret;
  }
}

module.exports = frame;
