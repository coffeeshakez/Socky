import games from './Games';
export default class Game{

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.selected = false;
    }

    getGame(){
        if(Object.keys(games).find(this.id)){
            return games[this.id];
        }
        else return null
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