
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

function broadcastToAll(message) {
  // const message = JSON.stringify(message);  
  // wss.clients.forEach(function each(client) {
  //   safeSend(client, messageAsString);
  // });

  wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })   

}


function systemMessage(event, clientCount) {
  const message = {
    type: "ClientSum",
    event: event,
    clientCount: clientCount
  };
  return message;
}


wss.on('connection', (ws) => {
  const clientCount = {};
  clientCount.content = wss.clients.size;
  clientCount.type = "clientCount"
  console.log("Connections:", clientCount.content)
  // wss.broadcast(JSON.stringify({type: 'clientCount', clientCount: clientCount}));
  broadcastToAll(clientCount)


  // wss.clients.forEach(client => {
  //   if (client.readyState === WebSocket.OPEN)
  //     client.send(JSON.stringify(clientCount));
  // })

  // This receives messages
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    message.id = uuidv1();
    
    // This broadcasts messages to all
    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify(message));
    //   }
    // })   
    broadcastToAll(message)
  })

  ws.on('close', () => {
    wss.emit ('disconnection', ws)
    const clientCount = {};
    clientCount.content = wss.clients.size;
    clientCount.type = "clientCount"
    console.log("Connections:", clientCount.content)
    broadcastToAll(clientCount)
    // wss.broadcast(JSON.stringify({type: 'clientCount', clientCount: clientCount}))
    console.log("this is the total after disconnection: ", wss.clients.size)
  });  
});
