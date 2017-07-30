import React, {Component} from 'react';

class Message extends Component {
  // parseType() {
  //   switch(this.props.message.type) {
  //     case 'newMessage'
  //       // return (<span className="message-content">{this.props.message.content}</span>)
  //       break;
  //     case 'actionMessage'
  //       // return (<span className="message-content">{this.props.message.content}</span>)
  //       break;
  //   }
  // }

  render() {
    return (
      <div className="message">
        // <span className="message-username">{this.props.user}</span>
        <span className="message-content">{this.props.message}</span>
    </div>    
    );
  }
}
export default Message;
