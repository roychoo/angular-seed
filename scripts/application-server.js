var express = require('express'),
	util = require('util'),
	http = require('http');

var GooglePlaces = require('google-places');
var places = new GooglePlaces('AIzaSyAICo5JmmmHgF9AtH6mTz0hdImT2PG2jXQ');

var app = express();

app.listen(3000);
util.puts('Application Server running at http://localhost:3000/');

app.get('/', function(req, res){
  var array = new Array();
  places.textSearch({query:'attractions in singapore', sensor: false},
    function(err, response) {
      array = response.results;
          for(var item in response.headers) {
    console.log(item + ": " + response.headers[item]);
  }
      //console.log(response.results);
      console.log(array[0].photos[0].photo_reference);
      //console.log('search: ', JSON.stringify(response.results));
      places.getPhoto({photo_reference: array[0].photos[0].photo_reference, sensor: false, maxheight: 400}, function(error, response1){
        console.log(response1.getHeader('location') + ' results');
    
        res.end();
      });
      
    });
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


exports.app = app;