import React from 'react';
import { socket } from "../../global/header";
import './clientController.scss';
import Controller from '../../games/controller/Controller';
import CahController from '../../games/cardsAgainstHumanity/CahController';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientName: "",
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
            clientName: data.clientName,
            roomName: data.roomName,
            connected: true,
            selectedGame: ""
        }));

        this.centerContent();
    }

    centerContent() {
        document.getElementsByClassName("main-content")[0].classList.add("flex-justify-center");
    }

    handleUserConnection = data => {
        alert(data);
    }

    handleGameStart = data => {
        console.log("GAME START: ", data)
        this.setState({selectedGame: data.selectedGame});
    }

    componentDidMount() {
        socket.on("client_connect_success", this.initData);
        socket.on("start_game", this.handleGameStart)
    }

    componentWillUnmount() {
        socket.off("client_connect_success", this.initData);
        document.getElementsByClassName("main-content")[0].classList.remove("flex-justify-center");
    }

    connectClient(e) {
        e.preventDefault();
        socket.emit("connect_client", { roomName: this.state.name, clientName: this.state.clientName });
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    handleNameChange(e) {
        let val = e.target.value
        val.toLowerCase();
        console.log("TOLOWERCASE" + val);
        this.setState({ clientName: val });
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
            case "CAH": return <CahController clientName={this.state.clientName} roomName={this.state.roomName}></CahController>
        }
    }

    render() {
        return (
            <React.Fragment>

                { (this.state.roomName && !this.state.selectedGame) && <Controller roomName={this.state.roomName}></Controller>}
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
                        <h3>User name: {this.state.clientName}</h3>
                    </div>
                }


            </React.Fragment>

        );
    }
}

export default Dashboard;