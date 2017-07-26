import React, {Component} from 'react';
import MessageList from './messageList.jsx';
import Chatbar from './chatbar.jsx';


// let currentUser = {
//       currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//       messages: [
//         {
//           username: "Bob",
//           content: "Has anyone seen my marbles?",
//         },
//         {
//           username: "Anonymous",
//           content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//         }
//       ]
//     };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  render() {
    return (
      <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList/>
          <Chatbar>
            <li> {this.state.currentUser.name} </li>
          </Chatbar>
      </div>
    );
  }
}
export default App;
