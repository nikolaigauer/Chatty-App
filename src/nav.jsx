import React, {Component} from 'react';

class Nav extends Component {
  render() {
    const clientCount = this.props.clientCount;
    const onlineStatus = `${clientCount} user${clientCount === 1 ? "" : "s"} online`
    return (
      <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="navbar-clientCounter"> {onlineStatus} </div> 
          </nav>
    );
  }
}
export default Nav;