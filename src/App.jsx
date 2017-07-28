import React, { Component } from 'react';
import MessageList from './messageList.jsx';
import Chatbar from './chatbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous" }, 
      messages: [ {
        username: "CHATTYAPP",
        content: "WELCOME TO CHATLAND"} ]
    };
  }

  componentDidMount () {
    this.chattySocket = new WebSocket("ws://localhost:3001", ["protocolOne", "protocolTwo"]);
  
    this.chattySocket.onopen = (event) => {
      this.chattySocket.onmessage = (event) => {
      var message = JSON.parse(event.data);

      const messages = this.state.messages.concat(message)
    
    this.setState({ messages: messages })

      }

    };
  }

  handleAddMessage(message) {
    const newMessage = { 
      username: this.state.currentUser.name, 
      content: message
    };

    this.chattySocket.send(JSON.stringify(newMessage))
  }

  handleUserName(event) {
    this.setState({currentUser: { name: event.target.value }})
  }
  
  render() {
      
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList
          messages={this.state.messages}
        />
        <Chatbar
          changeUser={this.handleUserName.bind(this)}
          name={this.state.currentUser.name}
          addMessage={this.handleAddMessage.bind(this)}
        />
      </div>
    );
  }
}
export default App;
