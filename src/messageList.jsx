import React, {Component} from 'react';
import Message from './message.jsx';

  
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
      <main className="messages">
        <div> 
          {messages}
        </div>     

        {/* put notification below */}
        <div className="message system">
           
        
        </div>
      </main>
    );
  }
}
export default MessageList;
