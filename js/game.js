const baseStatsGardevoir = {
    hp: 68,
    attack: 65,
    defence: 65,
    specialAttack: 125,
    specialDefence: 115,
    speed: 80
};
const baseStatsGengar = {
    hp: 60,
    attack: 65,
    defence: 60,
    specialAttack: 130,
    specialDefence: 65,
    speed: 110
};
const baseStatsCharizard = {
    hp: 78,
    attack: 84,
    defence: 78,
    specialAttack: 109,
    specialDefence: 85,
    speed: 100
};
const baseStatsGreninja = {
    hp: 72,
    attack: 95,
    defence: 67,
    specialAttack: 103,
    specialDefence: 71,
    speed: 122
};
var movesGardevoir;
var movesGengar;
var movesCharizard;
var movesGreninja;
const selectablePokemon = {}; //TODO make dynamic

function Game(){
    this.chosenPokemon = null;
    this.enemyPokemon = null;
}

function setPokemon(){
    /*if(!localStorage.getItem("pokemon")){*/
        selectablePokemon.gardevoir = new Pokemon("Gardevoir", types.fairy, types.psychic, baseStatsGardevoir, movesGardevoir);
        selectablePokemon.gengar = new Pokemon("Gengar", types.ghost, types.poison, baseStatsGengar, movesGengar);
        selectablePokemon.charizard = new Pokemon("Charizard", types.fire, types.flying, baseStatsCharizard, movesCharizard);
        selectablePokemon.greninja = new Pokemon("Greninja", types.water, types.dark, baseStatsGreninja, movesGreninja);
        storeObject("pokemon", selectablePokemon);
    /*} else {
        console.log("Pokemon already stored."); //TODO Zet mij terug
    }*/
}

function setMoves() {
    movesGardevoir = {
        "move1": new Move("Psychic", 90, 10, "special", types.psychic, true, 100),
        "move2": new Move("Psychic", 90, 10, "special", types.psychic, true, 100),
        "move3": new Move("Psychic", 90, 10, "special", types.psychic, true, 100),
        "move4": new Move("Psychic", 90, 10, "special", types.psychic, true, 100)
    }; //TODO fix me
    movesGengar = {
        "move1": new Move("Psychic", 90, 10, "special", types.psychic, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)]),
        "move2": new Move("Shadow Ball", 80, 10, "special", types.ghost, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)]),
        "move3": new Move("Calm Mind", null, 15, "status", types.psychic, true, null,
            [new Effect("raise", false, null, "specialAttack", 100, true),  //TODO Make this cleaner
                new Effect("raise", false, null, "specialDefence", 100, true)]),
        "move4": new Move("Sludge Bomb", 85, 15, "special", types.poison, false, 90)
    }; //TODO Check effects and make cleaner
    movesCharizard = {
        "move1": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move2": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move3": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move4": new Move("Tackle", 50, 30, "physical", types.normal, false, 100)
    }; //TODO Change me
    movesGreninja = {
        "move1": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move2": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move3": new Move("Tackle", 50, 30, "physical", types.normal, false, 100),
        "move4": new Move("Tackle", 50, 30, "physical", types.normal, false, 100)
    }; //TODO Change me
}

function startNewGame(){
    setTypes();
    setMoves();
    console.log(types);
    setPokemon();
    var game = new Game();
    storeObject("game", game);
    console.log("New game!", game);
}

function showGameState(){
    console.log(getStoredObject("game"));
}

function choosePokemon(pokemonName){
    console.log("pokemon:", pokemonName);
    var gameObj = getStoredObject("game");
    var pokemonObj = getStoredObject("pokemon");
    gameObj.chosenPokemon = pokemonObj[pokemonName]; //TODO Make dynamic
    gameObj.enemyPokemon = pokemonObj['charizard']; //TODO Make random
    console.log("gameobj:", gameObj);
    storeObject("game", gameObj);
}