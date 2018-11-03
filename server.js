const http = require('http');
const app = require('./App');

const port = 3001;

const theServer = http.createServer(app);
theServer.listen(port);