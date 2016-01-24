'use strict'; // puts us in strict mode (js in hard mode)

/* This sets up a pure socket-io server.
 * Later in the guide we upgrade to a full
 * express server
// sets up the server
let Server = require('socket.io');
let io = Server(3000); //construct a server on port 3000
console.log('SocketIO listening on port 3000');
*/

// sets up express
let path = require('path');
let express = require('express');

let app = express();
app.use(express.static(path.join(__dirname, 'client')));

let routes = require('./routes');
app.use('/', routes);

// 404
app.use( (req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
} );

var port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});

let io = require('socket.io')(server);


let possibleViews = [
  {
    type: "skull",
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
    z: 0,
    rotate_rate: 0
  },
  {
    type: "glucose",
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
    z: 0,
    rotate_rate: 0
  },
  {
    type: "graph",
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
    z: 0,
    rotate_rate: 0,
    equation: '[Y]=[X]'
  },
  {
    type: "physics",
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
    z: 0,
    rotate_rate: 0
  },
  {
    type: "physics2",
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
    z: 0,
    rotate_rate: 0
  }
];

let currentViews = [possibleViews[0]];

/*
function setRotation(intent) {
  switch (intent) {

  }
}
*/

io.on('connection', (socket) => {
  for(var i = 0; i < currentViews.length; i++) {
    socket.emit('ADD_VIEW', currentViews[i]);

  }

  socket.on('SEL', (data) => {
    io.emit('REMOVE_VIEW', currentViews[0]);
    currentViews.shift();
    let newView = possibleViews[data.choice];
    if(newView.type === 'graph') {
      newView.equation = data.eq;
    }

    currentViews.push(newView);
    io.emit('ADD_VIEW', currentViews[currentViews.length - 1]);
  });
  socket.on('UPD', (data) => {
    io.emit('ADD_VIEW', {type: data.choice, rotate: data.rotate, zoom: data.zoom, x: data.x, y: data.y, z: data.z, equation: data.equation, rotate_rate: 0 })
  })
});
