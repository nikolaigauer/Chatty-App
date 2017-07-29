
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');


const PORT = 3001;

const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// webSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log(wss.clients.size)

  // SO MAYBE TAKE THE CLIENT SHIT OUT OF THE on message function, THEN FIX IT SO IT BROADCASTS TO THE PAGE

  const clientCount = {};
  clientCount.total = wss.clients.size;
  clientCount.type = "clientCount"
  console.log("Connections:", clientCount.total)
    
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN)
      client.send(JSON.stringify(clientCount));
  })

  // This receives messages
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    message.id = uuidv1();
  
    // This broadcasts messages to all
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    })   
  })

  ws.on('close', () => {
    wss.emit ('disconnection', ws)
    console.log("this is the total after disconnection: ", clientCount.total - wss.clients.size)
  });  

});