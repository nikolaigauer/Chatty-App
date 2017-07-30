import React, { Component } from 'react';
import MessageList from './messageList.jsx';
import Chatbar from './chatbar.jsx';
import Nav from './Nav.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientCount: 0,
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
        case "clientSum":
          clientCount.content = socketData.content
          this.setState({clientCount: socketData});
          break;

        default:
          throw new Error("Unknown event type " + socketData.type);
      }
                  
      const messages = this.state.messages.concat(message)
      this.setState({ messages: messages })

    };

  }
    

    handleAddMessage(message) {
      const newMessage = {
        username: this.state.currentUser.name,
        content: message,
        type: "incomingMessage"
      };

      this.chattySocket.send(JSON.stringify(newMessage))
    }

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
          <Nav clientCount={this.state.onlineCount}/>
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
