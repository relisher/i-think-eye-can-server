'use strict';
var socket = io('http://localhost:3000');

/**
 * Serves an image
 */
function sendSelection(choice) {
  socket.emit('SEL', {choice: choice});
}

function sendSelection(choice, eq) {
  socket.emit('SEL', {choice: choice, eq: eq});
}
