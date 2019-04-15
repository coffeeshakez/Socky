import React from 'react';
import './GameCard.scss';

export const GameCard = props => (
    <div className={"game-card " + (props.selected ? "game-card--selected" : "") }>
    <h1 className="game-card__title">{props.game.name}</h1>
    </div>
)

