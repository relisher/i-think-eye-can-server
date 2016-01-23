'use strict';
var socket = io('http://localhost:3000');

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
  switch(choice) {
    case 1:
      return "skull";
    case 2:
      return "glucose";
    case 3:
      return "graph";
    case 4:
      return "physics2";
    case 5:
      return "physics";
  }
}     
