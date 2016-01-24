'use strict';
var socket = io('http://cardboardteacher.herokuapp.com/');;

/**
 * Serves an image
 */
function sendSelection(choice) {
  socket.emit('SEL', {choice: parseChoice(choice)});
}

function sendSelection(choice, eq) {
  socket.emit('SEL', {choice: parseChoice(choice), eq: eq});
}

function parseChoice(choice) {
  return choice - 1;
}     
