const clusters = [{
    clusterID: 0,
    clusterName: 'Development'
  },
  {
    clusterID: 1,
    clusterName: 'Testing'
  },
  {
    clusterID: 2,
    clusterName: 'Miscellaneous'
  }
];
const servers = [];

servers.push({
  id: 0,
  clusterID: 0,
  name: 'OAS Test',
  host: '10.206.0.80',
  port: 8090
});

servers.push({
  id: 1,
  clusterID: 0,
  name: 'OAS Admin',
  host: '10.206.0.80',
  port: 8091
});

servers.push({
  id: 2,
  clusterID: 0,
  name: 'API Server',
  host: '10.206.0.81',
  port: 3000
});

servers.push({
  id: 3,
  clusterID: 1,
  name: 'OAS Test',
  host: '10.206.0.80',
  port: 4200
});

servers.push({
  id: 4,
  clusterID: 1,
  name: 'OAS Admin',
  host: '10.206.0.80',
  port: 4201
});
servers.push({
  id: 5,
  clusterID: 1,
  name: 'API Server',
  host: '10.206.0.80',
  port: 2000
});

servers.push({
  id: 6,
  clusterID: 2,
  name: 'Obsidian Server',
  host: 'www.obsidianserver.cf'
});
servers.push({
  id: 7,
  clusterID: 2,
  name: 'Facebook',
  host: 'www.facebook.com'
});
servers.push({
  id: 8,
  clusterID: 2,
  name: 'Sangam',
  host: 'sangam.ggktech.com'
});
servers.push({
  id: 9,
  clusterID: 2,
  name: 'Google',
  host: 'google.com'
});
exports.clusters = clusters;
exports.servers = servers;
