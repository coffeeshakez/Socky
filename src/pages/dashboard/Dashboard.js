import React from 'react';
import { socket } from "../../global/header";
import './dashboard.scss';
import { NavLink } from "react-router-dom";


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
            noOfGames: 6
        }
        this.connectHost = this.connectHost.bind(this);
    }

    initServerData = name => {
        console.log("room connected: " + name);
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

        switch (event.event) {
            case "up": if (this.state.selection + 1 <= 5) { this.setState({ selection: this.state.selection += 1 }) };
                break;
            case "down": if (this.state.selection - 1 >= 0) { this.setState({ selection: this.state.selection - 1 }) };
                break;
            default: console.log("out of range");
                break;
        }
        this.selectGame();
    }

    selectGame() {
        console.log("going for selection");
        let games = document.getElementsByClassName("game");
        // console.log(games[this.state.selection]);
        // games[this.state.selection].setAttribute("style", "background-color: orange; height: 6rem; width: 6rem; ");
        games[this.state.selection].classList.add("game--selected");


        if (this.state.prevSelected) {
            if (this.state.prevSelected != games[this.state.selection]) {
                this.state.prevSelected.classList.remove("game--selected");
            }

        }
        this.setState({ prevSelected: games[this.state.selection] })
    }

    handleUserConnection = data => {
        alert(data);
    }

    componentDidMount() {
        socket.on("room_connected", this.initServerData);
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


    render() {
        return (
            <React.Fragment>



                {this.state.connected &&
                    <div className="page-section">
                        <div>
                            <h3> Room id: {this.state.roomName} </h3>
                            <h3>Connected users</h3>
                            <ul>
                                {this.state.connectedClients.map((val, index) => {
                                    return (<li class="username" key={index}>{val}</li>)
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
                                <li className="game"><p> </p></li>
                                <li className="game"><p>Game5</p></li>
                                <li className="game"><p>Game6</p></li>
                                <li className="game"><p>Game7</p></li>
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
                                <button className="btn" onClick={ (e) => this.connectHost(e)}>Create room!</button>
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