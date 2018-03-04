const pingWrapper = require('./pingWrapper.js');
const dataService = require('./dataService.js');
const Promise = require('promise');

/**
 * Ping url with optional port.
 * @param {url} url URL of the website.
 * @param {port} port Port of the address.
 * @return {Promise} The promise that there will either be success or failure.
 */
function pingServer(url, port) {
  if (!port) {
    port = getPortFromUrl(url);
  }
  if (port) {
    url = removeProtocolFromUrl(url);
  }
  return new Promise(function (resolve, reject) {
    resolve(pingWrapper.ping(port, {
      host: url
    }));
  });
};

/**
 * Ping url with optional port.
 * @param {url} url URL of the website.
 * @return {port} number The promise that there will either be success or
  failure.
 */
function getPortFromUrl(url) {
  if (url.indexOf('https') == 0) {
    return 443;
  } else if (url.indexOf('http') == 0) {
    return 80;
  } else {
    return null;
  }
};

/**
 * Ping port with opts.
 * @param {url} url URL of the website.
 * @return {string} number The promise that there will either be success or
 */
function removeProtocolFromUrl(url) {
  result = url.replace(/(^\w+:|^)\/\//, '');
  return result;
};

/**
 * Ping port with opts.
 * @param {id} id existing server id.
 * @return {Promise} The promise that there will either be success or
  failure.
 */
function pingStoredServer(id) {
  return new Promise(function (resolve, reject) {
    for (let server of dataService.servers) {
      if (server.id == id) {
        if (!server.port) {
          server.port = 80;
        }
        resolve(pingWrapper.ping(server.port, {
          host: server.host
        }));
      }
    }
  });
};

/**
 * Ping port with opts.
 * @param {idArray} idArray Existing server id array.
 * @return {Promise} The promise that there will either be success or
  failure.
 */
function pingStoredServers(idArray) {
  return new Promise(function (resolve, reject) {
    const serverStatusArray = [];
    for (let i = 0; i < idArray.length; i++) {
      const status = new Promise((resolve, reject) => {
        resolve(pingStoredServer(idArray[i]));
      });
      serverStatusArray.push(status);
    }
    return Promise.all(serverStatusArray)
      .then((values) => {
        resolve(values);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }).then((values) => {
    const serverStatusMap = [];
    for (let i = 0; i < idArray.length; i++) {
      serverStatusMap.push({
        'id': idArray[i],
        'status': values[i]
      });
    }
    return serverStatusMap;
  });
};

exports.pingServer = pingServer;
exports.pingStoredServer = pingStoredServer;
exports.pingStoredServers = pingStoredServers;
