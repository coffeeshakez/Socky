import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.scss";

// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: window.location.hostname    
    };

    console.log("HOSTNAME: " , window.location.hostname);
    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <header>
        <nav>
          <ul className="NavClass">
            <li>
              <NavLink exact to="/">
                Host
              </NavLink>
            </li>
            <li>
              <h1>Socky</h1>
            </li>
            <li>
            <NavLink exact to="/clientcontroller">
                Client
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
