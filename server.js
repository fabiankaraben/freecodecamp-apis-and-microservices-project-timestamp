// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function api(req, res) {
  let date = req.params.date ? new Date(req.params.date) : new Date();

  let isOnlyDigits = /^\d+$/.test(req.params.date);

  if (date.toString() === "Invalid Date" && isOnlyDigits) {
    let timestamp = parseInt(req.params.date);
    date = new Date(timestamp);
  }

  if (date.toString() === "Invalid Date") {
    res.json({error: 'Invalid Date'});
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
}

app.get("/api", api);

app.get("/api/:date", api);

process.env.PORT = 8080;

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
