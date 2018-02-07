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
                var promise1 = new Promise(function(resolve, reject) {
                    setTimeout(function(){
                        resolve(false);
                     }, 1000);
                });
                
                var promise2 = new Promise(function(resolve, reject){
                    if(server.port){
                        ping.ping({ address: server.host, port: server.port }, function (data) {
                            if (data[0].avg) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }, cfg)
                        }
                    else{
                        ping.ping({ address: server.host }, function (data) {
                            if (data[0].avg) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }, cfg)
                        }
                });

                var promise = Promise.race([promise1, promise2]).then(function(value) {
                    resolve(value)
                  }).catch(function(err){
                    console.log('error',err)
                });
            }
        }
    })
}

pingServers = function (idArray) {
    return new Promise(function (resolve, reject) {                            //return false;

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