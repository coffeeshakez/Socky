import React from 'react';
import { socket } from "../../global/header";
import './dashboard.scss';
import { NavLink } from "react-router-dom";
import CardsAgainstHumanity from '../../games/cardsAgainstHumanity/CardsAgainstHumanity';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            roomName: "",
            connected: false,
            selection: 0,
            prevSelected: undefined,
            connectedClients: [],
            noOfGames: 6,
            selectedGame: ""
        }
        this.connectHost = this.connectHost.bind(this);
    }

    initServerData = name => {
        this.setState({
            roomName: name,
            connected: true,
        });
        this.selectGame();
    }

    initClientData = data => {
        console.log(data.clientName);
        let clients = [...this.state.connectedClients];
        clients.push(data.clientName);

        this.setState(prevState => ({
            clientData: data,
            connected: true,
            connectedClients: clients
        }));

    }

    updateClientData = data => {
        this.setState({
            clientData: data
        })
    }

    handleControllerEvent = event => {
        console.log(event.action)
        switch (event.action) {
            case "up": if (this.state.selection + 1 <= 5) { this.setState({ selection: this.state.selection += 1 }) };
                break;
            case "down": if (this.state.selection - 1 >= 0) { this.setState({ selection: this.state.selection - 1 }) };
                break;
            case "right": if (this.state.selection + 1 <= 5) { this.setState({ selection: this.state.selection += 1 }) };
                break;
            case "left": if (this.state.selection - 1 >= 0) { this.setState({ selection: this.state.selection - 1 }) };
                break;
            case "enter": this.setState({ selectedGame: document.getElementById("game--selected").firstChild.textContent });
                break;
            default: console.log("out of range or unrecognized action");
                // this.setState({selectedGame: document.getElementsByClassName("game--selected")[0].innerHTML}
                break;
        }
        this.selectGame();
    }

    selectGame() {

        let selectedGame = document.getElementById("game--selected");
        if (selectedGame) {
            selectedGame.id = "";
        }

        let games = document.getElementsByClassName("game");
        games[this.state.selection].id = "game--selected";
    }

    componentDidMount() {
        socket.on("room_connected", this.initServerData);
        //TODO: Notify client about game in progress
        socket.on("broadcast_client_connected", this.initClientData);
        socket.on("controller_event", this.handleControllerEvent);
    }

    componentWillUnmount() {
        socket.off("room_connected", this.initServerData);
        socket.off("broadcast_client_connected", this.initClientData);
        socket.off("controller_event", this.handleControllerEvent);
    }

    connectHost(e) {
        e.preventDefault();
        socket.emit("connect_host", this.state.name);
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    getGame() {
        switch (this.state.selectedGame) {
            case "CAH": return (
                <CardsAgainstHumanity
                    roomName={this.state.roomName}
                    players={this.state.connectedClients}>
                </CardsAgainstHumanity>)

            default: {
                console.log("Current game is probably undefined");
            }
        }

        //notify clients about change
    }

    render() {
        return (
            <React.Fragment>

                {this.state.selectedGame &&
                    this.getGame()
                }

                {this.state.connected &&
                    <div className="page-section">
                        <div>
                            <h3> Room id: {this.state.roomName} </h3>
                            <h3>Connected users</h3>
                            <ul>
                                {this.state.connectedClients.map((val, index) => {
                                    return (<li className="clientName" key={index}>{val}</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                }

                {(this.state.connected) &&
                    <div className="page-section">
                        <div className="games-container">
                            <ul className="games-list">
                                <li className="game"> <p>Pull the pope</p></li>
                                <li className="game"><p> Click the bean </p></li>
                                <li className="game"><p> Whack a mole</p></li>
                                <li className="game"><p>Rock, scissors, WW3</p></li>
                                <li className="game"><p>Rub a duck</p></li>
                                <li className="game"><p>CAH</p></li>
                            </ul>
                        </div>
                    </div>
                }

                {!this.state.connected &&
                    <div className="page-section">
                        <form>
                            <div className="form-group">
                                <label>Room name</label>
                                <input type="text" onChange={e => this.handleInputChange(e)}></input>
                            </div>
                            <div className="form-group center">
                                <button className="btn" onClick={(e) => this.connectHost(e)}>Create room!</button>
                                <NavLink to="/clientcontroller">Connect as client</NavLink>
                            </div>
                        </form>
                    </div>
                }

            </React.Fragment>
        );
    }
}

export default Dashboard;