
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');
const PORT = 3001;

//Express server
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// webSockets server
const wss = new SocketServer({ server });

// Broadcast function used below
function broadcastToAll(message) {
  wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })   
}

wss.on('connection', (ws) => {

  // Create, stringify and broadcast object to track current online users as they disconnect
  const clientCount = {};
  clientCount.content = wss.clients.size;
  clientCount.type = "clientCount"
  console.log("Connections:", clientCount.content)
  broadcastToAll(clientCount)


  // Receive, parse then broadcast messages to all clients
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    message.id = uuidv1();
    broadcastToAll(message)
  })

  // Create, stringify and broadcast object to track current online users as they disconnect
  ws.on('close', () => {
    wss.emit ('disconnection', ws)
    const clientCount = {};
    clientCount.content = wss.clients.size;
    clientCount.type = "clientCount"
    broadcastToAll(clientCount)
  });  
});
