var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'api.covid19api.com',
  'path': '/live/country/switzerland/status/confirmed',
  'headers': {
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    console.log(body.slice(0,205).toString()); // terrible solution to get one date's worth of data
    console.log(body.length);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
