var pingService = require('./pingService.js');
var dataService = require('./dataService.js');
var Promise = require('promise');

pingServer = function (id) {
    return new Promise(function (resolve, reject) {
        console.log("hola")

        for (let server of dataService.servers) {
            if (server.id == id) {
                if(!server.port){
                    server.port=80;
                }
                  //  console.log("hola")
                    pingService.ping(server.port,{ host: server.host }).then(data =>
                        //console.log(data),
                        console.log("WAs"),
                        resolve(data),
                        console.log(data)
                  )
                //   .catch(()=>console.log('error',err));
            }
        }
    })
}

pingServers = function (idArray) {
    return new Promise(function (resolve, reject) {                            //return false;
        var serverStatusArray = [];
        for(id of idArray){
            pingServer(id).then(status=>
                resolve(status),
                console.log("1",status),
                serverStatusArray.push({ 'id': id, 'status': status }),
            )
        }
            
            // .catch(err=> console.log("err"))
        // var gg = resolve(promises)
        // console.log("hello",gg)

    })
}

exports.pingServer = pingServer;
exports.pingServers = pingServers;