var clusters = [{"clusterID":0, "clusterName":"Development"},
                {"clusterID":1, "clusterName":"Testing"}
                ];
const servers = [{"id":0,"clusterID":0,"name":"USERApp","host":"http://10.206.0.80","port":8090},
{"id":1,"clusterID":0,"name":"Node Server","host":"localhost","port":3000},
{"id":2,"clusterID":0,"name":"USERAdmin","host":"http://10.206.0.80","port":8091},
{"id":3,"clusterID":0,"name":"Google","host":"google.com"}
                ];

exports.clusters = clusters;
exports.servers = servers;
