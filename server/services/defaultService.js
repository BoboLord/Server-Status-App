var pingService = require('./pingService.js');
var dataService = require('./dataService.js');
var Promise = require('promise');

pingServer = function(url, port) {
    if(!port){
        port = getPortFromUrl(url);
    }
    if(port){
        url = removeProtocolFromUrl(url)
    }
    return new Promise(function (resolve, reject) {
        resolve(pingService.ping(port,{ host: url }))
    })
}

getPortFromUrl = function(url){
	if( url.indexOf("https") == 0 ) {
		return 443;
	} else if ( url.indexOf("http") == 0 ) {
		return 80;
	} else{
		return null;
	}
}

removeProtocolFromUrl = function(url){
	result = url.replace(/(^\w+:|^)\/\//, '');
	return result;
}
pingStoredServer = function (id) {
    return new Promise(function (resolve, reject) {
        for (let server of dataService.servers) {
            if (server.id == id) {
                if(!server.port){
                    server.port=80;
                }
                resolve(pingService.ping(server.port,{ host: server.host }))
            }
        }
    })
}

pingStoredServers = function (idArray) {
    return new Promise(function (resolve, reject) {
        var serverStatusArray = [];
        var a = [];
        for (let i = 0; i < idArray.length; i++) {
            var id = idArray[i];
            var status = new Promise((resolve, reject) => {
                resolve(pingStoredServer(idArray[i]))
            })
            serverStatusArray.push(status)
            
        }
        return Promise.all(serverStatusArray)
        .then(values => {
            resolve(values)
        })
        .catch(function(error){
            console.log("error",error)
            })
    }).then(values => {
        var serverStatusMap = [];
        for (let i = 0; i < idArray.length; i++) {
            serverStatusMap.push({'id':idArray[i],'status':values[i]})
        }
        return serverStatusMap;
    })
}

exports.pingServer = pingServer;
exports.pingStoredServer = pingStoredServer;
exports.pingStoredServers = pingStoredServers;