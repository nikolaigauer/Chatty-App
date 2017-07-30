import React, { Component } from 'react';

// Navbar displaying current online users
class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-clientCounter"> {this.props.clientCount} user(s) online</div>
      </nav>
    );
  };
}
export default Nav;