var request = require('request');
var uuid = require('node-uuid');
var crypto = require('crypto');
var hound = require('hound').HoundNode;
var express = require('express');
var router = express.Router();

router.get('/testroute', function(req, res){
  res.send('hello world');
});


router.get('/sound/:info', function (req, res, next) {
  console.log(req.params['info']);
  doReq(req.params['info'], res);
});


//parse arguments
var argv = require('minimist')(process.argv.slice(2));

//config file
var rq = uuid.v1();

var houndRequest = {
    //This is where we specify the ClientMatch JSON in the RequestInfo Object
    ClientMatches: [{
        "Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"fifteen\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_FIFTEEN" },
      "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"thirty\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_THIRTY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"forty\") . (\"five\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_FORTYFIVE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"sixty\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_SIXTY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"seventy\") . (\"five\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_SEVENTYFIVE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"ninety\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_NINETY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . (\"hundred\" | \"oh\") . [\"and\"] . (\"five\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDFIVE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . [\"hundred\" | \"and\"] . (\"twenty\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDTWENTY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}, 
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . [\"hundred\" | \"and\"] . (\"thirty\" | \"three\") . (\"five\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDTHIRTYFIVE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"},
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . [\"hundred\" | \"and\"] . (\"seventy\" | \"seven\") . (\"five\") . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDSEVENTYFIVE" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"},
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . [\"hundred\" | \"and\"] . (\"sixty\" | \"six\") . [\"zero\"] . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDSIXTY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"} ,
    {"Expression" : "[\"move\" | \"rotate\"] . (\"negative\")  . (\"one\") . [\"hundred\" | \"and\"] . (\"eighty\" | \"eight\") . [\"zero\"] . [\"degrees\"]",
        "Result" : { "Intent" : "ROTATE_NEGATIVE_ONEHUNDREDEIGHTY" },
    "SpokenResponse" : "Ok, I'm Rotating Now",
    "SpokenResponseLong" : "Ok, I'm Rotating Now",
    "WrittenResponse" : "Ok, I'm Rotating Now",
    "WrittenResponseLong" : "Ok, I'm Rotating Now"}],
    DeviceID: '123',
    RequestID: rq,
    SessionID: uuid.v1(),
};

function generateAuthHeaders (clientId, clientKey, userId, requestId, request) {

    if (!clientId || !clientKey) {
        throw new Error('Must provide a Client ID and a Client Key');
    }

    // Generate a unique UserId and RequestId.
    userId      = userId || uuid.v1();

    // keep track of this requestId, you will need it for the RequestInfo Object
    requestId   = requestId || uuid.v1();

    var requestData = userId + ';' + requestId;

    // keep track of this timestamp, you will need it for the RequestInfo Object
    var timestamp   = Math.floor(Date.now() / 1000),

        unescapeBase64Url = function (key) {
            return key.replace(/-/g, '+').replace(/_/g, '/');
        },

        escapeBase64Url = function (key) {
            return key.replace(/\+/g, '-').replace(/\//g, '_');
        },

        signKey = function (clientKey, message) {
            var key = new Buffer(unescapeBase64Url(clientKey), 'base64');
            var hash = crypto.createHmac('sha256', key).update(message).digest('base64');
            return escapeBase64Url(hash);

        },

        encodedData = signKey(clientKey, requestData + timestamp),
        headers = {
            'Hound-Request-Authentication': requestData,
            'Hound-Client-Authentication': clientId + ';' + timestamp + ';' + encodedData,
            'Hound-Request-Info': JSON.stringify(houndRequest)
        };

    return headers;
};


function doReq(data, res) {
  var req = request({
      method: 'POST',
      url: 'https://api.houndify.com/v1/audio' ,
      headers: generateAuthHeaders(process.env.CLIENT_ID, process.env.CLIENT_KEY,0,rq,houndRequest),
      json: true
  }, function (err, resp, body) {
      //console.log(err);
      console.log(resp);
      if(err) {
        res.status(500).jsonp({ error: 'message' });
        return null;
      }
      console.log(data);
      res.json(body);
      });

  req.write(data);
  req.end();
}

module.exports = router;
