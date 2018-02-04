var tcpp = require('tcp-ping');
var dataService = require('./dataService.js');
var Promise = require('promise');

function pingServer(id){
    return new Promise(function(resolve, reject) {
        for(let server of dataService.servers){    
            if(server.id == id){
                if(server.port){
                    tcpp.ping({ address: server.host,port: server.port }, function(err, data) {
                        if (data.avg){
                            resolve(true)
                        }
                        else {
                            resolve(false)
                        }
                    });
    
                }
                else {
                    tcpp.ping({ address: server.host }, function(err, data) {
                        if (data.avg){
                            resolve(true)
                        }
                        else {
                            resolve(false)
                        }
                    });
    
                }
                return;
            }
        }
        reject(err)
    })
}

exports.pingServer = pingServer;