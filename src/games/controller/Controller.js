import React from 'react';
import './Controller.scss';
import { socket } from "../../global/header";

class Controller extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            roomName: props.roomName
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action, e){
        socket.emit("controller_event", { roomName: this.state.roomName, action: action });
    }

    render() {
        return (
            <div className="page-section">
                <div className="controller-container">
                    <div className="controller-body">
                        <button className="button-up" onClick={ (e) => this.handleClick("up", e)}><i className="fas fa-caret-up"></i></button>
                        <button className="button-down" onClick={ (e) => this.handleClick("down", e)}><i className="fas fa-caret-down"></i></button>
                        <button className="button-left" onClick={ (e) => this.handleClick("left", e)}><i className="fas fa-caret-left"></i></button>
                        <button className="button-right" onClick={ (e) => this.handleClick("right", e)}><i className="fas fa-caret-right"></i></button>
                        <button className="button-enter" onClick={ (e) => this.handleClick("enter", e)}><i className="fab fa-playstation"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Controller;