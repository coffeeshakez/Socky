import CardsAgainstHumanity from '../games/cardsAgainstHumanity';

export default class Game{

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    getGame(){
        return CardsAgainstHumanity
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getErect(){
        return "no";
    }
}