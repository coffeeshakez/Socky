
import React from 'react';
import CahController from './CahController';
import { socket } from '../../global/header';
import './CardsAgainstHumanity.scss';

class CardsAgainstHumanity extends React.Component {
    state = {}

    constructor(props) {
        super(props)

        this.state = {
            dataError: false,
            currentCard: "",
            roomName: props.roomName,
            blackCards: [],
            whiteCards: []
        }
    }

    componentDidMount() {
        this.getQuestionCards();
        socket.on("game_event");
        socket.emit("start_game", { roomName: this.state.roomName, selectedGame: "CAH" });
        document.getElementsByTagName("body")[0].classList.add("gradient");
        this.dealCards(10);
    }

    componentWillUnmount() {
        //remove socket connection
        socket.off("game_event");
        //remove background styles
        document.getElementsByTagName("body")[0].classList.remove("gradient");
    }

    getQuestionCards() {
        console.log("inside get questions");

        fetch('./cardsagainsthumanity.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ blackCards: data.blackCards, whiteCards: data.whiteCards })
                this.getRandomCard("black");
                console.log(this.state.blackCards)
            })
            .catch(err => {
                // Do something for an error here
                console.error("something went wrong")
            })
    }

    getRandomCard(type) {

        if (type == "black") {
            let card = this.state.blackCards[Math.floor(Math.random() * this.state.blackCards.length)];
            this.setState({ currentCard: card.text })
        }
        else {
            return this.state.whiteCards[Math.floor(Math.random() * this.state.whiteCards.length)];
        }

    }

    dealCards(amount) {

        this.props.players.forEach(user => {
            let cards = [];

            for (let i = 0; amount <= amount; amount++) {
                cards.push(this.getRandomCard());
            }
            user.sendEvent("DEAL_CARDS", cards);
        })
    }

    render() {
        return (
            <React.Fragment >
                <div className="page-section">
                    <h1>Cards against humanity</h1>

                    <div className="card-container">

                        <div className="card">
                            <h1>{this.state.currentCard}</h1>
                        </div>

                    </div>
                </div>

                <div className="page-section">
                    <div className="player-container">
                        <div className="player">Dobed</div>
                        <div className="player ready">Marius</div>
                        <div className="player">Kristian</div>
                        <div className="player">Patrick</div>
                        <div className="player ready">Nicu</div>

                    </div>
                </div>

            </React.Fragment >

        );
    }
}

export default CardsAgainstHumanity;