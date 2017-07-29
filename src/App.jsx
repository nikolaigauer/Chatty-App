import React, { Component } from 'react';
import MessageList from './messageList.jsx';
import Chatbar from './chatbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" },
      messages: []
    };
  }

// implement another type "/me"

  componentDidMount() {
    this.chattySocket = new WebSocket("ws://localhost:3001", ["protocolOne", "protocolTwo"]);

    this.chattySocket.onopen = (event) => {}

    this.chattySocket.onmessage = (event) => {
      var socketData = JSON.parse(event.data);
      var message = {}
      var clientCount = {}

      switch (socketData.type) {
        case "incomingMessage":
          message.content = socketData.content
          message.username = socketData.username
          break;
        case "incomingNotification":
          message.content = socketData.content
          break;
        case "clientCount":
          clientCount.total = socketData.total
          break;
        case "me":
          message.content = socketData.content
          break;

        default:
          throw new Error("Unknown event type " + socketData.type);

      }
      const messages = this.state.messages.concat(message)
      this.setState({ messages: messages })



    };
  }
    handleActionMessage(message) {
      const actionMessage = {
        type: "me",
        content: "WOOOOOOOO!" + message
      };
      this.chattySocket.send(JSON.stringify(actionMessage))

    }

    handleAddMessage(message) {
      const newMessage = {
        username: this.state.currentUser.name,
        content: message,
        type: "incomingMessage"
      };

      this.chattySocket.send(JSON.stringify(newMessage))
    }

    handleUserName(username) {
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
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="navbar-userCounter">users(s) online</div> 
          </nav>
          <MessageList
            messages={this.state.messages}
          />
          <Chatbar
            changeUser={this.handleUserName.bind(this)}
            name={this.state.currentUser.name}
            addMessage={this.handleActionMessage.bind(this)}
            addMessage={this.handleAddMessage.bind(this)}
          />
        </div>
      );
    }
  }
  export default App;
