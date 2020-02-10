import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";
import "./header.scss";

// The Header creates links that can be used to navigate
// between routes.
var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: ( (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?  "http://localhost:80" : "https://frozen-dawn-75764.herokuapp.com/")
    };

    console.log("ENDPOINT", this.state.endpoint )
   socket = io.connect();
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

            <li>
            <NavLink exact to="/test">
                Test
              </NavLink>
              
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
