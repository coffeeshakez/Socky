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
      endpoint: "http://192.168.1.215:80/" // Update 3001 with port on which backend-my-app/server.js is running.
    };

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
