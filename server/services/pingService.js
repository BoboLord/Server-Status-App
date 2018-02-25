const net = require('net');

/**
 * Ping port with opts.
 * @param {port} port The first number.
 * @param {opts} opts URL and optional parameters.
 * @return {Promise} The sum of the two numbers.
 */
function ping(port, opts) {
  opts = Object.assign({
    timeout: 1000
  }, opts);

  return new Promise(((resolve) => {
    const socket = new net.Socket();
    const onError = () => {
      socket.destroy();
      resolve(false);
    };
    socket.setTimeout(opts.timeout);
    socket.on('error', onError);
    socket.on('timeout', onError);
    if (port) {
      socket.connect(port, opts.host, () => {
        socket.end();
        resolve(true);
      });
    } else {
      socket.connect(80, opts.host, () => {
        socket.end();
        resolve(true);
      });
    }
  }));
}

exports.ping = ping;
