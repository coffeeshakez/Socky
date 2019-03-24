

module.exports = {

    handleSelection: function(number, min, max, modifier){

        if( ( (number + modifier) < max) && (number + modifier >= min) ){
            return number + modifier;
            console.log("NUMBER IS WITHIN RANGE")
        }

        return number;
    },

    initGames: function(){

        let games = [];

        
    }
}