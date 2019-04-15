import React from 'react';
import './CardsAgainstHumanity.scss';
import { socket } from '../../global/header';


class CahController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: props.clientName,
            roomName: props.roonName,
            cards: []
        }
    }

    handleGameEvent = (data) => {

        if(data.event === "DEAL_CARDS"){
            Object.keys(data.users).map(( element )  => {
                if(element === this.state.clientName){
                    
                }
            })
        }
    }

    componentDidMount(){
        socket.on("game_evnt", this.handleGameEvent);

    }
    componentWillUnmount(){

    }

    render() {
        return (

            <div className="page-section">

                <ul className="cards-list">

                    <li className="cah-card">card fdjslkaj dglø jdsgaølkdgj økldsa jgs </li>
                    <li className="cah-card">card fdjslkaj dglø jdsgaølkdgj økldsa jgs </li>
                    <li className="cah-card">card fdjslkaj dglø jdsgaølkdgj økldsa jgs </li>
                    <li className="cah-card">card fdjslkaj dglø jdsgaølkdgj økldsa jgs </li>
                    <li className="cah-card">card fdjslkaj dglø jdsgaølkdgjdglø jdsgaølkdgjdglø jdsgaølkdgjdglø jdsgaølkdgjdglø jdsgaølkdgj økldsa jgs </li>

                    {/* {this.state.cards.map((card) => {
                        return (
                            <li>{card.text} </li>
                        )
                    })} */}

                </ul>
                
            </div>
        );
    }
}

export default CahController;