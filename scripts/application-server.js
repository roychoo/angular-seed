var express = require('express'),
	util = require('util'),
	http = require('http'),
  config = require('./config');

var Foursquare = require('node-foursquare-2')(config);

var app = express();
var options = {
    host: 'www.panoramio.com',
    path: '/map/get_panoramas.php?set=public&from=0&to=20&minx=1.284816&miny=103.852403&maxx=1.288816&maxy=103.856403&size=medium&mapfilter=true'
};
app.listen(3000);
util.puts('Application Server running at http://localhost:3000/');

app.get('/', function(req, res){

});

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();

exports.app = app;