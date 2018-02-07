var ping = require('ping-net');
var cfg = {
    timeout: 1,
    min_reply: 1
};

var dataService = require('./dataService.js');
var Promise = require('promise');

function pingServer(id) {
    return new Promise(function (resolve, reject) {
        for (let server of dataService.servers) {
            if (server.id == id) {
                if (server.port) {
                    server.url = server.host + ':' + server.port;
                }
                else {
                    server.url = server.host;
                    server.port = 80;
                }
                ping.ping({ address: server.host, port: server.port }, function (data) {
                    if (data[0].avg) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, cfg);
                break;
            }
        }
    })
}

pingServers = function (idArray) {
    return new Promise(function (resolve, reject) {
        var serverStatusArray = [];
        for (let id of idArray) {
            pingServer(id)
                .then(status =>
                    serverStatusArray.push({ 'id': id, 'status': status })
                )
                .catch(function (error) {
                    serverStatusArray.push({ 'id': id, 'status': false })
                })
        }
        var x = setInterval(function () {
            var passed = true;
            if (serverStatusArray.length === idArray.length) {
                for (var server of serverStatusArray) {
                    if (server.status === undefined) {
                        passed = false;
                    }
                }
                if (passed === true) {
                    resolve(serverStatusArray);
                    clearInterval(x);
                }
            }
            else {
                passed = false;
            }
        }, 50)
    })
}
exports.pingServer = pingServer;
exports.pingServers = pingServers;