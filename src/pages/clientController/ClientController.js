import React from 'react';
import { socket } from "../../global/header";
import './clientController.scss';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            roomName: "",
            connected: false,
            fullscreen: false
        }

        this.connectClient = this.connectClient.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.requestFullScreen = this.requestFullScreen.bind(this);
    }

    initData = data => {

        this.setState(prevState => ({
            userName: data.clientName,
            roomName: data.roomName,
            connected: true,
        }));
    }

    handleUserConnection = data => {
        alert(data);
    }

    componentDidMount() {
        socket.on("broadcast_client_connected", this.initData);
    }

    connectClient() {
        console.log(this.state.name);
        socket.emit("connect_client", { roomName: this.state.name, clientName: this.state.userName });
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    handleNameChange(e) {
        this.setState({ userName: e.target.value });
    }

    handleButtonPress(direction) {
        switch (direction) {
            case "up": socket.emit("controller_event", { roomName: this.state.roomName, event: "up" });
                break;
            case "down": socket.emit("controller_event", { roomName: this.state.roomName, event: "down" });
                break;
        }
    };

    requestFullScreen() {
        let el = document.body;
        // Supports most browsers and their versions.
        let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen 
        || el.mozRequestFullScreen || el.msRequestFullScreen;
      
        if (requestMethod) {
          // Native full screen.
          requestMethod.call(el);
          this.setState({fullscreen: true})
        }
      }
    

    render() {
        return (
            <React.Fragment>

                {!this.state.fullscreen &&
                     <button className="btn" onClick={ this.requestFullScreen }>Fullscreen</button>
                }

                {this.state.connected &&
                <div className="page-section">
                    <div className="btn-group">
                        <button className="btn" onClick={() => this.handleButtonPress("down")}>Down</button>
                        <button className="btn" onClick={() => this.handleButtonPress("up")}>up</button>
                    </div>
                </div>
                }
                {!this.state.connected &&
                    <div className="page-section">
                        <div className="form-group">
                            <label>Room: </label>
                            <input type="text" onChange={e => this.handleInputChange(e)}></input>
                        </div>
                        <div className="form-group">
                            <label >Username: </label>
                            <input type="text" onChange={e => this.handleNameChange(e)}></input>
                        </div>
                        <div className="form-group center">
                            <button className="btn" onClick={this.connectClient}>Connect</button>
                        </div>
                    </div>
                }

                <h3>Connected to room: {this.state.roomName}</h3>
                <h3>User name: {this.state.userName}</h3>
                {/* <button onClick={ () => this.handleButtonpress("up") }>Up</button> */}
                {/* <button onClick={ () => this.handleButtonpress("down") }> Down</button> */}

            </React.Fragment>

        );
    }
}

export default Dashboard;