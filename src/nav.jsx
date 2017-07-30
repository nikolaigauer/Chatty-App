import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="navbar-clientCounter"> {this.props.clientCount} </div> 
          </nav>
    );
  }
}
export default Nav;