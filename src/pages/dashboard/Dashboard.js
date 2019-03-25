import React from 'react';
import { socket } from "../../global/header";
import './dashboard.scss';
import { NavLink } from "react-router-dom";
import CardsAgainstHumanity from '../../games/cardsAgainstHumanity/CardsAgainstHumanity';
import User from '../../model/User';
import * as UTILS from '../../utils/Utils'
import {CLIENT_MESSAGES, SERVER_MESSAGES} from '../../scripts/Event';
import Game from '../../model/Game';

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
            selectedGame: "",
            games: [new Game("CAH", "Cards against humanity")], 
            selectionIndex: 0
        }
        this.connectHost = this.connectHost.bind(this);

        console.log(CLIENT_MESSAGES)
    }


    componentDidMount() {
        //TODO: Notify client about game in progress
        socket.on(SERVER_MESSAGES.hostConnected, this.initServerData);
        socket.on(SERVER_MESSAGES.clientConnected, this.initClientData);
        socket.on(CLIENT_MESSAGES.controllerEvent, this.handleControllerEvent);
    }

    componentWillUnmount() {
        socket.off(SERVER_MESSAGES.hostConnected, this.initServerData);
        socket.off(SERVER_MESSAGES.clientConnected, this.initClientData);
        socket.off(CLIENT_MESSAGES.controllerEvent, this.handleControllerEvent);
    }

    initServerData = name => {
        this.setState({
            roomName: name,
            connected: true,
        });
        // this.selectGame();
    }

    initClientData = data => {
        let clients = [...this.state.connectedClients];
        clients.push(new User(data.clientName, data.socketId));
        
        
        this.setState({
            connectedClients: clients
        }, () => console.log("state after initclientdata" , this.state.connectedClients));

    }

    handleControllerEvent = event => {
        console.log(event.action)
        let newValue = 0;
        switch (event.action) {
            case "up": newValue = UTILS.handleSelection(this.state.selectionIndex, 0, this.state.noOfGames, +1);
                break;
            case "down": newValue = UTILS.handleSelection(this.state.selectionIndex, 0, this.state.noOfGames, -1);
                break;
            case "right": newValue = UTILS.handleSelection(this.state.selectionIndex, 0, this.state.noOfGames, +1);
                break;
            case "left":newValue = UTILS.handleSelection(this.state.selectionIndex, 0, this.state.noOfGames, -1);
                break;
            case "enter": newValue = this.getGame([this.state.games[this.state.selectedGame]]);
                break;
            default: console.log("out of range or unrecognized action");
                break;
        }
        this.setState({selectionIndex: newValue, selectedGame: this.games[newValue]});
    }

    setSelection(){

    }

    selectGame() {
       
    
    }

    connectHost(e) {
        e.preventDefault();
        socket.emit(CLIENT_MESSAGES.connectHost, this.state.name);
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    getGame() {
        
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
                                {this.state.connectedClients.map((client, index) => {
                                    return (<li className="clientName" key={index}>{ client.getUserName() }</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                }

                {(this.state.connected) &&
                    <div className="page-section">
                        <div className="games-container">
                            <ul className="games-list">
                                {this.state.games.map((game, index) => (
                                    <li key={index} className="game">{game.id}</li>
                                ))}
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