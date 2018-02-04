var clusters = [{"clusterID":0, "clusterName":"Development"},
                {"clusterID":1, "clusterName":"Testing"},
                {"clusterID":2, "clusterName":"Miscelleneous"},
                ];
var servers = [];

servers.push({"id":0,"clusterID":0,"name":"OAS Test","host":"http://10.206.0.80","port":8090});
servers.push({"id":1,"clusterID":0,"name":"OAS Admin","host":"http://10.206.0.80","port":8091})
servers.push({"id":2,"clusterID":0,"name":"API Server","host":"https://10.206.0.81","port":3000});

servers.push({"id":0,"clusterID":1,"name":"OAS Test","host":"http://10.206.0.80","port":4200});
servers.push({"id":1,"clusterID":1,"name":"OAS Admin","host":"http://10.206.0.80","port":4201})
servers.push({"id":2,"clusterID":1,"name":"API Server","host":"http://10.206.0.80","port":2000});

servers.push({"id":3,"clusterID":2,"name":"pgAdmin","host":"http://10.206.0.80","port":5050});
servers.push({"id":3,"clusterID":2,"name":"Google","host":"google.com"});
exports.clusters = clusters;
exports.servers = servers;
