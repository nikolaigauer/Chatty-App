import React, { Component } from 'react';
import Message from './message.jsx';

// Renders message
class MessageList extends Component {

  render() {
    const messages = this.props.messages.map((msg, index) => {
      return <Message
        message={msg.content}
        key={index}
        user={msg.username}
      />
    });

    return (
      <div>
        {messages}
      </div>
    );
  };
}
export default MessageList;
