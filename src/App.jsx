import React, { Component } from 'react';
import MessageList from './messageList.jsx';
import Chatbar from './chatbar.jsx';
import Nav from './Nav.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    // Sets initial state
    this.state = {
      clientCount: 0,
      currentUser: { name: "Anonymous" },
      messages: []
    };
  }

  // Receives and handles data from server
  componentDidMount() {
    this.chattySocket = new WebSocket("ws://localhost:3001", ["protocolOne", "protocolTwo"]);

    // Opens websocket
    this.chattySocket.onopen = (event) => { };

    // Parses data from server
    this.chattySocket.onmessage = (event) => {
      const socketData = JSON.parse(event.data);
      const message = {};
      const clientCount = {};

      // Switch case to sift through types of data from server
      switch (socketData.type) {
        case "incomingMessage":
          message.content = socketData.content
          message.username = socketData.username
          break;
        case "incomingNotification":
          message.content = socketData.content
          break;
        case "clientCount":
          clientCount.content = socketData.content
          this.setState({ clientCount: socketData.content });
          break;

        default:
          throw new Error("Unknown event type " + socketData.type);
      }

      const messages = this.state.messages.concat(message)
      this.setState({ messages: messages })
    };

  }

  // For every new message this function stringifies and sends the message 
  // as an object with proper keys to server
  handleAddMessage(message) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message,
      type: "incomingMessage"
    };

    this.chattySocket.send(JSON.stringify(newMessage))
  }

  // Function to notify clients when a user changes their nick
  handleUsername(username) {
    const newUsername = {
      type: "incomingNotification",
      content: this.state.currentUser.name + " has changed name to: " + username
    };

    this.setState({ currentUser: { name: username } })
    this.chattySocket.send(JSON.stringify(newUsername))
  }

  render() {
    return (
      <div>
        <Nav clientCount={this.state.clientCount} />
        <main className="messages">
          <MessageList
            messages={this.state.messages}
          />
          <Chatbar
            changeUser={this.handleUsername.bind(this)}
            name={this.state.currentUser.name}
            addMessage={this.handleAddMessage.bind(this)}
          />
        </main>
      </div>
    );
  }
}


export default App;
