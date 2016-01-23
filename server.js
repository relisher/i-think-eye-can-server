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

let currentView = 'skeleton';

io.on('connection', (socket) => {
  socket.emit('SET_VIEW', {view: currentView});

  socket.on('CHANGE_VIEW', (data) => {
    currentView = data.view;
    io.emit('SET_VIEW', {view: data.view}); // broadcast the message everywhere
  });
});
