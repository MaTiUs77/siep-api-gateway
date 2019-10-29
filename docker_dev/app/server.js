// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');
var cmd = require('child_process');

var config = require('./config');
var routes = require('./routes');
var app = express();

var master = require('./master');

app.get('/', async function (req, res) {
  config.index.github = {
	  commit: master.sha.substring(0,7),
  	sha: master.sha,
	  message: master.commit.message
  };

  res.json(config.index);
});

routes.forEach(function(gw) {
  let route_path= {};
  route_path[`^${gw.path}`] = gw.target_path;

  app.use(`${gw.path}**`, proxy({
    changeOrigin: true,
    target: gw.target,
    pathRewrite: route_path
  }));
});

console.log("proxy listening on port",config.port);
app.listen(config.port);
