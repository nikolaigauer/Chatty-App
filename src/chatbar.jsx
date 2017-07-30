import React, { Component } from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      message: '',
      username: ''
    }
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  handleNameChange(event) {
    this.setState({ username: event.target.value })
  }

  // Submitting message and clearing the chatbar
  handleMessageSubmit(event) {
    event.preventDefault();
    this.props.addMessage(this.state.message);
    this.setState({ message: '' });
  }

  handleNameSubmit(event) {
    event.preventDefault();
    this.props.changeUser(this.state.username);
  }

  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input
            className="chatbar-username"
            placeholder={this.props.name}
            onChange={this.handleNameChange.bind(this)}
            value={this.state.name}
          />
        </form>
        <form onSubmit={this.handleMessageSubmit.bind(this)}>
          <input
            className="chatbar-message"
            onChange={this.handleMessageChange.bind(this)}
            value={this.state.message}
            placeholder="Type a message and hit ENTER"
          />
        </form>
      </footer>
    );
  };
}
export default Chatbar;
