import React from 'react';
import { socket } from "../../global/header";
import './dashboard.scss';
import { NavLink } from "react-router-dom";
import User from '../../model/User';
import { handleSelection } from '../../utils/Utils'
import {CLIENT_MESSAGES, SERVER_MESSAGES} from '../../scripts/Event';
import Game from '../../model/Game';
import {GameCard} from '../../global/components/cards/gameCard/GameCard';   

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            roomName: "",
            connected: false,
            selection: 0,
            connectedClients: [],
            games: [new Game("CAH", "Cards against humanity"), new Game("CAH", "Cards against humanity"), new Game("CAH", "Cards against humanity"), new Game("CAH", "Cards against humanity") ],
            selectionIndex: 0,
            startGame: false
        }
        
        this.connectHost = this.connectHost.bind(this);
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

        console.log("Init client data: " , data)
        
        this.setState({
            connectedClients: this.state.connectedClients.concat(new User(data.client.name, data.client.socketId))
        }, () => console.log("state after initclientdata" , this.state.connectedClients));

    }

    handleControllerEvent = event => {
        let test;
        let newValue;
        switch (event.action) {
            case "up": newValue = handleSelection(this.state.selectionIndex, 0, this.state.games.length, +1);
                break;
            case "down": newValue = handleSelection(this.state.selectionIndex, 0, this.state.games.length, -1);
                break;
            case "right": newValue = handleSelection(this.state.selectionIndex, 0, this.state.games.length, +1);
                break;
            case "left": newValue = handleSelection(this.state.selectionIndex, 0, this.state.games.length, -1);
                break;
            case "enter": this.setState({startGame: true});
                break;
            default: console.log("out of range or unrecognized action");
                break;
        }

        if(test >= 0){
            console.log("klhfdhjkadshkløfsdahløk");
        }
        if(newValue != undefined){
            this.setState({selectionIndex: newValue}, () => console.log("index after setting state", this.state.selectionIndex))
        }
    }

    connectHost(e) {
        e.preventDefault();
        socket.emit(CLIENT_MESSAGES.connectHost, this.state.name);
    }

    handleInputChange(e) {
        this.setState({ name: e.target.value });
        console.log(this.state.name);
    }

    render() {
        const Game = () => React.createElement(this.state.games[this.state.selectionIndex].getGame())
        
        return (
            <React.Fragment>

                {this.state.startGame && 
                    <Game roomName={this.state.roomName}/>
                }

                {this.state.connected &&
                    <div className="page-section">
                        <div>
                            <h3> Room id: {this.state.roomName} </h3>
                            <h3>Connected users LOOOOL</h3>
                            <ul>
                                {this.state.connectedClients.map((client, index) => {
                                    return (<li className="clientName" key={index}>{ client.userName }</li>)
                                })}
                            </ul>
                        </div>
                    </div>
                }

                {(this.state.connected) &&
                    <div className="page-section">
                        <div className="games-container">
                            
                                {this.state.games.map((game, index) => (
                                    <GameCard key={index} game={game} selected={this.state.selectionIndex == index}></GameCard> 
                                ))}
                            
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