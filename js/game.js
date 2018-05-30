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
const selectablePokemon = {};

const pokemonNames = ["gardevoir", "charizard", "gengar", "greninja"];

function Game(){
    this.chosenPokemon = null;
    this.enemyPokemon = null;
}

function setPokemon(){
    selectablePokemon.gardevoir = new Pokemon("Gardevoir", types.fairy, types.psychic, baseStatsGardevoir, movesGardevoir);
    selectablePokemon.gengar = new Pokemon("Gengar", types.ghost, types.poison, baseStatsGengar, movesGengar);
    selectablePokemon.charizard = new Pokemon("Charizard", types.fire, types.flying, baseStatsCharizard, movesCharizard);
    selectablePokemon.greninja = new Pokemon("Greninja", types.water, types.dark, baseStatsGreninja, movesGreninja);
    storeObject("pokemon", selectablePokemon);
}

function setMoves() {
    movesGardevoir = {
        "move1": new Move("Psychic", 90, 10, "special", types.psychic, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)]),
        "move2": new Move("Calm Mind", null, 15, "status", types.psychic, true, null,
            [new Effect("raise", false, null, "specialAttack", 100, true),
                new Effect("raise", false, null, "specialDefence", 100, true)]),
        "move3": new Move("Moonblast", 95, 10, "special", types.fairy, true, 100,
            [new Effect("lower", false, null, "specialAttack", 30, false)]),
        "move4": new Move("Shadow Ball", 80, 10, "special", types.ghost, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)])
    };
    movesGengar = {
        "move1": new Move("Psychic", 90, 10, "special", types.psychic, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)]),
        "move2": new Move("Shadow Ball", 80, 10, "special", types.ghost, true, 100,
            [new Effect("lower", false, null, "specialDefence", 10, false)]),
        "move3": new Move("Calm Mind", null, 15, "status", types.psychic, true, null,
            [new Effect("raise", false, null, "specialAttack", 100, true),
                new Effect("raise", false, null, "specialDefence", 100, true)]),
        "move4": new Move("Sludge Bomb", 85, 15, "special", types.poison, false, 90)
    };
    movesCharizard = {
        "move1": new Move("Fire Blast", 110, 5, "special", types.fire, true, 85,
            [new Effect(null, true, "burn", null, 10, false)]),
        "move2": new Move("Flamethrower", 90, 15, "special", types.fire, true, 100,
            [new Effect(null, true, "burn", null, 10, false)]),
        "move3": new Move("Dragon Claw", 80, 15, "physical", types.dragon, false, 100),
        "move4": new Move("Earthquake", 100, 10, "physical", types.ground, false, 100)
    };
    movesGreninja = {
        "move1": new Move("Hydro Pump", 110, 5, "special", types.water, false, 80),
        "move2": new Move("Gunk Shot", 120, 5, "physical", types.poison, false, 80),
        "move3": new Move("Ice Beam", 90, 10, "special", types.ice, false, 100,
            [new Effect(null, true, "freeze", null, 10, false)]),
        "move4": new Move("Extrasensory", 80, 20, "physical", types.psychic, false, 100)
    };
}

function startNewGame(){
    setTypes();
    setMoves();
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
    gameObj.chosenPokemon = pokemonObj[pokemonName];
    var pok = pokemonNames[Math.floor(Math.random() * 4)];
    gameObj.enemyPokemon = pokemonObj[pok];
    console.log("gameobj:", gameObj);
    storeObject("game", gameObj);
}

function showEnd(){
    var victory = getStoredItem("victory");
    console.log(victory);
    document.getElementById("ending").innerText = "You " + victory + "!";

}