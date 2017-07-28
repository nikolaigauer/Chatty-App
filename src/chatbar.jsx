import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleMessageChange (event) {
    this.setState({message: event.target.value})
  }

  handleNameChange (event) {
    this.setState({username: event.target.value})
  }

  // Submitting and clearing the chatbar
  handleSubmit (event) {
    event.preventDefault()
    this.props.addMessage(this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
    <footer className="chatbar">
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input 
          className="chatbar-username" 
          placeholder={this.props.name} 
          onChange={this.props.changeUser}
          
        />
      </form>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          className="chatbar-message"
          onChange={this.handleMessageChange.bind(this)}
          value={this.state.message} 
          placeholder="Type a message and hit ENTER" 
        />  
      </form>   
    </footer>    
    );
  }
}
export default Chatbar;

// onChange={this.onContent} value={this.state.content}
