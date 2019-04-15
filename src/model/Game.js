import games from './Games';
export default class Game {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getGame() {
        if (games.hasOwnProperty(this.id)) {
            return games[this.id]
        }

        else return null
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getErect() {
        return "no";
    }
}