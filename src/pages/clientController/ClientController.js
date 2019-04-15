import React from 'react';
import { socket } from "../../global/header";
import './clientController.scss';
import Controller from '../../games/controller/Controller';
import CahController from '../../games/cardsAgainstHumanity/CahController';
import {CLIENT_MESSAGES, SERVER_MESSAGES} from '../../scripts/Event';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientName: "",
            roomName: "",
            roomId: "",
            connected: false,
            fullscreen: false
        }

        this.connectClient = this.connectClient.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.requestFullScreen = this.requestFullScreen.bind(this);
    }

    initData = data => {
        this.setState(prevState => ({
            clientName: data.clientName,
            roomName: data.roomName,
            roomId: data.roomId,
            connected: true,
        }));
    }

    handleUserConnection = data => {
        alert(data);
    }

    handleGameStart = data => {
        console.log("GAME START: ", data)
        this.setState({selectedGame: data.selectedGame});
    }

    componentDidMount() {
        socket.on(SERVER_MESSAGES.clientConnected, this.initData);
        socket.on(CLIENT_MESSAGES.gameStart, this.handleGameStart)
    }

    componentWillUnmount() {
        socket.off("client_connect_success", this.initData);
    }

    connectClient(e) {
        e.preventDefault();
        socket.emit(CLIENT_MESSAGES.connectClient, { roomName: this.state.name, clientName: this.state.clientName });
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    handleNameChange(e) {
        let name = e.target.value
        this.setState({ clientName: name });
    }

    handleButtonPress(direction) {
        socket.emit("controller_event", { roomName: this.state.roomName, action: direction });
    }

    requestFullScreen() {
        let el = document.body;
        // Supports most browsers and their versions.
        let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullScreen;

        if (requestMethod) {
            // Native full screen.
            requestMethod.call(el);
            this.setState({ fullscreen: true })
        }
    }

    getController(){
        switch(this.state.selectedGame){
            case "CAH": return <CahController clientName={this.state.clientName} roomId={this.state.roomId}></CahController>
        }
    }

    render() {
        return (
            <React.Fragment>

                { (this.state.roomName && !this.state.selectedGame) && <Controller roomId={this.state.roomId}></Controller>}
                {this.state.selectedGame && this.getController() }
                {!this.state.fullscreen &&
                    <div className="page-section">
                        <button className="btn btn__small" onClick={this.requestFullScreen}><i className="fas fa-expand"></i></button>
                    </div>
                }

                {!this.state.connected &&
                    <div className="page-section">
                        <form>
                            <div className="form-group">
                                <label>Room </label>
                                <input type="text" onChange={e => this.handleInputChange(e)}></input>
                            </div>
                            <div className="form-group">
                                <label >clientName </label>
                                <input type="text" onChange={e => this.handleNameChange(e)}></input>
                            </div>
                            <div className="form-group center">
                                <button className="btn" onClick={(e) => this.connectClient(e)}>Connect</button>
                            </div>
                        </form>
                    </div>
                }

                {this.state.connected &&
                    <div className="page-section">
                        <h3>Connected to room: {this.state.roomName}</h3>
                        <h3>Username: {this.state.clientName}</h3>
                    </div>
                }


            </React.Fragment>

        );
    }
}

export default Dashboard;